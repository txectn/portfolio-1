from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate

from .models import SiteSettings, Footer, PageView, VisitorLog

class PortfolioLoginSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        username = attrs.get("username", "").strip()
        password = attrs.get("password", "")

        if not username:
            raise serializers.ValidationError({
                "username": "Username is required."
            })

        if not password:
            raise serializers.ValidationError({
                "password": "Password is required."
            })

        user = authenticate(username=username, password=password)

        if user is None:
            raise serializers.ValidationError(
                "Invalid username or password."
            )

        if not user.is_active:
            raise serializers.ValidationError(
                "Account is inactive."
            )

        # Allow only portfolio owner/admin login
        if not user.is_superuser:
            raise serializers.ValidationError(
                "Access denied."
            )

        data = super().validate(attrs)

        data.update({
            "username": user.username,
        })

        return data
    

class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = [
            "site_name",
            "logo_light",
            "logo_dark",
            "favicon"
        ]

class FooterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Footer
        fields = [
            "footer_image",
            "footer_email",
            "footer_phone",
            "footer_rights",
            "footer_links"
        ]


class PageViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = PageView
        fields = [
            "id",
            "page",
            "views",
            "updated_at",
        ]
        read_only_fields = fields


class VisitorLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = VisitorLog
        fields = [
            "id",
            "page",
            "ip_address",
            "user_agent",
            "visited_at",
        ]
        read_only_fields = fields