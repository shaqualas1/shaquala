# PAIR Charcuterie - API Integration Guide

## Overview
This document details all third-party API integrations required for the PAIR Charcuterie ordering system, including authentication, endpoints, webhooks, and implementation examples.

---

## 1. Clover POS Integration

### 1.1 Authentication

**Method**: OAuth 2.0

**Steps**:
1. Create Clover Developer Account: https://www.clover.com/developers
2. Create App in Clover Dashboard
3. Request permissions:
   - `ORDERS_R` (Read orders)
   - `ORDERS_W` (Write orders)
   - `INVENTORY_R` (Read inventory)
   - `INVENTORY_W` (Update inventory)
   - `PAYMENTS_R` (Read payment info)
   - `MERCHANT_R` (Read merchant details)

**OAuth Flow**:
```javascript
// Step 1: Redirect user to Clover authorization
const authUrl = `https://www.clover.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;

// Step 2: Exchange code for access token
const tokenResponse = await fetch('https://www.clover.com/oauth/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: authCode,
  })
});

const { access_token } = await tokenResponse.json();
// Store access_token securely (database, encrypted)
```

### 1.2 Key API Endpoints

**Base URL**: `https://api.clover.com/v3/merchants/{mId}/`

#### Create Order
```javascript
POST /orders
Headers: Authorization: Bearer {access_token}

Body:
{
  "state": "open",
  "orderType": {
    "id": "{orderTypeId}"  // Get from /order_types endpoint
  },
  "title": "Online Order #1234",
  "note": "Pickup at 2:30pm - Allergen: nuts",
  "lineItems": [
    {
      "item": {
        "id": "{itemId}"  // Clover item ID
      },
      "name": "Large Charcuterie Board",
      "price": 4500,  // $45.00 in cents
      "unitQty": 1000,  // Fixed at 1000
      "note": "Extra prosciutto"
    }
  ]
}

Response:
{
  "id": "ABC123XYZ",
  "total": 4500,
  "orderNumber": "1234",
  ...
}
```

#### Add Payment to Order
```javascript
POST /orders/{orderId}/payments

Body:
{
  "amount": 4500,
  "externalPaymentId": "{stripe_payment_id}",
  "tender": {
    "id": "{tenderId}"  // Get from /tenders endpoint (credit card, cash, etc.)
  }
}
```

#### Update Inventory
```javascript
POST /items/{itemId}/stock

Body:
{
  "quantity": -1  // Decrement by 1
}
```

#### Get Menu Items
```javascript
GET /items?expand=categories,modifierGroups

Response:
{
  "elements": [
    {
      "id": "ABC123",
      "name": "Small Board",
      "price": 2500,
      "available": true,
      "sku": "SB-001",
      "categories": [...],
      "modifierGroups": [...]
    }
  ]
}
```

### 1.3 Webhooks

**Setup**: Configure in Clover Dashboard → Your App → Webhooks

**Recommended Events**:
- `orders.create`: New order placed in Clover POS
- `orders.update`: Order status changed
- `inventory.update`: Stock level changed manually in POS

**Webhook Handler**:
```javascript
// Express.js endpoint
app.post('/webhooks/clover', async (req, res) => {
  const { type, objectId, merchantId } = req.body;
  
  if (type === 'inventory.update') {
    // Fetch updated inventory from Clover
    const item = await cloverAPI.get(`/merchants/${merchantId}/items/${objectId}`);
    
    // Sync to local database
    await db.inventory.update({
      where: { cloverId: objectId },
      data: { quantity: item.stockCount }
    });
  }
  
  res.status(200).send('OK');
});
```

### 1.4 Sync Strategy

