from datetime import datetime
from flask import request,current_app
from flask_restful import Resource
import os
import re
from application.database import db
from application.models import Visualization
from application.firebaseConfig import storage

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
            headers={'Content-Disposition':'attachment', 'filename': v.filename}
        )

    def post(self):
        file = request.files['file']

        v=Visualization()
        v.user_id = 1
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
        
