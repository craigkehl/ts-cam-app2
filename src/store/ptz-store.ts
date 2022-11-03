import { initStore } from './store';

import { GlobalState } from './store';

export interface PtzSettings {
  resolution: number;
}

const configureStore = () => {
  const actions = {
    SET_RESOLUTION: (curState: GlobalState, resolution: number) => {
      const newPtzSettings = { ...curState.ptzSettings };
      newPtzSettings.resolution = resolution;
      return { ptzSettings: newPtzSettings };
    },
  };

  initStore(actions, {
    ptzSettings: {
      resolution: 0.5,
    },
  });
};

export default configureStore;
