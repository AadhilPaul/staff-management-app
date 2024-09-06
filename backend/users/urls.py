from django.urls import path, include
from .views import Authenticated
from django.urls import path, include

urlpatterns = [
    path('', Authenticated.as_view(), name='authenticated'),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
]