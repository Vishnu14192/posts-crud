# Posts CRUD API

A simple CRUD application built with FastAPI, PostgreSQL, SQLAlchemy, and Alembic.

## Features

- FastAPI backend
- PostgreSQL database
- SQLAlchemy ORM
- Alembic migrations
- Pydantic request/response validation
- CRUD operations for Posts
- Dependency Injection using FastAPI
- Environment-based configuration using `.env`
- Proper HTTP status codes and error handling

---

## Tech Stack

- Python
- FastAPI
- PostgreSQL
- SQLAlchemy
- Alembic
- Pydantic
- Uvicorn

---

## Project Structure

```text
posts-crud/
│
├── app/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── dependencies.py
│   └── routers/
│       └── posts.py
│
├── alembic/
│   ├── versions/
│   └── env.py
│
├── .env.example
├── .gitignore
├── alembic.ini
├── requirements.txt
└── README.md
```

---

## Database Schema

### Posts Table

| Column | Type |
|----------|----------|
| id | Integer (Primary Key) |
| title | String |
| body | Text |
| created_at | DateTime |

---

## API Endpoints

### Create Post

```http
POST /posts
```

Request:

```json
{
  "title": "My First Post",
  "body": "Learning FastAPI"
}
```

Response:

```json
{
  "id": 1,
  "title": "My First Post",
  "body": "Learning FastAPI",
  "created_at": "2026-06-05T10:00:00"
}
```

Status Code:

```http
201 Created
```

---

### Get All Posts

```http
GET /posts
```

---

### Get Post By ID

```http
GET /posts/{id}
```

Status Codes:

```http
200 OK
404 Not Found
```

---

### Update Post

```http
PUT /posts/{id}
```

Request:

```json
{
  "title": "Updated Title",
  "body": "Updated Body"
}
```

---

### Delete Post

```http
DELETE /posts/{id}
```

Status Code:

```http
204 No Content
```

---

## Validation

The API uses Pydantic models for request validation.

Example invalid request:

```json
{
  "title": "Only Title"
}
```

Response:

```http
422 Unprocessable Entity
```

---

## Setup Instructions

### 1. Clone Repository

```bash
git clone <repository-url>
cd posts-crud
```

### 2. Create Virtual Environment

```bash
python -m venv myenv
```

Activate:

Windows:

```bash
myenv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Create a `.env` file:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/posts_db
```

---

### 5. Create PostgreSQL Database

Connect to PostgreSQL and run:

```sql
CREATE DATABASE posts_db;
```

---

### 6. Run Migrations

```bash
alembic upgrade head
```

---

### 7. Start Application

```bash
uvicorn app.main:app --reload
```

Application:

```text
http://127.0.0.1:8000
```

Swagger Docs:

```text
http://127.0.0.1:8000/docs
```

---

## Learning Objectives Covered

- FastAPI routing
- Async endpoints
- Dependency Injection
- Pydantic request/response models
- PostgreSQL integration
- SQLAlchemy ORM
- Alembic migrations
- CRUD operations
- Validation and error handling
- REST API design

---

## Current Status

### Completed

- Backend CRUD API
- PostgreSQL integration
- SQLAlchemy ORM
- Alembic migrations
- Validation and error handling

### Planned

- CORS configuration
- Minimal frontend UI
- API ↔ UI integration
