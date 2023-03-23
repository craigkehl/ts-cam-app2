import React from 'react';
import Button from '../../UI/Button';

import classes from './SceneButton.module.css';

interface SceneProps extends React.PropsWithChildren<object> {
  className?: string;
  name: string;
  description: string;
  isShow: boolean;
  isCurrent: boolean;
  onClick: (name: string) => void;
}

const SceneButton = React.memo((props: SceneProps) => {
  const onClickHandler = (name: string) => {
    props.onClick(name);
  };

  return (
    <Button
      className={`${classes.btn} ${props.className} ${
        props.isCurrent && classes.selected
      }`}
      onClick={() => onClickHandler(props.name)}
    >
      {props.name}
    </Button>
  );
});

export default SceneButton;
