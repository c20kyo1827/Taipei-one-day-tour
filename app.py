from flask import *
from routes.blueprint import blueprint_routes
from flask_cors import CORS
app=Flask(__name__)
app.config["JSON_AS_ASCII"]=False
app.config["TEMPLATES_AUTO_RELOAD"]=True
# app.json.ensure_ascii = False
CORS(app)

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

app.register_blueprint(blueprint_routes)
app.config.from_object("config")
print(app.config)
app.run(host="0.0.0.0", port=3000)