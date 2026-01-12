## Airtable Inventory Integration (PAIР)

### What this does
- Pulls your Airtable inventory table via the Airtable API
- Writes a local export JSON file to: `PAIR_AI_SYSTEM/data/airtable_inventory.json`

### What I need from Airtable (you do this once)

1) **Personal access token (PAT)**
- Airtable → Account → Developer hub → Personal access tokens
- Create a token with scope(s):
  - `data.records:read`
- Grant access to the workspace/base that contains your inventory.

2) **Base ID**
- Open your base in Airtable.
- Base ID usually looks like `appXXXXXXXXXXXXXX`.
- From your link, your Base ID appears to be: `appedOf48YBJQjyT4`

3) **Table name** (or Table ID)
- Use the table name exactly as it appears (example: `Inventory`).

### How to run the pull

From the repo root:

```bash
export AIRTABLE_TOKEN="pat_..."
export AIRTABLE_BASE_ID="appedOf48YBJQjyT4"
export AIRTABLE_TABLE="Inventory"
python3 "PAIR_AI_SYSTEM/integrations/airtable_pull_inventory.py"
```

Optional:
- `AIRTABLE_VIEW="Grid view"` (or another view)

### Security
- **Never commit** your Airtable token.
- This repo ignores `.env` and `PAIR_AI_SYSTEM/data/` via `.gitignore`.

