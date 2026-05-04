import os
from flask import Flask
from flask_cors import CORS
from app.routes.analyze import analyze_bp


def create_app() -> Flask:
    app = Flask(__name__)
    app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024  # 16 MB

    # Allow all origins in dev; lock down via RENDER env var in production
    allowed_origins = os.environ.get("ALLOWED_ORIGINS", "*")
    CORS(app, resources={r"/*": {"origins": allowed_origins}})

    app.register_blueprint(analyze_bp)

    return app
