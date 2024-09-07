import React from 'react';
import ExportCode from '@/components/export-code/ExportCode';
import Dialog from '@mui/material/Dialog';
import styling from './Dialog.module.css';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export interface ExportCodeDialogProps {
  open: boolean;
  animationCss?: string;
  keyframesCss?: string;
  onClose: () => void;
}

const ExportCodeDialog: React.FC<ExportCodeDialogProps> = ({
  open,
  animationCss,
  keyframesCss,
  onClose,
}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth={'sm'}>
      <div className={styling.wrapper}>
        <div className={styling.header}>
          <h2>Animation Code</h2>
          <IconButton onClick={() => handleClose()}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className={styling.row}>
          <ExportCode
            animationCss={animationCss}
            keyframesCss={keyframesCss}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default ExportCodeDialog;
