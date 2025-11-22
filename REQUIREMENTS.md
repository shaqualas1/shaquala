# PAIR Charcuterie Ordering Agent - Requirements Document

## Executive Summary
PAIR Charcuterie needs a unified, intelligent ordering system to handle multi-channel orders (in-store, online, phone/SMS), manage inventory, ensure food safety compliance, and scale operations in downtown Pittsburgh.

---

## 1. Business Requirements

### 1.1 Ordering Channels
- **In-Store Kiosk/Tablet**: Self-service ordering for browsing customers
- **Web Application**: Desktop and mobile-responsive online ordering
- **Phone/SMS Ordering**: Text-to-order capability with guided flow
- **Staff Portal**: Manual order entry for phone orders

### 1.2 Order Fulfillment Types
- **Pickup**: Schedule pickup time, ready notification
- **Delivery**: Integration with third-party (DoorDash, Uber Eats) + potential in-house
- **Dine-In**: Table ordering or counter pickup
- **Catering/Corporate Events**: Bulk orders, advance scheduling, custom quotes

### 1.3 Product Catalog
- **Pre-made Charcuterie Boards**: Fixed price, standard sizes (small, medium, large, party)
- **Custom Charcuterie Boards**: 
  - Build-your-own: Select meats, cheeses, accompaniments
  - Dietary filters: vegetarian, gluten-free, dairy-free
  - Price calculation based on selections
- **Coffee & Beverages**: 
  - Espresso drinks (customizable: size, milk type, shots)
  - Drip coffee, cold brew, teas
- **Retail Items**: Packaged meats, cheeses, crackers, spreads
- **Add-ons**: Extra items, gift packaging, utensils

### 1.4 Key Features
- **Menu Availability**: Real-time stock levels, mark items as "sold out"
- **Dynamic Pricing**: Clear pricing, automatic calculation for custom orders
- **Order History**: Customer profile with past orders, reorder functionality
- **Loyalty Program**: Digital rewards replacement for physical punch cards
  - Points per dollar spent
  - Redemption tracking
  - Special offers/promotions
- **Dietary & Allergen Management**:
  - Clear allergen labeling (milk, nuts, gluten, etc.)
  - Filter by dietary restrictions
  - Safe Serve compliance notes
  - Custom customer notes field
- **Smart Recommendations**: 
  - AI-guided suggestions based on preferences
  - Popular pairings (coffee + pastry, wine + board)
  - Upselling opportunities

---

## 2. Technical Requirements

### 2.1 System Integrations

#### Clover POS Integration (Priority 1)
- **Sync Orders**: Push all orders to Clover for fulfillment tracking
- **Payment Processing**: Use Clover payment gateway for in-store
- **Menu Sync**: Pull menu items from Clover or maintain separate catalog
- **Receipt Generation**: Unified receipt format across channels
- **Staff Management**: Sync employee data for order assignment

#### Inventory Management System (Priority 1)
- **Real-time Inventory Tracking**: 
  - Ingredient-level tracking (meats, cheeses, coffee beans)
  - Finished goods (pre-made boards, retail items)
  - Automatic deduction on order placement
- **Low Stock Alerts**: Email/SMS notifications for reordering
- **Supplier Management**: Track orders, delivery schedules
- **Waste Tracking**: Record expired/damaged goods for food cost analysis
- **Batch/Lot Tracking**: Food safety compliance (trace ingredient sources)

#### Payment Processing
- **Clover Payments**: In-store kiosk orders
- **Stripe**: Online orders (card, Apple Pay, Google Pay)
- **Future**: Venmo, PayPal, crypto (optional)

#### SMS/Communication
- **Twilio Integration**: 
  - SMS ordering (conversational flow)
  - Order status notifications
  - Pickup reminders
  - Marketing campaigns (opt-in)

#### Third-Party Delivery Platforms
- **DoorDash Drive API**: Direct integration for delivery orders
- **Uber Eats**: Menu sync and order ingestion
- **Future**: GrubHub, Postmates (as needed)

### 2.2 Food Safety & Compliance Requirements

