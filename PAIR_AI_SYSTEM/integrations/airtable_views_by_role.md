## Airtable Views by Role (Owner / Ally / Emma / Kiersten / General)

**Goal**: Everyone sees what they need, nothing more. Same data, different views.

This is designed for Airtable **Interfaces** (dashboards), backed by standard table **Views**.

---

## 1) Owner view (Founder dashboard)

### Interface page: `OWNER — Weekly Command Center`

**Blocks to include**
- `Weekly Scoreboard` (from `Scorecards` or a single “Weekly Scoreboard” record)
  - Follower growth
  - Revenue
  - AOV
  - Labor % (revenue vs wages)
  - Cleanliness score
  - Inventory adherence (stock-outs)
  - Employee + customer satisfaction pulse
- `Orders & Events — Booked / Deposit pending (next 14 days)`
- `Risks / Blockers` (from `Tasks` filtered Status = Blocked)
- `Decisions needed` (from `Meetings` notes, or a “Decisions” field you add)

**Filters**
- Orders: Status in {Deposit pending, Booked, In production}
- Tasks: Status != Done

---

## 2) Ally view (GM dashboard)

### Interface page: `ALLY — GM Daily Ops`

**Blocks to include**
- `Today’s shifts` (from `Shifts`, Date = today)
- `This week schedule` (calendar from `Shifts`, Date = this week)
- `Unassigned shifts` (Shifts where Assigned to is empty)
- `Orders & Events — This week` (Status in active states)
- `Production day plan` (from `Production Days`, next production day + linked orders)
- `Inventory — LOW / NEEDS ORDER` (from `Inventory`, Reorder qty > 0)
- `Tasks — Ally` (from `Tasks`, Owner = Ally, Status != Done)
- `Wednesday labor check` (Task list or checklist record)

**Must-have table views behind it**
- `Shifts — This week`
- `Shifts — Needs assignment`
- `Inventory — LOW / NEEDS ORDER`
- `Orders — Active`
- `Tasks — Ally`

---

## 3) Emma view (FOH dashboard)

### Interface page: `EMMA — FOH Command`

**Blocks to include**
- `Emma’s shifts` (from `Shifts`, Assigned to = Emma, Date = this week)
- `FOH tasks` (from `Tasks`, Area = FOH, Status != Done)
- `FOH inventory watchlist` (from `Inventory`, Category in {Coffee, Packaging, Grab & go, Cleaning} AND Reorder qty > 0)
- `Today’s orders affecting FOH` (from `Orders & Events`, Date = today/this week)
- `Cleanliness audit / checklist` (link to the FOH checklist doc process)

**Must-have table views behind it**
- `Tasks — FOH`
- `Inventory — FOH low`

---

## 4) Kiersten view (Kitchen + Social dashboard)

### Interface page: `KIERSTEN — Kitchen + Social`

**Blocks to include**
- `Kiersten’s shifts` (from `Shifts`, Assigned to = Kiersten, Date = this week)
- `BOH/Kitchen tasks` (from `Tasks`, Area = BOH or Kitchen, Status != Done)
- `Production day plan` (from `Production Days`, next production day + linked orders)
- `Orders & Events — This week (kitchen-impacting)`
  - Filter Types in {Catering, Cart, Tray, Workshop, Brunch, Private event} AND Status in active states
- `Kitchen inventory watchlist`
  - From `Inventory`, Category in {Dairy, Meat, Cheese, Produce, Dry goods, Packaging} AND Reorder qty > 0
- `Social content tasks`
  - From `Tasks`, Area = Marketing AND Owner = Kiersten (or Assigned lead = Kiersten)

**Must-have table views behind it**
- `Tasks — Kitchen`
- `Inventory — Kitchen low`
- `Production Days — Next`

---

## 5) General view (shared ops dashboard)

### Interface page: `GENERAL — Today`

**Blocks to include**
- `Today’s shifts`
- `Today’s orders/events`
- `Low inventory`
- `Tasks due today`

**Filters**
- Shifts: Date = today
- Orders: Event date = today OR Status = In production
- Tasks: Due date = today AND Status != Done

---

## 6) How to build this quickly (click-by-click)

1) In Airtable, open your base → click **Interfaces**
2) Create a new Interface called: **PAIR Ops**
3) Add pages:
   - OWNER — Weekly Command Center
   - ALLY — GM Daily Ops
   - EMMA — FOH Command
   - KIERSTEN — Kitchen + Social
   - GENERAL — Today
4) On each page, add blocks from tables (`Shifts`, `Orders & Events`, `Inventory`, `Tasks`, `Meetings/Scorecards`)
5) Set filters per page (as specified above)

**Tip**: For “my tasks” style blocks, set filter:
- Owner is **current user** (if available), otherwise Owner = Ally/Emma explicitly.

