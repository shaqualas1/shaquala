# PAIR Charcuterie - Catering MVP Specifications

## 🎯 Project Goal
Launch a catering-focused ordering system for PAIR Charcuterie by **December 31, 2025** to capture high-value catering orders ($300-$5,000) and grow corporate/event business.

---

## 📊 Business Context

### Current State
- **In-store orders**: 20/day × $9 = $180/day ($5,400/month)
- **Online orders**: 5/day × $300 = $1,500/day ($45,000/month)
- **Total revenue**: ~$50,000/month

### The Opportunity
- Average catering order: $300-$1,500 (up to $5,000 for corporate)
- Just **2 additional catering orders/week** = $8,000/month = $96K/year new revenue
- **ROI**: System pays for itself in 3-4 catering orders

### Core Problems to Solve
1. ❌ Hard to reach (no 24/7 ordering)
2. ❌ Slow to respond to inquiries
3. ❌ Pricing unclear to customers
4. ❌ Photos don't showcase catering capability
5. ❌ Website doesn't clearly state "we do catering"
6. ❌ Staff not trained on catering offerings
7. ❌ No delivery pricing transparency

---

## 🚀 MVP Solution: "Catering Growth Engine"

### Phase 1: Launch by Dec 31, 2025 (5-6 weeks)

**What We're Building:**
1. Professional catering landing page
2. Interactive quote builder (instant pricing)
3. Smart delivery calculator
4. Catering portfolio showcase
5. Automated quote/confirmation emails
6. Stripe payment processing
7. Simple staff dashboard
8. Basic online ordering for walk-in customers

**What We're NOT Building (Phase 2):**
- AI chatbot
- SMS ordering
- Loyalty program
- Full inventory management
- Mobile apps
- Kitchen display system

---

## 🎨 Design Requirements

### Brand Guidelines
**Based on:** pairpgh.com + Instagram @pairpgh

**Visual Style:**
- Clean, modern, premium
- Lots of whitespace
- Beautiful food photography (hero images)
- Mobile-first responsive design
- Pittsburgh-focused (local pride)

**Color Palette:**
- Extract from current website
- Professional but warm
- High contrast for accessibility

**Typography:**
- Professional sans-serif headings
- Readable body text
- Clear hierarchy

**Imagery:**
- High-resolution photos of charcuterie boards
- Catering setups (corporate, events, weddings)
- Behind-the-scenes prep (builds trust)
- Pittsburgh landmarks (if available)

---

## 📄 Page Structure

### 1. Home Page (`pairpgh.com`)
**Updated/Enhanced from current site**

**Hero Section:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Full-width image: Your best charcuterie board]

Artisan Charcuterie & Coffee
Downtown Pittsburgh

[Button: Order Catering] [Button: Order Pickup]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Key Sections:**
- About PAIR (keep existing content)
- **NEW: "We Cater Your Events"** section
  - "From corporate meetings to weddings, we bring artisan charcuterie to your Pittsburgh event"
  - [Button: View Catering Options]
- Coffee & Shop info
- Location/Hours
- Instagram feed
- Contact info

---

### 2. Catering Landing Page (`pairpgh.com/catering`)
**NEW - The Money Maker**

#### Hero Section
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Stunning full-width image of catering setup]

Elevate Your Pittsburgh Event
with Artisan Charcuterie

Corporate Events • Weddings • Private Parties
Delivered Throughout Downtown Pittsburgh

[Button: Get Instant Quote] [Button: View Portfolio]

Trusted by Pittsburgh's Leading Companies & Nonprofits
[Social proof badges/logos if available]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

#### Section: "Why Choose PAIR for Your Event?"
- ✓ Locally sourced artisan meats & cheeses
- ✓ Customizable to dietary needs
- ✓ Delivered & set up by our team
- ✓ Same-day quotes, easy online ordering
- ✓ Served hundreds of Pittsburgh events

#### Section: "Catering Packages"
3-column layout with photos:

**Column 1: Intimate Gatherings**
- 10-25 guests
- Starting at $300
- Perfect for: Meetings, small parties
- [Photo of small board setup]

**Column 2: Medium Events**
- 25-75 guests
- Starting at $800
- Perfect for: Corporate lunches, showers
- [Photo of medium spread]

