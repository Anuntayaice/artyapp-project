import json

TYPES_OF_EXERCISE = [
    'image_description',
    'role_play',
]


class Exercise:

    def __init__(self, type_of_exercise, profile) -> None:
        if type_of_exercise and type_of_exercise not in TYPES_OF_EXERCISE:
            raise Exception(f"Invalid exercise type: {type_of_exercise}.")

        self.type_of_exercise = type_of_exercise
        self.profile = profile
        self.interests = ["soccer", "running", "art", "music", "school"]

    def gen_image_description(self) -> str:
        """Returns the image description prompt."""
        prompt = f"""Generate the description of an image suited for a very creative story for a speech therapy patient to describe, with various objects and/or characters to describe.
The patient will have to repeat aloud at least 10 phrases. The first 6 phrases should be a statement about the image. The next 4 should be compound nouns that emphasize the patient's difficulties, and reflect the image description. 

The phrases should tackle: {' and '.join(self.profile.difficulties) if self.profile else "difficulty pronouncing r"}. 
Do not mention the patient's difficulties in any of the phrases nor in the story. The language of the story should be simple and easy to understand. The story should be one paragraph long, and not focus on describing the image, but rather on telling a story that includes the image.


Output the detailed description and story containing all necessary info for the phrases; output those same phrases as well. Strictly follow this template:

DESCRIPTION: --
STORY: --
PHRASES:
phrase_1...
phrase_2...
phrase_3...
phrase_4...
phrase_5...
phrase_6...
COMPOUND NOUNS:
compound_noun_1
compound_noun_2
compound_noun_3
compound_noun_4"""

        return prompt

    def gen_image_description_prompt(self) -> str:
        """Returns the image description prompt."""
        prompt = f"""Generate a description of an image with a simple setup for a speech therapy patient to describe. Be very specific and keep the description short. Stick to this response format, without any other text:
        
        Image Title: ---
        Image Description: ---
        
        Be creative and fit the description to one or more of the patient's interests (randomly selected), which include: {', '.join(self.interests)}.
        """

        return prompt

    def gen_role_play(self) -> str:
        """Returns the role play prompt."""
        prompt = f"""Generate a role play scenario for a speech therapy patient to practice with a bot named ARTYQUEST. Be creative and fit the description to one or more of the patient's interests (randomly selected), which include: {', '.join(self.interests)}. Stick to the following format, where the NARRATOR field is optional according to the story, may be replaced with another name, and they don't acknowledge that it is a therapy session, they only serve to narrate the story:
        
        NARRATOR: ---
        PATIENT: ---
        ARTYQUEST: ---
        (repeat)
        """

        return prompt
