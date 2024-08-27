import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import React from 'react';
import { CustomAnimation } from '@/model/CustomAnimation';

type DirectionChangeFunction = (direction: string) => void;

export interface AnimationDirectionProps {
  animation: CustomAnimation,
  onDirectionChange: DirectionChangeFunction
}

const AnimationDirection: React.FC<AnimationDirectionProps> = ({
  animation,
  onDirectionChange = () => {}
}) => {
  const [direction, setDirection] = React.useState('normal');
  const [alternate, setAlternate] = 
      React.useState<string | null>('alternate');

  const changeDirectionValue = (
    event: React.MouseEvent<HTMLElement>,
    newDirection: string | null,
  ) => {
    if (newDirection !== null) {
      setDirection(newDirection);
      onDirectionChange(buildDirection(newDirection, alternate !== null));
    }
  }

  const changeAlternate = (
    event: React.MouseEvent<HTMLElement>,
    shouldAlternate: string | null,
  ) => {
    setAlternate(shouldAlternate);
    onDirectionChange(buildDirection(direction, shouldAlternate !== null));
  }

  const buildDirection = (dir: string, useAlternate: boolean) => {
    if (useAlternate) {
      return dir === 'normal' ? 'alternate' : 'alternate-reverse';
    }
    return dir;
  }

  React.useEffect(() => {
    if(animation.direction === 'reverse' || 
        animation.direction === 'alternate-reverse') {
      setDirection('reverse');
    } else {
      setDirection('normal');
    }

    if (animation.direction === 'alternate-reverse' || 
        animation.direction === 'alternate') {
      setAlternate('alternate');
    } else {
      setAlternate(null);
    }

  }, [animation]);

  return (
    <div className='input-row'>
      <label>Direction:</label>
      <ToggleButtonGroup
        value={direction}
        onChange={changeDirectionValue}
        aria-label="Direction types"
        exclusive
        style={{marginRight: '8px'}}
      >
        <ToggleButton 
            value='normal'
            aria-label='forwards'
            size='small'>
          <ArrowForwardIcon />
        </ToggleButton>
        <ToggleButton 
            value='reverse'
            aria-label='backwards'
            size='small'>
          <ArrowBackIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup
        value={alternate}
        onChange={changeAlternate}
        aria-label="set alternate"
        exclusive
      >
        <ToggleButton 
            value='alternate'
            aria-label='alternate'
            size='small'>
          <SyncAltIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}

export default AnimationDirection