**Option A: Clover as Source of Truth**
- Pros: No duplicate menu management
- Cons: Limited flexibility (can't add custom fields easily)

**Option B: Local DB as Source of Truth** (Recommended)
- Maintain menu in your database
- Sync orders to Clover for reporting/fulfillment
- Push inventory changes both ways

**Sync Schedule**:
- **Real-time**: Orders (immediately when placed)
- **Every 5 minutes**: Inventory levels
- **Nightly**: Full menu sync (reconciliation)

---

## 2. Stripe Payment Integration

### 2.1 Setup

1. Create Stripe Account: https://dashboard.stripe.com/register
2. Get API keys (test and live):
   - Publishable key: `pk_test_...` (frontend)
   - Secret key: `sk_test_...` (backend only)
3. Enable payment methods: Card, Apple Pay, Google Pay

### 2.2 Payment Flow

#### Frontend: Stripe Checkout (Hosted)
**Easiest**: Stripe handles entire payment UI

```javascript
// 1. Create checkout session on backend
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: [
    {
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Large Charcuterie Board',
          images: ['https://...'],
        },
        unit_amount: 4500, // $45.00
      },
      quantity: 1,
    },
  ],
  mode: 'payment',
  success_url: 'https://pair-charcuterie.com/success?session_id={CHECKOUT_SESSION_ID}',
  cancel_url: 'https://pair-charcuterie.com/cart',
  customer_email: 'customer@example.com',
  metadata: {
    orderId: '1234',
    pickupTime: '2025-11-22T14:30:00',
  }
});

// 2. Redirect user to Stripe Checkout
window.location.href = session.url;
```

#### Frontend: Stripe Elements (Embedded)
**More control**: Custom UI, stays on your site

```javascript
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_...');

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // 1. Create payment intent on backend
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 4500, orderId: '1234' }),
    });
    const { clientSecret } = await response.json();
    
    // 2. Confirm payment on frontend
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: { name: 'John Doe' },
      }
    });
    
    if (result.error) {
      // Show error
      setError(result.error.message);
    } else {
      // Payment succeeded
      window.location.href = '/success';
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pay</button>
    </form>
  );
}

// Wrap with Elements provider
<Elements stripe={stripePromise}>
  <CheckoutForm />
</Elements>
```

### 2.3 Backend: Payment Intent API

```javascript
const stripe = require('stripe')('sk_test_...');

// Create Payment Intent
app.post('/api/create-payment-intent', async (req, res) => {
  const { amount, orderId } = req.body;
  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount, // in cents
    currency: 'usd',
    automatic_payment_methods: { enabled: true },
    metadata: {
      orderId: orderId,
      source: 'web-app'
    },
    receipt_email: 'customer@example.com',
    description: `Order #${orderId} - PAIR Charcuterie`
  });
  
  res.json({ clientSecret: paymentIntent.client_secret });
});
```

### 2.4 Webhooks

**Setup**: Stripe Dashboard → Developers → Webhooks

**Endpoint**: `https://your-domain.com/webhooks/stripe`

**Events to Listen For**:
- `payment_intent.succeeded`: Payment completed
- `payment_intent.payment_failed`: Payment failed
- `charge.refunded`: Refund issued

**Handler**:
```javascript
const endpointSecret = 'whsec_...'; // Webhook signing secret

app.post('/webhooks/stripe', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      const orderId = paymentIntent.metadata.orderId;
      
      // Update order status in database
      await db.order.update({
        where: { id: orderId },
        data: { 
          status: 'paid',
          stripePaymentId: paymentIntent.id 
        }
      });
      
      // Send confirmation email/SMS
      await sendOrderConfirmation(orderId);
      break;
      
    case 'charge.refunded':
      // Handle refund
      break;
  }
  
  res.json({received: true});
});
```

### 2.5 Saving Payment Methods

For repeat customers:

```javascript
// Create customer
const customer = await stripe.customers.create({
  email: 'customer@example.com',
  name: 'John Doe',
  metadata: { userId: '12345' }
});

// Save payment method to customer
const paymentIntent = await stripe.paymentIntents.create({
  amount: 4500,
  currency: 'usd',
  customer: customer.id,
  setup_future_usage: 'off_session', // Allow charging later
});

// Later: Charge saved payment method
const charge = await stripe.paymentIntents.create({
  amount: 3000,
  currency: 'usd',
  customer: customer.id,
  payment_method: 'pm_...', // Saved payment method ID
  off_session: true,
  confirm: true,
});
```

---

