import React, { useRef } from 'react';

import { useStore } from '../../../store/store';
import Input from '../../UI/Input';
import Zoom from '../panTiltZoomControls/Slider';
import PtzPad from '../panTiltZoomControls/TwoDimensionSlider';

import classes from './AddPreset.module.css';

const AddPreset: React.FC<{ className?: string }> = (props) => {
  const globalState = useStore()[0];

  const dispatch = useStore()[1];
  const nameInputRef = useRef<HTMLInputElement>(null);
  // const idInputRef = useRef<HTMLInputElement>(null);

  const addPresetHandler = () => {
    if (nameInputRef.current?.value) {
      const name = nameInputRef.current.value;
      dispatch('ADD_PRESET', name);
    }
  };

  return (
    <>
      <h3 className={`${classes.h3} ${props.className}`}>Add Preset</h3>
      {/* <p>Name and adjust to the camera before clicking "Add".</p> */}
      <Zoom className={`${classes} ${props.className}`} />
      <PtzPad
        className={`${classes} ${props.className}`}
        xMax='24'
        yMax='20'
        resolution={globalState.ptzSettings.resolution}
      />
      <form className={`${classes.form} ${props.className}`}>
        <Input
          className={`${classes.input} ${props.className}`}
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
    </>
  );
};

export default AddPreset;
