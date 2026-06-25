def get_client_ip(request):
    """
    Extract real client IP safely (proxy-aware)
    """

    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")

    if x_forwarded_for:
        return x_forwarded_for.split(",")[0].strip()

    return request.META.get("REMOTE_ADDR")


def get_cache_key(prefix, value):
    return f"{prefix}:{value}"