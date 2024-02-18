import { FunctionComponent } from 'react';
import cn from 'classnames';

// Styles
import './ProductPrices.scss';

type Props = {
  newPrice: number;
  price?: number;
  className?: string;
  isBig?: boolean;
};

export const ProductPrices: FunctionComponent<Props> = ({
  newPrice,
  price = newPrice,
  className = '',
  isBig = false,
}) => (
  <div className={cn(
    'ProductPrices',
    { [className]: !!className },
  )}>
    <span className={cn(
      'ProductPrices__NewPrice',
      { 'ProductPrices__NewPrice--big': isBig }
    )}>
      {`$${newPrice}`}
    </span>

    {price !== newPrice && (
      <span className="ProductPrices__OldPrice">
        {`$${price}`}
      </span>
    )}
  </div>
);
