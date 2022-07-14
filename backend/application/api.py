from datetime import datetime
from flask import request,current_app
from flask_restful import Resource
import os
import re
from application.database import db
from application.models import Visualization, User
from application.firebaseConfig import storage
from application.validation import ValidationError

def get_extension(name):
    if re.search(".csv$",name):
        return ".csv"
    else:
        return ".xlsx"

class FileAPI(Resource):

    def get(self):
        data = request.args
        uid = data['user_id']
        time = data['time']
        v = Visualization.query.filter_by(user_id=uid,time=time).first()
        cloud_name = str(v.vid) + get_extension(v.filename)
        local_name = v.filename 
        storage.child("files/"+cloud_name).download("",local_name)
     
        app = current_app
        path = os.path.join(os.getcwd(),local_name)
        file = open(path,'rb')

        def remove():
            yield from file
            file.close()
            os.remove(path)

        return app.response_class(
            remove(),
            headers={'Content-Disposition':'attachment'}
        )

    def post(self):
        file = request.files['file']
        user_id = request.form.get('user_id')
        v=Visualization()
        v.user_id = user_id
        v.filename = file.filename
        v.time = datetime.now()
        db.session.add(v)
        db.session.commit()

        name=str(v.vid)
        name+=get_extension(file.filename)        
        
        path=os.path.join(os.getcwd(),name)
        file.save(path)
        storage.child("files/"+name).put(name)
        os.remove(path)
        return 202


class AuthAPI(Resource):

    def post(self):
        data = request.get_json()
        username = data['username']
        u = User.query.filter_by(username=username).first()

        if u is not None:
            raise ValidationError(error_message='Username already taken. Please choose a different username.', status_code=409)

        pwd = data['pwd']

        u = User()
        u.username = username
        u.pwd = pwd
        db.session.add(u)
        db.session.commit()
        return 202

        
