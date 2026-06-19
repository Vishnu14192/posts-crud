import time

from app.services.exceptions import (
    LLMTimeoutError,
    LLMServiceError,
)


MAX_RETRIES = 3


def call_mock_llm(text: str):
    """
    Simulates an LLM call.
    """

    # Simulate timeout
    if "TIMEOUT" in text.upper():
        time.sleep(5)

        raise LLMTimeoutError(
            "LLM request timed out"
        )

    # Simulate API failure
    if "FAIL" in text.upper():
        raise LLMServiceError(
            "LLM service unavailable"
        )

    time.sleep(2)

    words = text.split()

    summary = " ".join(words[:20])

    key_points = [
        "Post was processed by AI",
        f"Contains {len(words)} words",
        "Summary generated successfully"
    ]

    return {
        "summary": summary,
        "key_points": key_points
    }


def generate_summary(text: str):
    """
    Retry wrapper around LLM call.
    """

    for attempt in range(MAX_RETRIES):

        try:

            return call_mock_llm(text)

        except LLMTimeoutError:
            raise

        except Exception:

            if attempt == MAX_RETRIES - 1:
                raise

            wait_time = 2 ** attempt

            time.sleep(wait_time)