## 3. Twilio SMS Integration

### 3.1 Setup

1. Create Twilio Account: https://www.twilio.com/try-twilio
2. Get credentials:
   - Account SID: `ACxxxxxxx`
   - Auth Token: `xxxxxxx`
3. Purchase phone number (local Pittsburgh area code: 412)

**Cost**: ~$1/month per number, $0.0079 per SMS

### 3.2 Sending SMS

```javascript
const twilio = require('twilio');
const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

// Send order confirmation
async function sendOrderConfirmation(orderId, phoneNumber, pickupTime) {
  const message = await client.messages.create({
    body: `PAIR Charcuterie: Order #${orderId} confirmed! Pickup at ${pickupTime}. Reply HELP for support.`,
    from: '+14125551234', // Your Twilio number
    to: phoneNumber
  });
  
  return message.sid;
}

// Send with link
await client.messages.create({
  body: 'Track your order here:',
  mediaUrl: ['https://pair-charcuterie.com/orders/1234'], // Optional image/link
  from: '+14125551234',
  to: '+14125555678'
});
```

### 3.3 Receiving SMS (Two-Way Messaging)

**Setup**: Twilio Console → Phone Number → Messaging Webhook

**Webhook URL**: `https://your-domain.com/webhooks/twilio-sms`

**Handler**:
```javascript
const MessagingResponse = require('twilio').twiml.MessagingResponse;

app.post('/webhooks/twilio-sms', async (req, res) => {
  const { From, Body, MessageSid } = req.body;
  
  const twiml = new MessagingResponse();
  const message = Body.toLowerCase().trim();
  
  if (message === 'order') {
    twiml.message('Welcome to PAIR Charcuterie! Reply with:\n1 - Small Board ($25)\n2 - Medium Board ($35)\n3 - Large Board ($45)');
  } else if (['1', '2', '3'].includes(message)) {
    // Create draft order in database
    const order = await createOrder(From, message);
    twiml.message(`Great! Your ${order.name} is added. Reply with your pickup time (e.g., "2:30pm").`);
  } else if (message === 'status') {
    // Check order status
    const order = await getLatestOrder(From);
    twiml.message(`Order #${order.id} is ${order.status}. Ready at ${order.pickupTime}.`);
  } else {
    twiml.message('Reply ORDER to start, STATUS to check order, or call us at (412) 555-1234.');
  }
  
  res.type('text/xml');
  res.send(twiml.toString());
});
```

### 3.4 SMS Templates

```javascript
const SMS_TEMPLATES = {
  ORDER_CONFIRMED: (orderId, pickupTime) => 
    `✅ Order #${orderId} confirmed! Pickup at ${pickupTime}. View details: https://pair.co/o/${orderId}`,
  
  ORDER_READY: (orderId) => 
    `🎉 Order #${orderId} is ready for pickup at PAIR Charcuterie! See you soon.`,
  
  ORDER_DELAYED: (orderId, newTime) => 
    `⏰ Sorry! Order #${orderId} delayed to ${newTime}. Thanks for your patience.`,
  
  LOYALTY_REWARD: (points, reward) => 
    `🎁 You earned ${points} points! Redeem for: ${reward}`,
  
  MARKETING: () => 
    `🍷 Happy Hour at PAIR! 20% off all boards today 4-6pm. Order now: https://pairpgh.com`
};
```

### 3.5 Phone Number Verification (Optional)

Use Twilio Verify API for SMS OTP login:

```javascript
const verify = client.verify.v2.services('VAxxxx'); // Verify service SID

// Send verification code
await verify.verifications.create({
  to: '+14125555678',
  channel: 'sms'
});

// User receives: "Your PAIR Charcuterie code is: 123456"

// Check verification code
const result = await verify.verificationChecks.create({
  to: '+14125555678',
  code: '123456'
});

