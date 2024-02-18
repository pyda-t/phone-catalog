import { FunctionComponent, memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'classnames';

// Styles
import './ProductsList.scss';

// Types
import { Product } from '../../types/Product';

// Variables
import { ANIM_TRANSITION } from '../../variables';

// Components
import { ProductCard } from '../ProductCard';

type Props = {
  products: Product[];
  className?: string;
};

export const ProductsList: FunctionComponent<Props> = memo(({ products, className = '' }) => (
  <ul className={cn(
    'ProductsList',
    { [className]: className }
  )}>
    <AnimatePresence >
      {products.map((product, i) => (
        <motion.li
          key={product.id}
          initial={{ translateX: '100%', opacity: 0 }}
          animate={{ translateX: 0, opacity: 1, transition: { delay: i * 0.1 } }}
          exit={{ opacity: 0 }}
          transition={ANIM_TRANSITION}
        >
          <ProductCard product={product} />
        </motion.li>
      ))}
    </AnimatePresence>
  </ul>
));
