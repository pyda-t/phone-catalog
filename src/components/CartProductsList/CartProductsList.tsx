import { FunctionComponent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Styles
import './CartProductsList.scss';

// Types
import { CartProduct } from '../../types/CartProduct';

// Variables
import { ANIM_TRANSITION } from '../../variables';

// Components
import { CartProductCard } from '../CartProductCard';

type Props = {
  cartProducts: CartProduct[];
}

export const CartProductsList: FunctionComponent<Props> = ({ cartProducts }) => (
  <ul className="CartProductsList">
    <AnimatePresence>
      {cartProducts.map((cartProduct, i) => (
        <motion.li
          key={cartProduct.product.id}
          className="CartProductsList__Item"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.1 * i } }}
          exit={{ opacity: 0, x: -500, height: 0, marginBottom: 0 }}
          transition={ANIM_TRANSITION}
        >
          <CartProductCard cartProduct={cartProduct} />
        </motion.li>
      ))}
    </AnimatePresence>
  </ul>
);
