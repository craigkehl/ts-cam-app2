import React, { useState, Fragment } from 'react';

import { zoom } from '../../util/http-requests';
import classes from './Slider.module.css';

const Slider: React.FC<{ className: string }> = (props) => {
  const [curValue, setCurValue] = useState(0);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurValue(parseInt(event.target.value));
    zoom(parseInt(event.target.value));
  };

  const changeCompleteHandler = () => {
    setCurValue(0);
    zoom(0x00);
    console.log('Change Complete');
    console.log(curValue);
  };

  return (
    <Fragment>
      <label
        className={`${classes.title} ${props.className}`}
        htmlFor='zoomSlider'
      >
        Zoom speed: {curValue.toString()}
      </label>
      <input
        className={classes.slider}
        type='range'
        id='zoomSlider'
        min='-7'
        max='7'
        step='1'
        value={curValue}
        onChange={changeHandler}
        onTouchEnd={changeCompleteHandler}
        onMouseUp={changeCompleteHandler}
      />
    </Fragment>
  );
};

export default Slider;
