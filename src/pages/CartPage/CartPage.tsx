import { FunctionComponent, memo } from 'react';

// Styles
import './CartPage.scss';

// Hooks
import { useCartContext } from '../../hooks/useCartContext';

// Components
import { Transition } from '../../components/Transition';
import { Container } from '../../components/Container';
import { BackButton } from '../../components/BackButton';
import { AnimText } from '../../components/AnimText';
import { CartProductsList } from '../../components/CartProductsList';
import { CartTotal } from '../../components/CartTotal';
import { NoResult } from '../../components/NoResult';


export const CartPage: FunctionComponent = memo(() => {
  const { cartProducts } = useCartContext();

  return (
    <div className="CartPage">
      <Transition>
        <Container>
          {cartProducts.length > 0 ? (
            <>
              <BackButton className="CartPage__BackButton" />

              <AnimText>
                <h1 className="CartPage__Title">
                  Cart
                </h1>
              </AnimText>

              <div className="CartPage__Main">
                <CartProductsList cartProducts={cartProducts}/>

                <CartTotal />
              </div>
            </>
          ) : (
            <NoResult message="There is nothing in cart..." />
          )}
        </Container>
      </Transition>
    </div>
  );
})
