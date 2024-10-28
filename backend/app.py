from fastapi import FastAPI, HTTPException
from elasticsearch import Elasticsearch
from types import List, Dict
import json

app = FastAPI()
es = Elasticsearch("http://localhost:9200")


class Influencer:
	def __init__(self, fullname,img, email, subscriber_count, follower_count,daily_reach, category,platforms,address,location):
		self.fullname=fullname
		self.img = img
		self.email = email
		self.subscriber_count=subscriber_count
		self.follower_count=follower_count
		self.daily_reach=daily_reach
		self.category=category
		self.platforms=platforms
		self.address=address
		self.location=location

	def to_dict(self):
		return {
			"fullname":self.fullname,
			"img":self.img,
			"email":self.email,
			"subscriber_count":self.subscriber_count,
			"follower_count":self.follower_count,
			"daily_reach":self.daily_reach,
			"category":self.category,
			"platforms":self.platforms,
			"address":self.address,
			"location":self.location,
		}
	

@app.on_event("startup")
async def startup_even():
	if not es.ping():
		raise HTTPException(status_code=500, detail="ElasticSearch server is not available")


@app.post("/upload-influencers/")
async def upload_influencers():
	try:
		with open("fixture/influencers.json") as f:
			influencers_data = json.load(f)
	except FileNotFoundError:
		raise HTTPException(status_code=404, detail="Fixture.json file is not found")
	
	for influencer in influencers_data:
		influcer_obj = Influencer(**influencer)
		response = es.index("influencers", document=influcer_obj.to_dict())
		if not response["result"] == "created":
			raise HTTPException(status_code=500, detail="Error inserting data into ElasticSearch")
		
	return {"status":"Data indexed successfully"}


@app.get("/influencers")
async def get_influencers():
	try:
		response = es.search(index="influencers", body={"query":{"match_all":{}}})
		influencer = [hit["_source"] for hit in response["hits"]["hits"]]
		return influencer
	except Exception as e:
		raise HTTPException(status_code=500, detail=str(e))

