# PAIR Charcuterie - Pricing Structure

## 💰 Catering Pricing Model

### Per-Person Pricing (Confirmed)

| Package | Price/Person | What's Included |
|---------|--------------|-----------------|
| **CLASSIC** | **$13** | 3 meats, 3 cheeses, crackers, seasonal accompaniments |
| **PREMIUM** | **$20** | 4 meats, 4 cheeses, premium crackers, seasonal fruits, spreads |
| **DELUXE** | **$28** | 5+ meats, 5+ cheeses, artisan crackers, fruits, nuts, specialty items |

### Pricing Examples

**Classic Board:**
- 10 guests: $130
- 25 guests: $325
- 50 guests: $650
- 100 guests: $1,300

**Premium Spread:**
- 10 guests: $200
- 25 guests: $500
- 50 guests: $1,000
- 100 guests: $2,000

**Deluxe Grazing Table:**
- 10 guests: $280
- 25 guests: $700
- 50 guests: $1,400
- 100 guests: $2,800

### Add-Ons (Optional)

| Add-On | Price | Notes |
|--------|-------|-------|
| Extra meat selection | +$3/person | Additional premium meat |
| Extra cheese variety | +$3/person | Specialty or imported cheese |
| Gluten-free crackers | +$2/person | Replace standard crackers |
| Vegan options | +$2/person | Plant-based alternatives |
| Individual boxes | +$1/person | Separate serving boxes instead of board |
| Premium presentation | +$50 flat | Elevated display, florals, signage |

---

## 🚚 Delivery Pricing

### Distance-Based Fees (From 201 Smithfield St)

| Distance | Fee | Example Neighborhoods |
|----------|-----|----------------------|
| **0-5 miles** | **$25 flat** | Downtown, North Shore, Oakland, Shadyside, Strip District |
| **5-10 miles** | **$25 + $2/extra mile** | Squirrel Hill, Lawrenceville, Highland Park |
| **10-15 miles** | **$40 + $3/extra mile** | Mt. Lebanon, Bethel Park, Ross Township |
| **15+ miles** | **Custom quote** | Cranberry, Wexford, outer suburbs |

### Delivery Examples

| Destination | Distance | Fee Calculation | Total Fee |
|-------------|----------|-----------------|-----------|
| Point Park University | 0.3 mi | Base | $25 |
| North Shore | 0.8 mi | Base | $25 |
| South Side | 1.5 mi | Base | $25 |
| Oakland (Pitt) | 3.8 mi | Base | $25 |
| Shadyside | 4.5 mi | Base | $25 |
| Lawrenceville | 3.2 mi | Base | $25 |
| Squirrel Hill | 6.0 mi | $25 + ($2 × 1) | $27 |
| Highland Park | 7.5 mi | $25 + ($2 × 2.5) | $30 |
| Mt. Lebanon | 12 mi | $40 + ($3 × 2) | $46 |
| Cranberry | 20 mi | Custom | Call for quote |

### Pickup Option
- **FREE pickup** at 201 Smithfield Street
- Available during ghost kitchen hours: 5pm-9pm Mon-Sat
- Or by appointment during shop hours: 7:30am-3:30pm Mon-Sat

---

## 📅 Service Fees & Policies

### Service Fee
- **10% service fee** on orders over $500
- Covers: Setup, serving utensils, disposable plates/napkins, cleanup materials

### Deposit Policy (Events 3+ Months Out)
- **Option 1:** Pay full amount upfront
- **Option 2:** Pay $250 deposit or 25% (whichever is greater)
- Balance due 30 days before event
- Deposit is non-refundable within 72 hours of event

### Minimum Notice
- **Standard orders:** 3 days minimum
- **Rush orders (next day):** +$50 rush fee, subject to availability
- **Same day:** Not available (need prep time)

### Cancellation Policy
- **>72 hours notice:** Full refund
- **48-72 hours notice:** 50% refund
- **<48 hours notice:** No refund (order already prepped)
- **Events 3+ months out:** Deposit non-refundable, balance refunded if cancelled >72 hours

---

## 🧮 Quote Calculator Logic

### Formula for Quote System

```javascript
// Base calculation
const guestCount = [user input];
const packagePrice = {
  classic: 13,
  premium: 20,
  deluxe: 28
};

// 1. Calculate board cost
const selectedPackage = [user selection]; // classic, premium, or deluxe
const boardCost = guestCount * packagePrice[selectedPackage];

// 2. Add add-ons
const addOnCost = 0;
// If extra meat: addOnCost += guestCount * 3
// If extra cheese: addOnCost += guestCount * 3
// If gluten-free: addOnCost += guestCount * 2
// If vegan: addOnCost += guestCount * 2
// If individual boxes: addOnCost += guestCount * 1
// If premium presentation: addOnCost += 50

// 3. Calculate delivery fee
const distance = [calculated from Google Maps API];
let deliveryFee = 0;

if (deliveryType === 'pickup') {
  deliveryFee = 0;
} else if (distance <= 5) {
  deliveryFee = 25;
} else if (distance <= 10) {
  deliveryFee = 25 + Math.ceil((distance - 5) * 2);
} else if (distance <= 15) {
  deliveryFee = 40 + Math.ceil((distance - 10) * 3);
} else {
  deliveryFee = 'custom'; // Manual review required
}

// 4. Calculate service fee
const subtotal = boardCost + addOnCost;
const serviceFee = (subtotal >= 500) ? subtotal * 0.10 : 0;

// 5. Calculate total
const total = subtotal + deliveryFee + serviceFee;

// 6. Calculate deposit option (if event is 90+ days away)
const daysUntilEvent = [calculated from event date];
const depositAmount = (daysUntilEvent >= 90) 
  ? Math.max(250, total * 0.25) 
  : total; // Full payment required if <90 days
```

