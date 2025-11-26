import { Category, Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Minimalist Desk Lamp',
    price: 89.99,
    quantity: 15,
    description: 'A sleek, adjustable desk lamp with warm LED lighting, perfect for late-night study sessions.',
    category: Category.HOME,
    image: 'https://picsum.photos/400/400?random=1'
  },
  {
    id: '2',
    name: 'Pastel Ceramic Vase',
    price: 45.00,
    quantity: 8,
    description: 'Handcrafted ceramic vase in a soft blush pink finish. Adds a touch of elegance to any room.',
    category: Category.ART,
    image: 'https://picsum.photos/400/400?random=2'
  },
  {
    id: '3',
    name: 'Wireless Noise-Canceling Headphones',
    price: 199.50,
    quantity: 20,
    description: 'Immerse yourself in music with these high-fidelity wireless headphones featuring active noise cancellation.',
    category: Category.ELECTRONICS,
    image: 'https://picsum.photos/400/400?random=3'
  },
  {
    id: '4',
    name: 'Organic Cotton Tee',
    price: 29.99,
    quantity: 50,
    description: 'Soft, breathable organic cotton t-shirt available in earth tones. Sustainable fashion choice.',
    category: Category.FASHION,
    image: 'https://picsum.photos/400/400?random=4'
  }
];