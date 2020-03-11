from functools import wraps
from flask import request, jsonify
from .models import User


def authorize(f):
    @wraps(f)
    def decorated_function(*args, **kws):
        auth_header = request.headers.get('Authorization')

        if not auth_header:
            return jsonify(error=403, status="Fail", message="Login required"), 403

        auth_token = auth_header.split(" ")[1]
        user = User.from_token(auth_token)

        if not user:
            return jsonify(error=403, status="Fail", message="Invalid or expired token")

        return f(user, *args, **kws)
    return decorated_function
