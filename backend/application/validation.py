import json
from flask import make_response
from werkzeug.exceptions import HTTPException

class ValidationError(HTTPException):
    def __init__(self,error_message,status_code):
        message = {
            "error_message" : error_message
        }
        self.response = make_response(json.dumps(message),status_code)