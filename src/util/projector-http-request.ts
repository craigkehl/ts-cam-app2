const PROJECTOR_BASEURL: string =
  process.env.REACT_APP_PROJECTOR_BASEURL || 'http://localhost:4000';
  // TODO: Convert the array to a Linked List
  // Make a request cue FIFO
const requestQueue: string[] = []

export async function projectorRequest(command: string) {
  // Add the latest command to the 
  requestQueue.push(command)
  console.log(requestQueue)
  
  while (requestQueue.length > 0) {
    try {
      const response = await fetch(`${PROJECTOR_BASEURL}/proj/${requestQueue[0]}`);
      if (!response.ok) {
        throw new Error(`${requestQueue[0]} not executed!`);
      } else {
        // Remove the oldest command from the queue
        requestQueue.slice(0,1)
        return response;
      }
    } catch (error) {
      console.log('Error: ' + error);
    }

  }
}