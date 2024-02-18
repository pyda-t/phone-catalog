import { FunctionComponent, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Styles
import './AnimText.scss';

// Variables
import { ANIM_TRANSITION } from '../../variables';

type Props = {
  children: ReactNode;
};

export const AnimText: FunctionComponent<Props> = ({ children }) => (
  <div className="AnimText">
    {children}

    <AnimatePresence>
      <motion.div
        className="AnimText__TextUncover"
        initial={{ height: 'auto' }}
        whileInView={{ height: 0 }}
        viewport={{ margin: '-100px', once: true}}
        transition={ANIM_TRANSITION}
      />
    </AnimatePresence>
  </div>
);
