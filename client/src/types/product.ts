export interface Product {
  _id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  characteristics: {
    origin: string;
    type: string;
    flavor: string;
    properties: string;
    caffeineContent: string;
    allergens: string;
    organicCertification: boolean;
  };
  ingredients: string;
  presentations: Array<{
    size: string;
    price: number;
    stock: number;
  }>;
  preparationInstructions: {
    recommendedPortion: string;
    waterTemperature: string;
    infusionTime: string;
    additionalInfo: string;
  };
}

export interface ProductFilters {
  type?: string;
  origin?: string;
  flavor?: string;
  properties?: string;
  caffeineContent?: string;
  allergens?: string;
  organic?: boolean;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
}
