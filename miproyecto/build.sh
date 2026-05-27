#!/usr/bin/env bash
# Script de build para Render
# Se ejecuta automáticamente en cada deploy

set -o errexit  # Salir si algún comando falla

echo ">>> Instalando dependencias..."
pip install --upgrade pip
pip install -r requirements.txt

echo ">>> Recolectando archivos estáticos..."
python manage.py collectstatic --noinput

echo ">>> Ejecutando migraciones..."
python manage.py migrate

echo ">>> Build completado exitosamente!"
