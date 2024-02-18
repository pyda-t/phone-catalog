import { FunctionComponent, memo } from 'react';

// Styles
import './Footer.scss';

// Icons
import { ReactComponent as Arrow } from '../../assets/icons/arrow.svg';

// Components
import { Container } from '../Container';
import { Logo } from '../Logo';
import { SecondaryButton } from '../SecondaryButton';

export const Footer: FunctionComponent = memo(() => (
  <footer className="Footer">
    <Container>
      <div className="Footer__Content">
        <Logo />

        <a
          href="https://github.com/pyda-t"
          className="Footer__Link"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>

        <SecondaryButton
          size="small"
          onClick={() => window.scrollTo({ top: 0 })}
        >
          <Arrow className="Footer__Button-icon" />
        </SecondaryButton>
      </div>
    </Container>
  </footer>
));
