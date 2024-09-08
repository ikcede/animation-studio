import React from 'react';
import styling from './Footer.module.css';
import Link from 'next/link';

/**
 * Footer component displaying information about the project.
 *
 * @returns {JSX.Element}
 */
const Footer: React.FC = () => {
  return (
    <footer className={styling.wrapper}>
      <div className={styling.item}>
        Built by:
        <Link href="https://github.com/ikcede" target="_blank">
          ikcede
        </Link>
      </div>
      <div className={styling.item}>
        License:
        <Link
          href="https://www.gnu.org/licenses/gpl-3.0.en.html"
          target="_blank"
        >
          GPL-3.0
        </Link>
      </div>
      <div className={styling.item}>
        Check out the
        <Link
          href="https://github.com/ikcede/animation-studio"
          target="_blank"
        >
          Github repo
        </Link>
      </div>
      <div className={styling.item}>
        <Link href="https://forms.gle/twdbLxMobmNuiYw47" target="_blank">
          Feedback
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
