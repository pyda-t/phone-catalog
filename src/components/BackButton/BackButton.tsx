import { FunctionComponent } from 'react';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

// Styles
import './BackButton.scss';

// Icons
import { ReactComponent as Arrow } from '../../assets/icons/arrow.svg';

import { AnimText } from '../AnimText';

type Props = {
  className?: string;
};

export const BackButton: FunctionComponent<Props> = ({ className = '' }) => {
  const navigate = useNavigate();

  return (
    <AnimText>
      <button
        className={cn(
          'BackButton',
          { [className]: !!className },
        )}
        onClick={() => navigate(-1)}
      >
        <Arrow className="BackButton__Icon" />

        <span className="BackButton__Text">
          Back
        </span>
      </button>
    </AnimText>
  );
};
