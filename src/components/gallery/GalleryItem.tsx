import React from 'react';
import styling from './GalleryItem.module.css';
import AnimationLib from '@/model/AnimationLib';
import Chip from '@mui/material/Chip';
import Link from 'next/link';
import { CustomAnimation } from '@/model/CustomAnimation';

export interface GalleryItemProps {
  lib: AnimationLib,
  collapsed?: boolean
}

const GalleryItem: React.FC<GalleryItemProps> = ({
  lib,
  collapsed = false,
}) => {
  const getCollapsedClass = () => {
    return collapsed ? styling.collapsed : styling.expanded;
  }

  const getCustomAnimation = () => {
    let animation = new CustomAnimation()
      .buildFromString(lib.animation || '');
    return animation;
  }

  return (
    <div className={`${styling.wrapper} ` + getCollapsedClass()}>
      <style>
        {`.target-${lib.id} {
          width: 50px; height: 50px; display: flex; background: red;
        }
        
        .${styling.preview}:hover .target-${lib.id} {
          animation: ${getCustomAnimation().name};
          animation-iteration-count: 1;
          animation-play-state: running;
          animation-duration: 0.5s;
        }
        
        ${lib.keyframes}`}
      </style>
      <div className={styling.preview}>
        <div className={`target-${lib.id}`}></div>
      </div>
      <div className={styling.name}>
        <Link href={'/editor/' + lib.id}>{lib.name}</Link>
      </div>
      <div className={styling.tags}>
        {lib.tags!.map((tag, i) => (
          <Chip label={tag} size='small' key={i} />
        ))}
      </div>
    </div>
  );
};

export default GalleryItem;