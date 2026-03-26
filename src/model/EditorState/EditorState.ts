import { EditorSettings } from '../EditorSettings';

export interface EditorState {
  settings: EditorSettings;
}

export const defaultEditorState: EditorState = {
  settings: {
    backgroundColor: 'rgb(25, 25, 25)',
  },
};
