import { FunctionComponent, memo } from 'react';
import cn from 'classnames';

// Styles
import './TechSpecs.scss';

// Types
import { TechSpec } from '../../types/TechSpec';

type Props = {
  techSpecs: TechSpec[];
  smallText?: boolean;
};

export const TechSpecs: FunctionComponent<Props> = memo(({ techSpecs, smallText }) => (
  <ul className={cn(
      'TechSpecs',
      { 'TechSpecs--small': smallText },
    )}>
    {techSpecs.map((techSpec, i) => (
      <li key={techSpec.key + i} className="TechSpecs__Item">
        <span className="TechSpecs__Name">{techSpec.key}</span>

        <span className="TechSpecs__Value">
          {!techSpec.value ? 'No data' : techSpec.value}
        </span>
      </li>
    ))}
  </ul>
));
