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

  const onChangeHandler = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
    projectorRequest(`volume/value/${value}`)
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

