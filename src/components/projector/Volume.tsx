import { useState } from 'react'
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';

import { projectorRequest } from '../../util/projector-http-request';

type Props = {
  min: number;
  max: number;
  defaultValue: number
}

export default function Volume(props: Props) {
  const [value, setValue] = useState(props.defaultValue);

  // TODO: Fix missing volume values not sent
  /* 
    Problem: Slider values appear to change faster than requests can be processed.
    Possible Solutions:
    1. Write a debounce type function to send the value after the change handler has ceased.
      a. Write a function with a setTimeout to send a projector request.
      b. If another change happens within 250ms, clear the setTimeout to send
    2. Make sure change handler is maintaining async/await behavior
  */
  const onChangeHandler = async (event: Event, newValue: number | number[]) => {
    const response = setValue(prev => {
      console.log(`prev: ${prev}, new: ${newValue}`)
      return newValue as number
    })
    console.log(`res: ${response}`)
    await projectorRequest(`volume/value/${value}`)
  };

  
  return (
    <Stack spacing={1} direction="row" sx={{ mb: 1 }} alignItems="center">
      <VolumeDown />
      <Slider
        aria-label="Volume"
        value={value}
        onChange={onChangeHandler}
        min={props.min}
        max={props.max}
      />
      <VolumeUp />
      {value}
    </Stack>
  );
}

