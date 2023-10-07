from flask import Blueprint, jsonify, request
from models import mydb_mgr
from datetime import datetime
import logging
import jwt
import sys
from controllers.users import process_auth_header

blueprint_orders = Blueprint('blueprint_orders', __name__)
mydb = mydb_mgr.mydb_mgr()
mydb.init()

logging.root.name = "Order API"
logging.basicConfig(level=logging.INFO,
                format="[%(levelname)-7s] %(name)s - %(message)s",
                stream=sys.stdout)

@blueprint_orders.route("/booking", methods=["POST"])
def new_order():
    try:
        payload = process_auth_header(request.headers.get("Authorization"))

        print(request.json)

        if payload == None:
            return \
                jsonify({ \
                    "error": True, \
                    "message": "Havn't logged in" \
                }), 403
        
        

        # TODO
        return \
            jsonify({ \
                "ok": True
            }), 200

    except Exception as e:
        exc_type, _, exc_tb = sys.exc_info()
        logging.error("Error while create ordering : {error}, type : {type} at line : {line}".format(error=e, type=exc_type, line=exc_tb.tb_lineno))
        return \
            jsonify({ \
                "error": True, \
                "message": "Server internal error" \
            }), 500

@blueprint_orders.route("/order/<int:attractionId>", methods=["GET"])
def get_order_from_id():
    try:
        payload = process_auth_header(request.headers.get("Authorization"))

        if payload == None:
            return \
                jsonify({ \
                    "error": True, \
                    "message": "Havn't logged in" \
                }), 403
        
        # TODO
        return \
            jsonify({ \
                "ok": True
            }), 200

    except Exception as e:
        exc_type, _, exc_tb = sys.exc_info()
        logging.error("Error while create ordering : {error}, type : {type} at line : {line}".format(error=e, type=exc_type, line=exc_tb.tb_lineno))
        return \
            jsonify({ \
                "error": True, \
                "message": "Server internal error" \
            }), 500