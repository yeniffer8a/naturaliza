export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
}