**Column 3: Large Events**
- 75+ guests
- Starting at $1,500
- Perfect for: Weddings, galas, conferences
- [Photo of large grazing table]

[Button: Build Your Custom Quote]

#### Section: "How It Works"
4-step process:

1. **Get a Quote** - Answer 5 questions, instant pricing
2. **Pay Securely** - Full payment or deposit online
3. **We Prep** - Handcrafted day-of for freshness
4. **We Deliver** - Set up at your event location

#### Section: "Perfect For..."
Icon grid:
- 🏢 Corporate Meetings & Lunches
- 💍 Weddings & Receptions
- 🎉 Private Parties & Celebrations
- 🏠 Open Houses & Showings
- 🎓 Graduations & Milestones
- ❤️ Nonprofit & Community Events

#### Section: "Recent Events"
- Photo gallery (6-9 images)
- Pull from Instagram @pairpgh
- Captions with event type and guest count

#### Section: FAQ
- What's the minimum order? (You said: No minimum for catering)
- How far do you deliver? (5 miles downtown = $25, more details in quote)
- Can you accommodate dietary restrictions? (Yes - vegetarian, GF, DF, nut-free)
- How far in advance should I order? (3 days minimum, 2 weeks recommended)
- What's your cancellation policy? (Full refund >72 hours, deposit non-refundable <72 hours for events 3+ months out)
- Do you set up the display? (Yes, included in delivery)

#### Call-to-Action
[Button: Get Your Free Quote Now]

---

### 3. Interactive Quote Builder (`pairpgh.com/catering/quote`)
**NEW - Core Feature**

**Multi-step form (5 steps):**

#### Step 1: Event Details
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
What type of event are you catering?

○ Corporate Meeting/Lunch
○ Wedding or Celebration
○ Nonprofit/Community Event
○ Real Estate Open House
○ Private Party
○ Other: [text field]

[Next →]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

#### Step 2: Guest Count
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
How many guests?

[Slider: 10 ←→ 500+]
[Large number display: 50 guests]

Tip: Plan for 3-4 oz per person for appetizer,
     6-8 oz for main course

[← Back] [Next →]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

#### Step 3: Package Selection
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Choose your style:

[3-column card layout]

┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│   CLASSIC       │ │   PREMIUM       │ │   DELUXE        │
│   BOARD         │ │   SPREAD        │ │   GRAZING TABLE │
├─────────────────┤ ├─────────────────┤ ├─────────────────┤
│ [Photo]         │ │ [Photo]         │ │ [Photo]         │
│                 │ │                 │ │                 │
│ 3 meats         │ │ 4 meats         │ │ 5 meats         │
│ 3 cheeses       │ │ 4 cheeses       │ │ 5 cheeses       │
│ Accompaniments  │ │ Premium adds    │ │ Full spread     │
│                 │ │                 │ │ Specialty items │
│ $30/person      │ │ $45/person      │ │ $65/person      │
│                 │ │                 │ │                 │
│ [○ Select]      │ │ [○ Select]      │ │ [○ Select]      │
└─────────────────┘ └─────────────────┘ └─────────────────┘

Or: [Build Custom Board →]

Estimated for 50 guests: $1,500 - $3,250

[← Back] [Next →]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

#### Step 4: Dietary Accommodations
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Any dietary restrictions?

☐ Vegetarian options
☐ Vegan options
☐ Gluten-free
☐ Dairy-free
☐ Nut allergies
☐ Kosher
☐ Halal

Additional notes:
[Text area]

[← Back] [Next →]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

#### Step 5: Delivery Details
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
When & where should we deliver?

Event Date:
[Date picker - min: 3 days from today]

Event Time:
[Time picker]
Delivery arrives 30 minutes before event time

Delivery Address:
[Street address - Google autocomplete]
[City] [State] [ZIP]

○ Deliver & Set Up (+$25)
○ Pickup at PAIR Downtown (Free)

[Map showing delivery radius]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚚 Delivery Fee Calculator:
Distance from downtown: [Auto-calculated: 3.2 miles]
Delivery fee: $25 ✓

Note: We deliver within 15 miles of downtown Pittsburgh.
Farther distances may incur additional fees.

