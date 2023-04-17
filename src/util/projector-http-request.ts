const PROJECTOR_BASEURL: string =
  process.env.REACT_APP_PROJECTOR_BASEURL || 'http://localhost:4000';

export async function projectorRequest(command: string) {
    try {
    const response = await fetch(`${PROJECTOR_BASEURL}/proj/${command}`);
      if (!response.ok) {
      throw new Error(`${command} not executed!`);
      } else {
        return response;
      }
    } catch (error) {
      console.log('Error: ' + error);
    }
}