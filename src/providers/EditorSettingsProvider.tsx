import { EditorSettings } from '@/model/EditorSettings';
import React from 'react';

const defaultSettings: EditorSettings = {
  backgroundColor: 'rgb(25, 25, 25)',
};

export const EditorSettingsContext =
  React.createContext<EditorSettings>(defaultSettings);
export const EditorSettingsDispatchContext = React.createContext<
  React.Dispatch<EditorSettingsReducerAction>
>(() => {});

type EditorSettingsReducerAction = {
  settings: EditorSettings;
};

const EditorSettingsReducer = (
  editorSettings: EditorSettings,
  action: EditorSettingsReducerAction
): EditorSettings => {
  return { ...action.settings };
};

const EditorSettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [val, dispatch] = React.useReducer(
    EditorSettingsReducer,
    defaultSettings
  );

  return (
    <EditorSettingsContext.Provider value={val}>
      <EditorSettingsDispatchContext.Provider value={dispatch}>
        {children}
      </EditorSettingsDispatchContext.Provider>
    </EditorSettingsContext.Provider>
  );
};

export default EditorSettingsProvider;
