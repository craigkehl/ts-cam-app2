const BASEURL: string =
  process.env.REACT_APP_BASEURL || 'http://localhost:4000';

export const recallPreset = async (presetId: string) => {
  console.log(`${BASEURL}/preset/${presetId}`);
  try {
    const response = await fetch(`${BASEURL}/preset/${presetId}`);
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
    const response = await fetch(`${BASEURL}/preset`, {
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
  console.log(`${BASEURL}/zoom/${speed.toString()}`);
  try {
    const response = await fetch(`${BASEURL}/zoom/${speed}`);
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
  console.log(`${BASEURL}/move/pan=${pan}&tilt=${tilt}`);
  try {
    const response = await fetch(`${BASEURL}/move/?pan=${pan}&tilt=${tilt}`);
    if (!response.ok) {
      throw new Error('Move not executed!');
    } else {
      return true;
    }
  } catch (error) {
    console.log('Error: ' + error);
  }
};

export const recallScenes = async (scene: string) => {
  console.log(`${BASEURL}/scene/${scene}`);
  try {
    const response = await fetch(`${BASEURL}/scene/${scene}`);
    if (!response.ok) {
      throw new Error('scene not executed!');
    } else {
      return true;
    }
  } catch (error) {
    console.log('Error: ' + error);
  }
};
