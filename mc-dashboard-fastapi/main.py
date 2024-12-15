from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
import base64
import json
from model import Player

app = FastAPI()

origins = ['https://localhost:300']

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Ping":"Pong"}


@app.get("/retrieve-player/{uuid}")
async def get_user_names(uuid: str):
    uuid_clean = uuid.replace("-", "")
    user_response = requests.get(f"https://sessionserver.mojang.com/session/minecraft/profile/{uuid_clean}").json()
    skin_response = requests.get(f"https://mc-heads.net/avatar/{uuid}")
    base64_decoded = base64.b64decode(user_response['properties'][0]['value'])
    try:
        json_data = json.loads(base64_decoded.decode('utf-8'))
        username = json_data.get('profileName', 'Unknown')
        return {
            'username': username,
            'avatar': skin_response
        }
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")