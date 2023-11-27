import os
import json
import uuid


class ProfileHandler:
    def __init__(self) -> None:
        self.load_profiles()

    def load_profiles(self):
        self.profiles = {}
        # load profiles from the profiles directory
        for filename in os.listdir('profiles'):
            if not filename.endswith('.json'):
                continue
            with open(f'profiles/{filename}', 'r') as f:
                profile = json.load(f)
                self.profiles[profile['_id']] = profile
                print(f"Loaded profile {profile['_id']}.")

    def get_profiles(self):
        return list(self.profiles.values())

    def get_profile(self, profile_id):
        if profile_id in self.profiles:
            return self.profiles[profile_id]
        return None

    def add_or_update_profile(self, profile):
        status_response = {}
        if '_id' not in profile:
            profile['_id'] = str(uuid.uuid4())
            status_response['status'] = 'Added profile.'
            status_response['profile'] = profile
        else:
            status_response['status'] = 'Updated profile.'

        self.profiles[profile['_id']] = profile
        self.save_profile(profile)

        return status_response

    def delete_profile(self, profile_id):
        if profile_id in self.profiles:
            del self.profiles[profile_id]
            os.remove(f'profiles/{profile_id}.json')

    def save_profile(self, profile):
        with open(f'profiles/{profile["_id"]}.json', 'w') as f:
            json.dump(profile, f, indent=4)
