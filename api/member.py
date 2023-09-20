from flask import Blueprint, jsonify, request
import string
import jwt
import sys
import os
import re
PARENT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, PARENT_DIR)
from util import mydb_mgr

app_member = Blueprint('app_member', __name__)
mydb = mydb_mgr.mydb_mgr()
mydb.init()

@app_member.route('/user', methods=["POST"])
def register():
    try:
        print(request.form.get("name"))
        print(request.form.get("email"))
        print(request.form.get("password"))
        def is_valid_email(email):
            email_pattern = r"^[0-9a-zA-Z][0-9a-zA-Z.]+@[0-9a-zA-Z]+\.[a-zA-Z]{2,}$"
            if re.match(email_pattern, email) and not re.search(r'\.\.', email):
                return True
            else:
                return False
        # TODO
        # Check the password
        def is_valid_password(password):
            has_upper = any(char.isupper() for char in password)
            has_symbol = any(char in string.punctuation for char in password)
            is_match_size = len(password)>=8 and len(password)<=20
            return [has_upper, has_symbol, is_match_size]
        if is_valid_email(request.form.get("email")) == False:
            return \
                jsonify({ \
                    "error": True, \
                    "message": "無效的信箱" \
                }), 400
        member = mydb.get_member(request.form.get("email"))
        print(member)
        if member:
            return \
                jsonify({ \
                    "error": True, \
                    "message": "信箱重複" \
                }), 400
        else:
            mydb.add_member(request.form.get("name"), request.form.get("email"), request.form.get("password"))
            return \
                jsonify({ \
                    "ok": True \
                }), 200
    except:
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
    except:
        print
        return \
            jsonify({ \
                "error": True, \
                "message": "Server internal error" \
            }), 500
    
    
@app_member.route('/user/auth', methods=["PUT"])
def auth_sign_in():
    try:
        
        print(request.form.get("email"))
        print(request.form.get("password"))
        member = mydb.get_member(request.form.get("email"), request.form.get("password"))
        print(member)
        if not member:
            return \
                jsonify({ \
                    "error": True, \
                    "message": "帳號或密碼錯誤" \
                }), 400
        else:
            # TODO
            # encode the email and password to token
            # set header
            # set cookie
            token = ""
            return \
                jsonify({ \
                    "token": token\
                }), 200
    except:
        return \
            jsonify({ \
                "error": True, \
                "message": "Server internal error" \
            }), 500
    