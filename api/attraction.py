from flask import Blueprint

app_attraction = Blueprint('app_attraction', __name__)

@app_attraction.route('/attractions')
def attractions():
    return "1"

@app_attraction.route('/attraction/<int:attractionId>')
def attraction(attractionId):
    return attractionId