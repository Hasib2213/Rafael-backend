from django.db.models.signals import post_save
from django.dispatch import receiver
from apps.briefings.models import Briefing
from apps.accounts.models import Notification
from apps.creators.models import CreatorFollow


@receiver(post_save, sender=Briefing)
def create_briefing_notifications(sender, instance, created, **kwargs):
    if not created:
        return

    try:
        creator_name = instance.creator.name if instance.creator else "Creator"
        avatar = (
            (instance.creator.avatar_url if instance.creator else None)
            or instance.thumbnail_url
            or "/images/summary.png"
        )
        target_link = f"/feed?briefing={instance.id}"

        notifications_to_create = []

        # 1. Notify users following this creator
        if instance.creator:
            followers = CreatorFollow.objects.filter(creator=instance.creator).select_related("user")
            for follow in followers:
                notifications_to_create.append(
                    Notification(
                        user=follow.user,
                        title=f"New Briefing: {creator_name}",
                        body=f"'{instance.title}' has been synthesized and is ready to listen.",
                        avatar_url=avatar,
                        link=target_link,
                        is_read=False,
                    )
                )

        # 2. Add broadcast notification for all users
        notifications_to_create.append(
            Notification(
                user=None,
                title=f"New Briefing: {creator_name}",
                body=f"'{instance.title}' is now live on your feed.",
                avatar_url=avatar,
                link=target_link,
                is_read=False,
            )
        )

        Notification.objects.bulk_create(notifications_to_create)
        print(f"[Signals] Created {len(notifications_to_create)} notifications for briefing: {instance.title}")
    except Exception as e:
        print(f"[Signals] Error generating notifications for briefing {instance.id}: {e}")
