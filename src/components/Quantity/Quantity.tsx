import { FunctionComponent, memo } from 'react';
import cn from 'classnames';

// Styles
import './Quantity.scss';

// Components
import { AnimText } from '../AnimText';

type Props = {
  count: number;
  itemName: 'model' | 'item' | 'result';
  isTotal?: boolean; 
  className?: string;
};

export const Quantity: FunctionComponent<Props> = memo(({
  count,
  itemName,
  isTotal,
  className = '',
}) => (
  <AnimText>
    <p className={cn(
      'Quantity',
      { [className]: className },
    )}>
      {isTotal && 'Total for '}
      {count}
      {` ${itemName}`}
      {count !== 1 && 's'}
    </p>
  </AnimText>
));
