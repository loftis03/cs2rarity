from fastapi import APIRouter, Depends, Query
from queries.skins import SkinQueries
from models.skins import SkinList
from typing import Optional, List

router = APIRouter()


@router.get("/api/skins")
async def get_all_skins(queries: SkinQueries = Depends()):
    return queries.get_all_skins()


@router.get("/api/skins/{skin_id}", response_model=dict)
def get_skin_id(skin_id: str, queries: SkinQueries = Depends()):
    potatoe = queries.get_skin_id(skin_id)
    return potatoe


@router.get("/api/names")
async def get_all_names(queries: SkinQueries = Depends()):
    return queries.get_all_skin_names()


@router.post("/api/filtered")
async def get_filtered_names(skin_data: SkinList, queries: SkinQueries = Depends()):
    skin_list = skin_data.skin_list
    potato = queries.get_filtered_skins(skin_list)
    return potato
