class Influencer:
    def __init__(self, id, fullname, img, email, subscriber_count, follower_count, daily_reach, category, platforms, address, location):
        self.id = id
        self.fullname = fullname
        self.img = img
        self.email = email
        self.subscriber_count = subscriber_count
        self.follower_count = follower_count
        self.daily_reach = daily_reach
        self.category = category
        self.platforms = platforms
        self.address = address
        self.location = location

    def to_dict(self):
        return {
            "id": self.id,
            "fullname": self.fullname,
            "img": self.img,
            "email": self.email,
            "subscriber_count": self.subscriber_count,
            "follower_count": self.follower_count,
            "daily_reach": self.daily_reach,
            "category": self.category,
            "platforms": self.platforms,
            "address": self.address,
            "location": self.location,
        }