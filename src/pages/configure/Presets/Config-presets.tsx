import React from 'react';

import PresetVisibility from './Preset-visibility';
import AddPreset from '../../../components/panTiltCamera/Presets/AddPreset';
import Card from '../../../components/UI/Card';

import classes from './Config-presets.module.css';

const ConfigPrests: React.FC<{ className?: string }> = (props) => {
  return (
    <>
      <h1>Configure Presets</h1>
      <PresetVisibility className={`${classes} ${props.className}`} />
      <Card className={`${classes} ${props.className}`}>
        <AddPreset className={`${classes} ${props.className}`} />
      </Card>
    </>
  );
};

export default ConfigPrests;
