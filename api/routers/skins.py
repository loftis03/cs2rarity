from fastapi import APIRouter, Depends
from queries.skins import SkinQueries
from typing import Optional

router = APIRouter()


@router.get("/api/skins")
async def get_all_skins(queries: SkinQueries = Depends()):
    return queries.get_all_skins()