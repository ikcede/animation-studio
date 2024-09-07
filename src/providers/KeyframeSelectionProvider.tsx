'use client';

import React from 'react';

export const KeyframeSelectionContext = React.createContext(-1);
export const KeyframeSelectionDispatchContext = React.createContext<
  React.Dispatch<KeyframeSelectionAction>
>(() => {});

type KeyframeSelectionAction = {
  value: number;
};

const keyframeSelectionReducer = (
  state: number,
  action: KeyframeSelectionAction
): number => {
  return action.value;
};

const KeyframeSelectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [keyframeValue, dispatch] = React.useReducer(
    keyframeSelectionReducer,
    -1
  );

  return (
    <KeyframeSelectionContext.Provider value={keyframeValue}>
      <KeyframeSelectionDispatchContext.Provider value={dispatch}>
        {children}
      </KeyframeSelectionDispatchContext.Provider>
    </KeyframeSelectionContext.Provider>
  );
};

export default KeyframeSelectionProvider;
