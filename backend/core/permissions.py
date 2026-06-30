from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        # Read-only access for everyone (GET, HEAD, OPTIONS)
        if request.method in SAFE_METHODS:
            return True

        # Write access ONLY for superusers (is_superuser)
        return request.user and request.user.is_superuser
    

class ContactCreateOnly(BasePermission):

    def has_permission(self, request, view):
        # Only allow POST requests
        return request.method == "POST"