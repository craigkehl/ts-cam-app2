import { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SettingsInputHdmiIcon from '@mui/icons-material/SettingsInputHdmi';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import PowerOffIcon from '@mui/icons-material/PowerOff';

import { useStore } from '../../store/store'
import { ProjectorState } from '../../store/projector-store';
import { projectorRequest } from '../../util/projector-http-request';

type Props = {
}

const SourceSelect = (props: Props) => {
  const [state, dispatch] = useStore();
  const selectedInput: ProjectorState['projectorInput'] = state.projectorInput

  const [projectorOn, setProjectorOn] = useState(false)
  
  useEffect(() => {
    if (!projectorOn && !(selectedInput === 'off')) {
     console.log('send proj power on')
     projectorRequest('proj/power/on')
       .then(res => {
         if (res && res.ok) {
           setProjectorOn(true)
           console.log('Proj on. Sending' + selectedInput)

           projectorRequest(`proj/source/${selectedInput}`)
         }
       })
    } else if (projectorOn && selectedInput === 'off') {
      console.log('Turning proj off')
     projectorRequest('proj/power/off')
       .then(res => {
         if (res && res.ok) {
           setProjectorOn(false)
           console.log("It's off")
         }
       })
   } else {
     projectorRequest(`proj/source/${selectedInput}`)
   }
  }, [selectedInput, projectorOn])

  const inputHandler = (input: ProjectorState['projectorInput']) => {
    dispatch('CURRENT_INPUT', input)
  }
  
  return (
    <Stack
      direction="row"
      spacing={1}
      aria-label="source primary button group"
      sx={{ mb: 1 }}
    >
      <Button
        startIcon={<SettingsInputHdmiIcon />}
        variant={(selectedInput === 'hdmi') ? 'contained': 'outlined'}
        onClick={inputHandler.bind(this, 'hdmi')}
      >
        HDMI
      </Button>
      <Button startIcon= {<SettingsInputAntennaIcon />}
        variant={(selectedInput === 'roku') ? 'contained': 'outlined'}
        onClick={inputHandler.bind(this, 'roku')}
      >
        Roku
      </Button>
      {(selectedInput !== 'off') && <Button startIcon={<PowerOffIcon />}
        variant='outlined'
        onClick={inputHandler.bind(this, 'off')}
      >
        Off
      </Button>}
  </Stack>
  )
}

export default SourceSelect