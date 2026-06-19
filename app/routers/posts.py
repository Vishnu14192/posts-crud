from fastapi import APIRouter
from fastapi import Depends
from fastapi import status
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.models import Post
from app.schemas import PostCreate
from app.schemas import PostResponse
from app.schemas import PostUpdate
from app.dependencies import get_db

from app.services.llm_service import generate_summary
from app.schemas import SummaryResponse

router = APIRouter(prefix="/posts", tags=["Posts"])


@router.post(
    "",
    response_model=PostResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_post(
    post: PostCreate,
    db: Session = Depends(get_db)
):
    new_post = Post(
        title=post.title,
        body=post.body
    )

    db.add(new_post)

    db.commit()

    db.refresh(new_post)

    return new_post


@router.get(
    "",
    response_model=list[PostResponse]
)
async def get_posts(
    db: Session = Depends(get_db)
):
    posts = db.query(Post).all()

    return posts

@router.get(
    "/{post_id}",
    response_model=PostResponse
)
async def get_post(
    post_id: int,
    db: Session = Depends(get_db)
):
    post = db.query(Post).filter(
        Post.id == post_id
    ).first()

    if not post:
        raise HTTPException(
            status_code=404,
            detail="Post not found"
        )

    return post


@router.put(
    "/{post_id}",
    response_model=PostResponse
)
async def update_post(
    post_id: int,
    post_data: PostUpdate,
    db: Session = Depends(get_db)
):
    post = db.query(Post).filter(
        Post.id == post_id
    ).first()

    if not post:
        raise HTTPException(
            status_code=404,
            detail="Post not found"
        )

    post.title = post_data.title
    post.body = post_data.body

    db.commit()

    db.refresh(post)

    return post

@router.delete(
    "/{post_id}",
    status_code=204
)
async def delete_post(
    post_id: int,
    db: Session = Depends(get_db)
):
    post = db.query(Post).filter(
        Post.id == post_id
    ).first()

    if not post:
        raise HTTPException(
            status_code=404,
            detail="Post not found"
        )

    db.delete(post)

    db.commit()

from app.services.exceptions import (
    LLMTimeoutError,
    LLMServiceError,
)

@router.post(
    "/{post_id}/summarize",
    response_model=SummaryResponse
)
async def summarize_post(
    post_id: int,
    db: Session = Depends(get_db)
):
    post = db.query(Post).filter(
        Post.id == post_id
    ).first()

    if not post:
        raise HTTPException(
            status_code=404,
            detail="Post not found"
        )

    try:

        result = generate_summary(
            post.body
        )

    except LLMTimeoutError:

        raise HTTPException(
            status_code=504,
            detail="LLM request timed out"
        )

    except LLMServiceError:

        raise HTTPException(
            status_code=503,
            detail="LLM service unavailable"
        )

    except Exception:

        raise HTTPException(
            status_code=500,
            detail="Unable to generate summary"
        )

    post.summary = result["summary"]
    post.key_points = result["key_points"]

    db.commit()

    db.refresh(post)

    return result