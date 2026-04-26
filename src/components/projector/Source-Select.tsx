import { useState } from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import SettingsInputHdmiIcon from '@mui/icons-material/SettingsInputHdmi';
import PowerOffIcon from '@mui/icons-material/PowerOff';

import { useStore } from '../../store/store'
import { ProjectorState } from '../../store/projector-store';
import { projectorRequest } from '../../util/projector-http-request';

const SourceSelect = () => {
  const [state, dispatch] = useStore();
  const selectedInput: ProjectorState['projectorInput'] = state.projectorInput
  const isOn = selectedInput !== 'off'

  const [error, setError] = useState<string | null>(null)

  const toggleHandler = async () => {
    setError(null)
    if (isOn) {
      projectorRequest('power/off')
      dispatch('CURRENT_INPUT', 'off')
    } else {
      const response = await projectorRequest('power/on')
      if (response?.ok) {
        dispatch('CURRENT_INPUT', 'hdmi')
        projectorRequest('source/roku')
      } else {
        setError('Projector did not respond to power on. Check the connection to 192.168.108.11.')
      }
    }
  }

  return (
    <Stack spacing={1} alignItems="flex-start">
      <Button
        startIcon={isOn ? <PowerOffIcon /> : <SettingsInputHdmiIcon />}
        variant={isOn ? 'contained' : 'outlined'}
        onClick={toggleHandler}
      >
        {isOn ? 'Off' : 'On'}
      </Button>
      {error && <Alert severity="error">{error}</Alert>}
    </Stack>
  )
}

export default SourceSelect
