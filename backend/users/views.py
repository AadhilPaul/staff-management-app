from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

class Authenticated(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        data = {
            'message': 'Hello World, you are authenticated',
            'user': request.user.username
        }
        return Response(data)
