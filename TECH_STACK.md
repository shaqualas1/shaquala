# PAIR Charcuterie Ordering Agent - Technology Stack

## Architecture Overview

### System Design: **Modern Microservices with Monolithic Core**
- **Approach**: Start with a monolithic backend for speed, modularize key services
- **Hosting**: Cloud-native (AWS/Azure/Google Cloud) with auto-scaling
- **Architecture Pattern**: Event-driven with message queues for order processing

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                             │
├──────────────┬──────────────┬──────────────┬────────────────┤
│   Web App    │   Kiosk      │   SMS Bot    │  Staff Dashboard│
│  (React)     │   (React)    │   (Twilio)   │   (React Admin) │
└──────┬───────┴──────┬───────┴──────┬───────┴────────┬───────┘
       │              │              │                │
       └──────────────┴──────────────┴────────────────┘
                      │
                ┌─────▼─────┐
                │   CDN     │
                │ CloudFlare│
                └─────┬─────┘
                      │
       ┌──────────────▼──────────────────┐
       │      API GATEWAY (Kong/Nginx)   │
       │  - Rate Limiting                 │
       │  - Authentication               │
       │  - Load Balancing               │
       └──────────────┬──────────────────┘
                      │
       ┌──────────────▼──────────────────┐
       │    APPLICATION LAYER (Node.js)  │
       ├─────────────────────────────────┤
       │  • Order Service                │
       │  • Menu Service                 │
       │  • Inventory Service            │
       │  • Customer Service             │
       │  • Payment Service              │
       │  • Notification Service         │
       │  • Analytics Service            │
       └──────┬──────────────────┬───────┘
              │                  │
    ┌─────────▼─────┐   ┌───────▼─────────┐
    │   PostgreSQL  │   │   Redis Cache    │
    │   (Primary)   │   │   (Session/Temp) │
    └───────────────┘   └──────────────────┘
              │
    ┌─────────▼──────────────────┐
    │  INTEGRATION LAYER         │
    ├────────────────────────────┤
    │  • Clover POS API          │
    │  • Stripe Payments         │
    │  • Twilio SMS              │
    │  • SendGrid Email          │
    │  • DoorDash/Uber Eats API  │
    └────────────────────────────┘
