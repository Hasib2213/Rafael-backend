from django.apps import AppConfig


class BriefingsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.briefings'

    def ready(self):
        import apps.briefings.signals
        from core.scheduler import start_scheduler
        start_scheduler()
