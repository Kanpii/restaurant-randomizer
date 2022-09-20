from django.shortcuts import render
from django.views.decorators.http import require_http_methods
import json, requests
from django.http import JsonResponse
from .acls import get_yelp
from .encoders import RestaurantEncoder


# Create your views here.


@require_http_methods(["GET"])
def yelp_tester(request):
    content = json.loads(request.body)
    print(content, "from yelptester")
    yelp = get_yelp(content["term"], content["location"])
    print(yelp.keys())

    return JsonResponse(
        yelp
    )