```

---

## 1. Frontend Stack

### 1.1 Web Application (Customer-Facing)

#### **Framework: Next.js 14+ (React 18)**
**Why**: 
- Server-side rendering (SSR) for SEO (people searching "Pittsburgh charcuterie")
- Fast initial page loads
- Built-in API routes for simple backend tasks
- Excellent mobile performance
- TypeScript support for code quality

#### **UI Component Library: shadcn/ui + Tailwind CSS**
**Why**:
- Modern, accessible components out of the box
- Fully customizable (match PAIR branding)
- Tailwind for rapid UI development
- No runtime overhead (compiled at build time)

#### **State Management: Zustand**
**Why**:
- Lightweight (compared to Redux)
- Simple API, easy for team to learn
- Perfect for cart management, order state
- Great DevTools support

#### **AI Assistant: Vercel AI SDK + OpenAI GPT-4**
**Why**:
- Stream responses for conversational ordering
- Function calling for actions (add to cart, check inventory)
- Easy integration with Next.js
- Fallback to rule-based flow if AI fails

#### **Additional Libraries**:
- **React Hook Form**: Form validation, order inputs
- **Zod**: Schema validation, type safety
- **React Query (TanStack Query)**: Data fetching, caching
- **Framer Motion**: Smooth animations for UX polish
- **Day.js**: Date/time handling for pickup scheduling

### 1.2 Staff Dashboard

#### **Framework: React Admin**
**Why**:
- Pre-built admin UI components
- CRUD operations out of the box
- Extensible for custom features
- Real-time dashboard support

#### **Alternative: Retool (Low-Code Option)**
**Why**:
- Fastest time to market for MVP
- Pre-built integrations (PostgreSQL, APIs)
- Non-developers can make changes
- Cost: ~$50/user/month (reasonable for 5 staff)

### 1.3 Kiosk Application

#### **Framework: Same as Web App (Next.js)**
- Deployed as PWA (Progressive Web App)
- Fullscreen mode on iPad
- Offline support with service workers
- Auto-restart on crash

---

## 2. Backend Stack

### 2.1 Primary Backend

#### **Runtime: Node.js 20 LTS**
**Why**:
- JavaScript ecosystem (same language as frontend)
- Excellent async I/O for high concurrency
- Huge package ecosystem (npm)
- Great for real-time features (WebSockets)

#### **Framework: NestJS**
**Why**:
- Enterprise-grade structure (like Spring Boot for Node)
- TypeScript-first
- Built-in dependency injection
- Easy to test and maintain
- Microservices-ready

**Alternative: Express.js** (if team prefers simplicity)
- Lighter weight, more flexible
- Faster initial development
- Good middle ground for MVP

### 2.2 Database

#### **Primary Database: PostgreSQL 15+**
**Why**:
- Open-source, battle-tested
- ACID compliance (critical for orders/payments)
- JSON support for flexible product attributes
- Excellent full-text search for menu items
- Great with Node.js (node-postgres, Prisma)

#### **ORM: Prisma**
**Why**:
- Type-safe database queries
- Auto-generated types from schema
- Great migration system
- Built-in connection pooling

**Database Schema Highlights**:
```sql
-- Core tables
users (customers + staff)
products (menu items)
product_ingredients (for allergen tracking)
allergens (master list)
orders (all order types)
order_items (line items)
inventory (real-time stock)
inventory_transactions (audit log)
loyalty_points (rewards program)
payment_transactions (linked to Stripe/Clover)
```

#### **Cache Layer: Redis**
**Why**:
- Sub-millisecond response times
- Session storage
- Real-time inventory counts
- Rate limiting for API
- Job queue for background tasks

### 2.3 File Storage

#### **Object Storage: AWS S3 / Cloudflare R2**
**Why**:
- Product images, allergen labels
- Order receipts (PDF)
- Cheap, scalable storage
- CDN integration for fast image loading

---

## 3. Integration Layer

### 3.1 Payment Processing

#### **Stripe** (Primary for online orders)
**Why**:
- Best-in-class developer experience
- PCI compliance handled for you
- Apple Pay, Google Pay support
- Subscription billing (for future recurring orders)
- Excellent fraud detection

**Integration**:
- `@stripe/stripe-js` (frontend)
- `stripe` (Node.js backend)
- Payment Intents API for secure checkout

#### **Clover Payments** (In-store kiosk)
**Why**:
- Already using Clover POS
- Unified reporting across channels
- No additional hardware needed

**Integration**:
- Clover SDK for kiosk payments
- Sync transactions to internal database

### 3.2 POS Integration

#### **Clover REST API**
**Documentation**: https://docs.clover.com/reference/api-reference-overview

**Key Endpoints**:
- `/v3/merchants/{mId}/orders`: Create/update orders
- `/v3/merchants/{mId}/items`: Sync menu items
- `/v3/merchants/{mId}/inventory`: Stock levels
- Webhooks for real-time updates

**Integration Strategy**:
- **Option A**: Clover as source of truth (sync to internal DB)
- **Option B**: Internal DB as source of truth (push to Clover)
- **Recommendation**: Hybrid - maintain separate menu, sync orders to Clover

### 3.3 SMS & Notifications

#### **Twilio**
**Why**:
- Industry leader for SMS/voice
- Programmable messaging API
- Two-way SMS conversations
- WhatsApp integration (future)

**Use Cases**:
- Order confirmations: "Your order #1234 will be ready at 2:30pm"
- Status updates: "Your board is ready for pickup!"
- SMS ordering: "Reply with 'order' to start"
- Marketing: "Happy Hour special today!"

**Cost**: ~$0.0079/SMS (very affordable)

#### **Email: SendGrid**
**Why**:
- Reliable delivery
- Email templates
- Analytics (open rates, clicks)
- Free tier: 100 emails/day

**Use Cases**:
- Order receipts
- Loyalty program updates
- Weekly newsletter
- Catering quotes

### 3.4 Third-Party Delivery

#### **DoorDash Drive API**
**Why**:
- White-label delivery (customers order from your site)
- Real-time delivery tracking
- Dynamic pricing

**Alternative**: Partner with existing DoorDash/Uber Eats
- Easier setup (use their marketplace)
- Higher commission fees (20-30%)

---

## 4. AI & Intelligence Layer

### 4.1 Conversational Ordering

#### **OpenAI GPT-4 Turbo** (via API)
**Why**:
- Natural language understanding
- Function calling for structured actions
- Consistent personality/voice
- Fast response times (<2s)

**Cost**: ~$0.01 per order conversation (estimated)

**Implementation**:
```javascript
// Example prompt template
You are an AI ordering assistant for PAIR Charcuterie, 
a coffee and charcuterie shop in Pittsburgh. 
Your job is to help customers build the perfect order.

