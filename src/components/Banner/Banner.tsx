import { FunctionComponent } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { AnimatePresence, motion } from 'framer-motion';

// Styles
import 'swiper/scss';
import './Banner.scss';

// Variables
import { ANIM_TRANSITION } from '../../variables';

// Components
import { DirectionButton } from '../DirectionButton';

const imgUrls = [
  'img/banner/image-1.jpg',
  'img/banner/image-2.jpg',
  'img/banner/image-3.jpg',
];

export const Banner: FunctionComponent = () => (
  <AnimatePresence>
    <motion.div
      className="Banner"
      initial={{ translateX: '-200%', opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      transition={ANIM_TRANSITION}
    >
      <DirectionButton
        size="banner"
        type="prev"
        className="Banner__PrevButton"
      />

      <Swiper
        className="Banner__Slides"
        wrapperClass="Banner__Slides"
        modules={[ Navigation, Pagination, Autoplay ]}
        navigation={{
          prevEl: '.Banner__PrevButton',
          nextEl: '.Banner__NextButton',
        }}
        pagination={{
          el: '.Banner__Bullets',
          type: 'bullets',
          bulletClass: 'Banner__Bullet',
          bulletActiveClass: 'Banner__Bullet--active',
          clickable: true,
        }}
        loop
        autoplay={{
          delay: 5000,
        }}
      >
        <div
          className="Banner__Slides"
        >
          {imgUrls.map(imgUrl => (
            <SwiperSlide key={imgUrl}>
              <img src={imgUrl} className="Banner__Img" />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>

      <DirectionButton
        size="banner"
        type="next"
        className="Banner__NextButton"
      />

      <ul id="bullets" className="Banner__Bullets">
        {imgUrls.map(imageUrl => (
          <li
            key={imageUrl}
            className="Banner__Bullet"
          />
        ))}
      </ul>
    </motion.div>
  </AnimatePresence>
);
