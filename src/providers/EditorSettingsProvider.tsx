import { EditorSettings } from '@/model/EditorSettings';
import React from 'react';

export const EditorSettingsContext = React.createContext({});
export const EditorSettingsDispatchContext =
  React.createContext<React.Dispatch<EditorSettingsReducerAction>>(() => {});

type EditorSettingsReducerAction = {
  settings: EditorSettings,
}

const EditorSettingsReducer = (
  editorSettings: EditorSettings,
  action: EditorSettingsReducerAction
): EditorSettings => {
  return {...action.settings};
}

const EditorSettingsProvider = (
  {children}: {children: React.ReactNode}
) => {
  const [val, dispatch] =
    React.useReducer(EditorSettingsReducer, {});

  return (
    <EditorSettingsContext.Provider value={val}>
      <EditorSettingsDispatchContext.Provider value={dispatch}>
        {children}
      </EditorSettingsDispatchContext.Provider>
    </EditorSettingsContext.Provider>
  );
}

export default EditorSettingsProvider;