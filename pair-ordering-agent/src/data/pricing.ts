import type {
  AddOn,
  BoardSize,
  BoardStyle,
  DietaryNeed,
  PremiumUpgrade,
  ServiceLevel,
} from '@/types/order';

export const BOARD_OPTIONS: Record<
  BoardSize,
  {
    label: string;
    feeds: string;
    minGuests: number;
    maxGuests: number;
    basePrice: number;
  }
> = {
  small: { label: 'Small', feeds: '10-15', minGuests: 10, maxGuests: 15, basePrice: 225 },
  medium: { label: 'Medium', feeds: '20-25', minGuests: 20, maxGuests: 25, basePrice: 350 },
  large: { label: 'Large', feeds: '30-40', minGuests: 30, maxGuests: 40, basePrice: 520 },
  xl: { label: 'XL', feeds: '50+', minGuests: 50, maxGuests: 65, basePrice: 780 },
};

export const STYLE_UPCHARGES: Record<BoardStyle, number> = {
  classic: 0,
  seasonal: 35,
  themed: 60,
  custom: 110,
};

export const SERVICE_FEES: Record<
  ServiceLevel,
  {
    label: string;
    description: string;
    fee: number;
  }
> = {
  pickup: {
    label: 'Pickup',
    description: 'Customer pickup at the PAIR kitchen',
    fee: 0,
  },
  dropoff: {
    label: 'Drop-off delivery',
    description: 'Delivered and left for host to display',
    fee: 55,
  },
  full_service: {
    label: 'Full-service styling',
    description: 'Delivery, styling, and breakdown',
    fee: 120,
  },
  staffed: {
    label: 'On-site staffing',
    description: 'Dedicated staff stays for service duration',
    fee: 175,
  },
};

export const DELIVERY_FEES = [
  { maxMiles: 5, flatFee: 25 },
  { maxMiles: 10, flatFee: 45 },
  { maxMiles: 15, flatFee: 75 },
  { maxMiles: Infinity, perMile: 6 },
];

export const DIETARY_UPCHARGES: Record<DietaryNeed, { label: string; fee: number }> = {
  none: { label: 'No restrictions', fee: 0 },
  vegetarian: { label: 'Vegetarian', fee: 25 },
  vegan: { label: 'Vegan', fee: 35 },
  gluten_free: { label: 'Gluten-free', fee: 30 },
  kosher: { label: 'Kosher', fee: 45 },
  halal: { label: 'Halal', fee: 35 },
};

export const PREMIUM_UPGRADES: Record<
  PremiumUpgrade,
  {
    label: string;
    description: string;
    fee: number;
  }
> = {
  prosciutto: { label: 'Prosciutto add-on', description: 'Hand-cut prosciutto roses', fee: 30 },
  brie: { label: 'Brie upgrade', description: 'Brie en croute or baked brie wheel', fee: 25 },
  specialty: {
    label: 'Specialty items',
    description: 'Imported cheeses, honeycomb, artisan accompaniments',
    fee: 45,
  },
};

export const ADD_ONS: Record<
  AddOn,
  {
    label: string;
    description: string;
    pricing: 'per_person' | 'flat' | 'hourly';
    amount: number;
  }
> = {
  coffee: {
    label: 'Coffee service',
    description: 'Includes setup, cups, fixings',
    pricing: 'per_person',
    amount: 5,
  },
  florals: {
    label: 'Floral styling',
    description: 'Centerpiece or full styling',
    pricing: 'flat',
    amount: 60,
  },
  greenery: {
    label: 'Greenery accents',
    description: 'Garlands and foliage for styling',
    pricing: 'flat',
    amount: 40,
  },
  flower_bar: {
    label: 'Build-your-own flower bar',
    description: 'DIY station with vases and supplies',
    pricing: 'flat',
    amount: 185,
  },
  board_rental: {
    label: 'Board rental',
    description: 'Use PAIR presentation boards',
    pricing: 'flat',
    amount: 35,
  },
  staffing: {
    label: 'Additional staffing',
    description: 'On-site team per hour',
    pricing: 'hourly',
    amount: 55,
  },
  beverage: {
    label: 'Beverage service',
    description: 'Infused waters + disposables',
    pricing: 'per_person',
    amount: 4,
  },
};

export const DEFAULT_TIP_RATE = 0.18;
export const MIN_LEAD_DAYS = 3;
