import React from 'react';

import PresetBtnGrp from '../../../components/Presets/PresetBtnGrp';
import Card from '../../../components/UI/Card';

import classes from './Preset-visibility.module.css';

const PresetVisibility: React.FC<{ className?: string }> = (props) => {
  return (
    <Card className={`${classes.card ? classes.card : ''} ${props.className}`}>
      <h1>PresetVisibility</h1>
      <PresetBtnGrp action='toggleShow' />
      <PresetBtnGrp action='toggleShow' list='showHidden' />
    </Card>
  );
};

export default PresetVisibility;
