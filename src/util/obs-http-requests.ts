const OBS_BASEURL: string =
  process.env.REACT_APP_OBS_BASEURL || 'http://localhost:4000/api/media';

export const recallScenes = async (scene: string) => {
  console.log(`${OBS_BASEURL}/scene/${scene}`);
  try {
    const response = await fetch(`${OBS_BASEURL}/scene/${scene}`);
    if (!response.ok) {
      throw new Error('scene not executed!');
    } else {
      return true;
    }
  } catch (error) {
    console.log('Error: ' + error);
  }
};