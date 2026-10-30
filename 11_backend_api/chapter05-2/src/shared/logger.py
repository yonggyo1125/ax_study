import os
import logging
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(
    level=logging.DEBUG if os.environ.get("LOGGING_MODE") == 'debug' else logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s %(filename)s - %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)

logger = logging.getLogger(os.environ.get("LOGGER_NAME", "app"))
