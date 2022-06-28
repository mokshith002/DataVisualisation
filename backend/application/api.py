from datetime import datetime
from flask import request
from flask_restful import Resource
import os
import re
from application.database import db
from application.models import Visualization

class GraphAPI(Resource):
    def post(self):
        file = request.files['file']
        path=os.path.join(os.getcwd(),'files')

        v=Visualization()
        v.user_id = 1
        v.filename = file.filename
        v.time = datetime.now()
        db.session.add(v)
        db.session.commit()

        name=str(v.vid)

        if re.search(".csv$",file.filename):
            name+=".csv"
        else:
            name+=".xlsx"
        
        file.save(os.path.join(path,name))
        return 202