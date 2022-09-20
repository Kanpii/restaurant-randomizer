from django.urls import path

from .views import yelp_tester

urlpatterns = [
    path("test/", yelp_tester, name = "test")
    ]