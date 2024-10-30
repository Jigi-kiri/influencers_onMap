influencer_mapping = {
    "mappings": {
        "properties": {
            "id": {
                "type": "integer"
            },
            "fullname": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
            },
            "img": {
                "type": "keyword"
            },
            "email": {
                "type": "keyword"
            },
            "subscriber_count": {
                "type": "integer"
            },
            "follower_count": {
                "type": "integer"
            },
            "daily_reach": {
                "type": "integer"
            },
            "category": {
                "type": "keyword"
            },
            "platforms": {
                "type": "keyword"
            },
            "address": {
                "properties": {
                    "address1": {
                        "type": "text"
                    },
                    "city": {
                        "type": "keyword"
                    },
                    "state": {
                        "type": "keyword"
                    }
                }
            },
            "location": {
                "type": "geo_point"
            }
        }
    }
}