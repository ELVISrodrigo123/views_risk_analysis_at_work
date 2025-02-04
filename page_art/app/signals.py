from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from .models import ExcelFile
from .management.commands.import_info import Command

@receiver(post_save, sender=ExcelFile)
def process_excel_file(sender, instance, created, **kwargs):
    if created and instance.is_active:
        # Llama al comando de importación de datos automáticamente
        command = Command()
        command.handle()