from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
import base64
import json
from model import Player
from datetime import datetime

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
    base64_decoded = base64.b64decode(user_response['properties'][0]['value'])
    try:
        json_data = json.loads(base64_decoded.decode('utf-8'))

        timestamp_seconds = (json_data.get('timestamp', 'Unknown')) / 1000
        formatted_timestamp = datetime.utcfromtimestamp(timestamp_seconds).strftime('%Y-%m-%d %H:%M:%S')

        username = json_data.get('profileName', 'Unknown')
        skin = json_data.get('textures', {}).get('SKIN', {}).get('url', 'Unknown')
        return {
            'timestamp': formatted_timestamp,
            'username': username,
            'skin': skin
        }
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")