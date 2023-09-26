from flask import Blueprint, jsonify, request
import logging
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

@blueprint_book.route("/booking", methods=["GET"])
def getBooking():
    pass

@blueprint_book.route("/booking", methods=["POST"])
def newBooking():
    pass

@blueprint_book.route("/booking", methods=["DELETE"])
def deleteBooking():
    pass