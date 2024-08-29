import React from 'react'
import Dialog from '@mui/material/Dialog';
import { EditorSettingsContext, EditorSettingsDispatchContext } from '@/providers/EditorSettingsProvider';
import TextField from '@mui/material/TextField';
import styling from './Dialog.module.css';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export interface EditorSettingsDialogProps {
  open: boolean,
  onClose: () => void,
}

const ExportCodeDialog: React.FC<EditorSettingsDialogProps> = ({
  open,
  onClose,
}) => {
  const settings = React.useContext(EditorSettingsContext);
  const settingsDispatch = React.useContext(EditorSettingsDispatchContext);
  const [backgroundColor, setBackgroundColor] = 
      React.useState(settings.backgroundColor);

  const handleClose = () => {
    onClose();
  };

  const changeBackgroundColor = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBackgroundColor(e.target.value);
    settingsDispatch({
      settings: {...settings, backgroundColor: e.target.value}
    });
  }

  return (
    <Dialog onClose={handleClose}
            open={open}
            fullWidth
            maxWidth={'sm'}>
      <div className={styling.wrapper}>
        <div className={styling.header}>
          <h2>Settings</h2>
          <IconButton onClick={() => handleClose()}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className={styling.row}>
          <p>Background Color:</p>
          <TextField variant='outlined' 
                     placeholder='rgb(25, 25, 25)'
                     aria-label='Background color'
                     autoComplete='off'
                     value={backgroundColor}
                     onChange={changeBackgroundColor} />
        </div>
      </div>
    </Dialog>
  );
}

export default ExportCodeDialog