import { Fragment, FunctionComponent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Styles
import './Pagination.scss';

// Variables
import { ANIM_TRANSITION } from '../../variables';

// Components
import { DirectionButton } from '../DirectionButton';
import { SecondaryButton } from '../SecondaryButton';

type Props = {
  pagesCount: number;
};

export const Pagination: FunctionComponent<Props> = ({ pagesCount }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const page = searchParams.get('page') || 1;
  const pageNumbers = Array.from({ length: pagesCount }, (_, i) => i + 1);

  const setPage = (pageNumber: number) => {
    params.set('page', pageNumber.toString());
    setSearchParams(params);
    window.scrollTo({ top: 0 });
  };

  return (
    <AnimatePresence>
      <motion.div
        className="Pagination"
        initial={{ translateY: '100%', opacity: 0 }}
        whileInView={{ translateY: 0, opacity: 1 }}
        exit={{ translateY: '100%', opacity: 0 }}
        viewport={{ margin: '-1%', once: true }}
        transition={ANIM_TRANSITION}
      >
        <DirectionButton
          type="prev"
          size="small"
          onClick={() => setPage(+page - 1)}
          disabled={+page <= 1}
        />

        <div className="Pagination__Pages">
          {pageNumbers.map(pageNumber => (
            <Fragment key={pageNumber}>
              <SecondaryButton
                size="small"
                selected={pageNumber === +page}
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </SecondaryButton>
            </Fragment>
          ))}
        </div>

        <DirectionButton
          type="next"
          size="small"
          onClick={() => setPage(+page + 1)}
          disabled={+page >= pagesCount}
        />
      </motion.div>
    </AnimatePresence>
  );
};