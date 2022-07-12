from flask import Flask
from application.database import db
from flask_restful import Api
from flask_cors import CORS

app = None
api = None 

def create_app():
    app = Flask(__name__) 
    CORS(app)
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///database.sqlite3"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    api=Api(app)
    app.app_context().push()
    return app,api

app,api = create_app()

from application.api import *
api.add_resource(FileAPI,'/api/upload')


