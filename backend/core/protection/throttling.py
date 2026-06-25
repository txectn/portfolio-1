from django.core.cache import cache
from django.http import JsonResponse

from .utils import get_client_ip, get_cache_key

# CONFIG (can move to settings.py)
DEFAULT_MAX_REQUESTS = 5
DEFAULT_REQUEST_TIME_RANGE = 60  # seconds
BLOCK_TIME = 90  # seconds (1.5 min ban)


def throttling_check(
    request,
    max_requests=DEFAULT_MAX_REQUESTS,
    time_range=DEFAULT_REQUEST_TIME_RANGE,
    block_time=BLOCK_TIME,
):
    ip = get_client_ip(request)

    rate_key = get_cache_key("rate_limit", ip)
    block_key = get_cache_key("blocked_ip", ip)

    # ================================
    # 0. CHECK IF IP IS BLOCKED
    # ================================
    if cache.get(block_key):
        return JsonResponse(
            {
                "success": False,
                "message": f"Too many requests. IP temporarily blocked for {block_time} seconds.",
            },
            status=429,
        )

    # ================================
    # 1. GET CURRENT REQUEST COUNT
    # ================================
    current = cache.get(rate_key, 0)

    if current >= max_requests:
        # Block IP for some time
        cache.set(block_key, True, timeout=block_time)

        return JsonResponse(
            {
                "success": False,
                "message": f"Rate limit exceeded. Please try again in {block_time} seconds.",
            },
            status=429,
        )

    # ================================
    # 2. INCREMENT COUNTER
    # ================================
    try:
        cache.incr(rate_key)
    except ValueError:
        # first request in window
        cache.set(rate_key, 1, timeout=time_range)

    return None  # means request is allowed