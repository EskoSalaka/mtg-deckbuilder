from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Email
from wtforms.validators import ValidationError

from .models import User


class Unique(object):
    def __init__(self, model, field, message):
        self.model = model
        self.field = field
        self.message = message

    def __call__(self, form, field):
        check = self.model.query.filter(self.field == field.data).first()
        if check:
            raise ValidationError(self.message)


class Exists(object):
    def __init__(self, model, field, message):
        self.model = model
        self.field = field
        self.message = message

    def __call__(self, form, field):
        check = self.model.query.filter(self.field == field.data).first()
        if not check:
            raise ValidationError(self.message)


class PasswordHash(object):
    def __init__(self, user_model, message):
        self.user_model = user_model
        self.message = message

    def __call__(self, form, field):
        user = self.user_model.query.filter_by(email=form.email.data).first()

        if not user or not user.check_password(form.password.data):
            raise ValidationError(self.message)


class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(message="Email is required"),
                                             Email(),
                                             Exists(User,
                                                    User.email,
                                                    message='Incorrect email or password')])
    password = PasswordField('Password', validators=[DataRequired(message="Password is required"),
                                                     PasswordHash(User, message='Incorrect email or password')])


class SignupForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(message="Username is required"),
                                                   Unique(User,
                                                          User.username,
                                                          message='There already exists a user with this username')])
    email = StringField('email', validators=[DataRequired(message="Email is required"),
                                             Email(),
                                             Unique(User,
                                                    User.email,
                                                    message='There already exists a user with this email')])
    password = PasswordField('password', validators=[DataRequired(message="Password is required")])
