import { FC, useCallback, useMemo, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import dialogStyles from '../Dialog.module.css';
import styling from './UserLibraryDialog.module.css';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useEditorContext } from '@/context/EditorContext/EditorContext';
import Button from '@mui/material/Button';
import AnimationPreview from '@/components/preview/AnimationPreview';
import { CustomAnimation } from '@/model/CustomAnimation';
import { SerializedAnimation } from '@/model/SerializedAnimation/SerializedAnimation';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTimelineContext } from '@/context/TimelineContext/TimelineContext';
import { getNextId } from '@/util/getNextId/getNextId';

export interface UserLibraryDialogProps {
  open: boolean;
  animationCss?: string;
  keyframesCss?: string;
  onClose: () => void;
}

const UserLibraryDialog: FC<UserLibraryDialogProps> = ({
  open,
  onClose,
}) => {
  const {
    loadAnimation,
    userAnimations,
    saveAnimation,
    deleteAnimation,
    setIsSaved,
  } = useEditorContext();
  const {
    loadState,
    updateAnimation,
    animation,
    keyframes,
    targetHtml,
    targetCss,
  } = useTimelineContext();
  const [selectedId, setSelectedId] = useState<string | undefined>(
    undefined
  );

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleLoadAnimation = useCallback(() => {
    if (selectedId === undefined) {
      return;
    }
    const userAnimation = loadAnimation(selectedId);
    if (userAnimation === null) {
      return; // Todo: handle error
    }
    loadState({
      animation: userAnimation.animation,
      keyframes: userAnimation.keyframes,
      targetHtml: userAnimation.targetHtml,
      targetCss: userAnimation.targetCss,
    });
    setIsSaved(true);
    onClose();
  }, [selectedId, loadAnimation, loadState, onClose, setIsSaved]);

  const handleSelectAnimation = useCallback(
    (id: string) => {
      setSelectedId(id);
    },
    [setSelectedId]
  );

  const handleAnimationNameChange = useCallback(
    (name: string) => {
      if (name.length === 0) {
        return;
      }
      updateAnimation({ name }, true);
    },
    [updateAnimation]
  );

  const isSaveButtonDisabled = useMemo(() => {
    return animation.name.length === 0;
  }, [animation.name]);

  const handleSaveAnimation = useCallback(
    (id?: string) => {
      const nextId = id ?? getNextId(userAnimations);
      saveAnimation({
        id: nextId,
        animation: animation,
        keyframes: keyframes,
        targetHtml: targetHtml,
        targetCss: targetCss,
      });
    },
    [
      userAnimations,
      saveAnimation,
      animation,
      keyframes,
      targetHtml,
      targetCss,
    ]
  );

  const handleDeleteAnimation = useCallback(() => {
    if (selectedId === undefined) {
      return;
    }
    deleteAnimation(selectedId);
    setSelectedId(undefined);
  }, [deleteAnimation, setSelectedId, selectedId]);

  const getAnimationPreview = useCallback(
    (serializedAnimation: SerializedAnimation) => {
      console.log('serializedAnimation', serializedAnimation);
      return (
        <AnimationPreview
          animation={new CustomAnimation().buildFromString(
            serializedAnimation.animation
          )}
          allKeyframes={[serializedAnimation.keyframes]}
          targetHtml={serializedAnimation.targetHtml}
          targetCss={serializedAnimation.targetCss}
          isItemPreview={true}
          itemPreviewId={Number(serializedAnimation.id)}
        />
      );
    },
    []
  );

  const getOverwriteButton = useCallback(
    (id: string | undefined) => {
      if (id === undefined) {
        return;
      }

      const animationName = userAnimations.library.find(
        (animation) => animation.id === id
      )?.name;
      return (
        <Button
          className="button button-dark"
          onClick={() => handleSaveAnimation(id)}
        >
          Overwrite {animationName}
        </Button>
      );
    },
    [userAnimations]
  );

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth={'lg'}>
      <div className={dialogStyles.wrapper}>
        <div
          className={`${dialogStyles.header} ${dialogStyles.sticky} ${dialogStyles.bordered}`}
        >
          <div className={dialogStyles.headerTitleRow}>
            <h2>Animation Library</h2>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className={dialogStyles.headerContentRow}>
            <div className="label">Active Animation:</div>
            <OutlinedInput
              value={animation.name}
              placeholder="New Animation Name"
              onChange={(e) => handleAnimationNameChange(e.target.value)}
            />
            <Button
              className="button button-dark"
              onClick={() => handleSaveAnimation()}
              disabled={isSaveButtonDisabled}
            >
              Save New
            </Button>
            {getOverwriteButton(selectedId)}
          </div>
        </div>
        <div className={dialogStyles.row}>
          <div className={styling.animationLibrary}>
            {userAnimations.library.map((animation) => (
              <div
                className={`${styling.animationItem} ${
                  animation.id === selectedId ? styling.selected : ''
                }`}
                key={animation.id}
              >
                <div
                  role="button"
                  onClick={() => handleSelectAnimation(animation.id)}
                >
                  <div>{animation.name}</div>
                  <div style={{ width: '200px', height: '200px' }}>
                    {getAnimationPreview(animation)}
                  </div>
                </div>
              </div>
            ))}
            {userAnimations.library.length === 0 && (
              <div className={styling.noAnimationsFound}>
                <div>No saved animations found</div>
              </div>
            )}
          </div>
        </div>
        <div
          className={`${dialogStyles.footer} ${dialogStyles.sticky} ${dialogStyles.bordered}`}
        >
          <div className={dialogStyles.footerActions}>
            <div className={dialogStyles.footerActionsLeft}>
              <Button
                className="button button-dark"
                onClick={handleDeleteAnimation}
                variant="outlined"
                size="small"
                disabled={selectedId === undefined}
              >
                Delete
              </Button>
            </div>
            <Button
              className="button button-dark"
              onClick={handleClose}
              variant="outlined"
              size="small"
            >
              Cancel
            </Button>
            <Button
              className="button button-dark"
              onClick={handleLoadAnimation}
              variant="outlined"
              size="small"
              disabled={selectedId === undefined}
            >
              Load
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default UserLibraryDialog;
