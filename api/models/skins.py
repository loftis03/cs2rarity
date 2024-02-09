from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token


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