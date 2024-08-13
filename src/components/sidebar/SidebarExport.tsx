import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AnimationContext } from '../../providers/AnimationProvider';
import { KeyframesContext } from '../../providers/KeyframesProvider';

const SidebarExport: React.FC = () => {

  const keyframes = React.useContext(KeyframesContext);
  const animation = React.useContext(AnimationContext);

  return (
    <Box sx={{ padding: '24px 0 8px' }}>
      <TextField
          label="Keyframes"
          multiline
          maxRows={10}
          InputProps={{
            className: 'monospace',
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
            className: 'monospace',
            readOnly: true,
          }}
          fullWidth
          defaultValue={animation.toCSSString(false)}
        />
    </Box>
  );
};

export default SidebarExport;