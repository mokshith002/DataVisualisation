from application.database import db

class Visualization(db.Model):
    __tablename__ = 'history'
    vid = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, nullable=False)
    filename = db.Column(db.String, nullable=False)
    time = db.Column(db.DateTime, nullable=False)
