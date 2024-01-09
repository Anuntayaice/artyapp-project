from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from profile_handler import ProfileHandler
from apispec import APISpec
import os
import soundfile
import shutil
import time
import requests
from threading import Thread
import json

from apis.openai import OpenAI
from apis.azure import Azure

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
profile_handler = ProfileHandler()

app.config.update({
    'APISPEC_SPEC': APISpec(
        title='descrAIbe',
        version='v1',
        plugins=[],
        openapi_version='2.0.0'
    ),
    'APISPEC_SWAGGER_URL': '/swagger/',  # URI to access API Doc JSON
    'APISPEC_SWAGGER_UI_URL': '/swagger-ui/'  # URI to access UI of API Doc
})


def gen_audios(exercise_id):
    # check that the exercise exists in the exercises collection
    if not os.path.exists(f'exercises/{exercise_id}'):
        return jsonify({'error': 'Exercise does not exist.'})

    # get the exercise phrases and compound nouns from the data.json file
    phrases = []
    compound_nouns = []
    story = ''
    with open(f'exercises/{exercise_id}/data.json', 'r') as f:
        data = json.load(f)
        phrases = data['phrases']
        compound_nouns = data['compound_nouns']
        story = data['story']

    # create or replace the audios folder
    if os.path.exists(f'exercises/{exercise_id}/audios'):
        shutil.rmtree(f'exercises/{exercise_id}/audios')
    os.mkdir(f'exercises/{exercise_id}/audios')

    # create the phrases and compound_nouns folders
    os.mkdir(f'exercises/{exercise_id}/audios/phrases')
    os.mkdir(f'exercises/{exercise_id}/audios/compound_nouns')

    # get the audio for the story
    story = story.strip()
    audio = OpenAI.gen_audio(story)

    if 'error' in audio.keys():
        # wait for 1min and try again
        num_tries = 0
        while num_tries < 3:
            time.sleep(15)
            audio = OpenAI.gen_audio(story)
            if 'error' in audio.keys():
                num_tries += 1
            else:
                break

        if num_tries == 3:
            return jsonify({'error': 'Error generating audios.', 'audio': audio})

    with open(f'exercises/{exercise_id}/audios/story.wav', 'wb') as f:
        f.write(audio['data'].getvalue())

    # get the audio for each phrase
    for i, phrase in enumerate(phrases):
        # check that the audio doesn't start with a number
        if phrase[0].isdigit():
            phrase = phrase[2:]

        phrase = phrase.strip()
        audio = OpenAI.gen_audio(phrase)

        if 'error' in audio.keys():
            # wait for 1min and try again
            num_tries = 0
            while num_tries < 3:
                time.sleep(15)
                audio = OpenAI.gen_audio(phrase)
                if 'error' in audio.keys():
                    num_tries += 1
                else:
                    break

            if num_tries == 3:
                return jsonify({'error': 'Error generating audios.', 'audio': audio})

        with open(f'exercises/{exercise_id}/audios/phrases/{i + 1}.wav', 'wb') as f:
            f.write(audio['data'].getvalue())

    # get the audio for each compound noun
    for i, noun in enumerate(compound_nouns):
        # check that the audio doesn't start with a number
        if noun[0].isdigit():
            noun = noun[2:]

        noun = noun.strip()
        audio = OpenAI.gen_audio(noun)

        if 'error' in audio.keys():
            # wait for 1min and try again
            num_tries = 0
            while num_tries < 3:
                time.sleep(15)
                audio = OpenAI.gen_audio(noun)
                if 'error' in audio.keys():
                    num_tries += 1
                else:
                    break

            if num_tries == 3:
                return jsonify({'error': 'Error generating audios.', 'audio': audio})

        with open(f'exercises/{exercise_id}/audios/compound_nouns/{i + 1}.wav', 'wb') as f:
            f.write(audio['data'].getvalue())


@app.route('/', methods=['GET'])
def get_status():
    return jsonify({'status': 'Up and running!'})


