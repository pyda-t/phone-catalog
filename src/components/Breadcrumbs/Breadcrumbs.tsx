import { Fragment, FunctionComponent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'classnames';

// Styles
import './Breadcrumbs.scss';

// Icons
import { ReactComponent as Home } from './assets/home.svg';
import { ReactComponent as Arrow} from '../../assets/icons/arrow.svg';

// Types
import { Product } from '../../types/Product';

// Variables
import { ANIM_TRANSITION } from '../../variables';

// Hooks
import { useProductsContext } from '../../hooks/useProductsContext';

type Props = {
  className?: string;
};

export const Breadcrumbs: FunctionComponent<Props> = ({ className = '' }) => {
  const locationsArr = useLocation().pathname.slice(1).split('/');
  const { products } = useProductsContext();

  return (
    <AnimatePresence>
      <motion.div
        className={cn(
          'Breadcrumbs',
          { [className]: className },
        )}
        initial={{ translateX: '50%', opacity: 0 }}
        animate={{ translateX: 0, opacity: 1 }}
        transition={ANIM_TRANSITION}
      >
        <Link to="/" className="Breadcrumbs__Link">
          <Home />
        </Link>

        <Arrow className="Breadcrumbs__Arrow" />

        {locationsArr.map((location, index) => {
          const locationTitle = location[0].toUpperCase() + location.slice(1);

          if (index === locationsArr.length - 1) {
            const selectedProduct = products.find((product: Product) => product.id === location);

            return (
              <span key={location}>
                {selectedProduct ? selectedProduct.name : locationTitle}
              </span>
            );
          }

          return (
            <Fragment key={location}>
              <Link to={`/${location}`} className="Breadcrumbs__Link">
                {locationTitle}
              </Link>

              <Arrow className="Breadcrumbs__Arrow" />
            </Fragment>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
};