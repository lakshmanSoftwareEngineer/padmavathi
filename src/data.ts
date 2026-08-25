export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  description: string;
  badge?: string;
  rating: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
  description: string;
  productCount: number;
}

export const categories: Category[] = [
  {
    id: 'all',
    name: 'All Gifts',
    icon: '🎁',
    image: 'https://loremflickr.com/800/800/gift,box,present?lock=999',
    description: 'Explore our entire collection',
    productCount: 24,
  },
  {
    id: 'flowers',
    name: 'Flowers & Bouquets',
    icon: '🌹',
    image: 'https://loremflickr.com/800/800/flower,bouquet?lock=100',
    description: 'Fresh blooms for every occasion',
    productCount: 4,
  },
  {
    id: 'chocolates',
    name: 'Chocolates & Sweets',
    icon: '🍫',
    image: 'https://loremflickr.com/800/800/chocolate,truffle?lock=200',
    description: 'Premium confections to delight',
    productCount: 4,
  },
  {
    id: 'teddy',
    name: 'Teddy Bears & Plush',
    icon: '🧸',
    image: 'https://loremflickr.com/800/800/teddybear,plush?lock=300',
    description: 'Soft & cuddly companions',
    productCount: 4,
  },
  {
    id: 'decor',
    name: 'Home Décor',
    icon: '🏠',
    image: 'https://loremflickr.com/800/800/homedecor,vase?lock=400',
    description: 'Elegant décor & accessories',
    productCount: 4,
  },
  {
    id: 'personalized',
    name: 'Personalized Gifts',
    icon: '✨',
    image: 'https://loremflickr.com/800/800/custom,gift,mug?lock=500',
    description: 'Made uniquely for them',
    productCount: 4,
  },
  {
    id: 'candles',
    name: 'Candles & Fragrance',
    icon: '🕯️',
    image: 'https://loremflickr.com/800/800/candle,wax?lock=600',
    description: 'Aromatic luxury for the home',
    productCount: 4,
  },
];

