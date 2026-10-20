from rest_framework import permissions

class IsAdminRoleOrStaff(permissions.BasePermission):
    """
    Production-grade RBAC permission class.
    Permits access strictly to authenticated users with role='admin', is_staff=True, or is_superuser=True.
    Regular users, suspended accounts, or anonymous users are rejected with 403 Forbidden.
    """
    message = "Access denied: Account does not have administrator privileges."

    def has_permission(self, request, view):
        user = getattr(request, 'user', None)
        if not user or not user.is_authenticated:
            return False

        if getattr(user, 'is_suspended', False):
            return False

        return bool(
            getattr(user, 'role', None) == 'admin' or
            getattr(user, 'is_staff', False) or
            getattr(user, 'is_superuser', False)
        )