@app.route('/get_exercise_audio', methods=['GET'])
def get_exercise_audio():

    # get urlencoded form data
    kwargs = request.args.to_dict()

    exercise_id = kwargs.get("exercise_id")
    type_of_audio = kwargs.get("type_of_audio")
    audio_name = kwargs.get("audio_name")

    # check that the exercise exists in the exercises collection
    if not os.path.exists(f'exercises/{exercise_id}'):
        return jsonify({'error': 'Exercise does not exist.'})

    # if type_of_audio is story, return the story audio
    if type_of_audio == 'story':
        with open(f'exercises/{exercise_id}/audios/story.wav', 'rb') as f:
            audio = f.read()
        response = make_response(audio)
        response.headers['Content-Type'] = 'audio/wav'
        response.headers['Content-Disposition'] = 'attachment; filename=sound.wav'
        return response

    # if type_of_audio is phase, return the phase audio given the audio_name (either 1 or 2)
    if type_of_audio == 'phase':
        with open(f'exercises/phase_{audio_name}.wav', 'rb') as f:
            audio = f.read()
        response = make_response(audio)
        response.headers['Content-Type'] = 'audio/wav'
        response.headers['Content-Disposition'] = 'attachment; filename=sound.wav'
        return response

    # if type_of_audio is a phrase, return the phrase audio given the audio_name (1, 2, 3, 4, 5, or 6)
    if type_of_audio == 'phrase':
        with open(f'exercises/{exercise_id}/audios/phrases/{audio_name}.wav', 'rb') as f:
            audio = f.read()
        response = make_response(audio)
        response.headers['Content-Type'] = 'audio/wav'
        response.headers['Content-Disposition'] = 'attachment; filename=sound.wav'
        return response

    # if type_of_audio is a compound_noun, return the compound_noun audio given the audio_name (1, 2, 3, or 4)
    if type_of_audio == 'compound_noun':
        with open(f'exercises/{exercise_id}/audios/compound_nouns/{audio_name}.wav', 'rb') as f:
            audio = f.read()
        response = make_response(audio)
        response.headers['Content-Type'] = 'audio/wav'
        response.headers['Content-Disposition'] = 'attachment; filename=sound.wav'
        return response

    return jsonify({'error': 'Invalid type_of_audio.'})


@app.route('/get_exercise_image', methods=['GET'])
def get_exercise_image():
    # get urlencoded form data
    kwargs = request.args.to_dict()

    exercise_id = kwargs.get("exercise_id")

    # check that the exercise exists in the exercises collection
    if not os.path.exists(f'exercises/{exercise_id}'):
        return jsonify({'error': 'Exercise does not exist.'})

    # get the exercise image
    with open(f'exercises/{exercise_id}/image.png', 'rb') as f:
        image = f.read()

    response = make_response(image)
    response.headers['Content-Type'] = 'image/png'
    response.headers['Content-Disposition'] = 'attachment; filename=image.png'
    return response


@app.route('/get_exercise', methods=['GET'])
def get_exercise():
    # get urlencoded form data
    kwargs = request.args.to_dict()

    exercise_id = kwargs.get("exercise_id")

    # check that the exercise exists in the exercises collection
    if not os.path.exists(f'exercises/{exercise_id}'):
        return jsonify({'error': 'Exercise does not exist.'})

    # get the exercise phrases, compound nouns, and story
    phrases = []
    compound_nouns = []
    story = ''
    phase_1, phase_2 = '', ''
    with open(f'exercises/{exercise_id}/data.json', 'r') as f:
        data = json.load(f)
        phrases = data['phrases']
        compound_nouns = data['compound_nouns']
        story = data['story']

    with open(f'exercises/phase_1.txt', 'r') as f:
        phase_1 = f.read().strip()
    with open(f'exercises/phase_2.txt', 'r') as f:
        phase_2 = f.read().strip()

    exercise_sequence = {
        'exercise_id': exercise_id,
        'exercise': [
            {'type': 'story', 'content': story},
            {'type': 'phase', 'content': phase_1, 'audio_name': '1'},
        ],
        'speech_focus': data['speech_focus'],
        'interests': data['interests']
    }

    for i, phrase in enumerate(phrases):
        exercise_sequence['exercise'].append(
            {'type': 'phrase', 'content': phrase.strip(), 'audio_name': i + 1})

    exercise_sequence['exercise'].append(
        {'type': 'phase', 'content': phase_2, 'audio_name': '2'})

    for i, noun in enumerate(compound_nouns):
        exercise_sequence['exercise'].append(
            {'type': 'compound_noun', 'content': noun.strip(), 'audio_name': i + 1})

    return jsonify(exercise_sequence)


@app.route('/get_exercises_data', methods=['GET'])
def get_exercises_data():
    # return all exercises data.json
    exercises = []
    for exercise_id in os.listdir('exercises'):
        if exercise_id.isdigit():
            with open(f'exercises/{exercise_id}/data.json', 'r') as f:
                data = json.load(f)
                exercises.append({
                    'exercise_id': exercise_id,
                    'data': data,
                })

    return jsonify(exercises)


