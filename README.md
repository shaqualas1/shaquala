# Pair Ordering Agent

An embeddable customer-ordering experience backed by an API + SQLite database. Drop a single script tag onto any page to spin up a chat-like agent that captures a shopper's intent, validates the request, and saves it to a persistent queue you can review later.

## What’s inside

- **Express API** with CORS enabled, health checks, and typed validation via Zod.
- **SQLite (better-sqlite3)** for zero-config persistence; stores raw payloads plus normalized columns for analytics.
- **Catalog endpoint** providing the agent with the latest inventory metadata.
- **Embeddable widget** (`public/agent.js` + `agent.css`) that runs anywhere—inline or as a floating launcher—and talks to the API.

## Getting started

```bash
npm install        # already run here, but safe to repeat
npm run dev        # nodemon reloads API + serves /public
```

- App boots on `http://localhost:8080`.
- Visit `http://localhost:8080/` to try the widget.
- `GET http://localhost:8080/health` confirms uptime/status.

### Environment

Copy `.env.example` to `.env` and tweak if needed:

```
PORT=8080
ADMIN_ACCESS_KEY=change-me        # header value for admin-only list endpoints
DB_FILE=./data/pair-orders.db     # SQLite path; folder auto-created
```

## API reference

| Method | Path | Notes |
| --- | --- | --- |
| `GET` | `/api/catalog` | Returns the current styles the agent suggests. |
| `POST` | `/api/orders` | Public endpoint, validated via Zod, persists to SQLite. |
| `GET` | `/api/orders` | Requires header `x-admin-key: <ADMIN_ACCESS_KEY>`. Supports `?limit` & `?offset`. |
| `GET` | `/api/orders/:id` | Same auth header; fetch a single record. |

All responses are JSON. Orders include normalized columns plus the `catalogSnapshot` used when the shopper submitted.

## Embedding the agent

Serve `public/agent.js` + `public/agent.css` from any host (the Express server already does this). Then drop the snippet wherever you want the experience to render. The script auto-mounts into the `data-agent-container` target (falls back to a floating launcher if omitted) and defaults to the current origin for API calls.

```html
<div id="pair-ordering-agent"></div>
<script
  defer
  src="https://your-domain.com/agent.js"
  data-agent-container="pair-ordering-agent"
  data-api-base="https://your-domain.com"
></script>
```

**Attributes**

- `data-agent-container` *(optional)* – ID of the element to mount inside.
- `data-api-base` *(optional)* – Absolute base URL for the API. Leave blank when widget + API share a host.
- `data-auto-init="false"` *(optional)* – Skip automatic mounting; call `window.PairAgent.mount()` yourself.

**Manual mounting**

```html
<div class="pair-agent-slot"></div>
<script defer src="/agent.js" data-auto-init="false"></script>
<script>
  window.PairAgent.mount('.pair-agent-slot', {
    apiBase: 'https://orders.example.com'
  });
</script>
```

The widget fetches catalog data from `/api/catalog`, walks the shopper through six conversational steps, and posts the normalized payload to `/api/orders`. On success it surfaces the generated order ID plus a confirmation message.

## Data model

`orders` table columns:

- `id` (Snowflake-esque via `nanoid`)
- `customer_name`, `email`, `phone`
- `pair_type`, `size`, `color`, `quantity`
- `contact_preference`, `notes`, `urgency`, `budget`
- `catalog_snapshot` (JSON blob), `raw_payload` (JSON)
- `status`, `created_at`, `updated_at`

Everything lives in `data/pair-orders.db` (ignored by git). Swap the storage layer later by swapping `src/db.js`.

## Deployment tips

- Use `npm start` to run the production server (no nodemon).
- Keep `ADMIN_ACCESS_KEY` secret; rotate it as needed.
- For serverless or PaaS deploys, persist the `data/` directory or point `DB_FILE` to a managed SQLite/VFS path.
- Behind a CDN? Expose `/agent.js`, `/agent.css`, and `/api/*` routes; everything else is static.

## Next ideas

- Plug in email/SMS notifications after each order (Sendgrid, Twilio, etc.).
- Pipe admin listing endpoint into your CRM/Notion.
- Add analytics events inside `public/agent.js` (segment, GA4, etc.).
