from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import LoginView
from .views import ProtectedView
from rest_framework.routers import DefaultRouter
from .authentication import views
from .views import ( ExcelFileViewSet, PeligroViewSet, RiesgoViewSet, MedidaControlViewSet, ArtactividadViewSet, ActividadViewSet, AreaViewSet)
from .views import MineraDashboardView 

router = DefaultRouter()
router.register('excelfiles', ExcelFileViewSet)
router.register('artactividades', ArtactividadViewSet)
router.register('actividades', ActividadViewSet)
router.register('areas', AreaViewSet)

urlpatterns = router.urls

router.register('excelfiles', ExcelFileViewSet, basename='excelfiles')
router.register('artactividades', ArtactividadViewSet, basename='artactividades')
router.register('actividades', ActividadViewSet, basename='actividades')
router.register('areas', AreaViewSet, basename='areas')
router.register(r'actividades/(?P<actividad_id>\d+)/peligros', PeligroViewSet, basename='peligros-por-actividad')
router.register(r'actividades/(?P<actividad_id>\d+)/riesgos', RiesgoViewSet, basename='riesgos-por-actividad')
router.register(r'actividades/(?P<actividad_id>\d+)/medidascontrol', MedidaControlViewSet, basename='medidascontrol-por-actividad')

urlpatterns = [
    path('api/', include(router.urls)),
    path('excel-files/', views.ExcelFileListCreateView.as_view(), name='excel-file-list-create'),
    path('excel-files/<int:pk>/', views.ExcelFileDetailView.as_view(), name='excel-file-detail'),
    path('protected/', ProtectedView.as_view(), name='protected_view'),
    path('login/', LoginView.as_view(), name='login'),
    path('minera-dashboard/', MineraDashboardView.as_view(), name='minera_dashboard'),
]