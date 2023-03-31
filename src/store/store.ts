import { useState, useEffect } from 'react';

export interface GlobalState {
  [x: string]: any | undefined;
}
export interface Dispatch {
  (actionIdentifier: string, payload: any): void;
}
interface Action {
  [x: string]: (globalState: GlobalState, payload: any) => GlobalState;
}

let globalState: GlobalState = {};
let listeners: React.Dispatch<React.SetStateAction<{}>>[] = [];
let actions: Action = {};

export const useStore = (shouldListen = true): [GlobalState, Dispatch] => {
  const setState = useState(globalState)[1];

  const dispatch: Dispatch = (actionIdentifier, payload) => {
    const newState = actions[actionIdentifier](globalState, payload);
    globalState = { ...globalState, ...newState };

    for (const listener of listeners) {
      listener(globalState);
    }
  };

  useEffect(() => {
    if (shouldListen) {
      listeners.push(setState);
    }

    return () => {
      if (shouldListen) {
        listeners = listeners.filter((listener) => listener !== setState);
      }
    };
  }, [setState, shouldListen]);

  return [globalState, dispatch];
};

export const initStore = (userActions: {}, initialState: GlobalState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userActions };
};
