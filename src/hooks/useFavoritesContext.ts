import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesProvider';

export const useFavoritesContext = () => useContext(FavoritesContext);
