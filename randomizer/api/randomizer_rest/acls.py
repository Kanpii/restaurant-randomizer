import os, json
import requests

YELP_API_KEY = os.environ["YELP_API_KEY"]


def get_yelp(location, term): # response = requests.request('GET', url, headers=headers, params=url_params)
    headers = {"Authorization": 'bearer %s' % YELP_API_KEY}
    params = {
        "term": term,
        "limit": 25,
        "location": location,
        "radius": 10000,
    }
    url = 'https://api.yelp.com/v3/businesses/search'
    response = requests.get(url, params=params, headers=headers)
    return response.json()