[← Back] [See Your Quote →]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

#### Step 6: Quote Summary & Checkout
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Your Custom Quote

Event: Corporate Meeting
Date: January 15, 2025 at 12:00pm
Location: 123 Liberty Ave, Pittsburgh PA
Guests: 50

PACKAGE: Premium Spread ($45/person)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Board Package (50 guests)      $2,250
Vegetarian options                  —
Delivery & Setup                  $25
Service Fee (10%)                $228
─────────────────────────────────────
TOTAL:                         $2,503

[Button: Pay Full Amount $2,503]

Event is 4 months away?
Secure your date with a deposit:
[Button: Pay $500 Deposit]
(Balance due 30 days before event)

Your information:
[Name]
[Email]
[Phone]
[Company/Organization (optional)]

☐ I agree to cancellation policy
☐ Send me updates about specials

[Stripe Card Element]

[← Back] [Complete Order →]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Questions? Call us: (412) XXX-XXXX
Or email: info@pairpgh.com
```

---

### 4. Catering Portfolio Page (`pairpgh.com/portfolio`)
**NEW**

**Hero:**
```
Our Work

From intimate gatherings to grand celebrations,
we bring artisan quality to every Pittsburgh event.
```

**Gallery:**
- Masonry grid layout (Pinterest-style)
- 20-30 photos from Instagram + any catering photos
- Hover overlay shows:
  - Event type
  - Guest count
  - Package type

**Filters:**
- All
- Corporate
- Weddings
- Private Events

**CTA at bottom:**
[Button: Plan Your Event]

---

### 5. Online Ordering Page (`pairpgh.com/order`)
**NEW - For pickup orders (not catering)**

**Simple menu layout:**

#### Boards (For Pickup)
- Small Board (feeds 2-4) - $25
  [Photo] [+ Add to Cart]
  
- Medium Board (feeds 4-8) - $35
  [Photo] [+ Add to Cart]
  
- Large Board (feeds 8-12) - $45
  [Photo] [+ Add to Cart]

#### Coffee & Drinks
- [List items with prices]

#### Retail
- Packaged meats, cheeses, crackers

**Cart Sidebar:**
- Items in cart
- Subtotal
- Tax
- Total
- [Checkout Button]

**Checkout Flow:**
- Contact info
- Pickup time (ASAP or scheduled)
- Stripe payment
- Confirmation

---

### 6. Staff Dashboard (`pairpgh.com/admin`)
**NEW - Internal only**

**Login page:**
- Email + password
- "Forgot password" link

**Dashboard Overview:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAIR Admin Dashboard

Today's Summary
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Revenue Today:        $2,450
Orders Today:              15
Pending Quotes:             3

This Week
Revenue:             $12,300
Catering Orders:            4
Pickup Orders:             45
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Navigation:**
- Catering Orders
- Pickup Orders
- Quotes (Pending)
- Menu Management
- Reports

#### Catering Orders Tab
**List view with filters:**
- All | Pending | Confirmed | Completed

**Each order card:**
```
┌─────────────────────────────────────────┐
│ Order #1234 - $2,503                    │
│ Corporate Meeting | 50 guests           │
│ Date: Jan 15, 2025 at 12:00pm          │
│ Delivery: 123 Liberty Ave              │
│                                         │
│ Status: [Confirmed ▼]                  │
│   ○ Pending Payment                    │
│   ● Confirmed (Paid)                   │
│   ○ Preparing                          │
│   ○ Out for Delivery                   │
│   ○ Completed                          │
│                                         │
│ [View Details] [Contact Customer]      │
└─────────────────────────────────────────┘
```

**Order Details Modal:**
- Full order summary
- Customer contact info
- Special instructions
- Dietary restrictions (highlighted)
- Payment status
- Internal notes field

#### Pickup Orders Tab
Similar layout, simpler details

#### Pending Quotes Tab
```
┌─────────────────────────────────────────┐
│ Quote Request #Q456                     │
│ Wedding | 100 guests                    │
│ Requested: June 20, 2025               │
│ Est. Value: $4,500                     │
│                                         │
│ Status: Awaiting Customer Payment      │
│ Sent: Nov 23, 2025 at 3:45pm          │
│                                         │
│ [View Quote] [Follow Up] [Mark Lost]   │
└─────────────────────────────────────────┘
```

#### Menu Management
- List all products
- Toggle availability (in stock / out of stock)
- Edit prices
- Add/remove items
- Upload photos

#### Reports
- Daily/weekly/monthly sales
- Revenue by channel (catering vs. pickup)
- Average order value
- Top products
- Customer list with order history

---

## 💻 Technical Specifications

### Option A: Webflow Implementation (Recommended for Dec 31 launch)

**Platform:** Webflow CMS + Custom Code

**Core Features:**
1. **Catering Pages**: Built in Webflow Designer
2. **Quote Calculator**: Custom JavaScript embed
3. **Delivery Calculator**: Google Maps Distance Matrix API
4. **Payment**: Stripe Checkout (hosted)
5. **Order Storage**: Airtable (quote requests + orders)
6. **Email**: Zapier → SendGrid (automated confirmations)
7. **Dashboard**: Airtable interface for staff

**Tech Stack:**
- Webflow (frontend + CMS)
- Custom JavaScript for quote calculator
- Stripe Checkout API
- Google Maps API
- Airtable (database)
- Zapier (automation)
- SendGrid (email)

**Data Flow:**
```
Customer fills quote form
    ↓
