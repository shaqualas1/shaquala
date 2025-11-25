export const catalog = [
  {
    id: 'pair-aurora',
    name: 'Aurora Pair',
    description: 'Custom gradient sneakers built for everyday comfort.',
    basePrice: 129,
    defaultColor: 'Sunset',
    availableColors: ['Sunset', 'Ocean', 'Matte Black'],
    sizes: ['US 5', 'US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    productionEtaDays: 7
  },
  {
    id: 'pair-lumen',
    name: 'Lumen Pair',
    description: 'Reflective runner with lightweight knit upper.',
    basePrice: 149,
    defaultColor: 'Lunar Grey',
    availableColors: ['Lunar Grey', 'Volt', 'Night Sky'],
    sizes: ['US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
    productionEtaDays: 5
  },
  {
    id: 'pair-orbit',
    name: 'Orbit Pair',
    description: 'Minimalist slip-on for casual wear or office days.',
    basePrice: 119,
    defaultColor: 'Graphite',
    availableColors: ['Graphite', 'Ivory', 'Forest'],
    sizes: ['US 5', 'US 6', 'US 7', 'US 8', 'US 9', 'US 10'],
    productionEtaDays: 4
  },
  {
    id: 'pair-atelier',
    name: 'Atelier Pair',
    description: 'Hand-finished leather pair for elevated looks.',
    basePrice: 199,
    defaultColor: 'Chestnut',
    availableColors: ['Chestnut', 'Midnight', 'Cinder'],
    sizes: ['US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    productionEtaDays: 12
  },
  {
    id: 'pair-play',
    name: 'Play Pair',
    description: 'Bold platform set designed for standout outfits.',
    basePrice: 159,
    defaultColor: 'Vivid Berry',
    availableColors: ['Vivid Berry', 'Citrus', 'Ice'],
    sizes: ['US 5', 'US 6', 'US 7', 'US 8', 'US 9'],
    productionEtaDays: 6
  }
];

export function findCatalogItem(id) {
  return catalog.find((item) => item.id === id);
}
