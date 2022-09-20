from common.json import ModelEncoder
from .models import Restaurant

class RestaurantEncoder(ModelEncoder):
    model = Restaurant
    properties = ["name", "location"]


