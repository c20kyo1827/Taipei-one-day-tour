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

        # TODO
        # Get the mysql data
        print("123")
        return \
            jsonify({ \
                "data": None
            }), 200

    except Exception as e:
        logging.error("Error while authorizing : {}".format(e))
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
        print(request.json)
        # Successful to insert mysql
        # Fail to insert mysql
        return \
            jsonify({ \
                "ok": True
            }), 200

    except Exception as e:
        logging.error("Error while authorizing : {}".format(e))
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
        logging.error("Error while authorizing : {}".format(e))
        return \
            jsonify({ \
                "error": True, \
                "message": "Server internal error" \
            }), 500