import { FunctionComponent, memo } from 'react';

// Styles
import './NoResult.scss';

// Components
import { AnimText } from '../AnimText';

type Props = {
  message: string;
}

export const NoResult: FunctionComponent<Props> = memo(({ message }) => (
  <AnimText>
    <h1 className="NoResult">
      {message}
    </h1>
  </AnimText>
));