JavaScript calculates pricing
    ↓
Redirects to Stripe Checkout
    ↓
On success → Zapier webhook
    ↓
Creates record in Airtable
    ↓
Sends confirmation email (SendGrid)
    ↓
Notifies staff (email/SMS)
```

**Webflow CMS Collections:**
- Products (boards, add-ons)
- Portfolio Items (photos with metadata)
- Orders (linked to customers)
- Customers (contact info, order history)

**Custom Code Embeds:**
1. **Quote Calculator** (`quote-calculator.js`)
   - Multi-step form
   - Real-time pricing
   - Delivery distance calculation
   - Package selection logic

2. **Stripe Integration** (`stripe-checkout.js`)
   - Create checkout session
   - Handle success/cancel

3. **Google Maps** (`maps-distance.js`)
   - Autocomplete address
   - Calculate distance from shop
   - Determine delivery fee

**Forms:**
- Webflow native forms for simple contact
- Custom JavaScript form for quote builder
- Stripe Checkout for payments

---

### Option B: Custom Full-Stack (If more time/budget)

**Frontend:** Next.js 14 + React + Tailwind CSS
**Backend:** Node.js + NestJS
**Database:** PostgreSQL + Prisma ORM
**Cache:** Redis
**Payments:** Stripe API
**Email:** SendGrid
**SMS:** Twilio (optional)
**Hosting:** Vercel (frontend) + Railway (backend)

---

## 🧮 Pricing Logic

### Catering Package Pricing

**Per-Person Pricing:**
- Classic Board: $30/person
- Premium Spread: $45/person
- Deluxe Grazing Table: $65/person

**Minimum Guest Calculation:**
- No minimum order for catering
- But recommend minimum 10 guests for best value

**Add-Ons:**
- Extra meat selection: +$5/person
- Premium cheeses: +$8/person
- Fruit & nut upgrade: +$3/person
- Individual boxes (instead of board): +$2/person

### Delivery Pricing Algorithm

```javascript
function calculateDeliveryFee(distance) {
  if (distance <= 5) {
    return 25;
  } else if (distance <= 10) {
    return 25 + Math.ceil((distance - 5) * 2);
  } else if (distance <= 15) {
    return 40 + Math.ceil((distance - 10) * 3);
  } else {
    return 'custom'; // Staff reviews manually
  }
}

// Examples:
// 3 miles: $25
// 7 miles: $25 + $4 = $29
// 12 miles: $40 + $6 = $46
// 20 miles: "Contact us for quote"
```

**Labor Calculation (Internal):**
- Staff time: $20/hour
- Estimate: (distance × 2) / 30mph × $20
- Example: 10-mile round trip = 20 miles / 30mph = 0.67 hours × $20 = $13.40
- Plus gas: ~$2-3
- Your fee of $29 covers it ✓

### Service Fee
- 10% service fee on orders >$1,000
- Covers setup, disposables, serving utensils
- Clearly disclosed in quote

### Deposit Logic
```javascript
function calculateDeposit(total, eventDate) {
  const daysUntilEvent = Math.floor((eventDate - today) / (1000*60*60*24));
  
  if (daysUntilEvent >= 90) { // 3+ months away
    return Math.max(500, total * 0.25); // $500 or 25%, whichever is greater
  } else {
    return total; // Full payment required
  }
}
```

---

## 📧 Email Automation

### 1. Quote Confirmation Email
**Trigger:** Customer submits quote request  
**Sent to:** Customer (+ BCC to staff)  
**Template:**

```
Subject: Your PAIR Catering Quote - [Event Type] on [Date]

