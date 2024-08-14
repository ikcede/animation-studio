import React from 'react';
import styling from './GalleryItem.module.css';
import AnimationLib from '@/model/AnimationLib';
import Chip from '@mui/material/Chip';
import Link from 'next/link';

export interface GalleryItemProps {
  lib: AnimationLib,
  collapsed?: boolean
}

const GalleryItem: React.FC<GalleryItemProps> = ({
  lib = new AnimationLib({id: -1, name: 'Animation'}),
  collapsed = false,
}) => {

  const getCollapsedClass = () => {
    return collapsed ? styling.collapsed : styling.expanded;
  }

  return (
    <div className={`${styling.wrapper} ` + getCollapsedClass()}>
      <div className={styling.preview}>

      </div>
      <div className={styling.name}>
        <Link href={'/editor/' + lib.id}>{lib.name}</Link>
      </div>
      <div className={styling.tags}>
        {lib.tags.map((tag, i) => (
          <Chip label={tag} size='small' key={i} />
        ))}
      </div>
    </div>
  );
};

export default GalleryItem;