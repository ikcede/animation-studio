'use client'

import React from 'react';
import styling from './Gallery.module.css';
import GalleryItem from './GalleryItem';
import data from '@/data/animationData';
import FilterBar from './widgets/FilterBar';
import AnimationLib from '@/model/AnimationLib';

const Gallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = React.useState('All');

  const changeFilter = (filter: string) => {
    setActiveFilter(filter);
  }

  const isCollapsed = React.useCallback((lib: AnimationLib) => {
    if (activeFilter.length > 0 && activeFilter !== 'All') {
      if (lib.tags === undefined) {
        return true;
      }
      return lib.tags.indexOf(activeFilter) === -1;
    }
    return false;
  }, [activeFilter]);

  const filters = [
    'All',
    'Enter',
    'Exit',
  ];

  return (
    <div className={styling.wrapper}>
      <div className={styling.header}>
        <h1>Library</h1>
      </div>
      <div className='controls'>
        <FilterBar filters={filters}
                   onFilterSelect={changeFilter}></FilterBar>
      </div>
      <div className={styling.view}>
        {data.map((lib) => (
          <GalleryItem lib={lib} key={lib.id}
                       collapsed={isCollapsed(lib)}></GalleryItem>
        ))}
      </div>
    </div>
  );
};

export default Gallery;