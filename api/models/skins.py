from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token
from typing import List


class SkinOut(BaseModel):
    id: str
    name: str
    description: str
    weapon: str
    pattern: str
    min_float: float
    max_float: float
    rarity: str
    image: str


class SkinIn(BaseModel):
    id: str
    name: str
    description: str
    weapon: str
    pattern: str
    min_float: float
    max_float: float
    rarity: str
    image: str


class SkinList(BaseModel):
    skin_list: List[str]
