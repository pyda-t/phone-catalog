import { getData } from '../utils/httpClient';

// Types
import { ProductDetails } from '../types/ProductDetails';

export function getProductsDetails(productId: string) {
  return getData<ProductDetails>(`/products/${productId}.json`);
}
