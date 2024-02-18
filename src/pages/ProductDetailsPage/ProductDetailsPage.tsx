import { FunctionComponent, useState, useEffect, memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsDetails } from '../../services/productDetails';
import { useProductsContext } from '../../hooks/useProductsContext';

// Styles
import './ProductDetailsPage.scss';

// Types
import { ProductDetails } from '../../types/ProductDetails';
import { Product } from '../../types/Product';

// Components
import { Container } from '../../components/Container';
import { Transition } from '../../components/Transition';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Loader } from '../../components/Loader';
import { BackButton } from '../../components/BackButton';
import { AnimText } from '../../components/AnimText';
import { ImageSelect } from '../../components/ImageSelect';
import { ProductInfo } from '../../components/ProductInfo';
import { TechSpecs } from '../../components/TechSpecs';
import { ProductsSlider } from '../../components/ProductSlider';
import { NoResult } from '../../components/NoResult';

export const ProductDetailsPage: FunctionComponent = memo(() => {
  const productId = useParams().productId || '';
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null);
  const [productDetailsLoading, setProductDetailsLoading] = useState(true);
  const [productDetailsError, setProductDetailsError] = useState('');
  const { products, productsLoading } = useProductsContext();
  const loading = productDetailsLoading && productsLoading;
  const product = products.find(product => product.id === productId);
  const randomProducts: Product[] = [];

  if (products.length > 8) {
    while (randomProducts.length < 8) {
      const randomIndex = Math.floor(Math.random() * 8);

      if (!randomProducts.includes(products[randomIndex])) {
        randomProducts.push(products[randomIndex]);
      }
    }
  }

  useEffect(() => {
    getProductsDetails(productId)
      .then(setProductDetails)
      .catch(() => setProductDetailsError('There is no such product...'))
      .finally(() => setProductDetailsLoading(false));
  }, [productId]);

  const shortTechSpecs = useMemo(
    () => [
      { key: 'Screen', value: productDetails?.display.screenSize },
      { key: 'Resolution', value: productDetails?.display.screenResolution },
      { key: 'Processor', value: productDetails?.hardware.cpu },
      { key: 'RAM', value: productDetails?.storage.ram },
    ],
    [
      productDetails?.display.screenResolution,
      productDetails?.display.screenSize,
      productDetails?.hardware.cpu,
      productDetails?.storage.ram,
    ]
  );

  const longTechSpecs = useMemo(
    () => [
      ...shortTechSpecs,
      { key: 'Build in memory', value: productDetails?.storage.ram },
      { key: 'Camera', value: productDetails?.camera.primary },
      { key: 'Os', value: productDetails?.android.os },
      { key: 'Cell', value: productDetails?.connectivity.cell },
    ],
    [
      productDetails?.android.os,
      productDetails?.camera.primary,
      productDetails?.connectivity.cell,
      productDetails?.storage.ram,
      shortTechSpecs
    ],
  );

  return (
    <div className="ProductDetailsPage">
      <Transition>
        <Container>
          {loading ? (
            <Loader />
          ) : (
            <>
              { productDetailsError ? (
                <NoResult message={productDetailsError} />
              ) : (
                <>
                  {productDetails && (
                    <>
                      <Breadcrumbs className="ProductDetailsPage__Breadcrumbs" />

                      <BackButton className="ProductDetailsPage__BackButton" />

                      <AnimText>
                        <h1 className="ProductDetailsPage__Title">
                          {productDetails.name}
                        </h1>
                      </AnimText>

                      <section className="ProductDetailsPage__Section">
                        <ImageSelect
                          images={productDetails?.images}
                          className="ProductDetailsPage__ImageSelect"
                        />

                        {product && (
                          <ProductInfo product={product} techSpecs={shortTechSpecs} />
                        )}
                      </section>
        
                      <section className="ProductDetailsPage__Section">
                        <article>
                          <AnimText>
                            <h2 className="ProductDetailsPage__Subtitle">About</h2>
                          </AnimText>

                          <AnimText>
                            <p>{productDetails.description}</p>
                          </AnimText>
                        </article>

                        <article>
                          <AnimText>
                            <h2 className="ProductDetailsPage__Subtitle">Tech specs</h2>
                          </AnimText>

                          <AnimText>
                            <TechSpecs techSpecs={longTechSpecs} />
                          </AnimText>
                        </article>
                      </section>

                      <ProductsSlider
                        title="You may also like"
                        products={randomProducts}
                      />
                    </>
                  )}
                </>
              )}
            </>
          )}
        </Container>
      </Transition>
    </div>
  );
});
