import { FunctionComponent } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';

// Styles
import './Menu.scss';

// Components
import { Nav } from '../Nav';
import { Search } from '../Search';


type Props = {
  menuIsOpen: boolean;
  closeMenu: () => void;
};

export const Menu: FunctionComponent<Props> = ({ menuIsOpen, closeMenu }) => {
  const pathname = useLocation().pathname.slice(1);
  const canShowSearch = pathname.length > 0 && !pathname.includes('/') && pathname !== 'cart';

  return (
    <div className={cn('Menu', { 'Menu--active': menuIsOpen })}>
      <Nav closeMenu={closeMenu} />

      {canShowSearch && (
        <div className="Menu__Search">
          <Search withBorder/>
        </div>
      )}
    </div>
  );
};
