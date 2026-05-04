"""
utils/parser.py
Parses raw Instagram export JSON into a normalized list of user dicts.
"""

from datetime import datetime, timezone


def parse_ig_json(raw) -> list:
    """
    Accepts either:
      - a list  (followers_1.json format)
      - a dict  (following.json format  — first key contains the list)

    Returns a list of dicts:
      {username, timestamp, url, date, datetime_obj}
    """
    if isinstance(raw, list):
        items = raw
    elif isinstance(raw, dict):
        key = list(raw.keys())[0]
        items = raw[key]
    else:
        return []

    result = []
    for entry in items:
        sld      = entry.get("string_list_data", [])
        username = entry.get("title", "").strip()

        if sld:
            ts  = sld[0].get("timestamp", 0)
            url = sld[0].get("href", "")
            if not username:
                username = sld[0].get("value", "").strip()
        else:
            ts, url = 0, ""

        if username:
            dt = datetime.fromtimestamp(ts, tz=timezone.utc) if ts else None
            result.append(
                {
                    "username":     username,
                    "timestamp":    ts,
                    "url":          url,
                    "date":         dt.strftime("%d %b %Y") if dt else "-",
                    "datetime_obj": dt,
                }
            )
    return result
