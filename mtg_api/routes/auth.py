from flask import Blueprint, make_response
from flask import request
from flask.json import jsonify

from .. import db
from ..decorators import authorize
from ..forms import SignupForm, LoginForm
from ..models import (
    User,
    BlacklistToken)

auth_blueprint = Blueprint("auth", __name__)


@auth_blueprint.route("/api/signup", methods=["POST"])
def signup():
    form = SignupForm(request.form)

    if form.validate():
        try:
            new_user = User(username=form.username.data, email=form.email.data)
            new_user.set_password(form.password.data)
            db.session.add(new_user)
            db.session.commit()

            return jsonify(status="Success", message="Registration successful"), 200

        except Exception as e:
            print(e)
            return (
                jsonify(error=500, status="Fail", message="Internal server error"),
                500,
            )

    else:
        print(form.errors)
        return (
            jsonify(
                error=400, status="Fail", message=list(form.errors.items())[0][1][0]
            ),
            400,
        )


@auth_blueprint.route("/api/login", methods=["POST"])
def login():
    form = LoginForm(request.form)

    if form.validate():
        try:
            user = User.query.filter_by(email=form.email.data).first()
            auth_token = user.encode_auth_token()

            resp = make_response({
                "status": "Success",
                "message": "Login successful",
                "user": {"username": user.username,
                         "email": user.email}
            }, 200)
            resp.set_cookie('auth_token', auth_token, httponly=True)

            return resp

        except Exception as e:
            print(e)
            return (
                jsonify(error=500, status="Fail", message="Internal server error"),
                500,
            )

    else:
        return (
            jsonify(
                error=400, status="Fail", message=list(form.errors.items())[0][1][0]
            ),
            400,
        )


@auth_blueprint.route("/api/logout", methods=["POST"])
def logout():
    auth_token = request.cookies.get('auth_token')

    resp = make_response({
        "status": "Success",
        "message": "Logout successful"
    }, 200)
    resp.set_cookie('auth_token', '', expires=0)

    if auth_token:
        user = User.decode_auth_token(auth_token)

        if not isinstance(user, str):
            blacklist_token = BlacklistToken(token=auth_token)

            try:
                db.session.add(blacklist_token)
                db.session.commit()

            except Exception as e:
                print(e)
                return resp

    return resp


@auth_blueprint.route("/api/user", methods=["GET"])
@authorize
def get_user(user):
    return (
        jsonify(
            status="Success",
            message="Authenticated",
            user={"username": user.username, "email": user.email},
        ),
        200,
    )
