from .exercise import Exercise
import os
from openai import OpenAI as Client
from dotenv import load_dotenv
import soundfile
import io
import json

REASON_EXPLANATION = {
    "stop": "The model reached the end of the prompt.",
    "length": "The model did not output the full answer due to token limits.",
    "content_filter": "The model was blocked by the content filter.",
    "null": "The model's answer is still in progress or incomplete.",
}
load_dotenv()


class OpenAI(Exercise):
    def __init__(self, type_of_exercise=None, profile=None) -> None:
        super().__init__(type_of_exercise, profile)
        self.previous_info = []
        self.client = Client()
        self.client.api_key = os.getenv("OPENAI_API_KEY")

    def get_patient_info(self) -> str:
        res = ""
        for key in self.profile:
            res += f"{key}: {self.profile[key]}\n"
        return res

    def get_previous_info(self) -> list:
        previous_info = []
        for info in self.previous_info:
            print(info)
            previous_info.extend([
                {"role": "assistant", "content": info['exercise']},
                {"role": "user", "content": info['request']}
            ])
        return previous_info

    def get_patient_info(self) -> str:
        """Returns the patient info."""

    def gen_exercise(self) -> str:
        if self.type_of_exercise == 'image_description':
            prompt = self.gen_image_description_prompt()

            res = self.gen_gpt(prompt, self.client, self.get_previous_info())

            # check if there was an error
            print(res)
            if 'error' in res.keys():
                return res

            content = res['content']

            # the answer is in the format of "Image Title: ---\nImage Description: ---", so retrieve the description
            # split on 'Image Description: ' and take the second part
            title = content.split('Image Title: ')[1].split('\n')[0]
            description = content.split('Image Description: ')[1]

            image = self.gen_dalle(description, self.client)
            print(image)
            if 'error' in image.keys():
                return image

            return {
                'content': {
                    "title": title,
                    "description": image['content']['description'],
                    "image_url": image['content']['image_url']
                }
            }

        elif self.type_of_exercise == 'role_play':
            prompt = self.gen_role_play()

            res = self.gen_gpt(prompt, self.client, self.get_previous_info())

            # the role play is in the format of "NARRATOR: ---\nPATIENT: ---\nARTYQUEST: ---", so retrieve the role play sequence
            # into a list of lists, where each list is a speaker-line pair

            lines = res['content'].split('\n\n')

            role_play_result = [[speaker.strip(), line.strip()] for speaker,
                                line in [line.split(':') for line in lines]]

            return {
                'content': {
                    "role_play": role_play_result
                }
            }
        else:
            raise Exception("Invalid exercise type.")

    def gen_image_description_exercise(self) -> str:
        prompt = self.gen_image_description()

        res = self.gen_gpt(prompt, self.client, None)

        # check if there was an error
        print(res)
        if 'error' in res.keys():
            return res

        content = res['content']
        print(content)
        # get the description from the answer
        # it is between 'DESCRIPTION: ' and 'STORY:'
        description = content.split('DESCRIPTION: ')[1].split('STORY: ')[0]
        story = content.split('STORY: ')[1].split('PHRASES:\n')[0]
        phrases = content.split('PHRASES:\n')[1].split(
            'COMPOUND NOUNS:\n')[0].split('\n')
        compound_nouns = content.split('COMPOUND NOUNS:\n')[1].split('\n')

        image = self.gen_dalle(description, self.client)
        print(image)
        if 'error' in image.keys():
            return image

        return {
            'content': {
                "description": image['content']['description'].strip(),
                "story": story.strip(),
                "image_url": image['content']['image_url'],
                "phrases": [phrase.strip() for phrase in phrases if phrase],
                "compound_nouns": [noun.strip() for noun in compound_nouns if noun],
            }
        }

    @staticmethod
    def gen_gpt(prompt, client=None, previous_info=None) -> str:
        """Returns the exercise for the patient."""
        # Load your API key from an environment variable or secret management service

        messages = [
            {"role": "system", "content": "A bot that generates engaging exercises for speech therapy patients."}]
        messages.append({"role": "user", "content": prompt})

        if previous_info:
            messages.extend(previous_info)

        if not client:
            client = Client()
            client.api_key = os.getenv("OPENAI_API_KEY")

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages
        )

        return_value = None

        if response.choices:
            answer = response.choices[0]
            message = answer.message.content

            if answer.finish_reason == "stop":
                return_value = {
                    "content": message,
                }
            else:

                return_value = {
                    "content": message,
                    "warning": REASON_EXPLANATION[answer.finish_reason]
                }
        else:
            return_value = {
                "error": "There was an error generating the exercise.",
                "response": response
            }

        return return_value

    @staticmethod
    def gen_dalle(prompt, client=None) -> str:

        if not client:
            client = Client()
            client.api_key = os.getenv("OPENAI_API_KEY")

        response = client.images.generate(
            model="dall-e-3",
            prompt=prompt,
            size="1024x1024",
            quality="standard",
            n=1,
        )

        if not response.data:
            return {
                "error": "There was an error generating the image.",
                "response": response
            }

        image_data = response.data[0]

        return {
            'content': {
                "description": image_data.revised_prompt,
                "image_url": image_data.url
            }
        }

    @staticmethod
    def gen_audio(text, client=None):
        """Returns the audio for a given text prompt."""

        if not client:
            client = Client()
            client.api_key = os.getenv("OPENAI_API_KEY")

        response = client.audio.speech.create(
            model="tts-1",
            voice="onyx",
            input=text,
        )

        # Convert the binary response content to a byte stream
        byte_stream = io.BytesIO(response.content)

        data, samplerate = soundfile.read(byte_stream)

        # Convert the byte stream to a .wav file
        soundfile.write("output.wav", data, samplerate, format="wav")

        return {
            "content": {
                "audio": json.dumps(data.tolist()),
                "samplerate": samplerate
            }
        }
