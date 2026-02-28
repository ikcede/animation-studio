import { EditorSettings } from '../EditorSettings';

export interface EditorState {
  settings: EditorSettings;

  /** Current working file id */
  saveFileId?: string;
}

export const defaultEditorState: EditorState = {
  settings: {
    backgroundColor: 'rgb(25, 25, 25)',
  },
  saveFileId: undefined,
};
