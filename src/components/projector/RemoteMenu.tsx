import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import { useEffect } from 'react'
import { useStore } from '../../store/store'

import { projectorRequest } from '../../util/projector-http-request'

type Props = {}

export default function MenuControl(props: Props) {
  const [state, dispatch] = useStore()
  
  const onMenuHandler = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (event.target) {
      dispatch('PROJECTOR_SHOW_MENU_KEYS', event.target.checked)
    }
  }

  useEffect(() => {
    const command = `remote-key/${state.projectorShowMenuKeys ? 'menu': 'exit'}`
    projectorRequest(command)
  }, [state.projectorShowMenuKeys])

  return (
      <FormControlLabel
        control={
          <Switch
            color="primary"
            onChange={onMenuHandler}
            checked={state.projectorShowMenuKeys}
          />
        }
        label='Menu Buttons'
        labelPlacement='top'
      />
  )
}