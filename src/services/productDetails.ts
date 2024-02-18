import { getData } from '../utils/httpClient';

// Types
import { ProductDetails } from '../types/ProductDetails';

export function getProductsDetails(productId: string) {
  return getData<ProductDetails>(`/products/${productId}.json`)
    .then(productDetails => ({
      ...productDetails,
      images: productDetails.images.map(image => `https://pyda-t.github.io/phone-catalog/${image}`),
    }));
}
