from pydantic import BaseModel
from datetime import datetime

class Player(BaseModel):
    uuid: str
    username: str
    joined_date: datetime
    last_active: datetime
    health: int
    hunger: int
    levels: int
    death_count: int
