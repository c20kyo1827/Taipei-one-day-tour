from flask import Blueprint, jsonify, request
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
        if is_valid_email(request.form.get("email")):
            return \
                jsonify({ \
                    "error": True, \
                    "message": "Non-valid email format" \
                }), 500
        member = mydb.get_member(request.form.get("email"))
        print(member)
        if not member:
            mydb.add_member(request.form.get("name"), request.form.get("email"), request.form.get("password"))
            return \
                jsonify({ \
                    "ok": True \
                }), 500
        else:
            return \
                jsonify({ \
                    "error": True, \
                    "message": "Duplicate email" \
                }), 500
    except:
        return \
            jsonify({ \
                "error": True, \
                "message": "Server internal error" \
            }), 500

@app_member.route('/user/auth', methods=["GET"])
def auth_get_sign_info():
    try:
        # TODO
        # return token
        member = mydb.get_member(request.args.get("email"), request.args.get("password"))
        print(member)
        return \
            jsonify({ \
                "error": True, \
                "message": "123" \
            }), 500
    except:
        print
        return \
            jsonify({ \
                "error": True, \
                "message": "Server internal error" \
            }), 500
    
    
@app_member.route('/user/auth', methods=["PUT"])
def auth_sign_up():
    try:
        # TODO
        # return token
        member = mydb.get_member(request.form.get("email"), request.form.get("password"))
        print(member)
        return \
            jsonify({ \
                "error": True, \
                "message": "1234" \
            }), 500
    except:
        return \
            jsonify({ \
                "error": True, \
                "message": "Server internal error" \
            }), 500
    