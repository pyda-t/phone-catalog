import { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

// Styles
import './Nav.scss';

const navLinks = ['home', 'phones', 'tablets', 'accessories'];

type Props = {
  closeMenu?: () => void;
};

export const Nav: FunctionComponent<Props> = ({ closeMenu = () => {} }) => (
  <nav className="Nav">
    <ul className="Nav__List">
      {navLinks.map((navLink, i) => (
        <li key={navLink + i}>
          <NavLink
            className={({ isActive }) => cn('Nav__Link', { 'Nav__Link--active': isActive })}
            to={navLink === 'home' ? '/' : `/${navLink}`}
            onClick={() => {
              closeMenu();
              window.scrollTo({ top: 0 });
            }}
          >
            {navLink}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);
