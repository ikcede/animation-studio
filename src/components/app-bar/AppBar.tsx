import { FC, useState } from 'react';

import Link from 'next/link';
import AnimationIcon from '@mui/icons-material/Animation';
import FolderIcon from '@mui/icons-material/Folder';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';

import EditorSettingsDialog from '../dialog/EditorSettingsDialog';
import UserLibraryDialog from '../dialog/UserLibraryDialog/UserLibraryDialog';
import styling from './AppBar.module.css';
import { useEditorContext } from '@/context/EditorContext/EditorContext';

export interface AppBarProps {
  animationName: string;
}

const AppBar: FC<AppBarProps> = ({ animationName }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [userLibraryOpen, setUserLibraryOpen] = useState(false);
  const { isSaved } = useEditorContext();

  return (
    <>
      <div className={styling.wrapper}>
        <div className={styling.logo}>
          <Link href="/">Animation Studio</Link>
        </div>

        <div className={styling.editing}>
          <AnimationIcon />
          {animationName}
          {isSaved ? '' : '*'}
        </div>

        <div className={styling.settings}>
          <IconButton onClick={() => setUserLibraryOpen(true)}>
            <FolderIcon />
          </IconButton>
          <IconButton onClick={() => setSettingsOpen(true)}>
            <SettingsIcon />
          </IconButton>
        </div>
      </div>

      {settingsOpen && (
        <EditorSettingsDialog
          open={settingsOpen}
          onClose={() => setSettingsOpen(false)}
        />
      )}
      {userLibraryOpen && (
        <UserLibraryDialog
          open={userLibraryOpen}
          onClose={() => setUserLibraryOpen(false)}
        />
      )}
    </>
  );
};

export default AppBar;
