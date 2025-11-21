import {
  ADD_ONS,
  BOARD_OPTIONS,
  DEFAULT_TIP_RATE,
  DELIVERY_FEES,
  DIETARY_UPCHARGES,
  MIN_LEAD_DAYS,
  PREMIUM_UPGRADES,
  SERVICE_FEES,
  STYLE_UPCHARGES,
} from '@/data/pricing';
import type { OrderFormState, QuoteResult } from '@/types/order';

const PEAK_DATES = ['12-15', '12-16', '12-17', '12-22', '12-23', '12-31'];

const HOLIDAY_UPCHARGE = 0.1; // 10%

export function recommendBoardSize(guestCount: number): { boardSize: keyof typeof BOARD_OPTIONS; boardCount: number } {
  if (guestCount <= 15) return { boardSize: 'small', boardCount: 1 };
  if (guestCount <= 25) return { boardSize: 'medium', boardCount: 1 };
  if (guestCount <= 40) return { boardSize: 'large', boardCount: 1 };
  if (guestCount <= 80) return { boardSize: 'xl', boardCount: Math.ceil(guestCount / 55) };
  return { boardSize: 'xl', boardCount: Math.ceil(guestCount / 60) };
}

export function estimateBoardCount(boardSize: keyof typeof BOARD_OPTIONS, guests: number): number {
  const board = BOARD_OPTIONS[boardSize];
  return Math.max(1, Math.ceil(guests / board.maxGuests));
}

export function deriveDeliveryFee(distanceMiles = 0): number {
  for (const band of DELIVERY_FEES) {
    if (distanceMiles <= band.maxMiles) {
      if (band.perMile) {
        return Math.ceil(distanceMiles) * band.perMile;
      }
      return band.flatFee;
    }
  }
  return 0;
}

export function isPeakDate(isoDate: string): boolean {
  if (!isoDate) return false;
  const [, month, day] = isoDate.split('-');
  return PEAK_DATES.includes(`${month}-${day}`);
}

export function assessAvailability(isoDate: string): { status: 'green' | 'yellow' | 'red'; message: string } {
  if (!isoDate) {
    return { status: 'yellow', message: 'Select a date to check availability.' };
  }
  const eventDate = new Date(isoDate);
  const today = new Date();
  const diffDays = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < MIN_LEAD_DAYS) {
    return { status: 'red', message: 'Lead time under 72 hours — manual approval required.' };
  }

  if (diffDays < 7) {
    return { status: 'yellow', message: 'Tight turnaround. Confirm kitchen capacity before accepting.' };
  }

  return { status: 'green', message: 'Date is open on the production calendar.' };
}

export function buildQuote(order: OrderFormState): QuoteResult {
  const lineItems = [];
  const boardMeta = BOARD_OPTIONS[order.boardSize];
  const boardCount = estimateBoardCount(order.boardSize, order.guestCount);
  const boardTotal = boardMeta.basePrice * boardCount;

  lineItems.push({
    label: `${boardMeta.label} board x${boardCount} (feeds ${boardMeta.feeds})`,
    amount: boardTotal,
    details: `${order.guestCount} guests`,
  });

  const styleUpcharge = STYLE_UPCHARGES[order.boardStyle] ?? 0;
  if (styleUpcharge) {
    lineItems.push({
      label: `${order.boardStyle.replace('_', ' ')} styling`,
      amount: styleUpcharge,
    });
  }

  const serviceFee = SERVICE_FEES[order.serviceLevel]?.fee ?? 0;
  if (serviceFee) {
    lineItems.push({
      label: SERVICE_FEES[order.serviceLevel].label,
      amount: serviceFee,
      details: SERVICE_FEES[order.serviceLevel].description,
    });
  }

  if (order.serviceLevel !== 'pickup') {
    const deliveryFee = deriveDeliveryFee(order.deliveryDistanceMiles ?? 0);
    if (deliveryFee) {
      lineItems.push({
        label: `Delivery (${order.deliveryDistanceMiles ?? '~'} mi)`,
        amount: deliveryFee,
      });
    }
  }

  order.dietaryNeeds
    .filter((need) => need !== 'none')
    .forEach((need) => {
      const dietary = DIETARY_UPCHARGES[need];
      lineItems.push({
        label: `${dietary.label} prep`,
        amount: dietary.fee,
      });
    });

  order.premiumUpgrades.forEach((upgrade) => {
    const meta = PREMIUM_UPGRADES[upgrade];
    lineItems.push({
      label: meta.label,
      amount: meta.fee,
      details: meta.description,
    });
  });

  order.addOns.forEach((addOn) => {
    const meta = ADD_ONS[addOn];
    let addOnPrice = meta.amount;

    if (meta.pricing === 'per_person') {
      const guests =
        addOn === 'coffee'
          ? order.addOnSelections.coffeeGuests ?? order.guestCount
          : order.guestCount;
      addOnPrice = guests * meta.amount;
    }

    if (meta.pricing === 'hourly') {
      const hours = order.addOnSelections.staffingHours ?? 2;
      addOnPrice = hours * meta.amount;
    }

    if (addOn === 'florals') {
      const tier = order.addOnSelections.florals ?? 'centerpiece';
      const multiplier = tier === 'full' ? 3 : tier === 'accent' ? 2 : 1;
      addOnPrice = meta.amount * multiplier;
    }

    lineItems.push({
      label: meta.label,
      amount: addOnPrice,
      details: meta.description,
    });
  });

  let subtotal = lineItems.reduce((sum, line) => sum + line.amount, 0);

  if (isPeakDate(order.eventDate)) {
    const upcharge = subtotal * HOLIDAY_UPCHARGE;
    lineItems.push({
      label: 'Peak date adjustment',
      amount: upcharge,
      details: 'Applies to high-demand holiday windows',
    });
    subtotal += upcharge;
  }

  const suggestedTip = Math.round(subtotal * DEFAULT_TIP_RATE);
  const total = subtotal + suggestedTip;

  return {
    lineItems,
    subtotal,
    suggestedTip,
    total,
    boardCount,
  };
}
