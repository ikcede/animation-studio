'use client'

import React from 'react';
import styling from './Gallery.module.css';
import GalleryItem from './GalleryItem';
import Button from '@mui/material/Button';
import data from '@/data/animationData';

const Gallery: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  }

  return (
    <div className={styling.wrapper}>
      <div className='controls'>
        <Button className='button'
                onClick={() => toggleCollapsed()}>
          Defaults
        </Button>
        <Button className='button'
                onClick={() => toggleCollapsed()}>
          Custom
        </Button>
      </div>
      <div className={styling.view}>
        {data.map((lib) => (
          <GalleryItem lib={lib} key={lib.id}></GalleryItem>
        ))}
      </div>
    </div>
  );
};

export default Gallery;