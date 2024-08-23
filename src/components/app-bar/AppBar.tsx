import React from 'react';
import styling from './AppBar.module.css'
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import AnimationIcon from '@mui/icons-material/Animation';
import SettingsIcon from '@mui/icons-material/Settings';

export interface AppBarProps {
  animationName: string;
}

const AppBar: React.FC<AppBarProps> = ({
  animationName
}) => {
  return (
    <div className={styling.wrapper}>
      <div className={styling.logo}>
        <Link href='/'>Animation Studio</Link>
      </div>

      <div className={styling.editing}>
        <AnimationIcon />
        {animationName}
      </div>

      {/*<div className={styling.settings}>
        <IconButton>
          <SettingsIcon />
        </IconButton>
      </div>*/}
    </div>
  )
}

export default AppBar