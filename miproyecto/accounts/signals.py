from django.apps import apps
from django.contrib.auth.models import Group
from django.db.models.signals import post_migrate
from django.dispatch import receiver


@receiver(post_migrate)
def ensure_default_groups(sender, **kwargs):
    """Create default groups after migrations run.

    This avoids querying the database at import time.
    """
    if sender.name != apps.get_app_config('accounts').name:
        return

    Group.objects.get_or_create(name='Admin')
    Group.objects.get_or_create(name='Usuario')
