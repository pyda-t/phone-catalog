import { ProductType } from "./ProductType";

export interface Product {
  age: number;
  capacity: string;
  discount: number;
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  ram: string;
  screen: string;
  snippet: string;
  type: ProductType;
  discountSum: number;
  newPrice: number;
}
