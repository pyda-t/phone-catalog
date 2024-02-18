import { FunctionComponent, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

// Styles
import './ProductsPage.scss';

// Types
import { PageType } from '../../types/PageType';

// Variables
import { SORT_BY } from '../../variables';
import { PER_PAGE } from '../../variables';

// Hooks
import { useProductsContext } from '../../hooks/useProductsContext';
import { useFavoritesContext } from '../../hooks/useFavoritesContext';

// Components
import { Container } from '../../components/Container';
import { Transition } from '../../components/Transition';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Quantity } from '../../components/Quantity';
import { Select } from '../../components/Select';
import { ProductsList } from '../../components/ProductsList';
import { Pagination } from '../../components/Pagination';
import { Loader } from '../../components/Loader';
import { NoResult } from '../../components/NoResult';
import { AnimText } from '../../components/AnimText';

type Props = {
  type: PageType;
};

export const ProductsPage: FunctionComponent<Props> = ({ type }) => {
  const itsFavorites = type === 'favorites';
  const { products, productsLoading } = useProductsContext();
  const { favorites } = useFavoritesContext();
  const preparedProducts = useMemo(
    () => itsFavorites
      ? favorites
      : products.filter(product => product.type === type),
    [favorites, itsFavorites, products, type],
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const query = searchParams.get('query') || '';
  const sortBy = searchParams.get('sortBy') || SORT_BY[0];
  const perPage = searchParams.get('perPage') || PER_PAGE[PER_PAGE.length - 1];
  const pagesCount = Math.ceil(preparedProducts.length / +perPage);
  const page = searchParams.get('page') || '1';
  const step = perPage === 'All' ? preparedProducts.length : +perPage;
  const lastProductIndex = +page * step;
  const firstProductIndex = lastProductIndex - +perPage;
  const filteredProducts = useMemo(
    () => preparedProducts
      .filter(preparedProduct => {
        return preparedProduct.name.toLocaleLowerCase().includes(query);
      })
      .sort((currentProduct, nextProduct) => {
        switch (sortBy) {
          case 'Alphabetically':
            return currentProduct.name.localeCompare(nextProduct.name)

          case 'Cheapest':
            return currentProduct.newPrice - nextProduct.newPrice;

          default:
            return currentProduct.age - nextProduct.age;
        }
      })
    , [preparedProducts, query, sortBy]);

  const visibleProducts = useMemo(
    () => itsFavorites
      ? filteredProducts
      : filteredProducts.slice(firstProductIndex, lastProductIndex),
    [firstProductIndex, itsFavorites, lastProductIndex, filteredProducts],
  )
  let title = '';

  const getItemName = () => {
    if (itsFavorites) {
      return 'item';
    }
  
    if (query) {
      return 'result';
    }

    return 'model';
  };

  if (+page > pagesCount) {
    params.set('page', `${pagesCount}`);
    setSearchParams(params);
  }

  if (!SORT_BY.includes(sortBy)) {
    params.delete('sortBy');
    setSearchParams(params);
  }

  if (!PER_PAGE.includes(perPage)) {
    params.delete('perPage');
    params.delete('page');
    setSearchParams(params);
  }

  switch (type) {
    case 'tablet':
      title = 'Tablets';
      break;

    case 'accessory':
      title = 'Accessories';
      break;

    case 'favorites':
      title = 'Favorites'
      break;

    default:
      title = 'Mobile phones';
  }

  return (
    <div className="ProductsPage">
      <Transition>
        <Container>
          {!productsLoading && visibleProducts.length === 0 ? (
            <NoResult message={!query
              ? `There is nothing in ${title.toLocaleLowerCase()}...`
              : `There are no results in ${title.toLocaleLowerCase()}...`
            } />
          ) : (
            <>
              {!query && (
                <>
                  <Breadcrumbs className="ProductsPage__Breadcrumbs" />

                  <AnimText>
                    <h1 className="ProductsPage__Title">
                      {title}
                    </h1>
                  </AnimText>
                </>
              )}

              {productsLoading ? (
                <Loader />
              ) : (
                <>
                  <Quantity
                    count={visibleProducts.length}
                    itemName={getItemName()}
                    className="ProductsPage__Count"
                  />

                  {!itsFavorites && !query && (
                    <div className="ProductsPage__Selects">
                      <Select type='sortBy' />
                      <Select type='perPage' />
                    </div>
                  )}

                  <ProductsList
                    products={visibleProducts}
                    className="ProductsPage__Products"
                  />

                  {pagesCount > 1 && (
                    <Pagination pagesCount={pagesCount} />
                  )}
                </>
              )}
            </>
          )}
        </Container>
      </Transition>
    </div>
  );
};
