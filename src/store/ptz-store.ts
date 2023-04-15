import { initStore } from './store';

import { GlobalState } from './store';

export interface PtzSettings {
  resolution: number;
  panSpeed: number;
  tiltSpeed: number;
}

const configureStore = () => {
  const actions = {
    SET_RESOLUTION: (curState: GlobalState, resolution: number) => {
      const newPtzSettings = { ...curState.ptzSettings }
        newPtzSettings.resolution = resolution
      return { ptzSettings: newPtzSettings };
    },
    SET_TILT_SPEED: (curState: GlobalState, tiltSpeed: number) => {
      const newPtzSettings = { ...curState.ptzSettings };
      newPtzSettings.tiltSpeed = tiltSpeed;
      return { ptzSettings: newPtzSettings };
    },
    SET_PAN_SPEED: (curState: GlobalState, panSpeed: number) => {
      const newPtzSettings = { ...curState.ptzSettings };
      newPtzSettings.panSpeed = panSpeed;
      return { ptzSettings: newPtzSettings };
    },
  };

  initStore(actions, {
    ptzSettings: {
      resolution: 0.5,
      tiltSpeed: 1,
      panSpeed: 1,
    },
  });
};

export default configureStore;