if (result.status === 'approved') {
  // Log user in
}
```

---

## 4. SendGrid Email Integration

### 4.1 Setup

1. Create SendGrid Account: https://signup.sendgrid.com
2. Create API Key: Settings → API Keys
3. Verify sender identity (from email address)

**Free Tier**: 100 emails/day (sufficient for MVP)

### 4.2 Sending Transactional Emails

```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Simple email
await sgMail.send({
  to: 'customer@example.com',
  from: 'orders@pair-charcuterie.com',
  subject: 'Order #1234 Confirmation',
  text: 'Your order will be ready at 2:30pm.',
  html: '<strong>Your order will be ready at 2:30pm.</strong>',
});
```

### 4.3 Dynamic Templates

**Setup**: SendGrid Dashboard → Email API → Dynamic Templates

**Create Template**: 
- Template ID: `d-xxxxx`
- Variables: `{{orderId}}`, `{{pickupTime}}`, `{{items}}`

**Send with Template**:
```javascript
await sgMail.send({
  to: 'customer@example.com',
  from: 'orders@pair-charcuterie.com',
  templateId: 'd-xxxxx',
  dynamicTemplateData: {
    orderId: '1234',
    customerName: 'John',
    pickupTime: '2:30pm',
    items: [
      { name: 'Large Board', price: '$45.00' },
      { name: 'Latte', price: '$5.00' }
    ],
    total: '$50.00',
    orderUrl: 'https://pair-charcuterie.com/orders/1234'
  }
});
```

### 4.4 Batch Sending (Marketing)

```javascript
// Send to multiple recipients
const emails = customers.map(customer => ({
  to: customer.email,
  from: 'hello@pair-charcuterie.com',
  subject: 'Weekly Special: 15% Off All Boards',
  templateId: 'd-marketing-xxxxx',
  dynamicTemplateData: {
    firstName: customer.firstName,
    loyaltyPoints: customer.points
  }
}));

await sgMail.send(emails); // Sends in batch
```

---

## 5. DoorDash Drive API (Optional - Delivery)

### 5.1 Setup

1. Apply for DoorDash Drive: https://get.doordash.com/drive
2. Get API credentials (requires business verification)
3. White-label delivery (your customers don't see DoorDash)

**Cost**: ~$5-10 per delivery (dynamic pricing)

### 5.2 Create Delivery

```javascript
const DOORDASH_API = 'https://openapi.doordash.com/drive/v2/deliveries';

// Create delivery
const delivery = await fetch(DOORDASH_API, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${DOORDASH_TOKEN}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    external_delivery_id: 'order-1234',
    pickup_address: '123 Main St, Pittsburgh, PA 15222', // PAIR location
    pickup_phone_number: '+14125551234',
    pickup_instructions: 'Enter through side door',
    dropoff_address: '456 Oak Ave, Pittsburgh, PA 15213',
    dropoff_phone_number: '+14125555678',
    dropoff_instructions: 'Ring doorbell',
    order_value: 5000, // $50.00 in cents
    tip: 500, // $5.00 tip
    pickup_time: '2025-11-22T14:00:00Z',
    dropoff_time: '2025-11-22T14:30:00Z' // Estimated
  })
});

const result = await delivery.json();
// Returns: { delivery_id, tracking_url, fee, dasher_name }
```

### 5.3 Track Delivery

```javascript
// Get delivery status
const status = await fetch(`${DOORDASH_API}/${delivery_id}`, {
  headers: { 'Authorization': `Bearer ${DOORDASH_TOKEN}` }
});

