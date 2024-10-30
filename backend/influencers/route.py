import json
from fastapi import APIRouter, HTTPException
from elasticsearch import Elasticsearch, NotFoundError, RequestError

from .model import Influencer
from .mapping import influencer_mapping

router = APIRouter(prefix="", tags=["influencers"])
es = Elasticsearch("http://localhost:9200")


@router.get("/influencers")
async def get_influencers():
    try:
        response = es.search(index="influencers", body={
                             "query": {"match_all": {}}}, size=100)
        influencer = [hit["_source"] for hit in response["hits"]["hits"]]
        return influencer
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/influencer/{name}")
async def get_influencer_by_name(name):
    try:
        response = es.search(index="influencers", body={
            "query": {
                "match": {
                    "fullname": name
                }
            }
        })
        influencers = [hit["_source"] for hit in response["hits"]["hits"]]
        if not influencers:
            raise HTTPException(status_code=404, detail="Influencer not found")
        return influencers
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/upload-influencers")
async def upload_influencers():
    if not es.indices.exists(index="influencers"):
        try:
            es.indices.create(index="influencers", body=influencer_mapping)
        except RequestError as e:
            raise HTTPException(
                status_code=500, detail=f"Error creating index: {str(e)}")
    try:
        with open("fixture/influencers.json") as f:
            influencers_data = json.load(f)
    except FileNotFoundError:
        raise HTTPException(
            status_code=404, detail="Fixture.json file is not found")

    for influencer in influencers_data:
        influcer_obj = Influencer(**influencer)
        influencer_id = influcer_obj.id
        influencer_fullname = influcer_obj.fullname

        is_exist_query = {
            "query": {
                "bool": {
                    "should": [
                        {"term": {"id": influencer_id}},
                        {"term": {"id": influencer_fullname}}
                    ]
                }
            }

        }
        response_exists = es.search(index="influencers", body=is_exist_query)
        if response_exists["hits"]["total"]["value"] > 0:
            continue
        response = es.index(index="influencers",
                            document=influcer_obj.to_dict())
        if not response["result"] == "created":
            raise HTTPException(
                status_code=500, detail="Error inserting data into ElasticSearch")

    return {"status": "Data indexed successfully"}


@router.delete("/delete-index/{index_name}")
async def delete_index(index_name: str):
    try:
        if es.indices.exists(index=index_name):
            es.indices.delete(index=index_name)
            return {"status": "Index deleted successfully", "index": index_name}
        else:
            return {"status": "Index not found", "index": index_name}
    except NotFoundError:
        raise HTTPException(status_code=404, detail="Index not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))