import { FunctionComponent, memo, useMemo } from 'react';
import { useProductsContext } from '../../hooks/useProductsContext';

// Styles
import './HomePage.scss';


// Components
import { Container } from '../../components/Container';
import { Transition } from '../../components/Transition';
import { Banner } from '../../components/Banner';
import { ProductsSlider } from '../../components/ProductSlider';
import { Loader } from '../../components/Loader';
import { Categories } from '../../components/Categories';

export const HomePage: FunctionComponent = memo(() => {
  const { products, productsLoading } = useProductsContext();

  const hotPricesProducts = useMemo(() => {
    return products
      .filter(product => product.discount)
      .sort((prevProduct, nextProduct) => {
        const prevProductDifference = prevProduct.price - prevProduct.newPrice;
        const nextProductDifference = nextProduct.price - nextProduct.newPrice;

        return nextProductDifference - prevProductDifference;
      });
  }, [products]);

  const brandNewProducts = useMemo(() => products
    .filter(product => !product.discount)
    .sort((prevProduct, nextProduct) => nextProduct.price - prevProduct.price), [products]);

  return (
    <div className="HomePage">
      <Transition>
        <Container>
          <div className="HomePage__Content">
            <Banner />

            {productsLoading ? (
              <Loader />
            ) : (
              <ProductsSlider
                title="Hot prices"
                products={hotPricesProducts}
              />
            )}

            <Categories />

            {productsLoading ? (
              <Loader />
            ) : (
              <ProductsSlider
                title="Brand new models"
                products={brandNewProducts}
              />
            )}
          </div>
        </Container>
      </Transition>
    </div>
  );
})
