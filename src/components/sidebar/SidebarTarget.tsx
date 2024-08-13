import React from 'react';
import TextField from '@mui/material/TextField';
import { TargetElementContext, TargetElementDispatchContext } from '@/providers/TargetElementProvider';

const SidebarTarget: React.FC = () => {

  const targetElement = React.useContext(TargetElementContext);
  const targetElementDispatch = 
      React.useContext(TargetElementDispatchContext);

  return (
    <>
      <p>
        Customize the target element with CSS and HTML
      </p>
      <TextField
          label="CSS"
          multiline
          rows={10}
          fullWidth
          defaultValue={targetElement.css}
          placeholder={'.target {\n  color: green;\n  font-family: monospace; \n}'}
          sx={{paddingBottom: '24px', marginTop: '16px'}}
        />
      <TextField
          label="HTML"
          multiline
          rows={10}
          fullWidth
          defaultValue={targetElement.html}
          placeholder={'<div class="target">Animation Text</div>'}
        />
    </>
  );
};

export default SidebarTarget;