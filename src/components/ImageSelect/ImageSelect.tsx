import { FunctionComponent, useState, memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'classnames';

// Styles
import './ImageSelect.scss';

// Variables
import { ANIM_TRANSITION } from '../../variables';

type Props = {
  images: string[];
  className?: string;
};

export const ImageSelect: FunctionComponent<Props> = memo(({ images, className = '' }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className={cn(
      'ImageSelect',
      { [className]: !!className },
    )}>
      <AnimatePresence>
        <motion.ul
          className="ImageSelect__List"
          initial={{ translateX: '-100%', opacity: 0 }}
          animate={{ translateX: 0, opacity: 1 }}
          transition={ANIM_TRANSITION}
        >
          {images.map(image => (
            <li key={image}>
              <button
                type="button"
                className={cn(
                  'ImageSelect__Button',
                  { 'ImageSelect__Button--selected': image === selectedImage },
                )}
                onClick={() => setSelectedImage(image)}
              >
                <img src={`/${image}`} className="ImageSelect__Image" />
              </button>
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>
        

      <AnimatePresence mode="wait">
        <motion.img
          key={selectedImage}
          src={`/${selectedImage}`}
          className="ImageSelect__Image"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{
            ease: "easeInOut",
            duration: 0.3,
          }}
        />
      </AnimatePresence>
    </div>
  );
});
