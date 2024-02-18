import { FunctionComponent } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import cn from 'classnames';

// Styles
import './Header.scss';

// Icons
import { ReactComponent as Heart } from '../../assets/icons/heart.svg';
import { ReactComponent as Bag } from './assets/bag.svg';

// Variables
import { ANIM_TRANSITION } from '../../variables';

// Hooks
import { useFavoritesContext } from '../../hooks/useFavoritesContext';
import { useCartContext } from '../../hooks/useCartContext';

// Components
import { Logo } from '../Logo';
import { Nav } from '../Nav';
import { Search } from '../Search';

const getLinkClass = ({ isActive }: { isActive: boolean }) => cn(
  'Header__Link',
  { 'Header__Link--active': isActive },
);

type Props = {
  menuIsOpen: boolean,
  toggleMenu: () => void;
  closeMenu: () => void;
}

export const Header: FunctionComponent<Props> = ({
    menuIsOpen,
    toggleMenu,
    closeMenu,
  }) => {
  const favoritesQuantity = useFavoritesContext().favorites.length;
  const cartProductsQuantity = useCartContext().cartProducts.reduce(
    (sum, cartProduct) => sum + cartProduct.quantity,
    0,
  );
  const pathname = useLocation().pathname.slice(1);
  const canShowSearch = pathname.length > 0 && !pathname.includes('/') && pathname !== 'cart';

  const handleNavLinkClick = () => {
    window.scrollTo({ top: 0 });
    closeMenu();
  };

  return (
    <motion.header
      className="Header"
      initial={{ translateY: '-100%'}}
      animate={{ translateY: 0 }}
      transition={ANIM_TRANSITION}
    >
      <button
        type="button"
        className={cn(
          'Header__Burger',
          { 'Header__Burger--active': menuIsOpen },
          )}
        onClick={toggleMenu}
      />

      <div className="Header__Left">
        <Logo closeMenu={closeMenu}/>

        <div className="Header__Nav">
          <Nav />
        </div>
      </div>

      <div className="Header__Right">
        {canShowSearch && (
          <div className="Header__Search">
            <Search />
          </div>
        )}

        <NavLink
          to="/favorites"
          className={getLinkClass}
          onClick={handleNavLinkClick}
        >
          <Heart />

          {favoritesQuantity > 0 && (
            <span className="Header__Quantity">
              {favoritesQuantity}
            </span>
          )}
        </NavLink>

        <NavLink
          to="/cart"
          className={getLinkClass}
          onClick={handleNavLinkClick}
        >
          <Bag />

          {cartProductsQuantity > 0 && (
            <span className="Header__Quantity">
              {cartProductsQuantity}
            </span>
          )}
        </NavLink>
      </div>
    </motion.header>
  );
};
