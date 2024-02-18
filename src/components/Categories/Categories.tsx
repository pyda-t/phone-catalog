import { FunctionComponent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Styles
import './Categories.scss';

// Variables
import { ANIM_TRANSITION } from '../../variables';

// Components
import { AnimText } from '../AnimText';
import { CategoryCard } from '../CategoryCard';

const categories = ['phones', 'tablets', 'accessories'];

export const Categories: FunctionComponent = () => (
  <div className="Categories">
    <AnimText>
      <h2>Shop by category</h2>
    </AnimText>

    <ul className="Categories__List">
      <AnimatePresence>
        {categories.map(category => (
          <motion.li
            key={category}
            initial={{ translateY: '100%', opacity: 0 }}
            whileInView={{ translateY: 0, opacity: 1 }}
            viewport={{ margin: '45%', once: true }}
            transition={ANIM_TRANSITION}
          >
            <CategoryCard type={category} />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  </div>
);
