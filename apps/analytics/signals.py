import logging
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.core.cache import cache
from django.contrib.auth import get_user_model

logger = logging.getLogger(__name__)

User = get_user_model()


def bust_admin_dashboard_cache():
    """Event-driven: Invalidate admin overview cache when relevant data changes."""
    cache.delete('curio_dashboard_overview')
    cache.delete('curio_admin_dashboard_overview')


def bust_user_profile_cache(user_id):
    """Event-driven: Invalidate all profile cache keys for a given user."""
    if not user_id:
        return
    cache.delete(f'curio_user_profile_u{user_id}')
    cache.delete(f'curio_user_profile_{user_id}')
    cache.delete('curio_admin_users_all')
    bust_admin_dashboard_cache()


@receiver([post_save, post_delete], sender=User)
def on_user_change(sender, instance, **kwargs):
    """Event-driven: When a user registers, updates profile, plan, or is deleted."""
    bust_user_profile_cache(instance.id)
    logger.info(f"[CacheBuster] User {instance.email} modified -> Cleared user and dashboard caches.")


# Subscriptions & Transactions
try:
    from apps.subscriptions.models import BillingTransaction, Subscription, Plan

    @receiver([post_save, post_delete], sender=Subscription)
    def on_subscription_change(sender, instance, **kwargs):
        """Event-driven: Invalidate user profile and overview when subscription plan changes."""
        user_id = getattr(instance, 'user_id', None)
        if user_id:
            bust_user_profile_cache(user_id)
        logger.info(f"[CacheBuster] Subscription {instance.id} modified -> Cleared user profile caches.")

    @receiver([post_save, post_delete], sender=BillingTransaction)
    def on_transaction_change(sender, instance, **kwargs):
        user_id = getattr(instance, 'user_id', None)
        if user_id:
            bust_user_profile_cache(user_id)
        bust_admin_dashboard_cache()
        logger.info(f"[CacheBuster] Transaction {instance.id} recorded -> Cleared dashboard and user caches.")

    @receiver([post_save, post_delete], sender=Plan)
    def on_plan_change(sender, instance, **kwargs):
        cache.delete('curio_subscription_plans')
        logger.info("[CacheBuster] Subscription Plan modified -> Cleared plans cache.")
except Exception as e:
    logger.warning(f"Failed to register subscription cache signals: {e}")


# Briefings
try:
    from apps.briefings.models import Briefing

    @receiver([post_save, post_delete], sender=Briefing)
    def on_briefing_change(sender, instance, **kwargs):
        bust_admin_dashboard_cache()
        cache.delete('curio_dashboard_overview')
        logger.info("[CacheBuster] Briefing modified -> Cleared briefing and dashboard caches.")
except Exception as e:
    logger.warning(f"Failed to register briefing cache signals: {e}")


# User Locations
try:
    from apps.analytics.models import UserLoginLocation

    @receiver([post_save, post_delete], sender=UserLoginLocation)
    def on_location_change(sender, instance, **kwargs):
        cache.delete('curio_admin_user_locations')
        logger.info("[CacheBuster] UserLoginLocation modified -> Cleared user locations cache.")
except Exception as e:
    logger.warning(f"Failed to register location cache signals: {e}")


# Feedback & Reviews
try:
    from apps.feedback.models import Feedback

    @receiver([post_save, post_delete], sender=Feedback)
    def on_feedback_change(sender, instance, **kwargs):
        cache.delete('curio_admin_reviews_all')
        cache.delete('curio_featured_reviews')
        if hasattr(instance, 'user_id'):
            cache.delete(f'curio_user_feedback_{instance.user_id}')
        logger.info("[CacheBuster] Feedback modified -> Cleared reviews cache.")
except Exception as e:
    logger.warning(f"Failed to register feedback cache signals: {e}")


# Platform Settings
try:
    from apps.platform_settings.models import PlatformSetting

    @receiver(post_save, sender=PlatformSetting)
    def on_settings_change(sender, instance, **kwargs):
        cache.delete('curio_platform_settings')
        logger.info("[CacheBuster] PlatformSetting modified -> Cleared platform settings cache.")
except Exception as e:
    logger.warning(f"Failed to register platform settings cache signals: {e}")
