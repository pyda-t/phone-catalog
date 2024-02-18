import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

// Styles
import './ProductCard.scss';

// Types
import { Product } from '../../types/Product';

// Components
import { ProductPrices } from '../ProductPrices';
import { TechSpecs } from '../TechSpecs';
import { ProductButtons } from '../ProductButtons';


type Props = {
  product: Product;
};

export const ProductCard: FunctionComponent<Props> = ({ product }) => {
  const typeName = product.type === 'accessory' ? 'accessories' : product.type + 's';

  const {
    imageUrl,
    name,
    newPrice,
    price,
    screen,
    capacity,
    ram,
  } = product;
  const techSpecs = [
    { key: 'Screen', value: screen },
    { key: 'Capacity', value: capacity },
    { key: 'RAM', value: ram },
  ];

  return (
    <div className="ProductCard">
      <Link
        to={`/${typeName}/${product.id}`}
      >
        <img
          className="ProductCard__Image"
          src={`/${imageUrl}`}
          alt={name}
        />
      </Link>

      <h4 className="ProductCard__Title">
        {name}
      </h4>


      <ProductPrices
        newPrice={newPrice}
        price={price}
        className="ProductCard__Prices"
      />

      <TechSpecs techSpecs={techSpecs} smallText />

      <ProductButtons product={product} />
    </div>
  );
};
