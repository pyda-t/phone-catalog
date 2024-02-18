import { FunctionComponent, ReactNode } from 'react';
import { motion } from 'framer-motion';

// Styles
import './Transition.scss';

type Props = {
  children: ReactNode;
};

const transition = {
  duration: 0.3,
  ease: [0.22, 1, 0.36, 1],
};

export const Transition: FunctionComponent<Props> = ({ children }) => (
  <div className="Transition">
    {children}

    <motion.div
      className="Transition__Slide-in"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 0 }}
      exit={{ scaleY: 1 }}
      transition={transition}
    />
    <motion.div
      className="Transition__Slide-out"
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0 }}
      exit={{ scaleY: 0 }}
      transition={transition}
    />
  </div>
);
