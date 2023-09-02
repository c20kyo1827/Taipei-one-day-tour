from flask import Blueprint, jsonify
import os
import sys
PARENT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, PARENT_DIR)
from util import mydb_mgr

app_attraction = Blueprint('app_attraction', __name__)
mydb = mydb_mgr.mydb_mgr()
mydb.init()

@app_attraction.route('/attractions')
def attractions():
    try:
        pass
    except:
        return \
            jsonify({ \
                "error": True, \
                "message": "Server internal error" \
            }), 500

@app_attraction.route('/attraction/<int:attractionId>')
def attraction(attractionId):
    try:
        if isinstance(attractionId,int):
            data = mydb.get_attraction(attractionId)
            category = mydb.get_category_by_id(attractionId)
            mrt = mydb.get_mrt_by_id(attractionId)
            images = [image[1] for image in mydb.get_images_by_id(attractionId)]
            print(images)
            return jsonify({ \
                        "data": { \
                            "id": data[0][0], \
                            "name": data[0][1], \
                            "category": category[0][1], \
                            "description": data[0][2], \
                            "address": data[0][3], \
                            "transport": data[0][4], \
                            "mrt": mrt[0][1], \
                            "lat": data[0][5], \
                            "lng": data[0][6], \
                            "images": images \
                        } \
                    })
        else:
            return \
                jsonify({ \
                    "error": True, \
                    "message": "attraction id is not integer" \
                }), 400
    except:
        print("123")
        return \
            jsonify({ \
                "error": True, \
                "message": "Server internal error" \
            }), 500