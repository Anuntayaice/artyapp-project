from flask import Flask  # , request
from flask_restful import Resource, Api, fields
from flask_cors import CORS, cross_origin
# import speechsdk from azure.cognitiveservices.speech

from flask_apispec import marshal_with, doc, use_kwargs
from flask_apispec.views import MethodResource
from marshmallow import Schema, fields

from apispec import APISpec
from apispec.ext.marshmallow import MarshmallowPlugin
from flask_apispec.extension import FlaskApiSpec

from apis.openai import OpenAI
from apis.azure import Azure

from profile_handler import ProfileHandler

app = Flask(__name__)
profile_handler = ProfileHandler()

app.config.update({
    'APISPEC_SPEC': APISpec(
        title='descrAIbe',
        version='v1',
        plugins=[MarshmallowPlugin()],
        openapi_version='2.0.0'
    ),
    'APISPEC_SWAGGER_URL': '/swagger/',  # URI to access API Doc JSON
    'APISPEC_SWAGGER_UI_URL': '/swagger-ui/'  # URI to access UI of API Doc
})


cors = CORS(app, resources={r"/*": {"origins": "*"}})
api = Api(app)  # Flask restful wraps Flask app around it.
docs = FlaskApiSpec(app)


class StatusResource(MethodResource, Resource):

    class StatusRequestSchema(Schema):
        status = fields.Str(dump_default='Up and running!')

    @doc(description='API Status', tags=['Status'])
    @marshal_with(StatusRequestSchema)  # marshalling
    def get(self):
        return {'status': 'Up and running!'}


class ProfileResource(MethodResource, Resource):

    class ProfileRequestSchema(Schema):
        _id = fields.Str()
        name = fields.Str(required=True)
        interests = fields.List(
            cls_or_instance=fields.Str, required=False)
        other_properties = fields.List(
            cls_or_instance=fields.Str, required=False)

    class ProfileDeleteRequestSchema(Schema):
        _id = fields.Str(required=True)

    class ProfileGetResponseSchema(Schema):
        profiles = fields.List(cls_or_instance=fields.Dict)

    class ProfilePostResponseSchema(Schema):
        status = fields.Str(dump_default='Success')
        profile = fields.Dict(required=False)

    @doc(description='Adds a new or updates an existing profile.', tags=['Profile'])
    @use_kwargs(ProfileRequestSchema, location=('json'))
    @marshal_with(ProfilePostResponseSchema)  # marshalling
    def post(self, **kwargs):
        print(kwargs)
        return profile_handler.add_or_update_profile(kwargs)

    @doc(description='Retrieves all existing profiles', tags=['Profile'])
    @marshal_with(ProfileGetResponseSchema)  # marshalling
    def get(self):
        return {
            "profiles": profile_handler.get_profiles()
        }

    @doc(description='Removes a specific profile', tags=['Profile'])
    @use_kwargs(ProfileDeleteRequestSchema, location=('json'))
    @marshal_with(ProfilePostResponseSchema)  # marshalling
    def delete(self,  **kwargs):
        return profile_handler.delete_profile(kwargs.get('_id'))


class ExerciseResource(MethodResource, Resource):

    class ExerciseRequestSchema(Schema):
        type_of_exercise = fields.Str(required=True)
        profile = fields.Str(required=False)

    class ExerciseResponseSchema(Schema):
        status = fields.Str(dump_default='Success')
        content = fields.Dict(dump_default="No content.")
        error = fields.Str(dump_default='No error.')

    @doc(description='Generates and retrieves an exercise.', tags=['Exercise'])
    @use_kwargs(ExerciseRequestSchema, location=('json'))
    @marshal_with(ExerciseResponseSchema)  # marshalling
    def post(self, **kwargs):
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


class DescriptionExerciseResource(MethodResource, Resource):

    class DescriptionExerciseRequestSchema(Schema):
        profile = fields.Str(required=False)

    class DescriptionExerciseResponseSchema(Schema):
        status = fields.Str(dump_default='Success')
        content = fields.Dict(dump_default="No content.")
        error = fields.Str(dump_default='No error.')

    @doc(description='Generates and retrieves a description exercise.', tags=['Exercise'])
    @use_kwargs(DescriptionExerciseRequestSchema, location=('json'))
    @marshal_with(DescriptionExerciseResponseSchema)  # marshalling
    def post(self, **kwargs):
        profile = kwargs.get("profile")

        if profile:
            profile = profile_handler.get_profile(kwargs.get("profile"))
        else:
            profile = {}

        print(profile)

        openai = OpenAI(profile)
        answer = openai.gen_image_description_exercise()
        return answer


class ImageResource(MethodResource, Resource):

    class ImageRequestSchema(Schema):
        text = fields.Str(required=True)

    class ImageResponseSchema(Schema):
        status = fields.Str(dump_default='Success')
        content = fields.Dict(dump_default="No content.")
        error = fields.Str(dump_default='No error.')

    @doc(description='Generates audio from prompt.', tags=['Exercise'])
    @use_kwargs(ImageRequestSchema, location=('json'))
    @marshal_with(ImageResponseSchema)  # marshalling
    def post(self, **kwargs):
        text = kwargs.get("text")

        print(text)

        answer = OpenAI.gen_dalle(text)
        return answer


class AudioResource(MethodResource, Resource):

    class AudioRequestSchema(Schema):
        text = fields.Str(required=True)

    class AudioResponseSchema(Schema):
        status = fields.Str(dump_default='Success')
        content = fields.Dict(dump_default="No content.")
        error = fields.Str(dump_default='No error.')

    @doc(description='Generates audio from prompt.', tags=['Exercise'])
    @use_kwargs(AudioRequestSchema, location=('json'))
    @marshal_with(AudioResponseSchema)  # marshalling
    def post(self, **kwargs):
        text = kwargs.get("text")

        print(text)

        answer = OpenAI.gen_audio(text)
        return answer


class AudioAssessmentResource(MethodResource, Resource):

    class AudioAssessmentRequestSchema(Schema):
        text = fields.Str(required=True)
        audio = fields.Str(required=True)

    class AudioAssessmentResponseSchema(Schema):
        status = fields.Str(dump_default='Success')
        content = fields.Dict(dump_default="No content.")
        error = fields.Str(dump_default='No error.')

    @doc(description='Assesses the correctness of the pronunciation of the audio.', tags=['Exercise'])
    @use_kwargs(AudioAssessmentRequestSchema, location=('json'))
    @marshal_with(AudioAssessmentResponseSchema)  # marshalling
    def post(self, **kwargs):
        text = kwargs.get("text")
        audio = kwargs.get("audio")

        azure = Azure()

        answer = azure.pronunciation_assessment_continuous_from_file(
            text, audio)
        return {
            'content': answer
        }


api.add_resource(StatusResource, '/')
docs.register(StatusResource)

api.add_resource(DescriptionExerciseResource, '/gen_description_exercise')
docs.register(DescriptionExerciseResource)

api.add_resource(ExerciseResource, '/gen_exercise')
docs.register(ExerciseResource)

api.add_resource(ImageResource, '/gen_image')
docs.register(ImageResource)

api.add_resource(AudioResource, '/gen_audio')
docs.register(AudioResource)

api.add_resource(AudioAssessmentResource, '/get_audio_assessment')
docs.register(AudioAssessmentResource)

api.add_resource(ProfileResource, '/profile')
docs.register(ProfileResource)

if __name__ == "__main__":
    app.run(debug=True)
