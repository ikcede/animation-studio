import React from 'react';
import styling from './Footer.module.css';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <div className={styling.wrapper}>
      <div className={styling.item}>
        Built by: 
        <Link href='https://github.com/ikcede'
              target='_blank'>
          ikcede
        </Link>
      </div>
      <div className={styling.item}>
        License: 
        <Link href='https://www.gnu.org/licenses/gpl-3.0.en.html'
              target='_blank'>
          GPL-3.0
        </Link>
      </div>
      <div className={styling.item}>
        Check out the
        <Link href='https://github.com/ikcede/animation-studio'
              target='_blank'>
          Github repo
        </Link>
      </div>
    </div>
  )
}

export default Footer