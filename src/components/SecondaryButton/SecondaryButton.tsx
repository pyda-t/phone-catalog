import { FunctionComponent, ReactNode } from 'react';
import cn from 'classnames';

// Styles
import './SecondaryButton.scss';

type Props = {
  children: ReactNode;
  onClick: () => void;
  size?: 'small' | 'big' | 'banner' | '';
  className?: string;
  selected?: boolean;
  disabled?: boolean;
};

export const SecondaryButton: FunctionComponent<Props> = ({
    children,
    onClick,
    size,
    className = '',
    selected = false,
  disabled = false,
}) => (
  <button
    type="button"
    className={cn(
      'SecondaryButton',
      {
        'SecondaryButton--small': size === 'small',
        'SecondaryButton--big': size === 'big',
        'SecondaryButton--banner': size === 'banner',
        'SecondaryButton--selected': selected,
        [className]: className,
      },
    )}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);
