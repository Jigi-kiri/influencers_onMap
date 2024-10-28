from pydantic import BaseModel
from typing import List

class AddressBase(BaseModel):
	address1: str
	city:str
	state:str

class LocationBase(BaseModel):
	lat:float
	lng:float

class InfluencerBase(BaseModel):
	id: int
	fullname: str
	img: str
	email: str
	subscriber_count: int
	follower_count: int
	daily_reach: int
	category: str
	platforms: List[str]
	address: AddressBase
	location:LocationBase