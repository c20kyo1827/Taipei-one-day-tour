from flask import Blueprint, jsonify, request
from datetime import datetime, timedelta
import string
import logging
import jwt
import sys
import os
PARENT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, PARENT_DIR)
from util import mydb_mgr

app_member = Blueprint('app_member', __name__)
mydb = mydb_mgr.mydb_mgr()
mydb.init()

logging.root.name = "Member API"
logging.basicConfig(level=logging.INFO,
                format='[%(levelname)-7s] %(name)s - %(message)s',
                stream=sys.stdout)

secret_key = "f1#39gA9psa"

@app_member.route('/user', methods=["POST"])
def sign_up():
    try:
        if request.is_json==False:
            raise Exception("Request is not json")
        # TODO
        # Check the password
        # def is_valid_password(password):
        #     has_upper = any(char.isupper() for char in password)
        #     has_symbol = any(char in string.punctuation for char in password)
        #     is_match_size = len(password)>=8 and len(password)<=20
        #     return [has_upper, has_symbol, is_match_size]
        member = mydb.get_member(request.json.get("email"))
        if member:
            return \
                jsonify({ \
                    "error": True, \
                    "message": "信箱重複" \
                }), 400
        else:
            mydb.add_member(request.json.get("name"), request.json.get("email"), request.json.get("password"))
            return \
                jsonify({ \
                    "ok": True \
                }), 200
    except Exception as e:
        logging.error("Error while signing up : {}".format(e))
        return \
            jsonify({ \
                "error": True, \
                "message": "Server internal error" \
            }), 500

@app_member.route('/user/auth', methods=["GET"])
def auth_get_sign_in():
    try:
        # TODO
        # Get the token
        # Decode the token
        email = ""
        password = ""
        member = mydb.get_member(email, password)
        if not member:
            return jsonify({"data" : None})
        return jsonify({"data":{ \
                            "id" : member[0][0], \
                            "name" : member[0][2], \
                            "email" : member[0][1] \
                        } \
                    })
    except Exception as e:
        logging.error("Error while authorizing : {}".format(e))
        return \
            jsonify({ \
                "error": True, \
                "message": "Server internal error" \
            }), 500
    
    
@app_member.route('/user/auth', methods=["PUT"])
def auth_sign_in():
    try:
        member = mydb.get_member(request.json.get("email"), request.json.get("password"))
        if not member:
            return \
                jsonify({ \
                    "error": True, \
                    "message": "帳號或密碼錯誤" \
                }), 400
        else:
            payload = {
                "id" : member[0][0],
                "name" : member[0][2],
                "email" : member[0][1],
                "password" : request.form.get("password"),
                "exp": datetime.utcnow() + timedelta(days=7)
            }
            try:
                token = jwt.encode(payload, secret_key, algorithm='HS256')
            except Exception as e:
                logging.error("Error while creating token : {}".format(e))
                return \
                    jsonify({ \
                        "error": True, \
                        "message": "Error while creating token" \
                    }), 400
            
            return \
                jsonify({ \
                    "token": token\
                }), 200
    except Exception as e:
        logging.error("Error while signing in : {}".format(e))
        return \
            jsonify({ \
                "error": True, \
                "message": "Server internal error" \
            }), 500
    