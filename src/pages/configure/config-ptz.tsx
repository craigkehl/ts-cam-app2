import React from 'react';

import { useStore } from '../../store/store';
import { PtzSettings } from '../../store/ptz-store';

import classes from './config-ptz.module.css'

const ConfigPtz: React.FC<{ className?: string }> = (props) => {
  const [state, dispatch] = useStore();
  const ptzSettings: PtzSettings = state.ptzSettings;

  const resolutionChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const resolution = parseFloat(event.target.value);
    dispatch('SET_RESOLUTION', resolution);
  };

  const tiltSpeedChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tiltSpeed = parseFloat(event.target.value);
    dispatch('SET_TILT_SPEED', tiltSpeed);
  };

  const panSpeedChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const panSpeed = parseFloat(event.target.value);
    dispatch('SET_PAN_SPEED', panSpeed);
  };

  return (
    <div className={classes.sliders}>
      <h1>PTZ Configure</h1>
      <div>
        <label htmlFor='smoothing'>Smoothing Pan and Tilt</label>
        {(ptzSettings.resolution * 100).toFixed(0) + '%'}
        <input
          type='range'
          min='.1'
          max='1'
          step='0.05'
          id='smoothing'
          value={ptzSettings.resolution.toFixed(2)}
          onChange={resolutionChangeHandler}
        />
      </div>
      <div>
        <label htmlFor='tiltSpeed'>Tilt Speed</label>
        {(ptzSettings.tiltSpeed * 100).toFixed(0) + '%'}
        <input
          type='range'
          min='.1'
          max='1'
          step='0.05'
          id='tiltSpeed'
          value={ptzSettings.tiltSpeed.toFixed(2)}
          onChange={tiltSpeedChangeHandler}
        />
      </div>
      <div>
        <label htmlFor='panSpeed'>Pan Speed</label>
        {(ptzSettings.panSpeed * 100).toFixed(0) + '%'}
        <input
          type='range'
          min='.1'
          max='1'
          step='0.05'
          id='panSpeed'
          value={ptzSettings.panSpeed.toString()}
          onChange={panSpeedChangeHandler}
        />
      </div>
    </div>
  );
};

export default ConfigPtz;
