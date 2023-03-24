import Stack from '@mui/material/Stack'
import Card from "../../components/UI/Card"
import SourceSelect from '../../components/projector/Source-Select';
import BlankSwitch from "../../components/projector/BlankSwitch";
import MenuControl from "../../components/projector/RemoteMenu";
import Volume from '../../components/projector/Volume'
import RemoteKeys from "../../components/projector/Remote-Keys"

import { useStore } from "../../store/store";
import { ProjectorState } from "../../store/projector-store";

import classes from './Projector.module.css'

const Projector = () => {
  const [ state ] = useStore()
  const input: ProjectorState['projectorInput'] = state.projectorInput
  const inputSelected = (input !== 'off')

  return (
    <Card>
      <div className={classes.headerContainer}>
        <h3 className={classes.inline}>Projector</h3>
      </div>
      <SourceSelect />
      {inputSelected && (
        <Stack alignContent='flex-start'>
          <Volume min={0} max={20} defaultValue={17} />
          <Stack direction='row' justifyContent='center'>
            <BlankSwitch />
            <MenuControl />
          </Stack>
          {state.projectorShowMenuKeys && <RemoteKeys />}
        </Stack>)}
    </Card>
  )
}

export default Projector