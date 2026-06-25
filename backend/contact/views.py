from rest_framework import mixins, viewsets
from rest_framework.permissions import AllowAny

from core.protection import throttling_check, force_captcha

from .models import Contact
from .serializers import ContactSerializer


class ContactViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [AllowAny]
    http_method_names = ["post"]

    def create(self, request, *args, **kwargs):
        # 1. Throttling
        throttle_response = throttling_check(
            request,
            max_requests=10,
            time_range=60,
            block_time=30,
        )
        if throttle_response:
            return throttle_response

        # 2. Captcha
        captcha_response = force_captcha(
            request,
            max_requests=5,
            time_range=60,
        )
        if captcha_response:
            return captcha_response

        # 3. Create contact message
        return super().create(request, *args, **kwargs)