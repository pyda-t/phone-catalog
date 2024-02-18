import { FunctionComponent, ReactNode, createContext, useEffect, useState } from 'react';

// Types
import { Product } from '../types/Product';
import { getProducts } from '../services/products';

type ProductContextType = {
  products: Product[];
  productsLoading: boolean;
};

export const ProductsContext = createContext<ProductContextType>({
  products: [],
  productsLoading: true,
});

type Props = {
  children: ReactNode;
}

export const ProductsProvider: FunctionComponent<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .finally(() => setProductsLoading(false));
  }, []);

  const value = {
    products,
    productsLoading,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