@app.route('/get_exercise_ids', methods=['GET'])
def get_exercise_ids():
    exercise_ids = os.listdir('exercises')
    exercise_ids = [
        exercise_id for exercise_id in exercise_ids if exercise_id.isdigit()]
    return jsonify(exercise_ids)


@app.route('/toggle_exercise', methods=['POST'])
def toggle_exercise():
    kwargs = request.get_json(force=True)
    exercise_id = kwargs.get("exercise_id")
    profile_id = kwargs.get("profile_id")
    profile = profile_handler.get_profile(profile_id)
    if profile:
        if 'exercises' not in profile.keys():
            profile['exercises'] = [exercise_id]
        elif exercise_id in profile['exercises']:
            profile['exercises'].remove(exercise_id)
        else:
            profile['exercises'].append(exercise_id)
        profile_handler.add_or_update_profile(profile)
        return jsonify({"profile": profile})
    else:
        return jsonify({'error': 'Profile does not exist.'})


@app.route('/profile', methods=['GET', 'POST', 'DELETE'])
def profile():
    kwargs = request.get_json(force=True)
    if request.method == 'POST':
        return jsonify(profile_handler.add_or_update_profile(kwargs))
    elif request.method == 'DELETE':
        return jsonify(profile_handler.delete_profile(kwargs['_id']))


@app.route('/get_profile', methods=['POST'])
def get_profile():
    kwargs = request.get_json(force=True)
    profile_id = kwargs.get("profile_id")
    profile = profile_handler.get_profile(profile_id)
    if profile:
        return jsonify({"profile": profile})
    else:
        return jsonify({'error': 'Profile does not exist.'})


@app.route('/patients', methods=['GET'])
def profiles():
    return jsonify({"patients": profile_handler.get_patients()})


@app.route('/login', methods=['POST'])
def login():
    kwargs = request.get_json(force=True)
    profile = profile_handler.login(kwargs['email'], kwargs['password'])
    if profile:
        return jsonify(profile)
    else:
        return jsonify({'error': 'Profile does not exist.'})


@app.route('/gen_exercise', methods=['POST'])
def gen_exercise():
    if request.method != 'POST':
        return jsonify({'error': 'Invalid request method.'})

    kwargs = request.get_json(force=True)
    type_of_exercise = kwargs.get("type_of_exercise")
    profile = kwargs.get("profile")

    if profile:
        profile = profile_handler.get_profile(kwargs.get("profile"))
    else:
        profile = {}

    print(type_of_exercise, profile)

    openai = OpenAI(type_of_exercise, profile)
    answer = openai.gen_exercise()
    return answer


@app.route('/gen_description_exercise', methods=['POST'])
def gen_description_exercise():
    if request.method != 'POST':
        return jsonify({'error': 'Invalid request method.'})

    kwargs = request.get_json(force=True)
    profile = kwargs.get("profile")
    speech_focus = kwargs.get("speech_focus")
    interests = kwargs.get("patient_interests")

    if profile:
        profile = profile_handler.get_profile(kwargs.get("profile"))
    else:
        profile = {}

    print(profile, speech_focus, interests)

    openai = OpenAI(profile)
    answer = openai.gen_image_description_exercise(speech_focus, interests)

    return answer


@app.route('/get_exercise_for_edit', methods=['GET'])
def get_exercise_for_edit():
    # get urlencoded form data
    kwargs = request.args.to_dict()

    exercise_id = kwargs.get("exercise_id")

    # get the exercise phrases, compound nouns, and story
    with open(f'exercises/{exercise_id}/data.json', 'r') as f:
        data = json.load(f)
        phrases = data['phrases']
        compound_nouns = data['compound_nouns']
        story = data['story']
        description = data['description']
        speech_focus = data['speech_focus']
        interests = data['interests']

    exercise = {
        'exercise_id': exercise_id,
        'exercise': {
            'story': story,
            'description': description,
            'phrases': phrases,
            'compound_nouns': compound_nouns,
            'speech_focus': speech_focus,
            'interests': interests
        }
    }

    return jsonify(exercise)


@app.route('/gen_image', methods=['POST'])
def gen_image():
    if request.method != 'POST':
        return jsonify({'error': 'Invalid request method.'})

    kwargs = request.get_json(force=True)
    text = kwargs.get("text")

    answer = OpenAI.gen_dalle(text)
    return answer


