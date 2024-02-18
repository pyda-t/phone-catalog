import { FunctionComponent, useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import cn from 'classnames';

// Styles
import './Select.scss';

// Icons
import { ReactComponent as Arrow } from '../../assets/icons/arrow.svg';

// Variables
import { ANIM_TRANSITION, SORT_BY, PER_PAGE } from '../../variables';

// Components
import { AnimText } from '../AnimText';

type Props = {
  type: 'sortBy' | 'perPage';
};

export const Select: FunctionComponent<Props> = ({ type }) => {
  const [optionsAreOpen, setOptionsAreOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const optionsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const closeOptions = (e: { target: any; }) => {
      if (!optionsRef.current?.parentElement?.contains(e.target)) {
        setOptionsAreOpen(false);
      }
    };

    document.addEventListener('mousedown', closeOptions);

    return () => {
      document.removeEventListener('mousedown', closeOptions);
    };
  });

  const options = type === 'sortBy'
    ? SORT_BY
    : PER_PAGE;

  const defaultOption = type === 'sortBy'
    ? options[0]
    : options[options.length - 1];

  const selectedOption = searchParams.get(type) || defaultOption;

  const changeOption = (newOption: string) => {
    if (newOption === 'All') {
      params.delete('page');
      params.delete('perPage');
    } else if (!isNaN(+newOption)) {
      params.set(type, newOption);
      params.set('page', '1');
    } else {
      params.set(type, newOption);
    }

    setSearchParams(params);
    setOptionsAreOpen(false);
  };

  return (
    <div
      className="Select"
    >
      <AnimText>
        <p className="Select__Title">
          {type === 'sortBy' ? 'Sort by' : 'Items on page'}
        </p>
      </AnimText>

      <AnimatePresence>
        <motion.button
          className={cn(
            'Select__Field',
            { 'Select__Field--active': optionsAreOpen }
          )}
          onClick={() => setOptionsAreOpen(!optionsAreOpen)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={ANIM_TRANSITION}
        >
          {selectedOption}

          <Arrow className={cn(
            'Select__Icon',
            { 'Select__Icon--active': optionsAreOpen }
          )} />
        </motion.button>
      </AnimatePresence>

      <AnimatePresence >
        {optionsAreOpen && (
          <motion.ul
            className="Select__Options"
            ref={optionsRef}
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
          >
            {options.map((option, i) => (
              <li key={option + i}>
                <button
                  className="Select__Option"
                  onClick={() => changeOption(option)}
                >
                  {option}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
