'use client';

import { useMemo, useState } from 'react';
import { ADD_ONS, BOARD_OPTIONS, SERVICE_FEES } from '@/data/pricing';
import { assessAvailability, buildQuote, recommendBoardSize } from '@/lib/quote';
import { formatCurrency } from '@/lib/format';
import type {
  AddOn,
  BoardSize,
  DietaryNeed,
  Occasion,
  OrderFormState,
  PremiumUpgrade,
  ServiceLevel,
} from '@/types/order';

const OCCASION_OPTIONS: { value: Occasion; label: string }[] = [
  { value: 'corporate', label: 'Corporate event' },
  { value: 'meeting', label: 'Meeting / training' },
  { value: 'wedding', label: 'Wedding / rehearsal' },
  { value: 'birthday', label: 'Birthday / milestone' },
  { value: 'private', label: 'Private party' },
  { value: 'other', label: 'Other (tell us)' },
];

const SERVICE_LEVELS: { value: ServiceLevel; label: string; description: string }[] = [
  {
    value: 'pickup',
    label: 'Pickup',
    description: 'Ready at the PAIR kitchen for grab & go.',
  },
  {
    value: 'dropoff',
    label: 'Drop-off delivery',
    description: 'We deliver, you display.',
  },
  {
    value: 'full_service',
    label: 'Full-service styling',
    description: 'We stage the board + break down.',
  },
  {
    value: 'staffed',
    label: 'On-site staffing',
    description: 'Our team stays through service.',
  },
];

const BOARD_STYLES = [
  { value: 'classic', label: 'Classic PAIR look' },
  { value: 'seasonal', label: 'Seasonal / produce-forward' },
  { value: 'themed', label: 'Themed palette' },
  { value: 'custom', label: 'Fully custom brief' },
];

const DIETARY_OPTIONS: { value: DietaryNeed; label: string }[] = [
  { value: 'none', label: 'No restrictions' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'gluten_free', label: 'Gluten-free' },
  { value: 'kosher', label: 'Kosher' },
  { value: 'halal', label: 'Halal' },
];

const UPGRADE_OPTIONS: { value: PremiumUpgrade; label: string; description: string }[] = [
  { value: 'prosciutto', label: 'Prosciutto add-on', description: 'Hand-crafted roses' },
  { value: 'brie', label: 'Brie upgrade', description: 'Brie en croute moment' },
  { value: 'specialty', label: 'Specialty imports', description: 'Honeycomb, truffle, etc.' },
];

const ADD_ON_OPTIONS: { value: AddOn; label: string; emoji: string }[] = [
  { value: 'coffee', label: 'Coffee service', emoji: '☕' },
  { value: 'florals', label: 'Floral styling', emoji: '🌸' },
  { value: 'greenery', label: 'Greenery package', emoji: '🌿' },
  { value: 'flower_bar', label: 'Flower bar', emoji: '🎨' },
  { value: 'board_rental', label: 'Board rental', emoji: '🍽️' },
  { value: 'staffing', label: 'Staffing hours', emoji: '👥' },
  { value: 'beverage', label: 'Beverage service', emoji: '🥤' },
];

const STEP_CONFIG = [
  { id: 'intake', title: 'Event discovery', subtitle: 'Occasion, timing, and guest list' },
  { id: 'service', title: 'Service configuration', subtitle: 'Support level + board selection' },
  { id: 'addons', title: 'Upsells & extras', subtitle: 'Coffee, florals, rentals & more' },
  { id: 'quote', title: 'Quote & booking', subtitle: 'Real-time pricing + confirmation' },
];

const initialState: OrderFormState = {
  occasion: 'corporate',
  eventDate: '',
  eventTime: '',
  guestCount: 30,
  address: '',
  deliveryDistanceMiles: 5,
  returningCustomer: false,
  serviceLevel: 'dropoff',
  boardSize: 'large',
  boardStyle: 'classic',
  dietaryNeeds: ['none'],
  premiumUpgrades: [],
  addOns: [],
  addOnSelections: {},
  notes: '',
  email: '',
  phone: '',
};

const formatStepIndex = (idx: number) => `0${idx + 1}`;

