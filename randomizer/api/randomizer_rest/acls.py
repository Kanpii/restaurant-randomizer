import os, json
import requests

YELP_API_KEY = os.environ["YELP_API_KEY"]


# def get_photo(city, state):
#     headers = {"Authorization": PEXELS_API_KEY}
#     params = {
#         "per_page": 1,
#         "query": f"downtown {city} {state}",
#     }
#     url = "https://api.pexels.com/v1/search"
#     response = requests.get(url, params=params, headers=headers)
#     content = json.loads(response.content)
#     try:
#         return {"picture_url": content["photos"][0]["src"]["original"]}
#     except (KeyError, IndexError):
#         return {"picture_url": None}


def get_yelp(food, location): # response = requests.request('GET', url, headers=headers, params=url_params)
    headers = {"Authorization": 'bearer %s' % YELP_API_KEY}
    params = {
        "term": food,
        "limit": 1,
        "location": location,
        "radius": 10000,
    }
    url = 'https://api.yelp.com/v3/businesses/search'
    response = requests.get(url, params=params, headers=headers)
    return response.json()

    # print(data, "from acls")

