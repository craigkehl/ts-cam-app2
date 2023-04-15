import { useRef } from 'react'
import Card from '../../UI/Card';
import Zoom from './Slider';
import PtzPad from './PtzPad';
import Input from '../../UI/Input';
import ControlCameraIcon from '@mui/icons-material/ControlCamera';
import { useStore } from '../../../store/store';
import classes from './PanTiltZoomGroup.module.css';

type Props = { className?: string }

const PanTiltZoomGroup: React.FC = ({ className }: Props) => {
  const [globalState, dispatch] = useStore();

  const nameInputRef = useRef<HTMLInputElement>(null)

  const addPresetHandler = () => {
    if (nameInputRef.current?.value) {
      const name = nameInputRef.current.value
      dispatch('ADD_PRESET', name)
    }
  }

   const addPreset = (
    <form className={classes.form} >
        <Input
          className={classes.input} 
          ref={nameInputRef}
          label='New Preset Name'
          input={{
            id: 'name',
            type: 'text',
          }}
        />
        <button type='button' onClick={addPresetHandler}>
          + Add
        </button>
      </form>
  )


  return (
    <Card
      className={`${classes.card ? classes.card : ''} ${classes['pan-tilt-card']} ${className}`}>
      <div className={classes.iconHeader}>
        <ControlCameraIcon />
        <h3 className={classes.title}>
          Camera Zoom, Pan, and Tilt
        </h3>
      </div>
      <Zoom className={`${classes.zoom} zoom`} />
      <PtzPad
        className={classes['pan-tilt-pad']}
        xMax={(24 * globalState.ptzSettings.panSpeed).toFixed(0)}
        yMax={(20 * globalState.ptzSettings.tiltSpeed).toFixed(0)}
        resolution={globalState.ptzSettings.resolution}
      />
      {addPreset}
    </Card>
  )
};

export default PanTiltZoomGroup;