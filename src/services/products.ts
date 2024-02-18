import { getData } from '../utils/httpClient';

// Types
import { Product } from '../types/Product';

export function getProducts() {
  return getData<Product[]>('/products.json')
    .then(products => products.map((product: Product) => {
      return {
        ...product,
        imageUrl: `https://pyda-t.github.io/phone-catalog/${product.imageUrl}`,
        discountSum: (product.price / 100) * product.discount,
        newPrice: product.price - ((product.price / 100) * product.discount),
      };
    }));
}


