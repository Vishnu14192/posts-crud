from fastapi import FastAPI

from app.routers.posts import router as posts_router

app = FastAPI()

app.include_router(posts_router)


@app.get("/")
async def root():
    return {"message": "Posts API"}