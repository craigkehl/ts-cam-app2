import React from 'react';
import Button from '../../UI/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import classes from './Preset.module.css';

interface PresetProps extends React.PropsWithChildren<object> {
  className?: string;
  id: number;
  name: string;
  isShow: boolean;
  isCurrent: boolean;
  isConfigure: boolean;
  onRecallPreset: (id: number) => void;
}

const Preset = React.memo((props: PresetProps) => {
  const recallPresetHandler = (id: number) => {
    props.onRecallPreset(id);
  };

  return (
    <Button
      className={`${classes.btn} ${props.className} ${
        props.isCurrent && classes.selected
      }`}
      onClick={() => recallPresetHandler(props.id)}
    >
      <div className={classes.addIcon}>
      {
        props.isConfigure && (!props.isShow ?
          <AddCircleIcon /> :
          <RemoveCircleIcon />)
        }
      </div>
      {props.name}
    </Button>
  );
});

export default Preset;