### Example Calculations

**Example 1: Small Corporate Lunch**
- Guests: 20
- Package: Premium ($20/person)
- Add-ons: None
- Delivery: Oakland (3.8 miles)
- Event date: 45 days away

```
Board cost: 20 × $20 = $400
Add-ons: $0
Subtotal: $400
Service fee: $0 (under $500)
Delivery: $25 (within 5 miles)
─────────────────────
TOTAL: $425
Payment: Full $425 (event <90 days)
```

**Example 2: Large Wedding**
- Guests: 100
- Package: Deluxe ($28/person)
- Add-ons: Individual boxes (+$1/person), Premium presentation (+$50)
- Delivery: Mt. Lebanon (12 miles)
- Event date: 6 months away

```
Board cost: 100 × $28 = $2,800
Add-ons: (100 × $1) + $50 = $150
Subtotal: $2,950
Service fee: $2,950 × 10% = $295
Delivery: $40 + (2 × $3) = $46
─────────────────────
TOTAL: $3,291
Payment options:
  - Full: $3,291 now
  - Deposit: $823 now (25%), $2,468 due 30 days before
```

**Example 3: Medium Nonprofit Event**
- Guests: 50
- Package: Classic ($13/person)
- Add-ons: Vegetarian options (+$2/person)
- Delivery: Pickup (free)
- Event date: 10 days away

```
Board cost: 50 × $13 = $650
Add-ons: 50 × $2 = $100
Subtotal: $750
Service fee: $750 × 10% = $75
Delivery: $0 (pickup)
─────────────────────
TOTAL: $825
Payment: Full $825 (event <90 days)
```

---

## 💡 Pricing Strategy Notes

### Why $13 Base Price?

**Competitive:**
- Lower than typical Pittsburgh catering ($20-30/person)
- Accessible for nonprofits, small businesses
- Room to scale up to premium tiers

**Profitable:**
- Cost of goods: ~$5-6/person (estimated)
- Gross margin: ~55-60%
- Covers labor, overhead, delivery

**Psychological:**
- $13 feels like great value
- Easy to calculate (50 guests = $650)
- Clear upgrade path ($13 → $20 → $28)

### Upselling Strategy

**During Quote Process:**
1. Show Classic first ($13) - anchor low price
2. Highlight Premium ($20) - "Most popular!"
3. Present Deluxe ($28) - premium option
4. Offer add-ons at checkout
5. Suggest delivery over pickup (convenience)

**Email Follow-Up:**
- "Upgrade to Premium for just $7 more per person"
- "Add premium presentation for stunning photos"
- "Consider individual boxes for easier serving"

---

## 📊 Revenue Projections

### Conservative (2 catering orders/week)

**Average order:** $1,000 (50 guests × $20)
- Weekly: $2,000
- Monthly: $8,000
- Annual: $96,000

**Profit (assuming 55% margin):**
- Monthly: $4,400
- Annual: $52,800

### Moderate (5 catering orders/week)

**Average order:** $1,200 (mix of sizes)
- Weekly: $6,000
- Monthly: $24,000
- Annual: $288,000

**Profit:**
- Monthly: $13,200
- Annual: $158,400

### Aggressive (10 catering orders/week)

**Average order:** $1,500 (larger events)
- Weekly: $15,000
- Monthly: $60,000
- Annual: $720,000

**Profit:**
- Monthly: $33,000
- Annual: $396,000

**ROI on $8,400 system:**
- Conservative: 6.3x return in Year 1
- Moderate: 18.9x return
- Aggressive: 47.1x return

---

## 🎯 Pricing for Developer

**Pass these specs to developer for quote calculator:**

```json
{
  "packages": {
    "classic": {
      "name": "Classic Board",
      "price_per_person": 13,
      "description": "3 meats, 3 cheeses, crackers, seasonal accompaniments",
      "min_guests": 10
    },
    "premium": {
      "name": "Premium Spread",
      "price_per_person": 20,
      "description": "4 meats, 4 cheeses, premium crackers, fruits, spreads",
      "min_guests": 10,
      "badge": "Most Popular"
    },
    "deluxe": {
      "name": "Deluxe Grazing Table",
      "price_per_person": 28,
      "description": "5+ meats, 5+ cheeses, artisan crackers, fruits, nuts, specialty items",
      "min_guests": 10
    }
  },
  "add_ons": {
    "extra_meat": { "price_per_person": 3 },
    "extra_cheese": { "price_per_person": 3 },
    "gluten_free": { "price_per_person": 2 },
    "vegan": { "price_per_person": 2 },
    "individual_boxes": { "price_per_person": 1 },
    "premium_presentation": { "price_flat": 50 }
  },
  "delivery": {
    "base_range_miles": 5,
    "base_fee": 25,
    "tier2_range_miles": 10,
    "tier2_base": 25,
    "tier2_per_mile": 2,
    "tier3_range_miles": 15,
    "tier3_base": 40,
    "tier3_per_mile": 3,
    "beyond_tier3": "custom_quote"
  },
  "service_fee": {
    "threshold": 500,
    "percentage": 0.10
  },
  "deposit": {
    "days_threshold": 90,
    "percentage": 0.25,
    "minimum": 250
  }
}
```

---

**This pricing has been confirmed and is ready for implementation!**

**Last Updated:** November 22, 2025 - Ready to build!
