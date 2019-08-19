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


class EmailPasswordForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])


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
