from django.db import models
from django.utils import timezone

def upload_to(instance, filename):
    return f"excel_files/{filename}"

class ExcelFile(models.Model):
    description = models.CharField(max_length=255, blank=True, null=True)
    file = models.FileField(upload_to=upload_to, help_text='Sube el archivo Excel aquí.', verbose_name='Archivo Excel')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.description or "Archivo Excel"
        
class Artactividad(models.Model):
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()

    def __str__(self):
        return self.nombre

# Modelo Actividad, dependiente de Artactividad
class Actividad(models.Model):
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()
    artactividad = models.ForeignKey(Artactividad, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre

# Modelo Peligro, relacionado con Actividad
class Peligro(models.Model):
    descripcion = models.TextField()
    actividad = models.ForeignKey(Actividad, on_delete=models.CASCADE, related_name='peligros')

    def __str__(self):
        return self.descripcion

# Modelo Riesgo, relacionado con Actividad
class Riesgo(models.Model):
    descripcion = models.TextField()
    actividad = models.ForeignKey(Actividad, on_delete=models.CASCADE, related_name='riesgos')

    def __str__(self):
        return self.descripcion

# Modelo MedidaControl, relacionado con Actividad
class MedidaControl(models.Model):
    descripcion = models.TextField()
    actividad = models.ForeignKey(Actividad, on_delete=models.CASCADE, related_name='medidascontrol')

    def __str__(self):
        return self.descripcion
    
class Area(models.Model):
    OPCIONES_ACTIVIDAD = [
        ('210', '210-CHANCADO'),
        ('220', '220-DOMO'),
        ('230', '230-MOLIENDA'),
        ('240', '240-FLOTACION PLOMO'),
        ('250', '250-FLOTACION ZINC'),
        ('270', '270-REACTIVOS'),
        ('310', '310-ESPESADORES'),
        ('320', '320-FILTROS'),
        ('330', '330-CARGUIO'),
    ]
    
    # Relación con Artactividad
    artactividad = models.ForeignKey(
        Artactividad,
        on_delete=models.CASCADE,
        verbose_name='Area Principal',
        related_name='Area'
    )
    
    # Campo para seleccionar la opción
    opcion = models.CharField(
        max_length=3,  # Longitud de los códigos: '210', '220', etc.  
        choices=OPCIONES_ACTIVIDAD,
        verbose_name='Opción de Area',
        help_text='Selecciona una opción de Area predefinida.'
    )

    def __str__(self):
        return f'{self.artactividad.nombre} - {self.get_opcion_display()}'

    class Meta:
        verbose_name = 'Area'
        verbose_name_plural = 'Areas'
        constraints = [
            models.UniqueConstraint(
                fields=['artactividad', 'opcion'],
                name='unique_artactividad_opcion'
            )
        ]

from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):

    pass