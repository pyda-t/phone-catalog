import { FunctionComponent } from 'react';
import cn from 'classnames';

// Styles
import './CartProductCard.scss';

// Types
import { CartProduct } from '../../types/CartProduct';

// Icons
import { ReactComponent as Cross } from '../../assets/icons/cross.svg';
import { ReactComponent as Minus } from './assets/minus.svg';
import { ReactComponent as Plus } from './assets/plus.svg';

// Hooks
import { useCartContext } from '../../hooks/useCartContext';

// Components
import { SecondaryButton } from '../SecondaryButton';
import { ProductPrices } from '../ProductPrices';

type Props = {
  cartProduct: CartProduct;
};

export const CartProductCard: FunctionComponent<Props> = ({ cartProduct }) => {
  const { cartProducts, setCartProducts } = useCartContext();

  const deleteCartProduct = () => {
    const newCartProducts = cartProducts.filter(cart => cart.product.id !== cartProduct.product.id);

    setCartProducts(newCartProducts);
  };

  const decreaseCartProductQuantity = () => {
    const newCartProducts = cartProducts.map(cart => {
      if (cart.product.id !== cartProduct.product.id) {
        return cart;
      }

      return {
        ...cart,
        quantity: cart.quantity - 1,
      }
    });

    setCartProducts(newCartProducts);
  };

  const increaseCartProductQuantity = () => {
    const newCartProducts = cartProducts.map(cart => {
      if (cart.product.id !== cartProduct.product.id) {
        return cart;
      }

      return {
        ...cart,
        quantity: cart.quantity + 1,
      }
    });

    setCartProducts(newCartProducts);
  };

  return (
    <div className="CartProductCard">
      <div className="CartProductCard__Left">
        <button
          type="button"
          className="CartProductCard__DeleteButton"
          onClick={deleteCartProduct}
        >
          <Cross />
        </button>

        <img
          src={cartProduct.product.imageUrl}
          alt={cartProduct.product.name}
          className="CartProductCard__Image"
        />

        <p className="CartProductCard__Title">
          { cartProduct.product.name }
        </p>
      </div>

      <div className="CartProductCard__Right">
        <div className="CartProductCard__Buttons">
          <SecondaryButton
            onClick={decreaseCartProductQuantity}
            size="small"
            disabled={cartProduct.quantity === 1}
          >
            <Minus className={cn(
              'CartProductCard__Icon',
              { 'CartProductCard__Icon--black': cartProduct.quantity > 1 },
            )}/>
          </SecondaryButton>

          <span className="CartProductCard__Quantity">
            {cartProduct.quantity}
          </span>

          <SecondaryButton
            onClick={increaseCartProductQuantity}
            size="small"
          >
            <Plus />
          </SecondaryButton>
        </div>

        <ProductPrices
          newPrice={cartProduct.product.newPrice}
          className="CartProductCard__Price"
        />
      </div>
    </div>
  );
};
