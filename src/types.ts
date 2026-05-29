export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'alimentos' | 'brinquedos' | 'acessorios' | 'saude';
  petType: 'dogs' | 'cats' | 'others';
  image: string;
  rating: number;
  reviewsCount: number;
  isAvailable: boolean;
  badge?: string;
  specs?: {
    weight?: string;
    brand?: string;
    origin?: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: string;
  ownerName: string;
  petName: string;
  petBreed: string;
  petImage: string;
  comment: string;
  rating: number;
  date: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  benefits: string[];
}
