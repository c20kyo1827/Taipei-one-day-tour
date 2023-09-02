from flask import *
from api.attraction import app_attraction
from api.mrts import app_mrts
app=Flask(__name__)
app.config["JSON_AS_ASCII"]=False
app.config["TEMPLATES_AUTO_RELOAD"]=True
app.json.ensure_ascii = False

# Pages
@app.route("/")
def index():
	return render_template("index.html")
@app.route("/attraction/<id>")
def attraction(id):
	return render_template("attraction.html")
@app.route("/booking")
def booking():
	return render_template("booking.html")
@app.route("/thankyou")
def thankyou():
	return render_template("thankyou.html")

# Blueprint
app.register_blueprint(app_attraction, url_prefix='/api')
app.register_blueprint(app_mrts, url_prefix='/api')

app.run(host="0.0.0.0", port=3000)