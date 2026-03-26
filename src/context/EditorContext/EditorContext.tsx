'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { CustomAnimation } from '@/model/CustomAnimation';
import {
  defaultEditorState,
  EditorState,
} from '@/model/EditorState/EditorState';

import { useLocalStorage } from '@/hooks/useLocalStorage/useLocalStorage';
import {
  defaultUserAnimationLibrary,
  UserAnimationLibrary,
} from '@/model/UserAnimationLibrary/UserAnimationLibrary';
import CustomKeyframes from '@/model/CustomKeyframes';
import { serializeAnimation } from '@/util/serializeAnimation/serializeAnimation';
import { SerializedAnimation } from '@/model/SerializedAnimation/SerializedAnimation';
import { buildAnimation } from '@/util/buildAnimation/buildAnimation';
import { UserAnimation } from '@/model/UserAnimation/UserAnimation';

type EditorContextProps = {
  isSaved: boolean;
  setIsSaved: (isSaved: boolean) => void;
  saveAnimation: (props: SaveAnimationProps) => void;
  saveWorkingAnimation: (props: SaveAnimationProps) => void;
  loadAnimation: (id: string) => UserAnimation | null;
  saveEditorState: (state: EditorState) => void;
  deleteAnimation: (id: string) => void;
  editorState: EditorState | undefined;
  userAnimations: UserAnimationLibrary;
  workingCopy: SerializedAnimation | undefined;
};

type EditorContextProviderProps = {
  children: JSX.Element | JSX.Element[];
};

type SaveAnimationProps = {
  id?: string;
  animation: CustomAnimation;
  keyframes: CustomKeyframes;
  targetHtml: string;
  targetCss: string;
};

export const EditorContext = createContext<EditorContextProps | undefined>(
  undefined
);

/**
 * Core context provider for the Editor.
 *
 * Handles the save state and all the main editor values.
 */
export const EditorContextProvider = ({
  children,
}: EditorContextProviderProps) => {
  /** Whether the current changes have been saved to a file */
  const [isSaved, setIsSaved] = useState<boolean>(true);

  /** The current editor state */
  const [editorState, setEditorState] = useLocalStorage<
    EditorState | undefined
  >('editorState', defaultEditorState);

  const [workingCopy, setWorkingCopy] = useLocalStorage<
    SerializedAnimation | undefined
  >('workingCopy', undefined);

  /** All saved animations */
  const [userAnimations, setUserAnimations] =
    useLocalStorage<UserAnimationLibrary>(
      'userAnimations',
      defaultUserAnimationLibrary
    );

  const saveAnimation = useCallback(
    ({
      id,
      animation,
      keyframes,
      targetHtml,
      targetCss,
    }: SaveAnimationProps) => {
      if (id == undefined) {
        return saveWorkingAnimation({
          animation,
          keyframes,
          targetHtml,
          targetCss,
        });
      }

      const serializedAnimation = serializeAnimation({
        id: id,
        animation: animation,
        keyframes: keyframes,
        targetHtml: targetHtml,
        targetCss: targetCss,
      });

      const libIndex = userAnimations.library.findIndex(
        (testAnimation: SerializedAnimation) => testAnimation.id === id
      );

      const newLibrary = [...userAnimations.library];

      if (libIndex === -1) {
        newLibrary.push(serializedAnimation);
      } else {
        newLibrary[libIndex] = serializedAnimation;
      }

      setUserAnimations({
        ...userAnimations,
        library: newLibrary,
      });

      setWorkingCopy(serializedAnimation);
      setIsSaved(true);
    },
    [userAnimations, setUserAnimations, setWorkingCopy, setIsSaved]
  );

  const saveWorkingAnimation = useCallback(
    ({
      id,
      animation,
      keyframes,
      targetHtml,
      targetCss,
    }: SaveAnimationProps) => {
      const serializedAnimation = serializeAnimation({
        id: id ?? 'working-copy',
        animation: animation,
        keyframes: keyframes,
        targetHtml: targetHtml,
        targetCss: targetCss,
      });

      console.log('saving working animation:', serializedAnimation);
      setWorkingCopy(serializedAnimation);
    },
    [setWorkingCopy]
  );

  const loadAnimation = useCallback(
    (id: string): UserAnimation | null => {
      const serializedAnimation = userAnimations.library.find(
        (testAnimation: SerializedAnimation) => testAnimation.id === id
      );

      if (serializedAnimation === undefined) {
        return null;
      }
      return buildAnimation(serializedAnimation);
    },
    [userAnimations, setIsSaved, setWorkingCopy]
  );

  const saveEditorState = useCallback(
    (state: EditorState) => {
      setEditorState({
        ...state,
      });
    },
    [setEditorState]
  );

  const deleteAnimation = useCallback(
    (id: string) => {
      setUserAnimations({
        ...userAnimations,
        library: userAnimations.library.filter(
          (animation) => animation.id !== id
        ),
      });
    },
    [userAnimations, setUserAnimations]
  );

  const value = useMemo(
    () => ({
      isSaved,
      setIsSaved,
      saveAnimation,
      saveWorkingAnimation,
      loadAnimation,
      saveEditorState,
      deleteAnimation,
      editorState,
      userAnimations,
      workingCopy,
    }),
    [
      isSaved,
      setIsSaved,
      saveAnimation,
      saveWorkingAnimation,
      loadAnimation,
      saveEditorState,
      deleteAnimation,
      editorState,
      userAnimations,
      workingCopy,
    ]
  );

  return (
    <EditorContext.Provider value={value}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditorContext = () => {
  const context = useContext(EditorContext);

  if (context === undefined) {
    throw new Error(
      'usage of useEditorContext not wrapped in `EditorContextProvider`.'
    );
  }

  return context;
};
