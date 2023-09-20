from flask import Blueprint, jsonify, request
import os
import sys
PARENT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, PARENT_DIR)
from util import mydb_mgr

app_member = Blueprint('app_member', __name__)
mydb = mydb_mgr.mydb_mgr()
mydb.init()

@app_member.route('/user', methods=["POST"])
def register():
    try:
        # request.args.get("name")
        # request.args.get("email")
        # request.args.get("password")
        return \
            jsonify({ \
                "error": True, \
                "message": "12" \
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
        member = mydb.get_member(request.args.get("email"), request.args.get("password"))
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
    