import logging
import requests
from django.conf import settings

logger = logging.getLogger(__name__)

# SSLCommerz Endpoints
SSLC_SESSION_URL_SANDBOX = "https://sandbox.sslcommerz.com/gwprocess/v4/api.php"
SSLC_SESSION_URL_LIVE = "https://securepay.sslcommerz.com/gwprocess/v4/api.php"

SSLC_VALIDATION_URL_SANDBOX = "https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php"
SSLC_VALIDATION_URL_LIVE = "https://securepay.sslcommerz.com/validator/api/validationserverAPI.php"


def get_sslcommerz_urls():
    is_sandbox = getattr(settings, 'SSL_COMMERZ_SANDBOX', True)
    session_url = SSLC_SESSION_URL_SANDBOX if is_sandbox else SSLC_SESSION_URL_LIVE
    validation_url = SSLC_VALIDATION_URL_SANDBOX if is_sandbox else SSLC_VALIDATION_URL_LIVE
    return session_url, validation_url


def initiate_sslcommerz_payment(transaction, user, plan, customer_data):
    """
    Initializes a payment session with SSLCommerz and returns GatewayPageURL.
    """
    session_url, _ = get_sslcommerz_urls()

    store_id = getattr(settings, 'STORE_ID', '')
    store_pass = getattr(settings, 'STORE_PASS', '')

    if not store_id or not store_pass:
        raise ValueError("SSLCommerz STORE_ID or STORE_PASS is not configured in settings.")

    # Calculate amount in BDT (SSLCommerz uses BDT)
    # Default USD to BDT rate is 125 if plan is in $
    if str(plan.currency).strip() == '$':
        amount_in_bdt = round(float(plan.price) * 125.0, 2)
    else:
        amount_in_bdt = round(float(plan.price), 2)

    # Minimum payment check for sandbox
    if amount_in_bdt <= 0:
        amount_in_bdt = 10.0

    backend_url = getattr(settings, 'BACKEND_URL', 'http://127.0.0.1:8055').rstrip('/')
    
    first_name = customer_data.get('first_name') or getattr(user, 'first_name', '') or 'Curio'
    last_name = customer_data.get('last_name') or getattr(user, 'last_name', '') or 'User'
    full_name = f"{first_name} {last_name}".strip()

    payload = {
        'store_id': store_id,
        'store_passwd': store_pass,
        'total_amount': f"{amount_in_bdt:.2f}",
        'currency': 'BDT',
        'tran_id': transaction.tran_id,
        'success_url': f"{backend_url}/api/subscriptions/sslcommerz/success/",
        'fail_url': f"{backend_url}/api/subscriptions/sslcommerz/fail/",
        'cancel_url': f"{backend_url}/api/subscriptions/sslcommerz/cancel/",
        'ipn_url': f"{backend_url}/api/subscriptions/sslcommerz/ipn/",
        'cus_name': full_name,
        'cus_email': customer_data.get('email') or getattr(user, 'email', 'user@curio.com'),
        'cus_add1': customer_data.get('address') or 'Dhaka, Bangladesh',
        'cus_city': customer_data.get('city') or 'Dhaka',
        'cus_country': customer_data.get('country') or 'Bangladesh',
        'cus_phone': customer_data.get('phone') or getattr(user, 'phone', '01700000000') or '01700000000',
        'shipping_method': 'NO',
        'product_name': f"Curio {plan.name} Subscription",
        'product_category': 'Digital Subscription',
        'product_profile': 'non-physical-goods',
    }

    try:
        response = requests.post(session_url, data=payload, timeout=25)
        response_data = response.json()
    except Exception as e:
        logger.error(f"[SSLCommerz] Connection error: {e}")
        raise RuntimeError(f"Could not connect to SSLCommerz gateway: {str(e)}")

    if response_data.get('status') == 'SUCCESS' and response_data.get('GatewayPageURL'):
        return response_data.get('GatewayPageURL')
    
    failed_reason = response_data.get('failedreason') or response_data.get('error') or 'SSLCommerz session creation failed'
    logger.error(f"[SSLCommerz] Session creation failed: {failed_reason}")
    raise RuntimeError(failed_reason)


def validate_sslcommerz_payment(val_id):
    """
    Validates a completed payment using SSLCommerz Validation API.
    """
    _, validation_url = get_sslcommerz_urls()

    store_id = getattr(settings, 'STORE_ID', '')
    store_pass = getattr(settings, 'STORE_PASS', '')

    params = {
        'val_id': val_id,
        'store_id': store_id,
        'store_passwd': store_pass,
        'format': 'json',
    }

    try:
        response = requests.get(validation_url, params=params, timeout=25)
        return response.json()
    except Exception as e:
        logger.error(f"[SSLCommerz] Validation request error: {e}")
        return {'status': 'FAILED', 'error': str(e)}