#### Allergen Management (Critical)
- **Database Schema**: Allergen matrix for all ingredients
  - Common allergens: Milk, Eggs, Fish, Shellfish, Tree Nuts, Peanuts, Wheat, Soy, Sesame
  - Cross-contamination warnings
- **Customer Warnings**: Prominent display before checkout
- **Labeling**: Auto-generate labels with allergen info for pickup orders
- **Staff Training Prompts**: Dashboard alerts for special handling

#### Safe Serve & Health Department Compliance
- **Temperature Logs**: Track fridge/prep area temps (IoT integration optional)
- **Prep Date Tracking**: Label generation with "made on" and "use by" dates
- **Ingredient Traceability**: Batch tracking for recalls
- **Cleaning Schedules**: Built-in task management for health inspections

### 2.3 Staff Dashboard Requirements

#### Order Management
- **Live Order Queue**: Real-time view of incoming orders (all channels)
- **Order Details**: Customer info, items, special instructions, allergen alerts
- **Status Updates**: Preparing → Ready → Picked Up / Delivered
- **Order Assignment**: Assign orders to specific staff members
- **Expedite Orders**: Priority flag for rush orders

#### Inventory Management
- **Stock Adjustment**: Manual entry for receiving/waste
- **Audit Log**: Track who made changes and when
- **Reports**: Daily/weekly inventory usage, cost of goods sold

#### Customer Management
- **Customer Profiles**: Order history, preferences, contact info
- **Loyalty Dashboard**: View customer points, issue manual rewards
- **Communication**: Send custom SMS/email to customers

#### Analytics & Reporting
- **Sales Reports**: Daily/weekly/monthly revenue by channel
- **Product Performance**: Best sellers, low performers
- **Labor Tracking**: Staff hours, order completion times
- **Food Cost Analysis**: Ingredient costs vs. revenue

#### Menu Management
- **Add/Edit Items**: Update prices, descriptions, photos
- **Availability Toggle**: Mark items in/out of stock
- **Scheduling**: Set seasonal items, limited-time offers

---

## 3. User Experience Requirements

### 3.1 Customer-Facing UX

#### Guided Ordering Flow
1. **Entry Point Selection**: "I want to..." (pickup, delivery, dine-in, catering)
2. **AI Assistant**: Conversational prompts
   - "Building a board for a party? How many guests?"
   - "Any dietary restrictions we should know about?"
   - "Want to add a drink pairing?"
3. **Smart Suggestions**: 
   - "Based on your last order, you might like..."
   - "Customers who bought this also bought..."
4. **Clear Pricing**: Real-time total update as they build order
5. **Checkout**: 
   - Saved payment methods
   - Tip options (for pickup/delivery)
   - Scheduled pickup time or ASAP
6. **Confirmation**: Order number, estimated ready time, tracking link

#### Mobile-First Design
- Responsive web app (works on all devices)
- Fast loading (<3 seconds on mobile)
- Minimal clicks to complete order (goal: <5 steps for repeat customers)
- Thumb-friendly touch targets

#### Accessibility
- WCAG 2.1 AA compliance
- Screen reader support
- High contrast mode
- Keyboard navigation

### 3.2 Staff-Facing UX
- **Simple, Intuitive Dashboard**: Minimal training required
- **Large Touch Targets**: iPad-friendly for kitchen use
- **Audio/Visual Alerts**: New order notification (sound + flash)
- **Quick Actions**: One-tap status updates
- **Mobile App**: Optional iOS/Android app for managers

---

## 4. Performance & Scalability Requirements

### 4.1 Performance Targets
- **Page Load Time**: <2 seconds (web app)
- **API Response Time**: <500ms for 95th percentile
- **Order Placement**: <30 seconds from cart to confirmation
- **Real-time Updates**: Order status changes reflected within 5 seconds

### 4.2 Scalability
- **Current Load**: ~50-100 orders/day (estimated)
- **Target Load**: 300-500 orders/day within 12 months
- **Peak Hours**: Lunch (11am-2pm), Weekend afternoons
- **Auto-scaling**: Cloud infrastructure to handle traffic spikes

