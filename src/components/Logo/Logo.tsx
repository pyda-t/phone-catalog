import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

// Styles
import './Logo.scss';

// Icons
import { ReactComponent as LogoIcon } from './assets/Logo.svg';

type Props = {
  closeMenu?: () => void;
};

export const Logo: FunctionComponent<Props> = ({ closeMenu = () => {} }) => (
  <Link
    to="/"
    className="Logo"
    onClick={closeMenu}
  >
    <LogoIcon />
  </Link>
);
