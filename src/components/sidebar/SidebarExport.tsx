import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AnimationContext } from '../../providers/AnimationProvider';
import { KeyframesContext } from '../../providers/KeyframesProvider';

const SidebarExport: React.FC = () => {

  const keyframes = React.useContext(KeyframesContext);
  const animation = React.useContext(AnimationContext);

  const getAnimationExportString = React.useMemo(() => {
    return `#target {
  animation: ${animation.name};
  animation-duration: ${animation.duration}s;
  animation-iteration-count: ${animation.iterationCount};
  animation-fill-mode: ${animation.fillMode};
  animation-timing-function: ${animation.timing};
}`;
  }, []);

  return (
    <Box sx={{ padding: '24px 8px 8px' }}>
      <TextField
          label="Keyframes"
          multiline
          maxRows={10}
          InputProps={{
            readOnly: true,
          }}
          fullWidth
          defaultValue={keyframes.cssText}
          sx={{paddingBottom: '24px'}}
        />
      <TextField
          label="Animation"
          multiline
          maxRows={10}
          InputProps={{
            readOnly: true,
          }}
          fullWidth
          defaultValue={getAnimationExportString}
        />
    </Box>
  );
};

export default SidebarExport;