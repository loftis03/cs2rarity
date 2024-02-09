import requests
import os


class SkinQueries:
    def get_all_skins(self):
        try:
            url = (
                "https://bymykel.github.io/CSGO-API/api/en/skins.json"
            )
            response = requests.get(url)
            response.raise_for_status()
            print(response.json())
            skins = response.json()
            return skins

        except requests.exceptions.RequestException as e:
            print(f"Error retrieving skins list: {e}")

        # return None
    def get_skin_id(self, skin_id: str):
        print(skin_id, "THIS IS SKIN ID")
        url = (
                "https://bymykel.github.io/CSGO-API/api/en/skins.json"
            )
        response = requests.get(url)
        skin_list = response.json()
        for dict in skin_list:
            if dict['id'] == skin_id:
                print(dict, "THIS IS DICT")
                return dict
