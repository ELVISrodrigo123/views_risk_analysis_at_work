from rest_framework import serializers
from .models import (
    ExcelFile, Artactividad, Actividad, Peligro, Riesgo, MedidaControl, Area )

class ExcelFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExcelFile
        fields = '__all__'

class ActividadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actividad
        fields = '__all__'

class ArtactividadSerializer(serializers.ModelSerializer):
    actividades = ActividadSerializer(many=True, read_only=True)

    class Meta:
        model = Artactividad
        fields = '__all__'

class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = '__all__'

class ArtactividadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artactividad
        fields = ['id', 'nombre', 'descripcion']

# Serializador para Actividad
class ActividadSerializer(serializers.ModelSerializer):
    artactividad = ArtactividadSerializer(read_only=True)
    class Meta:
        model = Actividad
        fields = ['id', 'nombre', 'descripcion', 'artactividad']

# Serializador para Peligro
class PeligroSerializer(serializers.ModelSerializer):
    actividad = ActividadSerializer(read_only=True)
    class Meta:
        model = Peligro
        fields = ['id', 'descripcion', 'actividad']

# Serializador para Riesgo
class RiesgoSerializer(serializers.ModelSerializer):
    actividad = ActividadSerializer(read_only=True)
    class Meta:
        model = Riesgo
        fields = ['id', 'descripcion', 'actividad']

# Serializador para MedidaControl
class MedidaControlSerializer(serializers.ModelSerializer):
    actividad = ActividadSerializer(read_only=True)
    class Meta:
        model = MedidaControl
        fields = ['id', 'descripcion', 'actividad']
