# PAIR Charcuterie - Comprehensive Testing Plan

## 🎯 Goal: Launch with Zero Critical Bugs

**Philosophy:** Test early, test often, test everything.

**Why This Matters:**
- First impressions matter - a broken site loses customers forever
- Catering orders are high-value ($300-$5K) - can't afford to lose them
- You have no technical team - need to catch issues before customers do
- December 31 launch is tight - no room for surprises

---

## 📅 Testing Timeline

### **Phase 1: Developer Testing (Week 3 - Dec 9-15)**
**Who:** Developer  
**What:** Unit tests, integration tests  
**Goal:** Each feature works in isolation

**Tests:**
- Quote calculator math (100+ scenarios)
- Delivery fee calculator (50+ addresses)
- Form validation (all edge cases)
- Stripe test payments (success, failure, refund)
- Email sending (all 5 templates)
- Database CRUD operations

**Tools:**
- Jest (JavaScript testing)
- Playwright (browser automation)
- Postman (API testing)

---

### **Phase 2: Staging Testing (Week 4 - Dec 16-22)** ⚠️ CRITICAL
**Who:** You + staff + trusted customers  
**What:** Real-world usage testing  
**Goal:** Find bugs before launch

#### **Dec 17-18: Quote Calculator Testing**

**Test Scenarios:**

| Test Case | Guest Count | Package | Expected Result |
|-----------|-------------|---------|-----------------|
| Tiny event | 10 | Classic | $300 |
| Small event | 25 | Premium | $1,125 |
| Medium event | 50 | Premium | $2,250 |
| Large event | 100 | Deluxe | $6,500 |
| Huge event | 250 | Classic | $7,500 |
| Edge: Zero guests | 0 | Any | Error message |
| Edge: 1000 guests | 1000 | Any | Custom quote |
| Negative number | -5 | Any | Error message |
| Non-number | "abc" | Any | Error message |

**Delivery Calculator Testing:**

| Test Address | Distance | Expected Fee | Notes |
|--------------|----------|--------------|-------|
| 123 Liberty Ave (downtown) | 0.5 mi | $25 | Base fee |
| 456 Forbes Ave (Oakland) | 4 mi | $25 | Within 5 miles |
| Shadyside address | 6 mi | $27 | 5-10 mile range |
| Mt. Lebanon address | 12 mi | $46 | 10-15 mile range |
| Cranberry Township | 20 mi | "Custom quote" | Outside range |
| Invalid address | N/A | Error | Should not crash |
| International address | N/A | "Custom quote" | Outside Pittsburgh |

**Testing Checklist:**
- [ ] Calculator updates price in real-time as you change inputs
- [ ] All math is correct (double-check with calculator)
- [ ] Error messages are helpful, not technical
- [ ] Can't proceed with invalid data
- [ ] Loading states show when calculating
- [ ] Works on slow internet (throttle to 3G speed)

---

#### **Dec 19: Device & Browser Testing**

**Test Matrix:**

| Device | Browser | Operating System | Tester |
|--------|---------|------------------|--------|
| iPhone | Safari | iOS 17 | You |
| Android phone | Chrome | Android | Staff #1 |
| iPad | Safari | iPadOS | Staff #2 |
| MacBook | Chrome | macOS | You |
| MacBook | Safari | macOS | You |
| Windows laptop | Edge | Windows 11 | Friend |
| Windows laptop | Firefox | Windows 11 | Friend |

**What to Test:**
- [ ] Quote builder works on all devices
- [ ] Images load and look good
- [ ] Forms are easy to fill on mobile (keyboard pops up correctly)
- [ ] Buttons are big enough to tap on phone
- [ ] Layout doesn't break on small screens
- [ ] Text is readable (not too small)
- [ ] Can scroll smoothly
- [ ] Payment form works (Stripe Checkout)

