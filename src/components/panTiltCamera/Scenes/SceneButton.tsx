import React from 'react';
import Button from '../../UI/Button';
import { SceneRequestStatus } from '../../../store/scenes-store';

import classes from './SceneButton.module.css';

interface SceneProps extends React.PropsWithChildren<object> {
  className?: string;
  name: string;
  description: string;
  isShow: boolean;
  isCurrent: boolean;
  requestStatus: SceneRequestStatus;
  onClick: (name: string) => void;
}

const SceneButton = React.memo((props: SceneProps) => {
  return (
    <Button
      className={`${classes.btn} ${props.className} ${props.isCurrent ? classes.selected : ''} ${classes[props.requestStatus] || ''}`}
      onClick={() => props.onClick(props.name)}
      disabled={props.requestStatus === 'requested'}
    >
      {props.name}
    </Button>
  );
});

export default SceneButton;
