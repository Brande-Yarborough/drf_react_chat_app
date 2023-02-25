from rest_framework import permissions


class IsAuthorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # if doing get request, return true
        if request.method in permissions.SAFE_METHODS:  # get is safe method
            return True
        # if author is equal to person making request, this will evaluate to true(allows author who created post to edit and delete)
        # if not true, returns false and request does not go through
        return obj.author == request.user
