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

    def login(self, email, password):
        for profile in self.profiles.values():
            if profile['email'] == email and profile['password'] == password:
                return profile
        return None

    def get_profile(self, profile_id):
        if profile_id in self.profiles:
            return self.profiles[profile_id]
        return None

    def get_patients(self):
        patients = []
        for profile in self.profiles.values():
            if profile['role'] == 'patient':
                patients.append(profile)
        return patients

    def add_or_update_profile(self, profile):
        status_response = {}
        if '_id' not in profile:
            profile['_id'] = str(uuid.uuid4())
            status_response['status'] = 'Added profile.'
            status_response['profile'] = profile
        else:
            status_response['status'] = 'Updated profile.'

        self.profiles[profile['_id']] = {
            '_id': profile['_id'] or self.profiles[profile['_id']]['_id'],
            'password': profile['password'] or self.profiles[profile['_id']]['password'] or '',
            'name': profile['name'] or self.profiles[profile['_id']]['name'] or '',
            'email': profile['email'] or self.profiles[profile['_id']]['email'] or '',
            'role': profile['role'] or self.profiles[profile['_id']]['role'] or '',
            'condition': profile['condition'] or self.profiles[profile['_id']]['condition'] or '',
            'symptoms': profile['symptoms'] or self.profiles[profile['_id']]['symptoms'] or '',
            'age': profile['age'] or self.profiles[profile['_id']]['age'] or '',
            'errors': profile['errors'] if 'errors' in profile.keys() else self.profiles[profile['_id']]['errors'] if 'errors' in self.profiles[profile['_id']].keys() else [],
            'exercises': profile['exercises'] if 'exercises' in profile.keys() else self.profiles[profile['_id']]['exercises'] if 'exercises' in self.profiles[profile['_id']].keys() else [],
        }

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
