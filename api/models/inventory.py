from pydantic import BaseModel


class InventoryIn(BaseModel):
    name: str = "Inventory"


class InventoryOut(BaseModel):
    account_id: int
    name: str
    id: int


class InventorySkinIn(BaseModel):
    skin_id: str
    inventory_id: int


class InventorySkinOut(BaseModel):
    id: int
    skin_id: str
    inventory_id: int
