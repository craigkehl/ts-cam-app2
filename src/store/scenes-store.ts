import { initStore, GlobalState } from './store';

export interface SceneState {
  name: string;
  isShow: boolean;
  description: string;
  isCurrent: boolean;
}

const configureStore = () => {
  const actions = {
    TOGGLE_SHOW_SCENE: (curState: GlobalState, name: string) => {
      const sceneIndex: number = curState.scenes.findIndex(
        (s: SceneState) => s.name === name
      );
      const newShowStaus = !curState.scenes[sceneIndex].isShow;
      const updatedScenes = [...curState.scenes];
      updatedScenes[sceneIndex] = {
        ...curState.scenes[sceneIndex],
        isShow: newShowStaus,
      };
      return { scenes: updatedScenes };
    },
    CURRENT_SCENE: (curState: GlobalState, name: string) => {
      const updatedScenes = curState.scenes.map((s: SceneState): SceneState => {
        s.isCurrent = name === s.name ? true : false;
        return s;
      });
      return { scenes: updatedScenes };
    },
    ADD_SCENE: (
      curState: GlobalState,
      newScene: {
        name: string;
        description: string;
        isShow: boolean;
        isCurrent: boolean;
      }
    ) => {
      curState.scenes.push(newScene);
    },
  };

  initStore(actions, {
    scenes: [
      {
        name: 'Live',
        isShow: true,
        description: 'Live camera feed',
        isCurrent: false,
      },
      {
        name: 'Sacrament Graphic',
        isShow: true,
        description: 'Picture of Christ with Sacrament background music',
        isCurrent: false,
      },
      {
        name: 'Sacrament Video',
        isShow: true,
        description: "Video of Christ's Atonement",
        isCurrent: false,
      },
      {
        name: 'Computer',
        isShow: false,
        description: "Feed from presentor's computer",
        isCurrent: false,
      },
      {
        name: 'Computer s-speaker',
        isShow: false,
        description: 'Computer Feed with a small speaker window',
        isCurrent: false,
      },
      {
        name: 'Computer m-speaker',
        isShow: false,
        description: 'Speaker with a small computer feed window',
        isCurrent: false,
      },
    ],
  });
};

export default configureStore;
