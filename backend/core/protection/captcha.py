import requests
from django.conf import settings
from django.core.cache import cache
from rest_framework.response import Response
from .utils import get_client_ip, get_cache_key

# CONFIG (can move to settings.py)
CAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify"

DEFAULT_MAX_REQUESTS = 2
DEFAULT_REQUEST_TIME_RANGE = 60  # seconds
DEFAULT_BYPASS_TTL = 90  # seconds (5 min)
CAPTCHA_LOCK_TTL = 30  # seconds

# 1. RATE LIMIT → SHOULD TRIGGER CAPTCHA
def should_require_captcha(
    ip,
    max_requests = DEFAULT_MAX_REQUESTS,
    time_range = DEFAULT_REQUEST_TIME_RANGE,
) -> bool:
    rate_key = get_cache_key("rate_limit", ip)
    bypass_key = get_cache_key("captcha_passed", ip)

    # If user already passed captcha recently → allow
    if cache.get(bypass_key):
        return False

    # Get current request count
    current = cache.get(rate_key, 0)

    if current >= max_requests:
        return True  # trigger captcha

    # Increment counter
    try:
        cache.incr(rate_key)
    except ValueError:
        # Key doesn't exist → initialize
        cache.set(rate_key, 1, timeout=time_range)

    return False


# 2. VERIFY CAPTCHA TOKEN
def verify_captcha_token(token: str, ip: str | None = None) -> bool:

    if not token:
        return False

    data = {
        "secret": settings.RECAPTCHA_SECRET_KEY,
        "response": token,
    }

    # Optional: send user IP (recommended by Google)
    if ip:
        data["remoteip"] = ip

    try:
        response = requests.post(CAPTCHA_VERIFY_URL, data=data, timeout=5)
        result = response.json()
    except requests.RequestException:
        return False  # fail safe

    return result.get("success", False)


# 3. MARK CAPTCHA PASSED (BYPASS)
def mark_captcha_passed(
    ip: str,
    *,
    bypass_ttl: int = DEFAULT_BYPASS_TTL,
):

    bypass_key = get_cache_key("captcha_passed", ip)
    rate_key = get_cache_key("rate_limit", ip)

    # Set bypass flag
    cache.set(bypass_key, True, timeout=bypass_ttl)

    # Reset rate counter (important)
    cache.delete(rate_key)


# 4. CHECK CAPTCHA
def check_captcha(request,
    max_requests = DEFAULT_MAX_REQUESTS,
    time_range = DEFAULT_REQUEST_TIME_RANGE,
):
    ip = get_client_ip(request)

    # 1. Rate Limit Check
    need_captcha = should_require_captcha(ip, max_requests, time_range)

    if need_captcha:

        token = request.data.get("captcha_token")

        # 2. Verify Captcha
        if not verify_captcha_token(token, ip):
            return Response(
                {
                    "success": False,
                    "captcha_required": True,
                    "message": "Captcha verification failed"
                },
                status=400
            )

        # 3. Mark As Trusted
        mark_captcha_passed(ip)




# 5. force_captcha
def force_captcha(request,
    max_requests = DEFAULT_MAX_REQUESTS,
    time_range = DEFAULT_REQUEST_TIME_RANGE,
):
    ip = get_client_ip(request)

    captcha_lock_key = f"captcha_lock:{ip}"

    # 1. CHECK IF USER IS IN LOCK MODE
    if cache.get(captcha_lock_key):
        token = request.data.get("captcha_token")

        # must solve captcha during lock period
        if not token or not verify_captcha_token(token, ip):
            return Response(
                {
                    "success": False,
                    "captcha_required": True,
                    "message": "Captcha required (rate limit exceeded)"
                },
                status=400
            )

        # captcha solved → remove lock
        cache.delete(captcha_lock_key)
        # mark_captcha_passed(ip)
        return None

    # 2. NORMAL FLOW (NO CAPTCHA YET)
    need_captcha = should_require_captcha(ip, max_requests, time_range)

    if need_captcha:
        # FIRST TIME LIMIT HIT → START LOCK (BUT DO NOT FORCE CAPTCHA YET)
        cache.set(captcha_lock_key, True, timeout=CAPTCHA_LOCK_TTL)

    # allow request to continue normally
    return None