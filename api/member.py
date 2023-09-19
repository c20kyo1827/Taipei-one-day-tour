from flask import Blueprint, jsonify, request
import os
import sys
PARENT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, PARENT_DIR)
from util import mydb_mgr

app_member = Blueprint('app_member', __name__)
mydb = mydb_mgr.mydb_mgr()
mydb.init()

@app_member.route('/user')
def register():
    try:
        pass
    except:
        return \
            jsonify({ \
                "error": True, \
                "message": "Server internal error" \
            }), 500

@app_member.route('/user/auth')
def authorization():
    try:
        pass
    except:
        return \
            jsonify({ \
                "error": True, \
                "message": "Server internal error" \
            }), 500