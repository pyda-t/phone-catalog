import { createContext, FunctionComponent, ReactNode, useMemo } from 'react';

// Types
import { CartProduct } from '../types/CartProduct';

// Hooks
import { useLocalStorage } from '../hooks/useLocalStorage';

type CartContextType = {
  cartProducts: CartProduct[];
  setCartProducts: (value: CartProduct[]) => void;
}

export const CartContext = createContext<CartContextType>({
  cartProducts: JSON.parse(localStorage.getItem('cart') || '[]'),
  setCartProducts: value => {
    localStorage.setItem('cart', JSON.stringify(value));
  },
});

type Props = {
  children: ReactNode;
}

export const CartProvider: FunctionComponent<Props> = ({ children }) => {
  const [cartProducts, setCartProducts] = useLocalStorage<CartProduct[]>('cart', []);

  const contextValue = useMemo(() => {
    return {
      cartProducts,
      setCartProducts,
    }
  }, [cartProducts, setCartProducts]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};