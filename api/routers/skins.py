from fastapi import APIRouter, Depends
from queries.skins import SkinQueries
from typing import Optional

router = APIRouter()


@router.get("/api/skins")
async def get_all_skins(queries: SkinQueries = Depends()):
    return queries.get_all_skins()


@router.get("/api/skins/{skin_id}", response_model=dict)
def get_skin_id(skin_id: str, queries: SkinQueries = Depends()):
    potatoe = queries.get_skin_id(skin_id)
    print(potatoe, "THIS IS POTATOE")
    return potatoe