from functools import wraps
from flask import request, jsonify
from .models import User


def authorize(f):
    @wraps(f)
    def decorated_function(*args, **kws):

        auth_token = request.cookies.get('auth_token')

        if not auth_token:
            return jsonify(error=403, status="Fail", message="Login required"), 403

        user = User.from_token(auth_token)

        if not user:
            return jsonify(error=403, status="Fail", message="Login required")

        return f(user, *args, **kws)
    return decorated_function
