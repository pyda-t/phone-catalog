import { createContext, FunctionComponent, ReactNode, useMemo } from 'react';

// Types
import { Product } from '../types/Product';

// Hooks
import { useLocalStorage } from '../hooks/useLocalStorage';

type FavoritesContextType = {
  favorites: Product[];
  setFavorites: (value: Product[]) => void;
}

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  setFavorites: value => {
    localStorage.setItem('favorites', JSON.stringify(value));
  },
});

type Props = {
  children: ReactNode;
}

export const FavoritesProvider: FunctionComponent<Props> = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage<Product[]>('favorites', []);

  const contextValue = useMemo(() => {
    return {
      favorites,
      setFavorites,
    }
  }, [favorites, setFavorites]);

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};
