from flask import Blueprint, jsonify
import os
import sys
PARENT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, PARENT_DIR)
from util import mydb_mgr

app_mrts = Blueprint('app_mrts', __name__)
mydb = mydb_mgr.mydb_mgr()
mydb.init()

# TODO
# Use flask_sqlalchemy to modify
@app_mrts.route('/mrts')
def mrts():
    try:
        mrts_list = mydb.get_mrts()
        return jsonify({ "data": [mrt[0] for mrt in mrts_list] })
    except:
        return \
            jsonify({ \
                "error": True, \
                "message": "Server internal error" \
            }), 500