Available products: {menu_json}
Customer's past orders: {order_history}
Current cart: {cart}

Be friendly, suggest pairings, and ask about dietary needs.
```

**Alternative: Anthropic Claude** (similar pricing/performance)

### 4.2 Recommendation Engine

#### **Phase 1: Rule-Based**
- Collaborative filtering: "Customers who bought X also bought Y"
- Time-based: "Popular during lunch hours"
- Simple Python script or SQL queries

#### **Phase 2: Machine Learning**
- **TensorFlow.js** or **scikit-learn**: Train on order data
- Predict next purchase, personalized recommendations
- Host on serverless (AWS Lambda)

---

## 5. Infrastructure & DevOps

### 5.1 Hosting

#### **Primary Recommendation: Vercel + Railway/Render**

**Frontend (Vercel)**:
- Next.js deployment (one-click)
- Global CDN, automatic scaling
- Free tier sufficient for MVP
- Cost: $20/month Pro plan

**Backend + DB (Railway.app or Render.com)**:
- One-click PostgreSQL + Redis
- GitHub integration (auto-deploy on push)
- Horizontal scaling available
- Cost: $20-50/month for MVP, scales up

**Alternative: AWS (More complex, more control)**:
- EC2 (backend servers)
- RDS (PostgreSQL)
- ElastiCache (Redis)
- S3 (file storage)
- CloudFront (CDN)
- Cost: $100-200/month starting

### 5.2 CI/CD Pipeline

#### **GitHub Actions**
**Why**:
- Free for public/private repos
- Pre-built workflows for Node.js
- Automatic testing on pull requests

**Pipeline**:
1. Commit code → GitHub
2. Run tests (Jest, Cypress)
3. Lint code (ESLint, Prettier)
4. Deploy to staging (auto)
5. Deploy to production (manual approval)

### 5.3 Monitoring & Logging

#### **Sentry** (Error Tracking)
- Frontend and backend errors
- User session replays
- Performance monitoring
- Free tier: 5k events/month

#### **Vercel Analytics** (Web Vitals)
- Page load times
- Core Web Vitals
- Free with Vercel hosting

#### **Logs: Better Stack (formerly Logtail)**
- Centralized logging
- Search and filter logs
- Real-time tailing
- Free tier: 1GB/month

### 5.4 Backups & Disaster Recovery

- **Database**: Automated daily backups (Railway/Render built-in)
- **Object Storage**: S3 versioning enabled
- **Code**: Git (GitHub) - full history
- **Recovery Time Objective**: <1 hour
- **Recovery Point Objective**: <24 hours (daily backups)

---

## 6. Security Stack

### 6.1 Authentication & Authorization

#### **NextAuth.js** (Authentication)
**Why**:
- Built for Next.js
- Multiple providers (email, Google, SMS)
- JWT or database sessions
- Secure by default

**Customer Auth**: Email + password or SMS OTP (Twilio Verify)
**Staff Auth**: Email + 2FA (Google Authenticator)

#### **Role-Based Access Control (RBAC)**
```javascript
Roles:
- customer (default)
- staff (view orders, update status)
- manager (inventory, reports, menu changes)
- admin (full access)
```

### 6.2 API Security

- **Rate Limiting**: 100 requests/minute per IP (Redis-backed)
- **CORS**: Restrict to allowed domains
- **Input Validation**: Zod schemas on all endpoints
- **SQL Injection Prevention**: Prisma ORM (parameterized queries)
- **XSS Protection**: Next.js auto-escapes output

### 6.3 PCI Compliance

- **Never store** full credit card numbers
- Use Stripe Checkout (hosted form) or Stripe Elements (embedded, tokenized)
- HTTPS everywhere (Let's Encrypt SSL certificates)
- Annual security audit (once revenue justifies)

---

## 7. Testing Stack

### 7.1 Unit Testing

#### **Vitest** (Test Runner)
**Why**:
- Fast (Vite-powered)
- Jest-compatible API
- TypeScript support

#### **React Testing Library**
**Why**:
- Test components from user perspective
- Encouraged by React team

### 7.2 Integration Testing

#### **Playwright** or **Cypress**
**Why**:
- End-to-end testing (full user flows)
- Cross-browser testing
- Video recording of test runs

**Test Scenarios**:
- Complete order flow (add to cart → checkout → payment)
- Staff dashboard (create order → fulfill)
- Inventory updates (place order → stock decrements)

### 7.3 Load Testing

#### **k6** (Grafana)
**Why**:
- Simulate hundreds of concurrent users
- Find performance bottlenecks
- Test before Black Friday sales spike

---

## 8. Development Tools

### 8.1 Code Quality

- **TypeScript**: Type safety across frontend/backend
- **ESLint**: Catch bugs, enforce style
- **Prettier**: Auto-format code
- **Husky**: Git hooks (run tests before commit)

### 8.2 API Development

- **Postman** or **Insomnia**: Test API endpoints
- **Swagger/OpenAPI**: Auto-generate API documentation

### 8.3 Design & Prototyping

- **Figma**: Design mockups (free tier)
- **Storybook**: Component library documentation

---

## 9. Recommended Tech Stack Summary

### **MVP (Phase 1) - Launch in 3-4 Months**

| Layer | Technology | Cost/Month |
|-------|-----------|------------|
| **Frontend** | Next.js + shadcn/ui + Tailwind | Free (Vercel free tier) |
| **Backend** | Node.js + NestJS (or Express) | $20 (Railway/Render) |
| **Database** | PostgreSQL + Prisma | $10 (Railway) |
| **Cache** | Redis | $10 (Railway) |
| **File Storage** | Cloudflare R2 | <$5 |
| **Payments** | Stripe | 2.9% + 30¢/transaction |
| **SMS** | Twilio | ~$50 (est. 1000 messages) |
| **Email** | SendGrid | Free (up to 100/day) |
| **AI** | OpenAI GPT-4 | ~$30 (est. 100 orders) |
| **Monitoring** | Sentry + Vercel Analytics | Free tiers |
| **Domain** | pair-charcuterie.com | $15/year |
| **Total** | | **~$135/month** + transaction fees |

**As you scale** (500+ orders/day):
- Upgrade hosting: +$100-300/month
- Add caching/CDN: +$50/month
- More SMS/AI usage: +$200/month
- **Total at scale: ~$500-800/month**

---

## 10. Alternative Stacks (For Consideration)

### Option B: **No-Code/Low-Code (Fastest MVP)**

| Component | Tool |
|-----------|------|
| Frontend | Webflow or Framer |
| Backend | Xano or Supabase |
| Database | Supabase (PostgreSQL) |
| Payments | Stripe (no-code checkout) |
| Automation | Zapier or Make.com |

**Pros**: Launch in 2-4 weeks, no coding required
**Cons**: Less flexible, higher per-user costs, vendor lock-in

### Option C: **Full TypeScript Everywhere**

| Component | Tool |
|-----------|------|
| Frontend | Next.js (TypeScript) |
| Backend | NestJS (TypeScript) |
| Database | Prisma + PostgreSQL |
| Validation | Zod (shared types) |
| Monorepo | Turborepo or Nx |

**Pros**: End-to-end type safety, shared code, one language
**Cons**: Steeper learning curve for non-TS developers

---

## 11. Migration Strategy from WordPress

### **Approach: Run in Parallel**

1. **Keep WordPress** for marketing site (blog, about page)
2. **Deploy Next.js app** on subdomain: `order.pair-charcuterie.com`
3. **Add "Order Now" buttons** on WordPress that link to Next.js app
4. **Eventually**: Replace WordPress entirely or keep as CMS (headless)

**Alternative**: Headless WordPress
- Use WordPress admin for menu management
- Next.js pulls content via REST API or GraphQL
- Best of both worlds (familiar admin, modern frontend)

---

## 12. Implementation Roadmap

### **Phase 1: MVP (Months 1-3)**
**Goal**: Replace inconsistent ordering with unified web app

**Features**:
- ✅ Web ordering (pickup only)
- ✅ Menu with pricing, allergen info
- ✅ Stripe checkout
- ✅ Basic staff dashboard (order queue)
- ✅ Email/SMS confirmations
- ✅ Customer accounts + order history
- ✅ Integration with Clover (push orders)

**Tech**: Next.js + Node.js + PostgreSQL + Stripe + Twilio

### **Phase 2: Enhanced Experience (Months 4-6)**
**Goal**: Add loyalty, inventory, AI assistant

**Features**:
- ✅ Digital loyalty program
- ✅ Inventory management system
- ✅ AI-guided ordering (GPT-4)
- ✅ SMS ordering
- ✅ Delivery integration (DoorDash)
- ✅ In-store kiosk
- ✅ Analytics dashboard

### **Phase 3: Scale & Optimize (Months 7-12)**
**Goal**: Advanced features, multi-location prep

**Features**:
- ✅ Mobile apps (iOS/Android)
- ✅ Catering portal
- ✅ Kitchen display system
- ✅ Advanced analytics (ML recommendations)
- ✅ Table ordering (QR codes)
- ✅ Subscription boxes

---

## 13. Key Technical Decisions

### Decision 1: Monolith vs. Microservices
**Choice**: Start monolithic (NestJS), separate critical services
**Rationale**: Faster development, easier debugging for MVP
**Future**: Extract payment, notification, inventory as microservices

### Decision 2: SQL vs. NoSQL
**Choice**: PostgreSQL (SQL)
**Rationale**: 
- Structured data (orders, inventory, payments)
- ACID compliance critical
- Complex queries for reporting
- Can store JSON when needed (flexible schema)

### Decision 3: Native Apps vs. PWA
**Choice**: PWA first (web app), native apps in Phase 3
**Rationale**: 
- One codebase for all devices
- No app store approval delays
- Easier to iterate based on feedback

### Decision 4: Self-Host vs. Managed Services
**Choice**: Managed services (Vercel, Railway, Stripe, Twilio)
**Rationale**:
- Faster time to market
- Lower operational burden (no DevOps team)
- Cost-effective at current scale
- Can migrate to self-hosted later if needed

### Decision 5: Build vs. Buy (Inventory Management)
**Choice**: Build custom (integrated with ordering system)
**Rationale**:
- Off-the-shelf tools (Square, Toast) expensive and limiting
- Need tight integration with allergen tracking
- Custom reporting for food safety compliance

---

## 14. Risk Mitigation

### Technical Risks

| Risk | Mitigation |
|------|-----------|
| **Clover API downtime** | Queue orders locally, sync when back online |
| **Payment processor failure** | Fallback to manual credit card terminal |
| **Database corruption** | Automated backups every 6 hours, point-in-time recovery |
| **Traffic spike crashes site** | Auto-scaling, CDN caching, load testing before launch |
| **AI assistant gives bad advice** | Fallback to rule-based flow, human review of AI responses |

### Business Risks

| Risk | Mitigation |
|------|-----------|
| **Staff resistance to new system** | Involve staff in design, extensive training, incentives |
| **Customers prefer old ordering method** | Keep phone ordering available, gradual transition |
| **Budget overruns** | Fixed-price MVP contract, phased rollout |
| **Competitor launches similar system** | Focus on unique brand/quality, not just tech |

---

## 15. Vendor Lock-In Considerations

### **Minimize Lock-In**:
- ✅ Use standard PostgreSQL (not proprietary DB)
- ✅ Containerize app (Docker) for portability
- ✅ Avoid platform-specific features (use abstractions)

### **Acceptable Lock-In** (worth the tradeoff):
- Stripe (switching payment processors is painful regardless)
- Vercel (Next.js deployment, but can self-host)
- Twilio (SMS is commoditized, easy to switch)

---

## Next Steps

1. **Review & Approve**: Confirm tech stack aligns with budget/timeline
2. **Hire/Contract**: Find developer or agency with Next.js + Node.js experience
3. **Design Phase**: Create Figma mockups for customer app + staff dashboard
4. **Set Up Infrastructure**: 
   - Register domain
   - Create Vercel, Railway accounts
   - Set up Stripe, Twilio, Clover API access
5. **Sprint 1**: Build menu management + simple order form
6. **Sprint 2**: Add payment processing + order confirmation
7. **Sprint 3**: Staff dashboard + Clover integration
8. **Beta Launch**: Test with limited customers, gather feedback
9. **Full Launch**: Marketing push, train all staff

---

**Questions or concerns about any technology choices? Let me know and I can provide alternatives or deeper dives into specific areas!**
