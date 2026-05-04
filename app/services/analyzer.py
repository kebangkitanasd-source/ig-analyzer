"""
services/analyzer.py
Pure business logic — no Flask dependencies.
Receives already-parsed lists and returns the final response payload.
"""

from datetime import datetime, timezone, timedelta
from app.utils.parser import parse_ig_json


def _clean(lst: list) -> list:
    """Strip internal-only fields before sending to client."""
    return [{"username": d["username"], "date": d["date"], "url": d["url"]} for d in lst]


def run_analysis(following_raw: dict | list, followers_raw: dict | list) -> dict:
    """
    Main analysis pipeline.

    Args:
        following_raw: Parsed JSON from following.json
        followers_raw: Parsed JSON from followers_1.json

    Returns:
        dict with keys: stats, tidak_folbek, mutualan,
                        follow_6bln, follow_6bln_tidak_folbek
    """
    following_data = parse_ig_json(following_raw)
    followers_data = parse_ig_json(followers_raw)

    following_set = {d["username"] for d in following_data}
    followers_set = {d["username"] for d in followers_data}

    # --- Tidak folbek (you follow, they don't follow back) ---
    tidak_folbek = sorted(
        [d for d in following_data if d["username"] not in followers_set],
        key=lambda x: x["timestamp"],
        reverse=True,
    )

    # --- Mutualan (mutual follows) ---
    mutualan = sorted(
        [d for d in following_data if d["username"] in followers_set],
        key=lambda x: x["timestamp"],
        reverse=True,
    )

    # --- Followed in the last 6 months ---
    six_months_ago = datetime.now(tz=timezone.utc) - timedelta(days=180)

    follow_6bln = sorted(
        [d for d in following_data if d["datetime_obj"] and d["datetime_obj"] >= six_months_ago],
        key=lambda x: x["timestamp"],
        reverse=True,
    )

    follow_6bln_tidak_folbek = [d for d in follow_6bln if d["username"] not in followers_set]

    return {
        "stats": {
            "following_total":          len(following_set),
            "followers_total":          len(followers_set),
            "tidak_folbek":             len(tidak_folbek),
            "mutualan":                 len(mutualan),
            "follow_6bln":              len(follow_6bln),
            "follow_6bln_tidak_folbek": len(follow_6bln_tidak_folbek),
        },
        "tidak_folbek":             _clean(tidak_folbek),
        "mutualan":                 _clean(mutualan),
        "follow_6bln":              _clean(follow_6bln),
        "follow_6bln_tidak_folbek": _clean(follow_6bln_tidak_folbek),
    }
