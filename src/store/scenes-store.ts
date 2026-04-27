import { initStore, GlobalState } from './store';
import { ObsScene } from '../util/obs-http-requests';

export type SceneRequestStatus = 'idle' | 'requested' | 'confirmed' | 'failed';

export interface SceneState {
  name: string;
  isShow: boolean;
  description: string;
  isCurrent: boolean;
  requestStatus: SceneRequestStatus;
}

const KNOWN_DESCRIPTIONS: Record<string, string> = {
  'Live-Camera': 'Live camera feed',
  'Christ-Pic': 'Picture of Christ with Sacrament background music',
  'Christ-Video': "Video of Christ's Atonement",
  'Computer': "Feed from the presenter's computer",
  'Computer-speaker': 'Computer Feed with a small speaker window',
  'Computer-m-speaker': 'Speaker with a small computer feed window',
  'Roku': 'Airplay & Miracast',
};

const configureStore = () => {
  const actions = {
    // Merge OBS scene list with local store — called on every poll
    SYNC_SCENES: (
      curState: GlobalState,
      payload: { scenes: ObsScene[]; currentScene: string | null }
    ) => {
      const existingMap = new Map<string, SceneState>(
        curState.scenes.map((s: SceneState) => [s.name, s])
      );
      const obsNames = new Set(payload.scenes.map((s: ObsScene) => s.name));

      const merged: SceneState[] = payload.scenes.map((obsScene: ObsScene) => {
        const existing = existingMap.get(obsScene.name);
        const isCurrent = obsScene.name === payload.currentScene;
        let requestStatus: SceneRequestStatus = existing?.requestStatus ?? 'idle';

        // Auto-confirm: scene was requested and OBS now reports it as current
        if (requestStatus === 'requested' && isCurrent) {
          requestStatus = 'confirmed';
        }

        return {
          name: obsScene.name,
          isShow: obsScene.isShow,
          description: existing?.description ?? KNOWN_DESCRIPTIONS[obsScene.name] ?? '',
          isCurrent,
          requestStatus,
        };
      });

      // Preserve store-only scenes so they don't disappear when OBS is briefly disconnected
      curState.scenes.forEach((s: SceneState) => {
        if (!obsNames.has(s.name)) {
          merged.push({ ...s, isCurrent: false });
        }
      });

      return { scenes: merged };
    },

    // Mark one scene as pending, all others back to idle
    SET_SCENE_REQUEST: (curState: GlobalState, name: string) => {
      const updatedScenes = curState.scenes.map((s: SceneState) => ({
        ...s,
        requestStatus: (s.name === name ? 'requested' : 'idle') as SceneRequestStatus,
      }));
      return { scenes: updatedScenes };
    },

    // Fail a scene only if it is still pending (safe to call after confirm)
    FAIL_SCENE: (curState: GlobalState, name: string) => {
      const updatedScenes = curState.scenes.map((s: SceneState) => ({
        ...s,
        requestStatus: (s.name === name && s.requestStatus === 'requested'
          ? 'failed'
          : s.requestStatus) as SceneRequestStatus,
      }));
      return { scenes: updatedScenes };
    },

    // Reset confirmed/failed back to idle after visual flash
    RESET_REQUEST_STATUS: (curState: GlobalState) => {
      const updatedScenes = curState.scenes.map((s: SceneState) => ({
        ...s,
        requestStatus: (s.requestStatus === 'confirmed' || s.requestStatus === 'failed'
          ? 'idle'
          : s.requestStatus) as SceneRequestStatus,
      }));
      return { scenes: updatedScenes };
    },

    // Toggle visibility locally (also call setSceneVisibility API from component)
    TOGGLE_SHOW_SCENE: (curState: GlobalState, name: string) => {
      const sceneIndex = curState.scenes.findIndex((s: SceneState) => s.name === name);
      const updatedScenes = [...curState.scenes];
      updatedScenes[sceneIndex] = {
        ...curState.scenes[sceneIndex],
        isShow: !curState.scenes[sceneIndex].isShow,
      };
      return { scenes: updatedScenes };
    },

    ADD_SCENE: (
      curState: GlobalState,
      newScene: { name: string; description: string; isShow: boolean; isCurrent: boolean }
    ) => {
      curState.scenes.push({ ...newScene, requestStatus: 'idle' });
    },
  };

  initStore(actions, {
    scenes: [
      { name: 'Live-Camera',         isShow: true,  description: KNOWN_DESCRIPTIONS['Live-Camera'],         isCurrent: false, requestStatus: 'idle' },
      { name: 'Christ-Pic',          isShow: true,  description: KNOWN_DESCRIPTIONS['Christ-Pic'],          isCurrent: false, requestStatus: 'idle' },
      { name: 'Christ-Video',        isShow: true,  description: KNOWN_DESCRIPTIONS['Christ-Video'],        isCurrent: false, requestStatus: 'idle' },
      { name: 'Computer',            isShow: false, description: KNOWN_DESCRIPTIONS['Computer'],            isCurrent: false, requestStatus: 'idle' },
      { name: 'Computer-speaker',    isShow: false, description: KNOWN_DESCRIPTIONS['Computer-speaker'],    isCurrent: false, requestStatus: 'idle' },
      { name: 'Computer-m-speaker',  isShow: false, description: KNOWN_DESCRIPTIONS['Computer-m-speaker'],  isCurrent: false, requestStatus: 'idle' },
      { name: 'Roku',                isShow: false, description: KNOWN_DESCRIPTIONS['Roku'],                isCurrent: false, requestStatus: 'idle' },
    ],
  });
};

export default configureStore;
