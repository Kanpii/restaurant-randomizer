import random
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
import json, requests
from django.http import JsonResponse
from .acls import get_yelp
from .encoders import RestaurantEncoder
import math
from random import choice

# Create your views here.


@require_http_methods(["GET", "POST"])
def yelp_tester(request):
    locationContent = request.GET["location"]
    termContent = request.GET["term"]
    yelp = get_yelp(locationContent, termContent)
    choice = random.choice(list(yelp["businesses"]))
    return JsonResponse(
        choice,
        safe=False,
    )



