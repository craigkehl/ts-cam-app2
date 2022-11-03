import React from 'react';

import { useStore } from '../../store/store';
import { PtzSettings } from '../../store/ptz-store';

const ConfigPtz: React.FC<{ className?: string }> = (props) => {
  const [state, dispatch] = useStore();
  const ptzSettings: PtzSettings = state.ptzSettings;

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const resolution = parseFloat(event.target.value);
    console.log(resolution);
    dispatch('SET_RESOLUTION', resolution);
  };

  return (
    <>
      <h1>PTZ Configure</h1>
      <label htmlFor='smoothing'>Smoothing Pan and Tilt</label>
      <input
        type='range'
        min='.1'
        max='1'
        step='0.05'
        id='smoothing'
        value={ptzSettings.resolution.toString()}
        onChange={changeHandler}
      />
      {(ptzSettings.resolution * 100).toString() + '%'}
    </>
  );
};

export default ConfigPtz;
