from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from typing import List
from models.inventory import InventoryOut, InventoryIn, InventorySkinOut, InventorySkinIn
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

@router.post("/api/inventory/{inventory_id}/skins", response_model=InventorySkinOut)
def add_skin(
    inventory_skin: InventorySkinIn,
    inventory_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: InventoryQueries = Depends()
):
    return queries.add_skin_to_inventory(inventory_skin, inventory_id, account_data)

@router.get("/api/inventory/{inventory_id}/skins", response_model=List[InventorySkinOut])
def get_all_skins(
    inventory_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: InventoryQueries = Depends()
):
    return queries.get_all_skins_in_inventory(inventory_id, account_data)

@router.delete("/api/inventory/{inventory_id}/skins/{id}", response_model=bool)
def delete_skin(
    inventory_id: int,
    id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: InventoryQueries = Depends()
):
    return queries.remove_skin_from_inventory(inventory_id, id, account_data)