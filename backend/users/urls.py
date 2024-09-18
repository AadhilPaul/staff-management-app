from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt import views as jwt_views
from .views import getUserDetails, BlacklistTokenUpdateView
from django.urls import path, include
    

urlpatterns = [
    path('user-details/', getUserDetails.as_view(), name='user-details'),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(), name='logout'),
    path('token/jwt/refresh/', jwt_views.TokenRefreshView.as_view(), name="token-refresh"),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
]
