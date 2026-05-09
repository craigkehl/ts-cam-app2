import { useEffect } from 'react'
import Stack from '@mui/material/Stack'
import Card from "../../components/UI/Card"
import SourceSelect from '../../components/projector/Source-Select';
import BlankSwitch from "../../components/projector/BlankSwitch";
import SwitcherInputButtons from '../../components/projector/SwitcherInputButtons';

import { useStore } from "../../store/store";
import { ProjectorState } from "../../store/projector-store";
import { projectorRequest } from '../../util/projector-http-request';
import { getSwitcherStatus } from '../../util/switcher-http-requests';

import classes from './Projector.module.css'

const POLL_INTERVAL_MS = 3000

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

    const fetchSwitcherStatus = async () => {
      const data = await getSwitcherStatus()
      if (data?.input != null) {
        dispatch('SYNC_SWITCHER_INPUT', data.input)
      }
    }

    fetchStatus()
    fetchSwitcherStatus()

    const interval = setInterval(() => {
      fetchStatus()
      fetchSwitcherStatus()
    }, POLL_INTERVAL_MS)

    return () => clearInterval(interval)
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Card>
      <Stack direction="row" alignItems="center" spacing={2}>
        <h3 className={classes.inline}>Projector</h3>
        <SourceSelect />
        {inputSelected && <BlankSwitch />}
      </Stack>
      <SwitcherInputButtons />
    </Card>
  )
}

export default Projector
