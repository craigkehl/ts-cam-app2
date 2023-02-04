import { useState } from 'react'
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
  
  const inputHandler = async (input: ProjectorState['projectorInput']) => {
    switch (input) {
      case 'off':
        projectorRequest('power/off')
        dispatch('CURRENT_INPUT', input)
        setProjectorOn(false)
        break;

      case 'hdmi':
      case 'roku':
        if (!projectorOn) {
          const response = await projectorRequest('power/on')
          if (response && response.ok) {
            setProjectorOn(true)
            dispatch('CURRENT_INPUT', input)
            projectorRequest(`source/${input}`)
          }
        } else {
          dispatch('CURRENT_INPUT', input)
          projectorRequest(`source/${input}`)
        }
        break;
    
      default:
        break;
    }
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