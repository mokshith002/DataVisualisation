from application.database import db

class Visualization(db.Model):
    __tablename__ = 'history'
    vid = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    filename = db.Column(db.String, nullable=False)
    time = db.Column(db.DateTime, nullable=False)

    def toDict(self):
        return {
            'vid' : self.vid,
            'filename' : self.filename,
            'time' : self.time.isoformat()
        }
    
class User(db.Model):
    __tablename__ = 'user'
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.Text, nullable=False, unique=True)
    pwd = db.Column(db.Text, nullable=False)
    files = db.relationship('Visualization', backref='user')

