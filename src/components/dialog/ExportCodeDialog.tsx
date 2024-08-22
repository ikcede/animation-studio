import React from 'react'
import ExportCode from '@/components/export-code/ExportCode';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

export interface ExportCodeDialogProps {
  open: boolean,
  animationCss?: string,
  keyframesCss?: string,
  onClose: () => void
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
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Animation Code</DialogTitle>
      <div style={{
        margin: '0 16px'
      }}>
        <ExportCode animationCss={animationCss}
                    keyframesCss={keyframesCss} />
      </div>
    </Dialog>
  );
}

export default ExportCodeDialog