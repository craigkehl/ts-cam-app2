import React, { useRef } from 'react';

import { useStore } from '../../../store/store';
import Card from '../../UI/Card';
import Input from '../../UI/Input';
import Zoom from '../panTiltZoomControls/Slider';
import PtzPad from '../panTiltZoomControls/PtzPad';
import classes from './AddPreset.module.css';

type Props = { className?: string }

const AddPreset: React.FC = ({className}: Props) => {
  const [globalState, dispatch] = useStore();

  const nameInputRef = useRef<HTMLInputElement>(null);
  // const idInputRef = useRef<HTMLInputElement>(null);

  const addPresetHandler = () => {
    if (nameInputRef.current?.value) {
      const name = nameInputRef.current.value;
      dispatch('ADD_PRESET', name);
    }
  };

  const addPreset = (
    <form className={classes.form} >
        <Input
          className={classes.input} 
          ref={nameInputRef}
          label='Name'
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
    <Card className={className}>
      <h3 className={classes.h3} >Add new Preset to this device</h3>
      {addPreset}
      <Zoom />
      <PtzPad
        xMax='24'
        yMax='20'
        resolution={globalState.ptzSettings.resolution}
      />
    </Card>
  );
};

export default AddPreset;