const data = await status.json();
// { status: 'picked_up', dasher_location: { lat, lng } }
```

---

## 6. OpenAI GPT-4 Integration (AI Assistant)

### 6.1 Setup

1. Create OpenAI Account: https://platform.openai.com
2. Get API Key: API Keys → Create new
3. Add billing (pay-as-you-go)

**Cost**: ~$0.01-0.03 per order conversation

### 6.2 Conversational Ordering

```javascript
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function chatWithAssistant(userMessage, conversationHistory, menu) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content: `You are an AI assistant for PAIR Charcuterie in Pittsburgh. 
        Help customers order. Be friendly and suggest pairings.
        
        Available menu: ${JSON.stringify(menu)}
        
        When customer is ready, call add_to_cart function.`
      },
      ...conversationHistory,
      { role: 'user', content: userMessage }
    ],
    functions: [
      {
        name: 'add_to_cart',
        description: 'Add item to customer cart',
        parameters: {
          type: 'object',
          properties: {
            item_id: { type: 'string' },
            quantity: { type: 'number' },
            customizations: { type: 'object' }
          }
        }
      },
      {
        name: 'check_allergens',
        description: 'Check if item contains allergen',
        parameters: {
          type: 'object',
          properties: {
            item_id: { type: 'string' },
            allergen: { type: 'string' }
          }
        }
      }
    ],
    function_call: 'auto'
  });
  
  const message = response.choices[0].message;
  
  // If AI wants to call function
  if (message.function_call) {
    const { name, arguments: args } = message.function_call;
    const params = JSON.parse(args);
    
    if (name === 'add_to_cart') {
      await addToCart(params.item_id, params.quantity);
      return { text: "I've added that to your cart!", action: 'cart_updated' };
    }
  }
  
  return { text: message.content };
}
```

### 6.3 Streaming Responses

For better UX (show text as it's generated):

```javascript
const stream = await openai.chat.completions.create({
  model: 'gpt-4-turbo-preview',
  messages: [...],
  stream: true
});

for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content || '';
  process.stdout.write(content); // Stream to frontend
}
```

---

## 7. Integration Architecture

### 7.1 Centralized Integration Service

Create a dedicated service to manage all external APIs:

```javascript
// services/integrations/index.js
class IntegrationService {
  constructor() {
    this.clover = new CloverClient();
    this.stripe = new StripeClient();
    this.twilio = new TwilioClient();
    this.sendgrid = new SendGridClient();
  }
  
  async createOrder(orderData) {
    // 1. Charge payment
    const payment = await this.stripe.charge(orderData.amount);
    
    // 2. Create order in Clover
    const cloverOrder = await this.clover.createOrder(orderData);
    
    // 3. Update inventory
    await this.clover.updateInventory(orderData.items);
    
    // 4. Send confirmations
    await Promise.all([
      this.twilio.sendSMS(orderData.phone, `Order confirmed!`),
      this.sendgrid.sendEmail(orderData.email, 'order-confirmation', orderData)
    ]);
    
    return { orderId: cloverOrder.id, paymentId: payment.id };
  }
}
```

### 7.2 Error Handling & Retries

```javascript
const retry = require('async-retry');

async function resilientAPICall(fn) {
  return await retry(
    async () => {
      return await fn();
    },
    {
      retries: 3,
      minTimeout: 1000,
      maxTimeout: 5000,
      onRetry: (error, attempt) => {
        console.log(`Retry attempt ${attempt}: ${error.message}`);
      }
    }
  );
}

// Usage
const order = await resilientAPICall(() => clover.createOrder(data));
```

---

## 8. Testing APIs

### 8.1 Postman Collection

Create saved requests for all APIs:

```json
{
  "name": "PAIR Charcuterie APIs",
  "item": [
    {
      "name": "Clover - Create Order",
      "request": {
        "method": "POST",
        "header": [{"key": "Authorization", "value": "Bearer {{clover_token}}"}],
        "url": "https://api.clover.com/v3/merchants/{{merchant_id}}/orders"
      }
    }
  ]
}
```

### 8.2 Mock APIs for Development

```javascript
// mocks/clover.js
class MockCloverAPI {
  async createOrder(data) {
    // Return fake response immediately
    return { id: 'MOCK123', status: 'open' };
  }
}

// Use in development
const cloverAPI = process.env.NODE_ENV === 'production' 
  ? new CloverAPI() 
  : new MockCloverAPI();
```

---

## Next Steps

1. **Get API Credentials**: Sign up for all services listed
2. **Test in Sandbox**: Use test/sandbox modes before going live
3. **Document Secrets**: Store in `.env` file (never commit to git!)
4. **Build Integration Layer**: Implement wrapper classes for each API
5. **Create Webhooks**: Set up endpoints to receive events
6. **Monitor API Usage**: Track costs and rate limits

**Questions about any specific integration? Let me know!**