export const products: Product[] = [
  // Flowers & Bouquets
  {
    id: 1,
    name: 'Royal Rose Bouquet',
    price: 1299,
    originalPrice: 1599,
    category: 'flowers',
    image: 'https://loremflickr.com/800/800/red,rose,bouquet?lock=1',
    description: 'A stunning arrangement of 24 premium red roses wrapped in golden tissue with satin ribbon.',
    badge: 'Bestseller',
    rating: 4.9,
  },
  {
    id: 2,
    name: 'Orchid Elegance',
    price: 1899,
    category: 'flowers',
    image: 'https://loremflickr.com/800/800/orchid,flower?lock=2',
    description: 'Exotic phalaenopsis orchids in a handcrafted ceramic planter for a touch of luxury.',
    rating: 4.7,
  },
  {
    id: 3,
    name: 'Sunshine Tulip Mix',
    price: 999,
    originalPrice: 1299,
    category: 'flowers',
    image: 'https://loremflickr.com/800/800/tulip,bouquet?lock=3',
    description: 'A vibrant mix of 18 tulips in warm sunset colors, hand-tied with kraft paper.',
    badge: 'Sale',
    rating: 4.8,
  },
  {
    id: 4,
    name: 'Lily & Eucalyptus',
    price: 1499,
    category: 'flowers',
    image: 'https://loremflickr.com/800/800/lily,bouquet?lock=4',
    description: 'Fragrant oriental lilies paired with fresh eucalyptus in a rustic bouquet.',
    rating: 4.6,
  },

  // Chocolates & Sweets
  {
    id: 5,
    name: 'Belgian Truffle Box',
    price: 1599,
    originalPrice: 1999,
    category: 'chocolates',
    image: 'https://loremflickr.com/800/800/chocolate,truffle,box?lock=5',
    description: 'Assorted 24-piece Belgian truffles in a luxurious velvet gift box.',
    badge: 'Premium',
    rating: 4.9,
  },
  {
    id: 6,
    name: 'Artisan Chocolate Hamper',
    price: 2499,
    category: 'chocolates',
    image: 'https://loremflickr.com/800/800/chocolate,hamper?lock=6',
    description: 'A curated hamper of single-origin chocolates, cocoa nibs, and hot chocolate mix.',
    rating: 4.8,
  },
  {
    id: 7,
    name: 'Gold Foil Pralines',
    price: 899,
    category: 'chocolates',
    image: 'https://loremflickr.com/800/800/praline,chocolate?lock=7',
    description: '12 hand-decorated pralines wrapped in real gold foil, perfect for gifting.',
    badge: 'New',
    rating: 4.7,
  },
  {
    id: 8,
    name: 'Chocolate Fondue Tower',
    price: 3499,
    category: 'chocolates',
    image: 'https://loremflickr.com/800/800/chocolate,fondue?lock=8',
    description: 'Premium chocolate fountain kit with dipping fruits, marshmallows, and accessories.',
    rating: 4.5,
  },

  // Teddy Bears & Plush
  {
    id: 9,
    name: 'Giant Cuddle Bear',
    price: 1999,
    originalPrice: 2499,
    category: 'teddy',
    image: 'https://loremflickr.com/800/800/giant,teddybear?lock=9',
    description: '4-foot tall premium plush teddy bear in classic brown with a satin bow tie.',
    badge: 'Popular',
    rating: 4.9,
  },
  {
    id: 10,
    name: 'Love Heart Teddy',
    price: 999,
    category: 'teddy',
    image: 'https://loremflickr.com/800/800/heart,teddybear?lock=10',
    description: 'Adorable teddy bear holding a velvet heart with "I Love You" embroidery.',
    rating: 4.8,
  },
  {
    id: 11,
    name: 'Bunny Snuggler',
    price: 799,
    originalPrice: 999,
    category: 'teddy',
    image: 'https://loremflickr.com/800/800/bunny,plush?lock=11',
    description: 'Ultra-soft bunny plush in pastel pink, perfect for babies and toddlers.',
    badge: 'Sale',
    rating: 4.7,
  },
  {
    id: 12,
    name: 'Safari Animal Set',
    price: 1499,
    category: 'teddy',
    image: 'https://loremflickr.com/800/800/safari,plush,toy?lock=12',
    description: 'Set of 5 mini safari plush animals: lion, elephant, giraffe, zebra, and hippo.',
    rating: 4.6,
  },

  // Home Décor
  {
    id: 13,
    name: 'Crystal Photo Frame',
    price: 1299,
    category: 'decor',
    image: 'https://loremflickr.com/800/800/crystal,photoframe?lock=13',
    description: 'Swarovski-element crystal frame for 5×7 photos with LED backlight.',
    badge: 'Exclusive',
    rating: 4.8,
  },
  {
    id: 14,
    name: 'Antique Bronze Figurine',
    price: 2199,
    originalPrice: 2699,
    category: 'decor',
    image: 'https://loremflickr.com/800/800/antique,bronze,figurine?lock=14',
    description: 'Handcrafted dancing couple figurine in antique bronze finish, 12" tall.',
    rating: 4.7,
  },
  {
    id: 15,
    name: 'Marble Décor Vase',
    price: 1799,
    category: 'decor',
    image: 'https://loremflickr.com/800/800/marble,vase?lock=15',
    description: 'Elegant white marble vase with gold geometric patterns, perfect centerpiece.',
    badge: 'New',
    rating: 4.9,
  },
  {
    id: 16,
    name: 'Fairy Light Jar Set',
    price: 699,
    category: 'decor',
    image: 'https://loremflickr.com/800/800/fairylight,jar?lock=16',
    description: 'Set of 3 mason jars with warm white fairy lights, battery operated.',
    rating: 4.6,
  },

  // Personalized Gifts
  {
    id: 17,
    name: 'Engraved Name Mug',
    price: 599,
    category: 'personalized',
    image: 'https://loremflickr.com/800/800/custom,engraved,mug?lock=17',
    description: 'Premium ceramic mug with custom name engraving in gold calligraphy.',
    badge: 'Top Rated',
    rating: 4.9,
  },
  {
    id: 18,
    name: 'Photo Memory Lamp',
    price: 1699,
    originalPrice: 2099,
    category: 'personalized',
    image: 'https://loremflickr.com/800/800/moon,lamp?lock=18',
    description: '3D printed moon lamp with your custom photo, touch-controlled color changing.',
    badge: 'Bestseller',
    rating: 4.8,
  },
  {
    id: 19,
    name: 'Custom Wooden Keychain',
    price: 349,
    category: 'personalized',
    image: 'https://loremflickr.com/800/800/wooden,keychain?lock=19',
    description: 'Hand-carved wooden keychain with custom text engraving, comes in a gift pouch.',
    rating: 4.7,
  },
  {
    id: 20,
    name: 'Monogram Leather Wallet',
    price: 1999,
    category: 'personalized',
    image: 'https://loremflickr.com/800/800/leather,wallet?lock=20',
    description: 'Genuine leather bi-fold wallet with custom monogram embossing in gold.',
    rating: 4.8,
  },

  // Candles & Fragrance
  {
    id: 21,
    name: 'Santal & Oud Candle',
    price: 899,
    category: 'candles',
    image: 'https://loremflickr.com/800/800/sandalwood,candle?lock=21',
    description: 'Hand-poured soy wax candle with sandalwood and oud notes, 60-hour burn time.',
    badge: 'Artisan',
    rating: 4.9,
  },
  {
    id: 22,
    name: 'Rose Garden Collection',
    price: 1499,
    originalPrice: 1899,
    category: 'candles',
    image: 'https://loremflickr.com/800/800/rose,candle,glass?lock=22',
    description: 'Set of 3 rose-scented candles in blush pink glass jars with gold lids.',
    badge: 'Sale',
    rating: 4.7,
  },
  {
    id: 23,
    name: 'Bergamot & Fig',
    price: 799,
    category: 'candles',
    image: 'https://loremflickr.com/800/800/bergamot,fig,candle?lock=23',
    description: 'Refreshing bergamot and fig candle in a geometric concrete vessel.',
    rating: 4.6,
  },
  {
    id: 24,
    name: 'Luxury Candle Gift Set',
    price: 2999,
    category: 'candles',
    image: 'https://loremflickr.com/800/800/luxury,candle,set?lock=24',
    description: 'Premium gift box with 5 travel candles, wick trimmer, and snuffer.',
    badge: 'Gift Ready',
    rating: 4.9,
  },
];
