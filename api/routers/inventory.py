from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from typing import List
from models.inventory import InventoryOut, InventoryIn
from authenticator import authenticator
from queries.inventory import InventoryQueries


router = APIRouter()

@router.get("/api/inventory", response_model=List[InventoryOut])
def get_by_user(
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: InventoryQueries = Depends(),
):
    if account_data is None:
        raise HTTPException(status_code=401, detail="Not logged in :( ")
    return queries.get_by_user(account_id=account_data["id"])

@router.post("/api/inventory", response_model=InventoryOut)
def create_inventory(
    inventory: InventoryIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: InventoryQueries = Depends(),
):
    if account_data is None:
        raise HTTPException(status_code=401, detail="NOT logged in :( ")
    return queries.create_inventory(inventory=inventory, account_id=account_data["id"])
