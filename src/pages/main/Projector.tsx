import { useEffect } from 'react'
import Stack from '@mui/material/Stack'
import Card from "../../components/UI/Card"
import SourceSelect from '../../components/projector/Source-Select';
import BlankSwitch from "../../components/projector/BlankSwitch";

import { useStore } from "../../store/store";
import { ProjectorState } from "../../store/projector-store";
import { projectorRequest } from '../../util/projector-http-request';

import classes from './Projector.module.css'

const POLL_INTERVAL_MS = 10000

const Projector = () => {
  const [state, dispatch] = useStore()
  const input: ProjectorState['projectorInput'] = state.projectorInput
  const inputSelected = (input !== 'off')

  useEffect(() => {
    const fetchStatus = async () => {
      const response = await projectorRequest('status')
      if (!response?.ok) return
      const data = await response.json()

      const source: ProjectorState['projectorInput'] =
        data.power === 'on' ? 'hdmi' : 'off'

      dispatch('CURRENT_INPUT', source)
    }

    fetchStatus()
    const interval = setInterval(fetchStatus, POLL_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Card>
      <Stack direction="row" alignItems="center" spacing={2}>
        <h3 className={classes.inline}>Projector</h3>
        <SourceSelect />
        {inputSelected && <BlankSwitch />}
      </Stack>
    </Card>
  )
}

export default Projector
