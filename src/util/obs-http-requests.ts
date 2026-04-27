const OBS_BASEURL: string =
  process.env.REACT_APP_OBS_BASEURL || 'http://localhost:4000/api';

export type ObsConnectionStatus = 'connecting' | 'connected' | 'unavailable';

export interface ObsScene {
  name: string;
  isShow: boolean;
}

export interface ObsState {
  connection: ObsConnectionStatus;
  currentScene: string | null;
  scenes: ObsScene[];
}

const DISCONNECTED_STATE: ObsState = { connection: 'connecting', currentScene: null, scenes: [] };

export const fetchObsState = async (): Promise<ObsState> => {
  try {
    const response = await fetch(`${OBS_BASEURL}/state`);
    if (!response.ok) return DISCONNECTED_STATE;
    return await response.json() as ObsState;
  } catch {
    return DISCONNECTED_STATE;
  }
};

export const triggerObsReconnect = async (): Promise<void> => {
  try {
    await fetch(`${OBS_BASEURL}/reconnect`, { method: 'POST' });
  } catch {}
};

export const setSceneVisibility = async (name: string, isShow: boolean): Promise<void> => {
  try {
    await fetch(`${OBS_BASEURL}/scene-visibility`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, isShow }),
    });
  } catch {}
};

export const startNewMeeting = async (): Promise<void> => {
  try {
    await fetch(`${OBS_BASEURL}/new-meeting`, { method: 'POST' });
  } catch {}
};

export const recallScenes = async (scene: string): Promise<boolean> => {
  try {
    const response = await fetch(`${OBS_BASEURL}/scene/${scene}`);
    if (!response.ok) throw new Error('scene not executed!');
    return true;
  } catch (error) {
    console.log('Error: ' + error);
    return false;
  }
};
