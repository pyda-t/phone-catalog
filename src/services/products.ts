import { getData } from '../utils/httpClient';

// Types
import { Product } from '../types/Product';

export function getProducts() {
  return getData<Product[]>('/products.json')
    .then(products => products.map((product: Product) => {
      return {
        ...product,
        discountSum: (product.price / 100) * product.discount,
        newPrice: product.price - ((product.price / 100) * product.discount),
      };
    }));
}


