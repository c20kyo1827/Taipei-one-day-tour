from flask import Blueprint

app_mrts = Blueprint('app_mrts', __name__)

@app_mrts.route('/mrts')
def mrts():
    return "1"