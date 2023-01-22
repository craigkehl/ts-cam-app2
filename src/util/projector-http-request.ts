const PROJECTOR_BASEURL: string =
  process.env.REACT_APP_PROJECTOR_BASEURL || 'http://localhost:4000';

export async function projectorRequest(command: string) {
  try {
    const response = await fetch(`${PROJECTOR_BASEURL}/proj/${command}`);
    if (!response.ok) {
      throw new Error(`${command} not executed!`);
    } else {
      return true;
    }
  } catch (error) {
    console.log('Error: ' + error);
  }
}

// export const projectorPowerOn = async () => {
//   return projectorRequest('power/on')
 
// };
 
// projector power off 
// http://localhost:4000/proj/power/off


// // Screen blank
// // projector blank on 
// http://localhost:4000/proj/blank/on

// // projector blank off 
// http://localhost:4000/proj/blank/off


// // remote key
// // projector remote-key menu  
// http://localhost:4000/proj/remote-key/menu

// // projector remote-key exit
// http://localhost:4000/proj/remote-key/exit

// // projector remote-key top  
// http://localhost:4000/proj/remote-key/top

// // projector remote-key bottom
// http://localhost:4000/proj/remote-key/bottom

// // projector remote-key left
// http://localhost:4000/proj/remote-key/left

// // projector remote-key right
// http://localhost:4000/proj/remote-key/right

// // projector remote-key source
// http://localhost:4000/proj/remote-key/source

// // projector remote-key enter
// http://localhost:4000/proj/remote-key/enter

// // projector remote-key auto
// http://localhost:4000/proj/remote-key/auto


// // input source
// // projector source comp1
// http://localhost:4000/proj/source/comp1

// // projector source hdmi1
// http://localhost:4000/proj/source/hdmi1

// // projector source hdmi2
// http://localhost:4000/proj/source/hdmi2

// // projector source compositeVideo
// http://localhost:4000/proj/source/compositeVideo

// // projector source sVideo
// http://localhost:4000/proj/source/sVideo

// // projector source hdBaseT
// http://localhost:4000/proj/source/hdBaseT

