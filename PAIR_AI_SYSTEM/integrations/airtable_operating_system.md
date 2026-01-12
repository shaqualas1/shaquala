## PAIR Operating System in Airtable (Scheduler + Inventory + Team + Meetings)

**Goal**: One place to see: schedule, orders/events, production plan, low inventory, tasks, and team performance.

This is designed to work even if you start simple and expand later.

---

## 1) Airtable base structure (tables)

### A) `Team`
Use this as your roster.

**Fields**
- Name (primary)
- Role (single select: GM, FOH Lead, Kitchen Lead, Barista/FOH, Kitchen, People Ops, etc.)
- Phone
- Email
- Active (checkbox)
- Default availability (link to `Availability` or long text to start)
- Notes

### B) `Availability`
**Fields**
- Team member (link → `Team`)
- Day of week (single select)
- Start time (time)
- End time (time)
- Notes
- Effective date (date) (optional)
- Exception / time off (checkbox) (optional)

### C) `Shifts` (the scheduler)
**Fields**
- Date (date)
- Start time (time)
- End time (time)
- Position (single select: FOH, Barista, Kitchen, Lead, etc.)
- Assigned to (link → `Team`)
- Published (checkbox)
- Notes
- Coverage OK? (formula/checkbox) (optional)

**Views**
- Calendar view (week)
- “Needs assignment” (Assigned to is empty)
- “Unpublished” (Published is false)

### D) `Orders & Events`
This is catering + carts + trays + workshops.

**Fields**
- Client name (primary)
- Type (single select: Catering, Cart, Tray, Workshop, Brunch, Private event)
- Event date (date)
- Event time (time)
- Service type (single select: Pickup, Delivery, Setup, Staffed)
- Guest count (number)
- Status (single select: New, Needs info, Quoted, Deposit pending, Booked, In production, Completed, Declined)
- Menu summary (long text)
- Notes / special requests (long text)
- Assigned lead (link → `Team`)
- Ops owner (link → `Team`) (optional)

**Views**
- “This week”
- “Upcoming booked”
- “Needs info”

### E) `Production Days`
**Fields**
- Date (date) (primary)
- Is production day (checkbox)
- Why/notes (text)
- Prep focus (text)
- Linked orders (link → `Orders & Events`)

> Rulebook note: your policy is “every other day + Saturday always.” In Airtable, start with a checkbox you set manually, then automate later.

### F) `Inventory`
**Fields**
- Item (primary)
- Category (single select: Coffee, Dairy, Meat, Cheese, Produce, Packaging, Dry goods, Cleaning, Other)
- Unit (single select: each, lb, oz, gal, case, bottle)
- On hand (number)
- PAR (number)
- Reorder qty (formula: `MAX(0, PAR - On hand)`)
- Vendor (text)
- Unit cost (currency) (optional for pricing later)
- Last ordered (date) (optional)

**Views**
- “LOW / NEEDS ORDER” (Reorder qty > 0)
- “Coffee order list”
- “Packaging”

### G) `Tasks`
**Fields**
- Task (primary)
- Area (single select: FOH, BOH, Inventory, Catering, Scheduling, Admin, Marketing)
- Owner (link → `Team`)
- Due date (date)
- Status (single select: Not started, In progress, Done, Blocked)
- Related order (link → `Orders & Events`) (optional)
- Related production day (link → `Production Days`) (optional)
- Notes

**Views**
- “Today”
- “This week”
- “Blocked”

### H) `Meetings`
**Fields**
- Meeting (primary) (e.g., “Monday 9AM Mgmt”)
- Date/time (date/time)
- Attendees (link → `Team`) (or long text)
- Agenda (long text)
- Notes (long text)
- Action items created? (checkbox)

### I) `Scorecards` (optional but powerful)
**Fields**
- Period start (date)
- Period end (date)
- Role (single select)
- Owner (link → `Team`)
- Metrics (long text to start, or separate fields later)
- Summary (long text)

---

## 2) “What you need to see” (recommended dashboards / Interface pages)

### Manager Home (one screen)
- **Today’s shifts** (from `Shifts`, filtered Date = today)
- **Today’s orders/events** (from `Orders & Events`)
- **Low inventory** (from `Inventory`, Reorder qty > 0)
- **Tasks due today** (from `Tasks`)

### Scheduling
- Weekly calendar (Shifts)
- Unassigned shifts
- Unpublished schedule

### Inventory
- Low inventory view
- Coffee order list view (filtered)

### Orders / Events
- This week
- Booked
- Deposit pending

### Team performance (later)
- Role scorecards
- Incentives/recognition

---

## 3) Automations (start with these 3)

1) **Low inventory → create task**
- Trigger: Inventory record where Reorder qty becomes > 0
- Action: Create Task “Reorder: [Item]” due tomorrow, owner = GM (or inventory owner)

2) **New booked order → create ops tasks**
- Trigger: Orders & Events status becomes “Booked”
- Action: Create Tasks: “Ops brief”, “Production plan”, “Confirm inventory”, “Day-of checklist”

3) **Monday meeting packet**
- Trigger: Monday 8:30 AM
- Action: Create a Meetings record with agenda pre-filled (use your templates)

---

## 4) How Cursor agents plug into this

- Use Airtable as the **live operations source of truth** (schedule, inventory counts, order status).
- Use Cursor `rulebooks/` as the **policy source of truth** (what’s allowed, how decisions are made).
- If Airtable and rulebooks conflict → escalate to Chief of Staff.

