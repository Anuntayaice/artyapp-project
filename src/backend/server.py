from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from profile_handler import ProfileHandler
from apispec import APISpec
import os
import soundfile
import shutil
import time

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


@app.route('/', methods=['GET'])
def get_status():
    return jsonify({'status': 'Up and running!'})


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

    if profile:
        profile = profile_handler.get_profile(kwargs.get("profile"))
    else:
        profile = {}

    print(profile)

    openai = OpenAI(profile)
    answer = openai.gen_image_description_exercise()
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
    answer.close()
    response.headers['Content-Type'] = 'audio/wav'
    response.headers['Content-Disposition'] = 'attachment; filename=sound.wav'

    return response


@app.route('/gen_audios_for_exercise', methods=['POST'])
def gen_audios_for_exercise():
    if request.method != 'POST':
        return jsonify({'error': 'Invalid request method.'})

    kwargs = request.get_json(force=True)
    exercise_id = kwargs.get("exercise_id")

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

    # create or replace the audios folder
    if os.path.exists(f'exercises/{exercise_id}/audios'):
        shutil.rmtree(f'exercises/{exercise_id}/audios')
    os.mkdir(f'exercises/{exercise_id}/audios')

    # create the phrases and compound_nouns folders
    os.mkdir(f'exercises/{exercise_id}/audios/phrases')
    os.mkdir(f'exercises/{exercise_id}/audios/compound_nouns')

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
