from .exercise import Exercise

import azure.cognitiveservices.speech as speechsdk
import json
import os


class Azure(Exercise):
    def __init__(self, type_of_exercise=None, profile=None) -> None:
        super().__init__(type_of_exercise, profile)
        self.speech_config = speechsdk.SpeechConfig(subscription=os.getenv(
            'AZURE_KEY'), region=os.getenv('AZURE_REGION'))
        self.speech_config.speech_recognition_language = os.getenv(
            'AZURE_LANG')

    def pronunciation_assessment_continuous_from_file(self, reference_text, audio):
        pronunciation_config = speechsdk.PronunciationAssessmentConfig(
            reference_text=reference_text,
            grading_system=speechsdk.PronunciationAssessmentGradingSystem.HundredMark,
            granularity=speechsdk.PronunciationAssessmentGranularity.Phoneme,
            enable_miscue=True)

        audio_config = speechsdk.audio.AudioConfig(filename=audio)

        speech_recognizer = speechsdk.SpeechRecognizer(
            speech_config=self.speech_config,
            audio_config=audio_config)

        pronunciation_config.apply_to(speech_recognizer)
        speech_recognition_result = speech_recognizer.recognize_once()

        print(reference_text, audio, speech_recognition_result.reason)

        # The pronunciation assessment result as a JSON string
        pronunciation_assessment_result_json = speech_recognition_result.properties.get(
            speechsdk.PropertyId.SpeechServiceResponse_JsonResult)

        print(pronunciation_assessment_result_json)
        # convert to dict
        pronunciation_assessment_result_dict = json.loads(
            pronunciation_assessment_result_json)

        return pronunciation_assessment_result_dict
