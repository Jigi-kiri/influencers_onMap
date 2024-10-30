from fastapi import FastAPI, HTTPException
from elasticsearch import Elasticsearch
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging
from influencers.route import router

logger = logging.getLogger("uvicorn.error")


app = FastAPI()
es = Elasticsearch("http://localhost:9200")

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        if not es.ping():
            logger.error(
                "Failed to connect to Elasticsearch at http://localhost:9200")
            raise RuntimeError("Elasticsearch server is not available")
    except Exception as e:
        logger.error(f"Connection error: {e}")
        raise RuntimeError("Error connecting to Elasticsearch")
    yield

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
