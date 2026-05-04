"""
routes/analyze.py
Blueprint for the /analyze endpoint.

Endpoints (UNCHANGED from original app.py):
  POST /analyze  — accepts multipart/form-data with 'following' + 'followers' files
                   returns JSON analysis payload
"""

import json
from flask import Blueprint, jsonify, request
from app.services.analyzer import run_analysis

analyze_bp = Blueprint("analyze", __name__)


@analyze_bp.post("/analyze")
def analyze():
    """
    POST /analyze
    Body (multipart/form-data):
      following  — following.json export from Instagram
      followers  — followers_1.json export from Instagram
    Response:
      200 { stats, tidak_folbek, mutualan, follow_6bln, follow_6bln_tidak_folbek }
      400 { error: str }
    """
    files = request.files

    if "following" not in files or "followers" not in files:
        return (
            jsonify({"error": "Upload kedua file: following.json dan followers_1.json"}),
            400,
        )

    try:
        following_raw = json.load(files["following"])
        followers_raw = json.load(files["followers"])
    except Exception as exc:
        return jsonify({"error": f"Gagal membaca JSON: {exc}"}), 400

    result = run_analysis(following_raw, followers_raw)
    return jsonify(result), 200
