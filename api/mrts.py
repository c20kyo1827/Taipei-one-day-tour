from flask import Blueprint, jsonify
import os
import json
import sys
PARENT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, PARENT_DIR)
from util import mydb_mgr

app_mrts = Blueprint('app_mrts', __name__)
flow = mydb_mgr.mydb_mgr()
flow.init()

# TODO
# Use flask_sqlalchemy to modify
@app_mrts.route('/mrts')
def mrts():
    try:
        mrts_list = flow.get_mrt()
        print(mrts_list[0])
        return jsonify({ "data": [mrt[0] for mrt in mrts_list] })
    except:
        return \
            { \
                "error": True, \
                "message": "伺服器內部錯誤" \
            }, 500