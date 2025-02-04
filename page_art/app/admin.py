from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser
from django import forms
from app.models import ( ExcelFile, Actividad, Peligro, Riesgo, MedidaControl, Artactividad, Area )

class ExcelFileForm(forms.ModelForm):
    class Meta:
        model = ExcelFile
        fields = ['description', 'file', 'is_active']

    def clean_file(self):
        file = self.cleaned_data.get('file')
        if file:
            pass
        return file

class ExcelFileAdmin(admin.ModelAdmin):
    form = ExcelFileForm 
    list_display = ('description', 'file', 'is_active', 'created_at')
    search_fields = ('description',) 
    list_filter = ('is_active',)

admin.site.register(ExcelFile, ExcelFileAdmin)
admin.site.register(Actividad)
admin.site.register(Peligro)
admin.site.register(Riesgo)
admin.site.register(MedidaControl)
admin.site.register(Artactividad)
admin.site.register(Area)
admin.site.register(CustomUser, UserAdmin)