# app/services/llm_service.py

import json
import time

import requests

from app.services.exceptions import (
    LLMTimeoutError,
    LLMServiceError,
)

OLLAMA_URL = (
    "http://localhost:11434/api/generate"
)

MODEL_NAME = "phi3"

MAX_RETRIES = 5


def call_local_llm(text: str):
    """
    Makes a single call to Ollama.
    """

    prompt = f"""
Summarize the following post.

Return ONLY valid JSON.

Format:

{{
    "summary": "short summary",
    "key_points": [
        "point 1",
        "point 2",
        "point 3"
    ]
}}

Post:
{text}
"""

    try:

        response = requests.post(
            OLLAMA_URL,
            json={
                "model": MODEL_NAME,
                "prompt": prompt,
                "stream": False,
            },
            timeout=30,
        )

        response.raise_for_status()
        result = response.json()
        # print(result["response"])

        llm_output = result["response"]

        llm_output = llm_output.replace(
            "```json",
            ""
        )

        llm_output = llm_output.replace(
            "```",
            ""
        )

        llm_output = llm_output.strip()

        return json.loads(llm_output)


    except requests.Timeout:

        raise LLMTimeoutError(
            "LLM request timed out"
        )

    except requests.RequestException:
        print(f"LLM request failed: {response.text}")
        raise LLMServiceError(
            "LLM service unavailable"
        )

    except json.JSONDecodeError:
        print(f"Invalid JSON from LLM: {response.text}")
        raise LLMServiceError(
            "Invalid JSON returned by LLM"
        )


def generate_summary(text: str):
    """
    Retry wrapper with exponential backoff.
    """

    for attempt in range(MAX_RETRIES):

        try:

            return call_local_llm(text)

        except LLMTimeoutError:
            raise

        except LLMServiceError:

            if attempt == MAX_RETRIES - 1:
                raise

            wait_time = 2 ** attempt

            time.sleep(wait_time)