@app.route('/gen_audio', methods=['POST'])
def gen_audio():
    if request.method != 'POST':
        return jsonify({'error': 'Invalid request method.'})

    kwargs = request.get_json(force=True)
    text = kwargs.get("text")

    answer = OpenAI.gen_audio(text)

    response = make_response(answer['data'].getvalue())

    response.headers['Content-Type'] = 'audio/wav'
    response.headers['Content-Disposition'] = 'attachment; filename=sound.wav'

    return response


@app.route('/save_exercise', methods=['POST'])
def save_exercise():
    print('Saving exercise...')
    if request.method != 'POST':
        return jsonify({'error': 'Invalid request method.'})

    kwargs = request.get_json(force=True)
    story = kwargs.get("story")
    description = kwargs.get("description")
    image_url = kwargs.get("image_url")
    phrases = kwargs.get("phrases").split('\n')
    compound_nouns = kwargs.get("compound_nouns").split('\n')
    speech_focus = kwargs.get("speech_focus")
    interests = kwargs.get("interests")

    exercise_id = None
    exercise_folder = None

    if kwargs.get("exercise_id"):
        exercise_id = kwargs.get("exercise_id")
        exercise_folder = f'exercises/{exercise_id}'
        # delete the exercise folder
    else:
        # get the id of the exercise, which is the number of folders in the exercises folder + 1
        exercise_id = len(os.listdir('exercises')) - 4 + 1
        exercise_folder = f'exercises/{exercise_id}'
        # create the folder
        os.mkdir(exercise_folder)

    if not image_url.startswith('blob:'):
        # save the image
        # retrieve the image from the url
        image_data = requests.get(image_url).content
        with open(f'{exercise_folder}/image.png', 'wb') as f:
            f.write(image_data)

    data = {
        'story': story,
        'description': description,
        'phrases': phrases,
        'compound_nouns': compound_nouns,
        'speech_focus': speech_focus,
        'interests': interests
    }

    # save data into a json file
    with open(f'{exercise_folder}/data.json', 'w') as f:
        json.dump(data, f)

    print('Exercise saved successfully.')
    # create a thread to generate the audios
    thread = Thread(target=gen_audios, args=(exercise_id,))
    thread.start()

    return jsonify({'content': 'Exercise saved successfully.'})


@app.route('/gen_audios_for_exercise', methods=['POST'])
def gen_audios_for_exercise():
    if request.method != 'POST':
        return jsonify({'error': 'Invalid request method.'})

    kwargs = request.get_json(force=True)
    exercise_id = kwargs.get("exercise_id")

    gen_audios(exercise_id)

    return jsonify({'content': 'Audios generated successfully.'})


@app.route('/gen_audio_assessment', methods=['POST'])
def gen_audio_assessment():
    if request.method != 'POST':
        return jsonify({'error': 'Invalid request method.'})

    text = request.form.get('text')
    audio = request.files.get('audio')
    user_id = request.form.get('user_id')
    print(user_id)
    print(audio)
    # read the ogg audio file with soundfile
    data, samplerate = soundfile.read(audio)
    filename = audio.filename
    # convert to wav
    soundfile.write(filename, data, samplerate, subtype='PCM_16', format='wav')

    azure = Azure()

    answer = azure.pronunciation_assessment_continuous_from_file(
        text, filename)

    # get user profile
    profile = profile_handler.get_profile(user_id)
    if profile:
        errors = profile['errors'] if 'errors' in profile.keys() else []
        assessment = answer["NBest"][0]["PronunciationAssessment"]
        print(assessment)
        words = answer["NBest"][0]["Words"]
        for word in words:
            word_assessment = word["PronunciationAssessment"] if "PronunciationAssessment" in word.keys(
            ) else None
            if word_assessment and "AccuracyScore" in word_assessment and word_assessment["AccuracyScore"] < 60:
                print(word)
                errors.append({
                    'word': word["Word"],
                    'accuracy_score': word_assessment["AccuracyScore"],
                    'error_type': word_assessment["ErrorType"],
                    'phonemes': word["Phonemes"]
                })
        # append the errors to the profile
        profile['errors'] = errors
        print(errors)
        profile_handler.add_or_update_profile(profile)

    os.remove(audio.filename)

    return {
        'content': answer
    }


if __name__ == "__main__":
    app.run(debug=True, port=5000)
