export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  category: string;
  image: string;
}

export interface CartItem extends Product {
  cartQuantity: number;
}

export type PageView = 'HOME' | 'CART' | 'ADMIN';

export enum Category {
  ELECTRONICS = 'Electronics',
  FASHION = 'Fashion',
  HOME = 'Home',
  BEAUTY = 'Beauty',
  ART = 'Art'
}