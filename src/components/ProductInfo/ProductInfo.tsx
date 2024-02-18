import { FunctionComponent, memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Styles
import './ProductInfo.scss';

// Types
import { Product } from '../../types/Product';
import { TechSpec } from '../../types/TechSpec';

// Variables
import { ANIM_TRANSITION } from '../../variables';

// Components
import { ProductPrices } from '../ProductPrices';
import { ProductButtons } from '../ProductButtons';
import { TechSpecs } from '../TechSpecs';

type Props = {
  product: Product;
  techSpecs: TechSpec[];
};

export const ProductInfo: FunctionComponent<Props> = memo(({ product, techSpecs }) => (
  <AnimatePresence>
    <motion.div
      className="ProductInfo"
      initial={{ translateY: '50%', opacity: 0 }}
      whileInView={{ translateY: 0, opacity: 1 }}
      viewport={{ margin: '-30px', once: true }}
      transition={ANIM_TRANSITION}
    >
      <ProductPrices
        newPrice={product.newPrice}
        price={product.price}
        className="ProductInfo__Prices"
        isBig
      />

      <ProductButtons
        product={product}
        isBig
        className="ProductInfo__Buttons"
      />

      <TechSpecs techSpecs={techSpecs} smallText />
    </motion.div>
  </AnimatePresence>
));
