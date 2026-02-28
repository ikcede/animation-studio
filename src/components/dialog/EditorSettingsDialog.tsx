import { useState, FC } from 'react';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import styling from './Dialog.module.css';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useEditorContext } from '@/context/EditorContext/EditorContext';
import { DEFAULT_BACKGROUND_COLOR } from '@/util/constants/defaultSettings';

export interface EditorSettingsDialogProps {
  open: boolean;
  onClose: () => void;
}

const ExportCodeDialog: FC<EditorSettingsDialogProps> = ({
  open,
  onClose,
}) => {
  const { editorState, saveEditorState } = useEditorContext();
  const [backgroundColor, setBackgroundColor] = useState<string>(
    editorState?.settings?.backgroundColor ?? DEFAULT_BACKGROUND_COLOR
  );

  const handleClose = () => {
    onClose();
  };

  const changeBackgroundColor = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBackgroundColor(e.target.value);
    saveEditorState({
      ...editorState,
      settings: {
        ...editorState?.settings,
        backgroundColor: e.target.value,
      },
    });
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth={'sm'}>
      <div className={styling.wrapper}>
        <div className={styling.header}>
          <h2>Settings</h2>
          <IconButton onClick={() => handleClose()}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className={styling.row}>
          <p>Background Color:</p>
          <TextField
            variant="outlined"
            placeholder="rgb(25, 25, 25)"
            aria-label="Background color"
            autoComplete="off"
            value={backgroundColor}
            onChange={changeBackgroundColor}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default ExportCodeDialog;
