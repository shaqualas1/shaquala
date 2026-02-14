export type Occasion =
  | 'corporate'
  | 'wedding'
  | 'birthday'
  | 'private'
  | 'meeting'
  | 'other';

export type ServiceLevel =
  | 'pickup'
  | 'dropoff'
  | 'full_service'
  | 'staffed';

export type BoardSize = 'small' | 'medium' | 'large' | 'xl';

export type BoardStyle = 'classic' | 'seasonal' | 'themed' | 'custom';

export type DietaryNeed =
  | 'vegetarian'
  | 'vegan'
  | 'gluten_free'
  | 'kosher'
  | 'halal'
  | 'none';

export type PremiumUpgrade = 'prosciutto' | 'brie' | 'specialty';

export type AddOn =
  | 'coffee'
  | 'florals'
  | 'greenery'
  | 'flower_bar'
  | 'board_rental'
  | 'staffing'
  | 'beverage';

export interface AddOnSelection {
  coffeeGuests?: number;
  florals?: 'centerpiece' | 'accent' | 'full';
  greenery?: boolean;
  flowerBar?: boolean;
  boardRental?: boolean;
  staffingHours?: number;
  beverage?: boolean;
}

export interface OrderFormState {
  occasion: Occasion;
  eventDate: string;
  eventTime: string;
  guestCount: number;
  address: string;
  deliveryDistanceMiles?: number;
  returningCustomer: boolean;
  serviceLevel: ServiceLevel;
  boardSize: BoardSize;
  boardStyle: BoardStyle;
  dietaryNeeds: DietaryNeed[];
  premiumUpgrades: PremiumUpgrade[];
  addOns: AddOn[];
  addOnSelections: AddOnSelection;
  notes: string;
  email: string;
  phone: string;
}

export interface QuoteLineItem {
  label: string;
  amount: number;
  details?: string;
}

export interface QuoteResult {
  lineItems: QuoteLineItem[];
  subtotal: number;
  suggestedTip: number;
  total: number;
  boardCount: number;
}
