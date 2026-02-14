import { OrderingAgent } from '@/components/OrderingAgent';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-white to-white">
      <main className="mx-auto max-w-6xl px-6 py-12 lg:px-12 lg:py-16">
        <header className="space-y-6 pb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Pair Ordering Agent · Phase 1 MVP
          </p>
          <div className="max-w-4xl space-y-4">
            <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Conversational intake that captures the PAIR hospitality while automating quotes, upsells, and deposits.
            </h1>
            <p className="text-lg text-slate-600">
              This prototype wires the entire discovery → quote → booking flow into one clean interface so requests stop
              spraying across inboxes. Stripe + Google Calendar hooks slot in next.
            </p>
          </div>
        </header>

        <OrderingAgent />
      </main>
    </div>
  );
}
