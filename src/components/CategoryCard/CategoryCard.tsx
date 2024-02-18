import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

// Styles
import './CategoryCard.scss';

// Hooks
import { useProductsContext } from '../../hooks/useProductsContext';

// Components
import { AnimText } from '../AnimText';
import { Quantity } from '../Quantity';

type Props = {
  type: string;
};

export const CategoryCard: FunctionComponent<Props> = ({ type }) => {
  const { products } = useProductsContext();
  const productType = type === 'accessories'
    ? 'accessory'
    : type.slice(0, -1);
  const productCount = products.filter(product => product.type === productType).length;

  return (
    <div className="CategoryCard">
      <Link to={`/${type}`}>
        <img
          src={`img/categories/${type}.jpg`}
          className="CategoryCard__Image"/
        >
      </Link>

      <AnimText>
        <h3 className="CategoryCard__Title">{
          type === 'phones'
            ? `Mobile ${type}`
            : type[0].toLocaleUpperCase() + type.slice(1)
          }
        </h3>
      </AnimText>

      <Quantity count={productCount} itemName="model" />
    </div>
  );
};
