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

### Quick test
1. Open `agents/sales/system_prompt.md`
2. Ask in chat: “Generate a quote following your system rules for: [inquiry]”
3. If the rulebooks don’t contain what’s needed, Sales should escalate instead of guessing.

