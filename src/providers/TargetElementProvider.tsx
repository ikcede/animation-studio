'use client'

import React from 'react';

export const TargetElementContext = 
    React.createContext<TargetElement>({html: '', css: ''});
export const TargetElementDispatchContext = 
    React.createContext<React.Dispatch<TargetElementAction>>(() => {});

export type TargetElement = {
  html: string,
  css: string,
}

type TargetElementAction = {
  el: TargetElement,
};

const TargetElementReducer = (
  state: TargetElement,
  action: TargetElementAction
): TargetElement => {
  return action.el;
};

export interface TargetElementProviderProps 
    extends React.PropsWithChildren {
  html?: string,
  css?: string,
  children: React.ReactNode
}

const TargetElementProvider: React.FC<TargetElementProviderProps> = 
    (props) => {
  const [element, dispatch] = React.useReducer(
    TargetElementReducer,
    {html: props.html || '', css: props.css || ''});

  /**
   * Set up starting target element
   */
  React.useEffect(() => {
    if (props.html === undefined || props.css === undefined) {
      return;
    }

    if (props.html !== '' && props.css !== '') {
      dispatch({
        el: {html: props.html, css: props.css},
      });
    }
  }, [props]);

  return (
    <TargetElementContext.Provider value={element}>
      <TargetElementDispatchContext.Provider value={dispatch}>
        {props.children}
      </TargetElementDispatchContext.Provider>
    </TargetElementContext.Provider>
  );
};

export default TargetElementProvider;