from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import ( ExcelFileViewSet,ArtactividadViewSet, ActividadViewSet, PeligroViewSet, RiesgoViewSet, MedidaControlViewSet)

router = DefaultRouter()
router.register(r'excel-files', ExcelFileViewSet, basename='excel-file')
router.register(r'artactividad', ArtactividadViewSet, basename='artactividad')
router.register(r'actividades', ActividadViewSet, basename='actividad')

router.register(r'actividades/(?P<actividad_id>\d+)/peligros', PeligroViewSet, basename='peligros-por-actividad')
router.register(r'actividades/(?P<actividad_id>\d+)/riesgos', RiesgoViewSet, basename='riesgos-por-actividad')
router.register(r'actividades/(?P<actividad_id>\d+)/medidascontrol', MedidaControlViewSet, basename='medidascontrol-por-actividad')

urlpatterns = [
    path('', include(router.urls)),
    path('excel-files/<int:pk>/delete/', ExcelFileViewSet.as_view({'delete': 'delete_file'}), name='delete-excel-file'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Obtener token
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('login/', TokenObtainPairView.as_view(), name='token_login'),  # Refrescar token
]

