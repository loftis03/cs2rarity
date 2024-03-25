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
            skins = response.json()
            return skins

        except requests.exceptions.RequestException as e:
            print(f"Error retrieving skins list: {e}")

        # return None
    def get_skin_id(self, skin_id: str):
        url = (
                "https://bymykel.github.io/CSGO-API/api/en/skins.json"
            )
        response = requests.get(url)
        skin_list = response.json()
        for dict in skin_list:
            if dict['id'] == skin_id:
                return dict

    def get_all_skin_names(self):
        try:
            url = ("https://bymykel.github.io/CSGO-API/api/en/skins.json")
            response = requests.get(url)
            response.raise_for_status()
            skins = response.json()
            empty_list = []
            empty_dict = {}
            for dict in skins:
                empty_dict["id"] = dict["id"]
                empty_dict["name"] = dict["name"]
                if "image" in dict:
                    empty_dict["image"] = dict["image"]
                empty_list.append(empty_dict)
                empty_dict = {}
            return empty_list

        except requests.exceptions.RequestException as e:
            print(f"Error retrieving skins list: {e}")

    def get_filtered_skins(self, skin_list: list[str]):
        try:
            url = ("https://bymykel.github.io/CSGO-API/api/en/skins.json")
            response = requests.get(url)
            response.raise_for_status()
            skins = response.json()
            empty_list = []
            for skin in skin_list:
                for dict in skins:
                    dict_id = dict['id']
                    if str(dict_id) == skin:
                        empty_list.append(dict)
                        print("THIS IS DICT LMAOOOOO", str(dict_id))
            # print(empty_list)
            return empty_list

        except requests.exceptions.RequestException as e:
            print(f"Error retrieving skins list: {e}")
