from django.core.management.base import BaseCommand
from core.briefing_pipeline import sync_all_creators_briefings


class Command(BaseCommand):
    help = "Checks all followed YouTube creators for new videos and generates AI audio briefings automatically."

    def add_arguments(self, parser):
        parser.add_argument(
            '--max-videos',
            type=int,
            default=1,
            help='Maximum number of new videos to process per creator (default: 1).'
        )

    def handle(self, *args, **options):
        max_videos = options['max_videos']
        self.stdout.write(self.style.NOTICE(f"Starting channel sync (max {max_videos} video(s) per creator)..."))

        try:
            briefings = sync_all_creators_briefings(max_videos_per_creator=max_videos)
            self.stdout.write(self.style.SUCCESS(f"Successfully finished sync! Created {len(briefings)} new briefing(s)."))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Sync failed with error: {e}"))
