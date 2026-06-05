from datetime import datetime

from pydantic import BaseModel, Field


class PostCreate(BaseModel):
    title: str = Field(min_length=1)
    body: str = Field(min_length=1)


class PostResponse(BaseModel):
    id: int
    title: str
    body: str
    created_at: datetime

    class Config:
        from_attributes = True

class PostUpdate(BaseModel):
    title: str = Field(min_length=1)
    body: str = Field(min_length=1)