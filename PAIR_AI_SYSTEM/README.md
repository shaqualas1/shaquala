## PAIR AI SYSTEM (Cursor Workspace)

This folder is meant to be opened as its own workspace in Cursor.

### Open correctly (important)
- In Cursor: **Open Folder** → select `PAIR_AI_SYSTEM/`
- The agent prompts reference paths like `/rulebooks/...` which will resolve correctly when `PAIR_AI_SYSTEM/` is the workspace root.

### What’s here
- `agents/`: role prompts (Sales, Menu/Pricing, Ops, Scheduling, COS)
- `rulebooks/`: business rules (menu, pricing, customization, capacity, escalation)
- `templates/`: reusable outputs (quotes, capacity checks, ops briefs)
- `integrations/`: later automation docs
- `logs/`: decision + exception history

### Start here (index)
- **Operating principles + team structure**: `rulebooks/operations_system.md`
- **Roles + expectations**: `rulebooks/roles_and_expectations.md`
- **Ally (GM) expectations**: `rulebooks/gm_expectations_ally.md`
- **Meeting cadence**: `rulebooks/meeting_cadence.md`
- **Menu (source of truth)**: `rulebooks/menu_catalog.md`
- **Capacity (hours/availability rules)**: `rulebooks/capacity_rules.md`
- **Pricing rules**: `rulebooks/pricing_rules.md`
- **People policies**: `rulebooks/people_policies.md`

### Meeting packets (copy/paste ready)
- Monday 9am (Founder + Ally): `templates/monday_9am_management_meeting_packet.md`
- Monday sync (Ally + Kiersten): `templates/monday_ally_kiersten_sync_packet.md`

### Checklists
- Ally weekly checklist: `templates/gm_weekly_checklist_ally.md`
- Emma FOH checklist: `templates/emma_foh_checklist.md`
- Kiersten kitchen + social checklist: `templates/kiersten_kitchen_social_checklist.md`
- Production day checklist: `templates/daily_production_day_checklist.md`
- Leadership follow-up checklist: `templates/leadership_followup_checklist.md`

### Airtable (when you’re ready)
- Inventory pull setup: `integrations/airtable_inventory.md`
- Operating system blueprint: `integrations/airtable_operating_system.md`
- Role-based dashboards/views: `integrations/airtable_views_by_role.md`

### Quick test
1. Open `agents/sales/system_prompt.md`
2. Ask in chat: “Generate a quote following your system rules for: [inquiry]”
3. If the rulebooks don’t contain what’s needed, Sales should escalate instead of guessing.

