import React from 'react';
import styling from './GalleryItem.module.css';
import AnimationLib, { getLibKeyframes } from '@/model/AnimationLib';
import Link from 'next/link';
import Preview from './widgets/Preview';
import { IconButton, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CodeIcon from '@mui/icons-material/Code';
import ExportCodeDialog from '@/components/dialog/ExportCodeDialog';
import { CustomAnimation, CustomKeyframes } from '@/model';

export interface GalleryItemProps {
  lib: AnimationLib,
  collapsed?: boolean
}

const GalleryItem: React.FC<GalleryItemProps> = ({
  lib,
  collapsed = false,
}) => {
  const [codeOpen, setCodeOpen] = React.useState(false);
  const [variant, setVariant] = React.useState<string>('0');

  const getCollapsedClass = () => {
    return collapsed ? styling.collapsed : styling.expanded;
  }

  const changeVariant = (event: SelectChangeEvent) => {
    let newVariant = event.target.value;
    setVariant(newVariant);
  };

  const selectedVariant = React.useMemo(() => {
    let num = parseInt(variant);
    if (Number.isNaN(num)) {
      return 0;
    }
    return num;
  }, [variant]);

  const animationCss = React.useMemo(() => {
    let animation = new CustomAnimation()
        .buildFromString(lib.animation || '');
    
    if (lib.variants && lib.variants[selectedVariant]) {
      animation.setVariant(lib.variants[selectedVariant].name);
    }
    return `.target {
  ${animation.toCSSString()}
}`;
  }, [lib, selectedVariant]);

  const keyframesCss = React.useMemo(() => {
    return getLibKeyframes(lib, selectedVariant);
  }, [lib, selectedVariant]);

  return (
    <div className={`${styling.wrapper} ` + getCollapsedClass()}>
      <div className={styling.name}>
        <Link href={'/editor/' + lib.id}>{lib.name}</Link>
      </div>
      <div className={styling.preview}>
        <Preview lib={lib}
                 selectedVariant={selectedVariant}></Preview>
      </div>
      <div className={styling.options}>
        <div>
          <Link href={`/editor/${lib.id}v${selectedVariant}`}>
            <IconButton aria-label='edit' size='small'>
              <EditIcon></EditIcon>
            </IconButton>
          </Link>
        </div>
        <Select
          className={styling.select}
          value={variant}
          aria-label="variant"
          onChange={changeVariant}
          inputProps={{ 
            IconComponent: () => null,
            sx: { padding: '0 !important' }
          }}
          MenuProps={{
            disableScrollLock: true,
          }}
        >
          {!lib.variants && (
            <MenuItem value='0' selected>default</MenuItem>
          )}
          {lib.variants?.map((item, index) => (
            <MenuItem value={index} key={item.name}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
        <div>
          <IconButton aria-label='code' 
                      size='small'
                      onClick={() => setCodeOpen(true)}>
            <CodeIcon></CodeIcon>
          </IconButton>
        </div>
      </div>

      <ExportCodeDialog open={codeOpen} 
                        onClose={() => setCodeOpen(false)}
                        keyframesCss={keyframesCss}
                        animationCss={animationCss}/>
    </div>
  );
};

export default GalleryItem;