Hi [Customer Name],

Thank you for considering PAIR for your [event type]!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ORDER SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Event Type: [Corporate Meeting]
Date & Time: [January 15, 2025 at 12:00pm]
Guest Count: [50]
Delivery: [123 Liberty Ave, Pittsburgh PA 15222]

PACKAGE: Premium Spread
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Board Package (50 guests @ $45)      $2,250
Dietary Accommodations: Vegetarian       —
Delivery & Setup                        $25
Service Fee (10%)                      $228
─────────────────────────────────────────
TOTAL:                              $2,503

[Button: Confirm & Pay $2,503]

Event is 4+ months away?
Secure your date with just a $500 deposit:
[Button: Pay Deposit $500]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHAT'S INCLUDED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Handcrafted artisan charcuterie
✓ Locally sourced meats & cheeses
✓ Fresh fruits, nuts, crackers, spreads
✓ Professional setup & presentation
✓ Serving utensils & disposables
✓ Dietary accommodations as requested

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEXT STEPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Review your quote above
2. Click to confirm & pay securely online
3. We'll send confirmation within 24 hours
4. Sit back - we'll handle the rest!

Questions? We're here to help:
📞 Call/Text: (412) XXX-XXXX
📧 Email: catering@pairpgh.com
🌐 Website: pairpgh.com/catering

This quote is valid for 7 days.

Can't wait to make your event special!

— The PAIR Team

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAIR Charcuterie
Downtown Pittsburgh
[Address] | [Phone] | pairpgh.com
Follow us: @pairpgh
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 2. Payment Confirmation Email
**Trigger:** Customer completes payment  
**Sent to:** Customer (+ BCC to staff)

```
Subject: ✅ Catering Order Confirmed - Order #[1234]

Hi [Customer Name],

Great news! Your catering order is confirmed.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ORDER CONFIRMED
Order #1234
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Event: Corporate Meeting
Date: January 15, 2025 at 12:00pm
Delivery: 123 Liberty Ave, Pittsburgh PA 15222

Package: Premium Spread for 50 guests
Total Paid: $2,503
Payment Method: •••• 4242

[Button: View Order Details]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHAT HAPPENS NEXT?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Your order is in our system
✓ We'll reach out 7 days before to confirm details
✓ We'll prep your boards fresh day-of
✓ We'll arrive 30 minutes before your event
✓ We'll set up and make it beautiful

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEED CHANGES?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Guest count change? Dietary additions?
Contact us at least 72 hours before your event.

📞 (412) XXX-XXXX
📧 info@pairpgh.com

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CANCELLATION POLICY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• >72 hours notice: Full refund
• <72 hours: Deposits non-refundable

Thank you for choosing PAIR!

— The PAIR Team
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 3. Event Reminder Email
**Trigger:** 7 days before event  
**Sent to:** Customer

```
Subject: Your PAIR Catering Event is Next Week! 🎉

Hi [Customer Name],

Your catering order is coming up soon!

