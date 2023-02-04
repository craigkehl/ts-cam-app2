import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SettingsInputHdmiIcon from '@mui/icons-material/SettingsInputHdmi';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import PowerOffIcon from '@mui/icons-material/PowerOff';

import { useStore } from '../../store/store'
import { ProjectorState } from '../../store/projector-store';

type Props = {
  setShowKeys?: React.Dispatch<React.SetStateAction<boolean>>
}

const SourceSelect = (props: Props) => {
  const [state, dispatch] = useStore();
  const selectedInput = state.projectorInput
  
  const inputHandler = (projectorInput: ProjectorState['projectorInput']) => {
    dispatch('CURRENT_INPUT', projectorInput)
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