'use client'

import React from 'react';
import debounce from 'lodash.debounce';

export const TargetElementContext = 
    React.createContext<TargetElement>({html: '', css: ''});
export const TargetElementDispatchContext = 
    React.createContext<React.Dispatch<TargetElementAction>>(() => {});

type TargetElement = {
  html: string,
  css: string,
}

type TargetElementAction = {
  el: TargetElement,
  save?: boolean
};

const save = debounce((el: TargetElement) => {
  localStorage.setItem('currentTargetElement', JSON.stringify(el));
}, 2000);

const TargetElementReducer = (
  state: TargetElement,
  action: TargetElementAction
): TargetElement => {
  if (action.save) {
    save(action.el);
  }
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
   * Pull initial target from localStorage if empty
   */
  React.useEffect(() => {
    if (props.html !== '' && props.css !== '') {return;}

    let loadedTargetElement = 
        localStorage.getItem('currentTargetElement') || '';
    if (loadedTargetElement.length > 0) {
      let newTargetElement = JSON.parse(loadedTargetElement);
      dispatch({
        el: newTargetElement,
        save: false,
      });
    }
  }, []);

  return (
    <TargetElementContext.Provider value={element}>
      <TargetElementDispatchContext.Provider value={dispatch}>
        {props.children}
      </TargetElementDispatchContext.Provider>
    </TargetElementContext.Provider>
  );
};

export default TargetElementProvider;