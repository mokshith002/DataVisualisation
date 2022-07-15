import bcrypt
from flask import current_app
from flask_bcrypt import Bcrypt
app = current_app

bcrypt = Bcrypt(app)

def generate_hash(p):
    return bcrypt.generate_password_hash(p)

def check_hash(h,p):
    return bcrypt.check_password_hash(h,p)