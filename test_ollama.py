# test_ollama.py

import requests

response = requests.post(
    "http://localhost:11434/api/generate",
    json={
        "model": "phi3",
        "prompt": "Say Hello",
        "stream": False
    }
)

print(response.json()["response"])