### 4.3 Reliability
- **Uptime SLA**: 99.5% (max 3.6 hours downtime/month)
- **Backup Systems**: Daily database backups, 30-day retention
- **Failover**: If online system fails, orders route to SMS/phone
- **Data Recovery**: <1 hour recovery time objective (RTO)

---

## 5. Security & Privacy Requirements

### 5.1 Data Security
- **PCI DSS Compliance**: No storing of full credit card numbers (tokenization)
- **HTTPS/TLS**: All communications encrypted
- **Data Encryption**: At-rest encryption for customer data
- **Authentication**: Multi-factor auth for staff dashboard
- **Role-Based Access Control**: Manager, staff, admin permissions

### 5.2 Privacy Compliance
- **GDPR Considerations**: Customer data export/deletion on request
- **CCPA Compliance**: California customers (if applicable)
- **Cookie Consent**: Clear opt-in for tracking cookies
- **Marketing Opt-In**: Explicit consent for SMS/email marketing

---

## 6. Operational Requirements

### 6.1 Training & Onboarding
- **Staff Training**: 2-hour onboarding for dashboard
- **Video Tutorials**: Built-in help system
- **Support Documentation**: Knowledge base for common issues

### 6.2 Support & Maintenance
- **Bug Fixes**: Critical bugs resolved within 24 hours
- **Feature Updates**: Quarterly releases with new features
- **Customer Support**: In-app chat for customer questions
- **Monitoring**: 24/7 system monitoring with alerts

### 6.3 Business Continuity
- **Offline Mode**: Kiosk can cache orders if internet fails
- **Manual Fallback**: Paper order forms as backup
- **Data Export**: Daily export of orders for accounting

---

## 7. Future Enhancements (Phase 2+)

### Phase 2 (6-12 months)
- **Mobile Apps**: Native iOS/Android apps for customers
- **Table Service**: QR code ordering for dine-in
- **Kitchen Display System (KDS)**: Dedicated screens for kitchen
- **Advanced Analytics**: Predictive inventory, demand forecasting
- **Catering Portal**: Self-service large order management

### Phase 3 (12-24 months)
- **Multi-Location Support**: Scale to second PAIR location
- **Wholesale Ordering**: B2B portal for corporate clients
- **API for Partners**: Third-party integration opportunities
- **Voice Ordering**: Alexa/Google Home integration
- **Subscription Service**: Monthly charcuterie box delivery

---

## 8. Success Metrics (KPIs)

### Customer Metrics
- **Online Order Volume**: Increase by 200% in 6 months
- **Average Order Value**: Target $35+ (up from current average)
- **Customer Retention**: 40% repeat customer rate
- **Loyalty Enrollment**: 60% of customers sign up

### Operational Metrics
- **Order Accuracy**: >98% correct orders
- **On-Time Fulfillment**: 95% ready within estimated time
- **Staff Efficiency**: Reduce order processing time by 30%
- **Inventory Waste**: Reduce by 20% with better tracking

### Financial Metrics
- **Revenue Growth**: 50% increase from improved ordering UX
- **Labor Cost Reduction**: 15% more efficient with automation
- **ROI**: System pays for itself within 12 months

---

## 9. Constraints & Assumptions

### Constraints
- **Budget**: Startup-friendly solution (prefer open-source where possible)
- **Timeline**: MVP launch within 3-4 months
- **Technical Expertise**: Limited in-house dev team (may need contractors)
- **Physical Space**: Downtown Pittsburgh location with limited seating

### Assumptions
- Customers have smartphones (mobile-first approach valid)
- Stable internet connection at shop location
- Staff are comfortable with basic technology (iPads)
- Current WordPress site can be replaced or integrated

---

## Next Steps
1. Review and approve requirements
2. Select technology stack (see TECH_STACK.md)
3. Create detailed project plan with milestones
4. Begin MVP development (Phase 1 features)
5. Beta test with limited customers
6. Full launch with marketing campaign
