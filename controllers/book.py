import json
from flask import Blueprint, jsonify, request
from datetime import datetime
import logging
import jwt
import sys
from models import mydb_mgr
from controllers.users import secret_key

blueprint_book = Blueprint("blueprint_book", __name__)
mydb = mydb_mgr.mydb_mgr()
mydb.init()

logging.root.name = "Book API"
logging.basicConfig(level=logging.INFO,
                format="[%(levelname)-7s] %(name)s - %(message)s",
                stream=sys.stdout)

secret_key = "f1#39gA9psa"

@blueprint_book.route("/booking", methods=["GET"])
def getBooking():
    try:
        auth_header = request.headers.get("Authorization")

        if auth_header is None:
            return \
                jsonify({ \
                    "error": True, \
                    "message": "Havn't logged in" \
                }), 403

        split_header = auth_header.split()
        if len(split_header) != 2 or split_header[0].lower() != "bearer":
            return \
                jsonify({ \
                    "error": True, \
                    "message": "Havn't logged in" \
                }), 403

        payload = jwt.decode(split_header[1], secret_key, algorithms="HS256")
        if payload["exp"] is None or datetime.utcnow() > datetime.utcfromtimestamp(payload["exp"]):
            return \
                jsonify({ \
                    "error": True, \
                    "message": "Havn't logged in" \
                }), 403

        bookGroup = mydb.get_booking(payload["id"])
        data = []
        for bookInfo in bookGroup:
            attraction = {
                "id":bookInfo[2],
                "name":bookInfo[6],
                "address":bookInfo[7],
                "image":bookInfo[8]
            }
            data.append(
                {
                    "attraction":attraction,
                    "data":bookInfo[3],
                    "time":' '.join(bookInfo[4]),
                    "price":bookInfo[5]
                }
            )
        
        if data!=[]:
            return \
                jsonify({ \
                    "data": data
                }), 200
        return \
            jsonify({ \
                "data": None
            }), 200

    except Exception as e:
        exc_type, _, exc_tb = sys.exc_info()
        logging.error("Error while getting booking : {error}, type : {type} at line : {line}".format(error=e, type=exc_type, line=exc_tb.tb_lineno))
        return \
            jsonify({ \
                "error": True, \
                "message": "Server internal error" \
            }), 500

@blueprint_book.route("/booking", methods=["POST"])
def newBooking():
    try:
        auth_header = request.headers.get("Authorization")

        if auth_header is None:
            return \
                jsonify({ \
                    "error": True, \
                    "message": "Havn't logged in" \
                }), 403

        split_header = auth_header.split()
        if len(split_header) != 2 or split_header[0].lower() != "bearer":
            return \
                jsonify({ \
                    "error": True, \
                    "message": "Havn't logged in" \
                }), 403

        payload = jwt.decode(split_header[1], secret_key, algorithms="HS256")
        if payload["exp"] is None or datetime.utcnow() > datetime.utcfromtimestamp(payload["exp"]):
            return \
                jsonify({ \
                    "error": True, \
                    "message": "Havn't logged in" \
                }), 403

        # TODO
        # POST DATA
        mydb.add_book(payload["id"], request.json.get("attractionId"), request.json.get("date"), request.json.get("time"), request.json.get("price"))
        return \
            jsonify({ \
                "ok": True
            }), 200

    except Exception as e:
        exc_type, _, exc_tb = sys.exc_info()
        logging.error("Error while newing booking : {error}, type : {type} at line : {line}".format(error=e, type=exc_type, line=exc_tb.tb_lineno))
        return \
            jsonify({ \
                "error": True, \
                "message": "Server internal error" \
            }), 500

@blueprint_book.route("/booking", methods=["DELETE"])
def deleteBooking():
    try:
        auth_header = request.headers.get("Authorization")

        if auth_header is None:
            return \
                jsonify({ \
                    "error": True, \
                    "message": "Havn't logged in" \
                }), 403

        split_header = auth_header.split()
        if len(split_header) != 2 or split_header[0].lower() != "bearer":
            return \
                jsonify({ \
                    "error": True, \
                    "message": "Havn't logged in" \
                }), 403

        payload = jwt.decode(split_header[1], secret_key, algorithms="HS256")
        if payload["exp"] is None or datetime.utcnow() > datetime.utcfromtimestamp(payload["exp"]):
            return \
                jsonify({ \
                    "error": True, \
                    "message": "Havn't logged in" \
                }), 403

        # TODO
        # DELETE DATA
        return \
            jsonify({ \
                "ok": True
            }), 200

    except Exception as e:
        exc_type, _, exc_tb = sys.exc_info()
        logging.error("Error while deleting booking : {error}, type : {type} at line : {line}".format(error=e, type=exc_type, line=exc_tb.tb_lineno))
        return \
            jsonify({ \
                "error": True, \
                "message": "Server internal error" \
            }), 500