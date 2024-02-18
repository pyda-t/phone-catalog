import { FunctionComponent, useCallback, useMemo } from 'react';
import cn from 'classnames';

// Styles
import './ProductButtons.scss';

// Types
import { Product } from '../../types/Product';

// Icons
import { ReactComponent as Heart } from '../../assets/icons/heart.svg';

// Hooks
import { useFavoritesContext } from '../../hooks/useFavoritesContext';
import { useCartContext } from '../../hooks/useCartContext';

// Components
import { Button } from '../Button';
import { SecondaryButton } from '../SecondaryButton';

type Props = {
  product: Product;
  isBig?: boolean;
  className?: string;
};

export const ProductButtons: FunctionComponent<Props> = ({
  product,
  isBig = false,
  className = ''
}) => {
  const { favorites, setFavorites } = useFavoritesContext();
  const favoritesHaveProduct = useMemo(
    () => favorites.some(favorite => favorite.id === product.id),
    [favorites, product.id],
  );
  const { cartProducts, setCartProducts } = useCartContext();
  const cartProductsHaveProduct = useMemo(
    () => cartProducts.some(cartProduct => cartProduct.product.id === product.id),
    [cartProducts, product.id],
  );

  const handleFavorites = useCallback(() => {
    const newFavorites = favoritesHaveProduct
      ? favorites.filter(favorite => favorite.id !== product.id)
      : [...favorites, product];

    setFavorites(newFavorites);
  }, [favorites, favoritesHaveProduct, product, setFavorites]);

  const handleCart = useCallback(() => {
    const newCartProducts = cartProductsHaveProduct
      ? cartProducts.filter(cartProduct => cartProduct.product.id !== product.id)
      : [...cartProducts, { product, quantity: 1 }];

    setCartProducts(newCartProducts);
  }, [cartProducts, cartProductsHaveProduct, product, setCartProducts]);

  return (
    <div className={cn(
      'ProductButtons',
      {
        'ProductButtons--big': isBig,
        [className]: !!className,
      },
    )}>
      <Button
        isBig={isBig}
        text={`Add${cartProductsHaveProduct ? 'ed' : ''} to cart`}
        isSelected={cartProductsHaveProduct}
        onClick={handleCart}
      />

      <SecondaryButton
        size={isBig ? 'big' : ''}
        onClick={handleFavorites}
      >
        <Heart className={cn(
          'ProductButtons__Heart',
          { 'ProductButtons__Heart--red': favoritesHaveProduct },
        )} />
      </SecondaryButton>
    </div>
  );
};
