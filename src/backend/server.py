from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from profile_handler import ProfileHandler
from apispec import APISpec
import os
import soundfile
import io
import urllib.request

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

    response = make_response(answer.getvalue())
    answer.close()
    response.headers['Content-Type'] = 'audio/wav'
    response.headers['Content-Disposition'] = 'attachment; filename=sound.wav'

    return response


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
