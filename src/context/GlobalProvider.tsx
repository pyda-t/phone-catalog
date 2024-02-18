import { ReactNode, FunctionComponent } from 'react';

// Providers
import { ProductsProvider } from './ProductsProvider';
import { FavoritesProvider } from './FavoritesProvider';
import { CartProvider } from './CartProvider';

type Props = {
  children: ReactNode;
};

export const GlobalProvider: FunctionComponent<Props> = ({ children }) => (
  <ProductsProvider>
    <FavoritesProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </FavoritesProvider>
  </ProductsProvider>
);
