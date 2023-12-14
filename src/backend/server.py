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

    # get the exercise phrases and compound nouns
    phrases = []
    compound_nouns = []
    with open(f'exercises/{exercise_id}/phrases.txt', 'r') as f:
        phrases = f.readlines()
    with open(f'exercises/{exercise_id}/compound_nouns.txt', 'r') as f:
        compound_nouns = f.readlines()

    # load story
    story = ''
    with open(f'exercises/{exercise_id}/story.txt', 'r') as f:
        story = f.read()

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
        with open(f'exercises/{exercise_id}/story.wav', 'rb') as f:
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
    with open(f'exercises/{exercise_id}/phrases.txt', 'r') as f:
        phrases = f.readlines()
    with open(f'exercises/{exercise_id}/compound_nouns.txt', 'r') as f:
        compound_nouns = f.readlines()
    with open(f'exercises/{exercise_id}/story.txt', 'r') as f:
        story = f.read().strip()
    with open(f'exercises/phase_1.txt', 'r') as f:
        phase_1 = f.read().strip()
    with open(f'exercises/phase_2.txt', 'r') as f:
        phase_2 = f.read().strip()

    exercise_sequence = {
        'exercise_id': exercise_id,
        'exercise': [
            {'type': 'story', 'content': story},
            {'type': 'phase', 'content': phase_1, 'audio_name': '1'},
        ]
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


@app.route('/profile', methods=['GET', 'POST', 'DELETE'])
def profile():
    kwargs = request.get_json(force=True)
    if request.method == 'POST':
        return jsonify(profile_handler.add_or_update_profile(kwargs))
    elif request.method == 'GET':
        return jsonify({"profiles": profile_handler.get_profiles()})
    elif request.method == 'DELETE':
        return jsonify(profile_handler.delete_profile(kwargs['_id']))


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

    """answer = {
        'content': {
            "description": 'Test description',
            "story": 'Once upon a time, deep in the heart of a magical forest, there stood a wise old tree. This tree was different from all the others; its trunk twisted and turned like a winding path. Its branches reached out in every direction, inviting the creatures of the forest to come and play. One sunny day, a curious squirrel named Sammy decided to visit the old tree. Sammy\'s favorite pastime was collecting acorns, and he had heard that this particular tree had the biggest and juiciest ones. As Sammy scampered up the branches, he couldn\'t help but marvel at the beautiful flowers that adorned a small wooden bench nearby. It was the perfect spot to take a break! Sammy settled down on the bench and enjoyed the breathtaking view. The forest seemed to come alive with chirping birds and rustling leaves. Rays of sunlight danced through the green canopy, creating a magical atmosphere. Sammy relished every moment, feeling grateful for the wonders of nature. With his little paws clutching the acorn tightly, he decided to head back home, his heart filled with joy and his belly full of acorn delight.',
            "image_url": 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-CgV2X5BRb12i6vu5jA2cnMR2/user-60bG8owWKytSMFFKr2IP4ahP/img-S2kaPv2SwiLmaDLbZ2APls91.png?st=2023-12-12T22%3A22%3A18Z&se=2023-12-13T00%3A22%3A18Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-12-12T23%3A17%3A00Z&ske=2023-12-13T23%3A17%3A00Z&sks=b&skv=2021-08-06&sig=/%2BgUAufLlOYPALyKFGvMtEkBY5BOzg3yEo7khd/aecc%3D',
            "phrases": ['The tree in the image has a crooked trunk.',
                        'The squirrel in the image is holding an acorn.',
                        'There is a small wooden bench decorated with colorful flowers.',
                        'The forest behind the tree is filled with tall trees and lush vegetation.',
                        'Rays of sunlight shine through the foliage, creating a warm glow.',
                        'The image depicts a whimsical forest scene.'
                        ],
            "compound_nouns": ['Acorn collector',
                               'Crooked trunk',
                               'Colorful flower bench',
                               'Sunlit forest'],
        }
    }"""

    return answer


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
    phrases = kwargs.get("phrases").split(',')
    compound_nouns = kwargs.get("compound_nouns").split(',')

    # get the id of the exercise, which is the number of folders in the exercises folder + 1
    exercise_id = len(os.listdir('exercises')) - 4 + 1
    exercise_folder = f'exercises/{exercise_id}'

    # create the folder
    os.mkdir(exercise_folder)

    # save the description
    with open(f'{exercise_folder}/description.txt', 'w') as f:
        f.write(description)

    # save the story
    with open(f'{exercise_folder}/story.txt', 'w') as f:
        f.write(story)

    # save the image
    # retrieve the image from the url
    image_data = requests.get(image_url).content
    with open(f'{exercise_folder}/image.png', 'wb') as f:
        f.write(image_data)

    # save the phrases
    with open(f'{exercise_folder}/phrases.txt', 'w') as f:
        f.write('\n'.join(phrases))

    # save the compound nouns
    with open(f'{exercise_folder}/compound_nouns.txt', 'w') as f:
        f.write('\n'.join(compound_nouns))

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

    # read the ogg audio file with soundfile
    data, samplerate = soundfile.read(audio)
    filename = audio.filename
    # convert to wav
    soundfile.write(filename, data, samplerate, subtype='PCM_16', format='wav')

    azure = Azure()

    answer = azure.pronunciation_assessment_continuous_from_file(
        text, filename)

    os.remove(audio.filename)

    return {
        'content': answer
    }


if __name__ == "__main__":
    app.run(debug=True, port=5000)
