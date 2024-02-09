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