import json
import urllib.request
import logging

logger = logging.getLogger(__name__)

# Default locations for seeding/fallback when testing on localhost
SAMPLE_COORDINATES = [
    {"city": "San Francisco", "region": "California", "country": "United States", "country_code": "US", "latitude": 37.7749, "longitude": -122.4194},
    {"city": "London", "region": "England", "country": "United Kingdom", "country_code": "GB", "latitude": 51.5074, "longitude": -0.1278},
    {"city": "Tokyo", "region": "Kanto", "country": "Japan", "country_code": "JP", "latitude": 35.6762, "longitude": 139.6503},
    {"city": "Berlin", "region": "Berlin", "country": "Germany", "country_code": "DE", "latitude": 52.5200, "longitude": 13.4050},
    {"city": "Dhaka", "region": "Dhaka Division", "country": "Bangladesh", "country_code": "BD", "latitude": 23.8103, "longitude": 90.4125},
    {"city": "Sydney", "region": "New South Wales", "country": "Australia", "country_code": "AU", "latitude": -33.8688, "longitude": 151.2093},
    {"city": "Toronto", "region": "Ontario", "country": "Canada", "country_code": "CA", "latitude": 43.6532, "longitude": -79.3832},
    {"city": "Singapore", "region": "Central", "country": "Singapore", "country_code": "SG", "latitude": 1.3521, "longitude": 103.8198},
    {"city": "Paris", "region": "Ile-de-France", "country": "France", "country_code": "FR", "latitude": 48.8566, "longitude": 2.3522},
    {"city": "Sao Paulo", "region": "Sao Paulo", "country": "Brazil", "country_code": "BR", "latitude": -23.5505, "longitude": -46.6333},
]


def get_client_ip(request):
    """Safely extracts real client IP even behind proxies/load balancers."""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0].strip()
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip or '127.0.0.1'


def resolve_ip_location(ip):
    """Resolves IP address to geographical coordinates via lightweight GeoIP lookup."""
    if not ip or ip in ('127.0.0.1', 'localhost', '::1') or ip.startswith('192.168.') or ip.startswith('10.'):
        return {
            'city': 'Dhaka',
            'region': 'Dhaka Division',
            'country': 'Bangladesh',
            'country_code': 'BD',
            'latitude': 23.8103,
            'longitude': 90.4125
        }

    try:
        url = f"http://ip-api.com/json/{ip}?fields=status,country,countryCode,regionName,city,lat,lon"
        req = urllib.request.Request(url, headers={'User-Agent': 'CurioAI-Analytics/1.0'})
        with urllib.request.urlopen(req, timeout=2.0) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            if data.get('status') == 'success':
                return {
                    'city': data.get('city'),
                    'region': data.get('regionName'),
                    'country': data.get('country'),
                    'country_code': data.get('countryCode'),
                    'latitude': float(data.get('lat')),
                    'longitude': float(data.get('lon')),
                }
    except Exception as e:
        logger.warning(f"GeoIP resolution failed for IP {ip}: {e}")

    # Fallback to default
    return {
        'city': 'Dhaka',
        'region': 'Dhaka Division',
        'country': 'Bangladesh',
        'country_code': 'BD',
        'latitude': 23.8103,
        'longitude': 90.4125
    }


def record_user_login_location(user, request):
    """Updates or creates UserLoginLocation profile and logs activity."""
    from apps.analytics.models import UserLoginLocation, ActivityAuditLog
    from django.utils import timezone

    ip = get_client_ip(request)
    geo = resolve_ip_location(ip)

    loc, _ = UserLoginLocation.objects.get_or_create(user=user)
    loc.ip_address = ip
    loc.city = geo.get('city') or loc.city or 'Dhaka'
    loc.region = geo.get('region') or loc.region or ''
    loc.country = geo.get('country') or loc.country or 'Bangladesh'
    loc.country_code = geo.get('country_code') or loc.country_code or 'BD'
    loc.latitude = geo.get('latitude') if geo.get('latitude') is not None else loc.latitude
    loc.longitude = geo.get('longitude') if geo.get('longitude') is not None else loc.longitude
    loc.is_active_session = True
    loc.last_login = timezone.now()
    loc.save()

    # Log in audit
    location_str = f" from {loc.city}, {loc.country}" if loc.city and loc.country else ""
    ActivityAuditLog.objects.create(
        user=user,
        activity_type='User Login',
        description=f"{user.get_full_name() or user.email} logged in{location_str}"
    )
    return loc
