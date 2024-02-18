import { FunctionComponent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Styles
import './CartTotal.scss';

// Hooks
import { useCartContext } from '../../hooks/useCartContext';

// Variables
import { ANIM_TRANSITION } from '../../variables';

// Components
import { ProductPrices } from '../ProductPrices';
import { Quantity } from '../Quantity';
import { Button } from '../Button';

interface Total {
  sum: number;
  quantity: number;
}

export const CartTotal: FunctionComponent= () => {
  const { cartProducts } = useCartContext();
  const initialTotal = { sum: 0, quantity: 0 };
  const total = cartProducts.reduce((cartTotal: Total, cartProduct) => {
    return {
      sum: cartTotal.sum + (cartProduct.product.newPrice * cartProduct.quantity),
      quantity: cartTotal.quantity + cartProduct.quantity,
    }
  }, initialTotal);

  return (
    <AnimatePresence>
      <motion.div
        className="CartTotal"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ margin: '30px', once: true }}
        transition={ANIM_TRANSITION}
      >
        <div className="CartTotal__Info">
          <ProductPrices
            newPrice={total.sum}
            className="CartTotal__Price"
            isBig
          />

          <Quantity
            count={total.quantity}
            itemName="item"
            isTotal
          />
        </div>

        <Button
          text="Checkout"
          isBig
        />
      </motion.div>
    </AnimatePresence>
  );
};
