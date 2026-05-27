from django.contrib import admin
from .models import UserProfile, Proveedor, Empleado


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('usuario', 'codigo', 'puesto', 'created_at')
    search_fields = ('codigo', 'usuario__username')
    ordering = ('-created_at',)


@admin.register(Proveedor)
class ProveedorAdmin(admin.ModelAdmin):
    list_display = ('codigo', 'razon_social', 'nit', 'regimen_tributario')
    search_fields = ('codigo', 'razon_social', 'nit')
    list_filter = ('regimen_tributario', 'created_at')
    ordering = ('-created_at',)


@admin.register(Empleado)
class EmpleadoAdmin(admin.ModelAdmin):
    list_display = ('empleado', 'empresa', 'nombre_puesto', 'no_cui')
    search_fields = ('empleado', 'empresa', 'no_cui')
    list_filter = ('empresa', 'created_at')
    ordering = ('-created_at',)
