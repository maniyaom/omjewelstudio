interface Category {
  [key: string]: string;
}

export interface Product {
  id: number;
  name: string;
  imageURL: string;
  videoURL: string;
  category: string;
  isFeatured: boolean;
}

export type CategoryType = 'diamond-rings' | 'pendants' | 'earrings';

export const categories: Category = {
  "diamond-rings": "Diamond Rings",
  "pendants": "Pendants",
  "earrings": "Earrings"
}