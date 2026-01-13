#!/usr/bin/env python3
"""
Pull Airtable inventory records and export to JSON.

Env vars required:
- AIRTABLE_TOKEN: Personal access token (pat_...)
- AIRTABLE_BASE_ID: Base ID (app...)
- AIRTABLE_TABLE: Table name or table ID

Optional:
- AIRTABLE_VIEW: View name
"""

from __future__ import annotations

import json
import os
import sys
import time
import urllib.parse
import urllib.request


def _required_env(name: str) -> str:
    value = os.getenv(name)
    if not value:
        raise RuntimeError(f"Missing required env var: {name}")
    return value


def _airtable_get(url: str, token: str) -> dict:
    req = urllib.request.Request(
        url,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        },
        method="GET",
    )
    with urllib.request.urlopen(req, timeout=30) as resp:  # nosec - controlled URL
        return json.loads(resp.read().decode("utf-8"))


def main() -> int:
    token = _required_env("AIRTABLE_TOKEN")
    base_id = _required_env("AIRTABLE_BASE_ID")
    table = _required_env("AIRTABLE_TABLE")
    view = os.getenv("AIRTABLE_VIEW")

    # Airtable List Records endpoint:
    # GET https://api.airtable.com/v0/{baseId}/{tableNameOrId}
    base_url = f"https://api.airtable.com/v0/{urllib.parse.quote(base_id)}/{urllib.parse.quote(table)}"

    params = {}
    if view:
        params["view"] = view

    all_records: list[dict] = []
    offset: str | None = None

    while True:
        q = dict(params)
        if offset:
            q["offset"] = offset
        url = base_url + ("?" + urllib.parse.urlencode(q) if q else "")

        payload = _airtable_get(url, token)
        records = payload.get("records", [])
        all_records.extend(records)

        offset = payload.get("offset")
        if not offset:
            break

        # Be polite to API rate limits.
        time.sleep(0.25)

    out_path = os.path.join(
        os.path.dirname(os.path.dirname(__file__)),
        "data",
        "airtable_inventory.json",
    )
    os.makedirs(os.path.dirname(out_path), exist_ok=True)

    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(
            {
                "exported_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
                "base_id": base_id,
                "table": table,
                "view": view,
                "record_count": len(all_records),
                "records": all_records,
            },
            f,
            indent=2,
            ensure_ascii=False,
        )

    print(f"Wrote {len(all_records)} records to {out_path}")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as e:
        print(f"ERROR: {e}", file=sys.stderr)
        raise SystemExit(1)

