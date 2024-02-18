import { FunctionComponent, useCallback, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AnimatePresence, motion } from 'framer-motion';

// Styles
import './ProductsSlider.scss';
import 'swiper/scss';

// Types
import { Product } from '../../types/Product';

// Variables
import { ANIM_TRANSITION } from '../../variables';

// Components
import { DirectionButton } from '../DirectionButton';
import { ProductCard } from '../ProductCard';

type Props = {
  title: string,
  products: Product[],
};

export const ProductsSlider: FunctionComponent<Props> = ({
  title,
  products,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [swiper, setSwiper] = useState<any>(null);

  const slidePrev = useCallback(
    () => swiper.slidePrev(),
    [swiper],
  );

  const slideNext = useCallback(
    () => swiper.slideNext(),
    [swiper],
  );

  return (
    <AnimatePresence>
      <motion.section
        className="ProductsSlider"
        initial={{ translateY: '100%', opacity: 0 }}
        whileInView={{ translateY: 0, opacity: 1 }}
        viewport={{ margin: '70%', once: true }}
        transition={ANIM_TRANSITION}
      >
        <div className="ProductsSlider__Top">
          <h2>{title}</h2>

          <div
            className="ProductsSlider__Buttons"
          >
            <DirectionButton
              size="small"
              type="prev"
              onClick={slidePrev}
            />

            <DirectionButton
              size="small"
              type="next"
              onClick={slideNext}
            />
          </div>
        </div>

        <Swiper
          className="ProductsSlider__Slider"
          onSwiper={(swiper: any) => setSwiper(swiper)}
          loop
          slidesPerView={1}
          spaceBetween={16}
          breakpoints={{
            479: {
              slidesPerView: 2,
            },
            715: {
              slidesPerView: 3,
            },
            950: {
              slidesPerView: 4,
            },
          }}
        >
          <motion.div className="ProductsSlider__Slides">
            {products.map(product => (
              <SwiperSlide key={product.id} className="ProductsSlider__Slide">
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </motion.div>
        </Swiper>
      </motion.section>
    </AnimatePresence>
  );
};
