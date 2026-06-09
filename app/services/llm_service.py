# app/services/llm_service.py

import time


def generate_summary(text: str):
    """
    Mock LLM implementation.
    Later we'll replace this with Claude/Bedrock.
    """

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