import { FunctionComponent, memo } from 'react';
import cn from 'classnames';

// Styles
import './DirectionButton.scss';

// Icons
import { ReactComponent as Arrow } from '../../assets/icons/arrow.svg';

// Components
import { SecondaryButton } from '../SecondaryButton';

type Props = {
  size: 'small' | 'banner',
  type: 'prev' | 'next',
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export const DirectionButton: FunctionComponent<Props> = memo(({
  size,
  type,
  className = '',
  onClick = () => {},
  disabled = false,
}) => (
  <SecondaryButton
    className={cn(
      'DirectionButton',
      {
        'DirectionButton--prev': type === 'prev',
        [className]: className,
      },
    )}
    size={size}
    onClick={onClick}
    disabled={disabled}
  >
    <Arrow />
  </SecondaryButton>
));
