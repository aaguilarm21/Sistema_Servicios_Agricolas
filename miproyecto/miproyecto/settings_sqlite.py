# settings_sqlite.py
# Configuración temporal SOLO para exportar datos de SQLite.
# Este archivo NO debe usarse en producción. Bórralo después de migrar.

from miproyecto.settings import *  # noqa: F401, F403

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'BaseDatos' / 'db.sqlite3',
    }
}