Event: January 15, 2025 at 12:00pm
Order #1234 | Premium Spread for 50 guests

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONFIRM DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Please confirm:
✓ Guest count still 50?
✓ Delivery address: 123 Liberty Ave, correct?
✓ Event time: 12:00pm (we'll arrive at 11:30am)
✓ Dietary needs: Vegetarian options

Any changes? Reply to this email or call us:
(412) XXX-XXXX

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

We're excited to be part of your event!

— The PAIR Team
```

### 4. Day-Before Reminder
**Trigger:** 1 day before event

```
Subject: Tomorrow's the Day! Your PAIR Catering Order

Hi [Customer Name],

Just a friendly reminder - we're catering your event tomorrow!

Event: TOMORROW - January 15 at 12:00pm
We'll arrive: 11:30am for setup

Address: 123 Liberty Ave, Pittsburgh PA 15222

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

All set on our end. See you tomorrow!

Questions? Call/text: (412) XXX-XXXX

— The PAIR Team
```

### 5. Post-Event Thank You
**Trigger:** 1 day after event

```
Subject: Thank You for Choosing PAIR! 🙏

Hi [Customer Name],

We hope your event yesterday was amazing!

It was our pleasure to cater your [Corporate Meeting] for 50 guests.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HOW DID WE DO?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Your feedback helps us improve.
Would you take 30 seconds to share your experience?

[Button: Leave a Review]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PLANNING ANOTHER EVENT?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Get 10% off your next catering order over $500.
Use code: THANKYOU10

[Button: Order Again]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Thanks for supporting local!

— The PAIR Team

P.S. Know someone planning an event?
Refer a friend and you both get 10% off!
```

---

## 📱 SMS Notifications (Optional)

### To Customer:
1. **Payment confirmed:** "PAIR: Order #1234 confirmed! Event 1/15 at 12pm. Details in email. Questions? (412) XXX-XXXX"
2. **Day before:** "PAIR: Reminder - we're catering your event tomorrow! We'll arrive at 11:30am. See you then!"

### To Staff:
1. **New quote request:** "NEW CATERING QUOTE: $2,503 for 50 guests on 1/15. Login to review."
2. **New order paid:** "💰 NEW ORDER #1234: $2,503 paid. Corporate meeting 1/15."

---

## 🔐 Security & Compliance

### PCI Compliance
- ✅ Use Stripe Checkout (hosted form) - Stripe handles all card data
- ✅ Never store full credit card numbers
- ✅ All transactions over HTTPS
- ✅ Stripe is PCI Level 1 compliant

### Data Protection
- Customer data encrypted in Airtable/database
- Staff dashboard requires login (email + password)
- Auto-logout after 30 minutes inactive
- Regular backups

### Privacy Policy
- Add link to footer
- Comply with basic data collection laws
- Email opt-in for marketing

---

## 📊 Analytics & Tracking

### Google Analytics 4
Track:
- Page views (catering page, quote builder)
- Quote completions
- Conversion rate (quote → payment)
- Average order value
- Traffic sources (Google Ads, Instagram, direct)

### Conversion Funnel:
1. Catering page visit
2. Start quote builder
3. Complete quote form
4. View quote summary
5. Click "Pay Now"
6. Complete payment ✅

**Goal:** >30% conversion from quote view → payment

### Dashboard Metrics:
- Quote requests per day/week
- Conversion rate
- Average order value
- Revenue (catering vs. pickup)
- Customer acquisition cost (if running ads)

---

## ✅ Launch Checklist

### Week 1-2: Design & Content (Nov 25 - Dec 8)
- [ ] Gather 30-50 high-res photos from Instagram + any catering photos
- [ ] Select best 10 photos for hero/catering page
- [ ] Write catering menu copy
- [ ] Finalize pricing tiers
- [ ] Write FAQ content
- [ ] Create email templates
- [ ] Design mockups in Figma (or directly in Webflow)

### Week 3-4: Build (Dec 9 - Dec 22)
- [ ] Set up Webflow account & CMS
- [ ] Build home page updates
- [ ] Build catering landing page
- [ ] Build quote calculator (custom JS)
- [ ] Integrate Google Maps distance API
- [ ] Set up Stripe account & connect
- [ ] Build portfolio gallery
- [ ] Build simple pickup ordering
- [ ] Set up Airtable database
- [ ] Connect Zapier automations
- [ ] Configure SendGrid email templates

### Week 5: Test & Polish (Dec 23 - Dec 29)
- [ ] Test quote calculator (all scenarios)
- [ ] Test Stripe checkout (test mode)
- [ ] Test email automations
- [ ] Mobile responsiveness check
- [ ] Cross-browser testing
- [ ] Staff training on dashboard
- [ ] Create internal documentation
- [ ] Load test (simulate traffic)

### Week 6: Launch! (Dec 30 - Dec 31)
- [ ] Switch Stripe to live mode
- [ ] Final content review
- [ ] Launch to production
- [ ] Update Google My Business with new catering link
- [ ] Social media announcement
- [ ] Email existing customers
- [ ] Monitor for issues

---

## 🎯 Success Metrics (30/60/90 Days)

### 30 Days Post-Launch (January 2025)
- 100+ visitors to catering page
- 15+ quote requests
- 5+ confirmed catering orders
- $2,500+ catering revenue
- 0 critical bugs

### 60 Days (February 2025)
- 300+ visitors
- 30+ quote requests
- 10+ confirmed orders
- $7,500+ catering revenue
- 2-3 repeat clients

### 90 Days (March 2025)
- 500+ visitors
- 50+ quote requests
- 15+ confirmed orders
- $15,000+ catering revenue
- 5+ repeat/referred clients
- ROI positive (system paid for itself)

---

## 💰 Budget Breakdown (Webflow Option)

### One-Time Costs
| Item | Cost |
|------|------|
| Professional photoshoot (if needed) | $1,500 |
| Webflow development | $4,500 |
| Quote calculator (custom JS) | $1,500 |
| Google Maps API integration | $500 |
| Stripe integration | $500 |
| Email template design | $400 |
| Testing & QA | $500 |
| **Total** | **$9,400** |

### Monthly Recurring
| Item | Cost |
|------|------|
| Webflow hosting (CMS plan) | $29 |
| Domain | $1 |
| Stripe fees | 2.9% + $0.30/transaction |
| Google Maps API | ~$10 (low usage) |
| SendGrid | $15 (Essentials plan) |
| Zapier | $20 (Starter plan) |
| **Total** | **~$75/month** + transaction fees |

### ROI Calculation
- **Investment:** $9,400
- **Per catering order profit:** ~$500-1,000 (after costs)
- **Orders needed to break even:** 10-20 orders
- **At 2 orders/week:** Break even in 5-10 weeks
- **Year 1 projected ROI:** 300-500%

---

## 🚀 Post-Launch: Phase 2 Features (Q1 2026)

Once MVP is successful, add:

1. **Customer Accounts**
   - Save delivery addresses
   - Reorder past catering orders
   - View order history

2. **Saved Templates**
   - Corporate clients save their preferred package
   - One-click reordering

3. **NET-30 Invoicing**
   - For established corporate clients
   - Invoice instead of upfront payment

4. **Advanced Dashboard**
   - Profitability reports
   - Ingredient cost tracking
   - Staff scheduling

5. **Marketing Automation**
   - Email drip campaigns
   - Abandoned quote follow-ups
   - Referral program

6. **Mobile App** (Optional)
   - iOS/Android native apps
   - Push notifications

---

## 📞 Support Plan

### During Build (Weeks 1-5)
- Weekly check-ins with developer
- Slack/email for questions
- Access to staging site for feedback

### Launch Week
- Developer on-call for bugs
- Daily monitoring
- Quick fixes within 24 hours

### Post-Launch (Month 1-3)
- Monthly maintenance retainer ($500/month optional)
- Bug fixes
- Content updates
- Feature tweaks

### After 3 Months
- As-needed support
- Or bring in-house if you hire staff

---

## ❓ Open Questions (Need Your Input)

1. **Catering Pricing:**
   - Confirm per-person prices ($30/$45/$65 accurate?)
   - Any package minimums/maximums?
   - Service fee percentage (10% okay?)

2. **Delivery:**
   - Confirm delivery radius (5 miles base, up to 15 miles?)
   - Do you want pickup option for catering (or delivery only?)
   - Setup included in delivery fee, or separate charge?

3. **Photos:**
   - Do you need professional photoshoot, or existing photos sufficient?
   - Can we use Instagram photos on website?

4. **Staff:**
   - Who will manage the dashboard day-to-day?
   - Who responds to catering inquiries?
   - Need training documentation?

5. **Legal:**
   - Business entity name for receipts?
   - Tax ID for invoicing?
   - Terms & conditions (I can draft)

6. **Contact:**
   - Catering-specific email (catering@pairpgh.com)?
   - Catering-specific phone line, or same as shop?

---

**Next: Get your approval on this plan, then we start building!** 🚀