**Known Issues to Watch For:**
- Safari iOS sometimes has issues with date pickers
- Old Android phones may struggle with animations
- Internet Explorer is dead (don't test)

---

#### **Dec 20: Staff Testing Day**

**Goal:** Get staff comfortable with dashboard before launch

**9am-12pm: Training Session**
- [ ] Show staff how to log in
- [ ] Walk through dashboard interface
- [ ] Explain how orders flow through system
- [ ] Show how to update order status
- [ ] Demonstrate how to view customer details
- [ ] Practice responding to quote requests

**12pm-3pm: Hands-On Testing**
- [ ] Have each staff member place 2 test orders
  - One catering order
  - One pickup order
- [ ] Have them update order statuses
- [ ] Have them search for orders
- [ ] Have them contact a fake customer

**3pm-5pm: Feedback & Fixes**
- [ ] Gather feedback: What's confusing?
- [ ] List improvements needed
- [ ] Prioritize critical vs. nice-to-have
- [ ] Developer fixes critical issues same day

**Staff Feedback Form:**
```
1. On scale 1-10, how easy was the dashboard to use?
2. What was most confusing?
3. What would make your job easier?
4. Do you feel ready to use this with real customers?
5. Any bugs or issues you noticed?
```

---

#### **Dec 21-22: Bug Fixing & Retesting**

**Dec 21:** Developer fixes all critical bugs from testing

**Critical Bugs** (must fix):
- Site crashes
- Payment doesn't work
- Emails don't send
- Calculator gives wrong price
- Data doesn't save

**Medium Bugs** (fix if time):
- Layout issues on mobile
- Slow loading
- Confusing error messages
- Minor UI problems

**Low Priority** (fix after launch):
- Nice-to-have features
- Small UI tweaks
- Performance optimization

**Dec 22:** Retest everything that was fixed
- [ ] Verify critical bugs are resolved
- [ ] No new bugs introduced by fixes
- [ ] Staff confirms dashboard works better

---

### **Phase 3: Real Money Testing (Week 5 - Dec 26-28)**

#### **Dec 26: Your Test Order**

**9am: Place Real Order**
1. Go to pairpgh.com/catering as if you're a customer
2. Click "Get Quote"
3. Fill out quote form:
   - Event type: Private Party
   - Guests: 20
   - Package: Premium
   - Address: Your home address
   - Date: January 15, 2026
4. Submit quote
5. Check email: Did you receive quote?
6. Click "Pay Deposit $500" (or full amount)
7. Use real credit card (you'll refund this)
8. Complete payment

**9:30am: Verify Everything**
- [ ] Received confirmation email within 1 minute
- [ ] Email looks professional (no typos, images load)
- [ ] Order appears in dashboard
- [ ] All details are correct (price, date, guest count)
- [ ] Payment shows in Stripe dashboard
- [ ] You can update order status

**10am: Test Refund**
- [ ] Issue refund in Stripe
- [ ] Verify customer receives refund confirmation
- [ ] Order status updates appropriately

**Afternoon: Edge Case Testing**
- [ ] Place order for tomorrow (rush order)
- [ ] Place order for 6 months from now
- [ ] Try to place duplicate order
- [ ] Test abandoned cart (start quote, don't finish)

---

#### **Dec 27: Friends & Family Testing**

**Instructions to Send:**
```
Hi! I need your help testing my new catering website 
before the big launch on Dec 31.

Please go to pairpgh.com/catering and try to place an order.
Use this fake event:
- Your name
- Event: Corporate Lunch
- Date: February 1, 2026
- Guests: 30
- Any dietary needs
- Your real address

When you get to payment, STOP - don't actually pay.
(Or use this test card: 4242 4242 4242 4242, any expiration/CVC)

Then tell me:
1. Was it easy to use?
2. Did anything confuse you?
3. Would you actually order catering this way?
4. Any bugs or problems?

Thanks! 🙏
```

**Track Results:**

| Name | Device | Completed? | Feedback | Issues Found |
|------|--------|------------|----------|--------------|
| Friend 1 | iPhone | Yes | Easy! | Took a while to load |
| Friend 2 | Android | No | Confused by delivery fee | Calculator unclear |
| Family 1 | Desktop | Yes | Loved it | None |

---

#### **Dec 28: Final Polish**

Based on feedback from Dec 26-27:
- [ ] Fix any usability issues
- [ ] Improve unclear messaging
- [ ] Optimize slow-loading pages
- [ ] Add tooltips where people were confused

---

#### **Dec 29: Final End-to-End Test**

**The Complete Customer Journey:**

**10am: Desktop Customer (you):**
1. Google search "Pittsburgh catering"
2. Click your site in results (confirm SEO working)
3. Browse catering page
4. Read FAQ
5. View portfolio
6. Start quote
7. Complete payment (small real order)
8. Receive confirmation email
9. Log into dashboard, update status

**2pm: Mobile Customer (staff member):**
1. Instagram → Click link in bio
2. Browse on phone
3. Get quote
4. Complete on mobile
5. Verify mobile experience is smooth

**4pm: Final Checks:**
- [ ] All pages load in <3 seconds
- [ ] No broken links
- [ ] All images load
- [ ] Forms work
- [ ] Payments work
- [ ] Emails send
- [ ] Dashboard updates
- [ ] Analytics tracking
- [ ] Mobile responsive
- [ ] Cross-browser compatible

**5pm: Sign-Off**
- [ ] You're confident it works
- [ ] Staff is comfortable
- [ ] Developer confirms stable
- [ ] Ready to launch tomorrow!

---

## 🔍 What to Test (Detailed Checklist)

### **Homepage (pairpgh.com)**
- [ ] Loads in <3 seconds
- [ ] All images load
- [ ] "Order Catering" button works
- [ ] Links to catering page
- [ ] Mobile responsive
- [ ] Looks good on phone

### **Catering Landing Page (pairpgh.com/catering)**
- [ ] Hero image loads
- [ ] All text readable
- [ ] Package photos load
- [ ] Pricing displays correctly
- [ ] "Get Quote" button works
- [ ] FAQ accordion works
- [ ] Portfolio images load
- [ ] Links work
- [ ] Mobile: images scale down
- [ ] Mobile: text doesn't overflow

### **Quote Builder (pairpgh.com/catering/quote)**

**Step 1: Event Type**
- [ ] Radio buttons work
- [ ] Can select one option
- [ ] "Other" text field appears
- [ ] Next button works
- [ ] Can't proceed without selection

**Step 2: Guest Count**
- [ ] Slider works
- [ ] Number updates as you slide
- [ ] Can type in number
- [ ] Min: 10, Max: 500+
- [ ] Error if <10 or >500

**Step 3: Package Selection**
- [ ] Images load
- [ ] Prices display
- [ ] Description readable
- [ ] Can select one
- [ ] Price updates total

**Step 4: Dietary Needs**
- [ ] Checkboxes work
- [ ] Can select multiple
- [ ] Text area works
- [ ] Optional (can skip)

**Step 5: Delivery Details**
- [ ] Date picker works (min: 3 days from today)
- [ ] Time picker works
- [ ] Address autocomplete works (Google Maps)
- [ ] Map shows delivery area
- [ ] Distance calculates automatically
- [ ] Delivery fee updates
- [ ] Toggle between delivery/pickup
- [ ] Error if date is too soon

**Step 6: Quote Summary**
- [ ] All details display correctly
- [ ] Math is correct
- [ ] Deposit option calculates correctly (25% or $500)
- [ ] Customer info form validates
- [ ] Email format validation
- [ ] Phone format validation
- [ ] Terms checkbox required
- [ ] Stripe payment form loads

### **Payment (Stripe Checkout)**
- [ ] Stripe form loads
- [ ] Can enter card number
- [ ] Validates card format
- [ ] Accepts test card (4242...)
- [ ] Shows loading state
- [ ] Success: redirects to confirmation
- [ ] Failure: shows error message
- [ ] Can retry failed payment

### **Confirmation Page**
- [ ] Order number displays
- [ ] Correct details shown
- [ ] Estimated pickup/delivery time
- [ ] Confirmation email mentioned
- [ ] Can print receipt
- [ ] Can add to calendar (optional)

### **Email Testing**

**Quote Confirmation Email:**
- [ ] Sends within 1 minute
- [ ] Subject line clear
- [ ] From: info@pairpgh.com
- [ ] Logo displays
- [ ] All details correct
- [ ] Prices formatted correctly
- [ ] Links work (buttons)
- [ ] Footer has contact info
- [ ] Mobile: readable on phone
- [ ] Spam: doesn't go to spam folder

**Payment Confirmation Email:**
- [ ] Sends immediately after payment
- [ ] Order number included
- [ ] Receipt attached or linked
- [ ] Payment method shown (last 4 digits)
- [ ] Total amount correct
- [ ] CTA: View order details

**Test all 5 email templates:**
1. Quote confirmation
2. Payment confirmation
3. 7-day reminder
4. Day-before reminder
5. Post-event thank you

### **Staff Dashboard**

**Login:**
- [ ] Email/password works
- [ ] "Forgot password" link works
- [ ] Session persists (stay logged in)
- [ ] Auto-logout after 30 min inactive

**Dashboard Home:**
- [ ] Today's stats display
- [ ] Revenue counts correctly
- [ ] Order counts correct
- [ ] Pending quotes highlighted

**Orders Tab:**
- [ ] Lists all orders
- [ ] Filters work (pending, confirmed, completed)
- [ ] Search works (by order # or name)
- [ ] Can click to view details

**Order Details:**
- [ ] All customer info displays
- [ ] Items listed correctly
- [ ] Special instructions visible
- [ ] Can update status (dropdown)
- [ ] Status change saves immediately
- [ ] Customer gets email when status changes
- [ ] Can add internal notes
- [ ] Can call/email customer (links work)

**Quotes Tab:**
- [ ] Pending quotes listed
- [ ] Shows estimated value
- [ ] Can mark as "lost" or "converted"
- [ ] Can follow up (sends email)

**Menu Management (if included):**
- [ ] Can edit item prices
- [ ] Can toggle availability
- [ ] Can upload images
- [ ] Changes reflect on site immediately

---

## 🐛 Bug Tracking System

### **Use Simple Google Sheet**

**Columns:**
1. **Bug ID:** Auto-number (1, 2, 3...)
2. **Reported By:** Your name or staff name
3. **Date Found:** Date
4. **Page/Feature:** Where is the bug?
5. **Description:** What's wrong?
6. **Steps to Reproduce:** How to make it happen
7. **Priority:** Critical / High / Medium / Low
8. **Status:** New / In Progress / Fixed / Closed
9. **Assigned To:** Developer name
10. **Fixed Date:** When resolved

**Example Bugs:**

| ID | Reported By | Page | Description | Priority | Status |
|----|-------------|------|-------------|----------|--------|
| 1 | You | Quote | Calculator shows $2,250 but should be $2,500 | Critical | Fixed |
| 2 | Staff | Dashboard | Can't update order status on mobile | High | In Progress |
| 3 | Friend | Catering | Image slow to load | Medium | New |
| 4 | You | Email | Logo doesn't display in Gmail | Low | New |

---

## 📊 Success Criteria

### **Must Pass Before Launch:**
✅ 10+ people have successfully placed test orders  
✅ All quote calculations are mathematically correct  
✅ Payments work 100% of the time  
✅ Emails send within 1 minute  
✅ Dashboard shows orders in real-time  
✅ Mobile site works on iPhone and Android  
✅ Staff feels confident using system  
✅ Zero critical bugs

### **Nice to Have (Fix After Launch):**
- Page loads in <2 seconds (currently 3 seconds)
- Portfolio has 30+ images (currently 20)
- Dashboard has advanced reporting
- Customers can save payment methods

---

## 🚨 What If We Find Major Bugs on Dec 28?

### **Decision Tree:**

**Critical Bug (site broken, can't take orders):**
- → Delay launch to Jan 2-3
- → Fix bug properly
- → Retest thoroughly
- **Don't launch broken**

**High Priority Bug (annoying but workarounds exist):**
- → Launch on Dec 31 as planned
- → Add note on site: "Experiencing high demand, response within 24 hours"
- → Fix bug Jan 2-3
- → Manual workaround for now

**Medium/Low Priority Bug:**
- → Launch on Dec 31
- → Add to post-launch fix list
- → Not urgent

---

## 📞 Testing Day Emergency Contacts

**Developer:**
- Name: [TBD]
- Phone: [TBD]
- Email: [TBD]
- Available: Dec 17-29, 9am-6pm

**You:**
- Phone: [Your phone]
- Available: All day every day

**Backup Tester (if you're busy):**
- Staff member or trusted friend
- Brief them on testing checklist

---

## ✅ Final Pre-Launch Testing Checklist (Dec 29)

Print this out and check off:

### **Functionality:**
- [ ] Can place order on desktop
- [ ] Can place order on mobile
- [ ] Quote calculator math is correct
- [ ] Delivery fees calculate correctly
- [ ] Payments process successfully
- [ ] Emails send immediately
- [ ] Dashboard updates in real-time
- [ ] Staff can log in and manage orders

### **Performance:**
- [ ] Homepage loads in <3 seconds
- [ ] Catering page loads in <3 seconds
- [ ] Images load quickly
- [ ] No broken images
- [ ] No 404 errors
- [ ] Works on slow 3G connection

### **Compatibility:**
- [ ] Works on iPhone (Safari)
- [ ] Works on Android (Chrome)
- [ ] Works on desktop (Chrome)
- [ ] Works on desktop (Safari)
- [ ] Works on desktop (Firefox)

### **Content:**
- [ ] No typos on any page
- [ ] All links work
- [ ] Phone number correct
- [ ] Email address correct
- [ ] Pricing is accurate
- [ ] Photos look professional

### **Business:**
- [ ] Stripe account in live mode
- [ ] Google Analytics tracking
- [ ] Google My Business updated
- [ ] Staff trained and confident
- [ ] You feel ready to launch

### **Final Sign-Off:**
- [ ] **You approve:** Ready to launch
- [ ] **Developer approves:** Code is stable
- [ ] **Staff approves:** Dashboard works well
- [ ] **Test customers approve:** Easy to use

---

## 🎉 When Testing is Complete

**Celebrate!** You've done the hard work. 

**Launch Day (Dec 31) will be smooth because:**
- You tested early (Dec 17-22)
- You tested often (every day)
- You tested with real people (staff, friends)
- You tested with real money (Dec 26)
- You fixed bugs before customers saw them

**You're ready to launch a professional system that will grow your catering business!** 🚀

---

**Questions about testing?** Add them to this document as you go.

**Found a bug?** Add it to the bug tracking sheet immediately.

**Testing is not glamorous, but it's the difference between a smooth launch and a disaster.**
