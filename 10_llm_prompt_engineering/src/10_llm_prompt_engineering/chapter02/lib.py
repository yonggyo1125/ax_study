import os
from dotenv import load_dotenv
from langchain.chat_models import init_chat_model

load_dotenv()

config = {
    "model_provider": os.getenv("MODEL_PROVIDER"),
    "model": os.getenv("MODEL_NAME")
}

api_key = os.getenv("OPENAI_API_KEY")
if api_key:
    config['api_key'] = api_key


def get_model(temperature = 0):
    config['temperature'] = temperature

    return init_chat_model(**config)


model = get_model()
