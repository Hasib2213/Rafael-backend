import os
import sys
import time
import threading

_scheduler_started = False
_scheduler_lock = threading.Lock()


def _auto_sync_loop(interval_seconds):
    """Background periodic loop to sync channel videos."""
    # Initial startup delay (45 seconds) so Django server boots cleanly
    print(f"[AutoSyncScheduler] Worker initialized. Interval: {interval_seconds // 3600}h (initial run in 45s)...")
    time.sleep(45)

    while True:
        try:
            print("[AutoSyncScheduler] Running periodic channel briefing sync...")
            from core.briefing_pipeline import sync_all_creators_briefings
            sync_all_creators_briefings(max_videos_per_creator=1)
        except Exception as e:
            print(f"[AutoSyncScheduler] Periodic sync encountered an error: {e}")

        time.sleep(interval_seconds)


def start_scheduler():
    """Starts the background channel sync daemon thread."""
    global _scheduler_started

    with _scheduler_lock:
        if _scheduler_started:
            return

        # Avoid running during management commands like migrate, test, seed_data, sync_channel_briefings
        skip_cmds = {'migrate', 'makemigrations', 'test', 'shell', 'createsuperuser', 'seed_data', 'sync_channel_briefings', 'check'}
        if any(arg in skip_cmds for arg in sys.argv):
            return

        # Under Django dev server ('runserver'), avoid double initialization in reloader process
        if 'runserver' in sys.argv and os.environ.get('RUN_MAIN') != 'true':
            return

        # Check if enabled in environment (default: enabled)
        enabled = os.environ.get('ENABLE_AUTO_SYNC', 'true').lower() in ('1', 'true', 'yes')
        if not enabled:
            print("[AutoSyncScheduler] Automated sync is disabled via ENABLE_AUTO_SYNC.")
            return

        # Sync interval in hours (default 6 hours)
        try:
            interval_hours = float(os.environ.get('SYNC_INTERVAL_HOURS', 6))
        except (ValueError, TypeError):
            interval_hours = 6.0

        interval_seconds = max(600, int(interval_hours * 3600))  # Minimum 10 minutes

        thread = threading.Thread(
            target=_auto_sync_loop,
            args=(interval_seconds,),
            name="CurioChannelSyncDaemon",
            daemon=True
        )
        thread.start()
        _scheduler_started = True
        print(f"[AutoSyncScheduler] Successfully started automated video sync daemon (interval: {interval_hours}h).")
