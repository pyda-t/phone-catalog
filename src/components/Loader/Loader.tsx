import { FunctionComponent } from 'react';

// Styles
import './Loader.scss';

export const Loader: FunctionComponent = () => (
  <div className="Loader">
    <div className="Loader__Circle Loader__Circle--big">
      <div className="Loader__Circle Loader__Circle--medium">
        <div className="Loader__Circle Loader__Circle--small" />
      </div>
    </div>
  </div>
);
