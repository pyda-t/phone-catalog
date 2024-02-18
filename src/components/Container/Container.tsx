import { FunctionComponent, ReactNode } from 'react';

// Styles
import './Container.scss';

type Props = {
  children: ReactNode,
};

export const Container: FunctionComponent<Props> = ({ children }) => (
  <div className="Container">
    {children}
  </div>
);
