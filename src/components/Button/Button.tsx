import { FunctionComponent, memo } from 'react';
import cn from 'classnames';

// Styles
import './Button.scss';

type Props = {
  text: string;
  onClick?: () => void;
  isSelected?: boolean;
  isBig?: boolean;
};

export const Button: FunctionComponent<Props> = memo(({
  text,
  onClick = () => {},
  isSelected,
  isBig,
}) => (
  <button
    type="button"
    className={cn(
      'Button',
      {
        "Button--big": isBig,
        "Button--selected": isSelected,
      }
    )}
    onClick={onClick}
  >
    {text}
  </button>
));