const AvailabilityBadge = ({ status }: { status: 'green' | 'yellow' | 'red' }) => {
  const color =
    status === 'green'
      ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
      : status === 'yellow'
        ? 'bg-amber-100 text-amber-800 border-amber-200'
        : 'bg-rose-100 text-rose-800 border-rose-200';
  return <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${color}`}>{status.toUpperCase()}</span>;
};

const SmartSuggestion = ({ title, body }: { title: string; body: string }) => (
  <div className="rounded-xl border border-dashed border-indigo-200 bg-indigo-50/60 p-4 text-sm text-indigo-900">
    <p className="font-semibold">{title}</p>
    <p>{body}</p>
  </div>
);

function getSmartUpsells(order: OrderFormState): string[] {
  const suggestions: string[] = [];
  if (order.occasion === 'corporate' || order.occasion === 'meeting') {
    suggestions.push('Corporate teams love pairing a coffee service with morning or lunch boards.');
  }
  if (order.occasion === 'wedding') {
    suggestions.push('Florals + greenery photograph beautifully for weddings.');
  }
  if (order.serviceLevel !== 'pickup' && (order.deliveryDistanceMiles ?? 0) > 10) {
    suggestions.push('Full-service styling offsets longer routes and ensures premium presentation.');
  }
  if (order.guestCount >= 50) {
    suggestions.push('Consider on-site staffing so replenishing + breakdown are handled for you.');
  }
  return suggestions;
}

export function OrderingAgent() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<OrderFormState>(() => {
    const recommended = recommendBoardSize(initialState.guestCount);
    return { ...initialState, boardSize: recommended.boardSize };
  });

  const quote = useMemo(() => buildQuote(form), [form]);
  const availability = useMemo(() => assessAvailability(form.eventDate), [form.eventDate]);
  const smartUpsells = useMemo(() => getSmartUpsells(form), [form]);

  const updateForm = <K extends keyof OrderFormState>(key: K, value: OrderFormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleArrayValue = <T,>(list: T[], value: T): T[] =>
    list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

  const handleGuestCount = (count: number) => {
    const safeCount = Math.max(5, count);
    setForm((prev) => {
      const recommendation = recommendBoardSize(safeCount);
      return {
        ...prev,
        guestCount: safeCount,
        boardSize: recommendation.boardSize as BoardSize,
      };
    });
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Occasion</label>
              <div className="grid gap-2">
                {OCCASION_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateForm('occasion', option.value)}
                    className={`rounded-xl border px-4 py-3 text-left text-sm transition hover:border-indigo-400 ${
                      form.occasion === option.value ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Event date</label>
              <input
                type="date"
                value={form.eventDate}
                onChange={(e) => updateForm('eventDate', e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
              />
              <div className="flex items-center justify-between text-sm">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Start time</label>
                  <input
                    type="time"
                    value={form.eventTime}
                    onChange={(e) => updateForm('eventTime', e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Guests</label>
                  <input
                    type="number"
                    min={5}
                    value={form.guestCount}
                    onChange={(e) => handleGuestCount(Number(e.target.value))}
                    className="w-32 rounded-xl border border-slate-200 px-3 py-3 text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Event location</label>
              <textarea
                rows={2}
                value={form.address}
                onChange={(e) => updateForm('address', e.target.value)}
                placeholder="Street, city, venue name..."
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
              />
              <div className="flex flex-wrap gap-4">
                <label className="text-xs text-slate-500">
                  Delivery distance (mi)
                  <input
                    type="number"
                    value={form.deliveryDistanceMiles ?? ''}
                    onChange={(e) => updateForm('deliveryDistanceMiles', Number(e.target.value))}
                    className="ml-2 w-20 rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  />
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.returningCustomer}
                    onChange={() => updateForm('returningCustomer', !form.returningCustomer)}
                    className="h-4 w-4 rounded border-slate-300"
                  />
                  Returning customer
                </label>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase text-slate-500">Service level</p>
              {SERVICE_LEVELS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateForm('serviceLevel', option.value)}
                  className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                    form.serviceLevel === option.value
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <p className="font-medium">{option.label}</p>
                  <p className="text-sm text-slate-500">{option.description}</p>
                  <p className="text-sm text-slate-600">
                    {SERVICE_FEES[option.value].fee === 0
                      ? 'Included'
                      : formatCurrency(SERVICE_FEES[option.value].fee)}
                  </p>
                </button>
              ))}
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm font-semibold uppercase text-slate-500">Board size</p>
                <div className="mt-3 grid gap-2">
                  {(Object.keys(BOARD_OPTIONS) as BoardSize[]).map((size) => {
                    const board = BOARD_OPTIONS[size];
                    return (
                      <label
                        key={size}
                        className={`flex cursor-pointer items-center justify-between rounded-xl border px-3 py-3 text-sm ${
                          form.boardSize === size
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div>
                          <p className="font-semibold">
                            {board.label} · feeds {board.feeds}
                          </p>
                          <p className="text-xs text-slate-500">{formatCurrency(board.basePrice)}</p>
                        </div>
                        <input
                          type="radio"
                          name="board-size"
                          checked={form.boardSize === size}
                          onChange={() => updateForm('boardSize', size)}
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm font-semibold uppercase text-slate-500">Board style</p>
                <div className="mt-3 grid gap-2">
                  {BOARD_STYLES.map((style) => (
                    <button
                      key={style.value}
                      onClick={() => updateForm('boardStyle', style.value as OrderFormState['boardStyle'])}
                      className={`rounded-xl border px-3 py-2 text-left text-sm ${
                        form.boardStyle === style.value
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {style.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm font-semibold uppercase text-slate-500">Dietary accommodations</p>
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  {DIETARY_OPTIONS.map((diet) => (
                    <label key={diet.value} className="flex items-center gap-2 rounded-lg border border-slate-200 px-2 py-1">
                      <input
                        type="checkbox"
                        checked={form.dietaryNeeds.includes(diet.value)}
                        onChange={() => {
                          const next = toggleArrayValue(form.dietaryNeeds, diet.value);
                          updateForm('dietaryNeeds', next.length ? next : ['none']);
                        }}
                      />
                      {diet.label}
                    </label>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm font-semibold uppercase text-slate-500">Premium upgrades</p>
                <div className="mt-3 grid gap-2 text-sm">
                  {UPGRADE_OPTIONS.map((upgrade) => (
                    <label key={upgrade.value} className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2">
                      <div>
                        <p className="font-semibold">{upgrade.label}</p>
                        <p className="text-xs text-slate-500">{upgrade.description}</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={form.premiumUpgrades.includes(upgrade.value)}
                        onChange={() =>
                          updateForm('premiumUpgrades', toggleArrayValue(form.premiumUpgrades, upgrade.value))
                        }
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase text-slate-500">Add-on services</p>
              {ADD_ON_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateForm('addOns', toggleArrayValue(form.addOns, option.value))}
                  className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left ${
                    form.addOns.includes(option.value)
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <p className="font-semibold">
                      {option.emoji} {option.label}
                    </p>
                    <p className="text-xs text-slate-500">{ADD_ONS[option.value].description}</p>
                  </div>
                  <span className="text-sm text-slate-600">{formatCurrency(ADD_ONS[option.value].amount)}</span>
                </button>
              ))}
            </div>
            <div className="space-y-4 rounded-2xl border border-slate-200 p-4">
              <p className="text-sm font-semibold uppercase text-slate-500">Add-on details</p>
              {form.addOns.includes('coffee') && (
                <label className="text-sm">
                  Coffee guests
                  <input
                    type="number"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
                    value={form.addOnSelections.coffeeGuests ?? form.guestCount}
                    onChange={(e) =>
                      updateForm('addOnSelections', {
                        ...form.addOnSelections,
                        coffeeGuests: Number(e.target.value),
                      })
                    }
                  />
                </label>
              )}
              {form.addOns.includes('staffing') && (
                <label className="text-sm">
                  Staffing hours
                  <input
                    type="number"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
                    value={form.addOnSelections.staffingHours ?? 2}
                    onChange={(e) =>
                      updateForm('addOnSelections', {
                        ...form.addOnSelections,
                        staffingHours: Number(e.target.value),
                      })
                    }
                  />
                </label>
              )}
              {form.addOns.includes('florals') && (
                <label className="text-sm">
                  Floral tier
                  <select
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                    value={form.addOnSelections.florals ?? 'centerpiece'}
                    onChange={(e) =>
                      updateForm('addOnSelections', {
                        ...form.addOnSelections,
                        florals: e.target.value as 'centerpiece' | 'accent' | 'full',
                      })
                    }
                  >
                    <option value="centerpiece">Centerpiece</option>
                    <option value="accent">Accent florals</option>
                    <option value="full">Full styling</option>
                  </select>
                </label>
              )}
              {smartUpsells.length > 0 && (
                <div className="space-y-3">
                  {smartUpsells.map((tip) => (
                    <SmartSuggestion key={tip} title="Smart suggestion" body={tip} />
                  ))}
                </div>
              )}
              <label className="text-sm">
                Notes / special requests
                <textarea
                  rows={3}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  value={form.notes}
                  onChange={(e) => updateForm('notes', e.target.value)}
                />
              </label>
            </div>
          </div>
        );
      default:
        return (
          <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase text-slate-500">Availability</p>
                  <p className="text-sm text-slate-600">{availability.message}</p>
                </div>
                <AvailabilityBadge status={availability.status} />
              </div>
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-base font-semibold text-slate-800">Itemized quote</p>
                <div className="mt-4 space-y-3 text-sm">
                  {quote.lineItems.map((item) => (
                    <div key={item.label} className="flex items-start justify-between border-b border-slate-100 pb-2 last:border-none">
                      <div>
                        <p className="font-medium text-slate-800">{item.label}</p>
                        {item.details && <p className="text-xs text-slate-500">{item.details}</p>}
                      </div>
                      <span className="font-semibold text-slate-900">{formatCurrency(item.amount)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between font-semibold">
                    <span>Subtotal</span>
                    <span>{formatCurrency(quote.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Suggested tip (18%)</span>
                    <span>{formatCurrency(quote.suggestedTip)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-slate-900">
                    <span>Total</span>
                    <span>{formatCurrency(quote.total)}</span>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm font-semibold uppercase text-slate-500">Booking steps</p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
                  <li>Hold date with 50% deposit via Stripe.</li>
                  <li>Balance auto-charged 48 hours before service.</li>
                  <li>Invoice + kitchen production list sync to Airtable.</li>
                </ul>
              </div>
            </div>
            <div className="space-y-3 rounded-2xl border border-slate-200 p-4">
              <label className="text-sm font-medium">
                Contact email
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateForm('email', e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  placeholder="you@company.com"
                />
              </label>
              <label className="text-sm font-medium">
                Mobile number
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateForm('phone', e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  placeholder="(555) 000-0000"
                />
              </label>
              <button className="mt-2 w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                Generate draft order + Stripe invoice
              </button>
              <p className="text-xs text-slate-500">
                Next up: plug into Stripe + Google Calendar so every confirmed order auto-blocks production capacity and
                routes clean emails instead of the inbox chaos you mentioned.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <section className="space-y-10">
      <div className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
        <div className="flex flex-wrap items-center gap-4">
          {STEP_CONFIG.map((config, index) => (
            <div key={config.id} className="flex items-center gap-3">
              <button
                onClick={() => setStep(index)}
                className={`flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-semibold ${
                  step === index ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {formatStepIndex(index)}
              </button>
              <div>
                <p className="text-sm font-semibold text-slate-900">{config.title}</p>
                <p className="text-xs text-slate-500">{config.subtitle}</p>
              </div>
              {index < STEP_CONFIG.length - 1 && <div className="hidden h-px flex-1 bg-slate-200 lg:block" />}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm">
        {renderStepContent()}
        <div className="mt-8 flex flex-wrap justify-between gap-4">
          <button
            disabled={step === 0}
            onClick={() => setStep((prev) => Math.max(0, prev - 1))}
            className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Back
          </button>
          <button
            onClick={() => setStep((prev) => Math.min(STEP_CONFIG.length - 1, prev + 1))}
            className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
          >
            {step === STEP_CONFIG.length - 1 ? 'Review booking' : 'Next step'}
          </button>
        </div>
      </div>
    </section>
  );
}
