from rest_framework import viewsets, serializers, status
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import render
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ModelViewSet
from .models import (  ExcelFile, Area, Artactividad, Actividad, Peligro, Riesgo, MedidaControl)
from .serializers import ( ExcelFileSerializer, ArtactividadSerializer, ActividadSerializer, AreaSerializer 
                        , PeligroSerializer, RiesgoSerializer, MedidaControlSerializer, ActividadSerializer, PeligroSerializer,
                        RiesgoSerializer, MedidaControlSerializer)
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
class ExcelFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExcelFile
        fields = ['id', 'file', 'description', 'is_active']
class ExcelFileViewSet(viewsets.ModelViewSet):
    queryset = ExcelFile.objects.all()
    serializer_class = ExcelFileSerializer

    @action(detail=True, methods=['delete'])
    def delete_file(self, request, pk=None):
        """
        Elimina un archivo Excel y sus datos relacionados.
        """
        excel_file = get_object_or_404(ExcelFile, pk=pk)
        excel_file.delete()
        return Response({'message': 'Archivo eliminado correctamente'}, status=status.HTTP_200_OK)

class ExcelFileListCreateView(generics.ListCreateAPIView):
    queryset = ExcelFile.objects.all()
    serializer_class = ExcelFileSerializer

class ExcelFileDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ExcelFile.objects.all()
    serializer_class = ExcelFileSerializer

class AreaViewSet(viewsets.ModelViewSet):
    queryset = Area.objects.all()
    serializer_class = AreaSerializer

class ArtactividadViewSet(viewsets.ModelViewSet):
    queryset = Artactividad.objects.all()
    serializer_class = ArtactividadSerializer

class ActividadViewSet(viewsets.ModelViewSet):
    queryset = Actividad.objects.all()
    serializer_class = ActividadSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        artactividad_id = self.request.query_params.get('artactividad')
        if artactividad_id:
            queryset = queryset.filter(artactividad_id=artactividad_id)
        return queryset

    class ArtactividadViewSet(viewsets.ReadOnlyModelViewSet):
        queryset = Artactividad.objects.all()
        serializer_class = ArtactividadSerializer

    class ActividadViewSet(viewsets.ReadOnlyModelViewSet):
        queryset = Actividad.objects.all()
        serializer_class = ActividadSerializer


class PeligroViewSet(ModelViewSet):
    queryset = Peligro.objects.all()
    serializer_class = PeligroSerializer

class RiesgoViewSet(ModelViewSet):
    queryset = Riesgo.objects.all()
    serializer_class = RiesgoSerializer

class MedidaControlViewSet(ModelViewSet):
    queryset = MedidaControl.objects.all()
    serializer_class = MedidaControlSerializer

def home(request):
    return render(request, 'home.html')

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "Esta vista está protegida."})
    

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)
        
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

class MineraDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.has_perm('app.can_access_minera_dashboard'):
            return Response({"message": "Bienvenido al dashboard de Minería."})
        else:
            return Response({"error": "No tienes permiso para acceder a esta vista."}, status=403)