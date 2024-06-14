const CAM_BASEURL: string =
  process.env.REACT_APP_CAM_BASEURL || 'http://localhost:4000/api/ptz';

export const recallPreset = async (presetId: string) => {
  try {
    const response = await fetch(`${CAM_BASEURL}/preset/${presetId}`);
    if (!response.ok) {
      throw new Error('Preset not executed!');
    } else {
      return true;
    }
  } catch (error) {
    console.log('Error: ' + error);
  }
};

export const setPreset = async (presetId: string) => {
  const data = JSON.stringify({ presetId });
  try {
    const response = await fetch(`${CAM_BASEURL}/preset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data,
    });
    if (!response.ok) {
      throw new Error('Preset not executed!');
    } else {
      return true;
    }
  } catch (error) {
    console.log('Error: ' + error);
  }
};

export const zoom = async (speed: number) => {
  try {
    const response = await fetch(`${CAM_BASEURL}/zoom/${speed}`);
    if (!response.ok) {
      throw new Error('Zoom not executed!');
    } else {
      return true;
    }
  } catch (error) {
    console.log('Error: ' + error);
  }
};

export const move = async (pan: string, tilt: string) => {
  try {
    const response = await fetch(`${CAM_BASEURL}/move/?pan=${pan}&tilt=${tilt}`);
    if (!response.ok) {
      throw new Error('Move not executed!');
    } else {
      return true;
    }
  } catch (error) {
    console.log('Error: ' + error);
  }
};

