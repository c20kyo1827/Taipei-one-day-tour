from flask import Blueprint
from controllers.attractions import blueprint_attractions
from controllers.mrts import blueprint_mrts
from controllers.users import blueprint_users

blueprint_routes = Blueprint("blueprint_routes", __name__)

blueprint_routes.register_blueprint(blueprint_attractions, url_prefix="/api")
blueprint_routes.register_blueprint(blueprint_mrts, url_prefix="/api")
blueprint_routes.register_blueprint(blueprint_users, url_prefix="/api")