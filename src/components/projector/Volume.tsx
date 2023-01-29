import * as React from 'react';
import Box from '@mui/material/Box';
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
  const [value, setValue] = React.useState(props.defaultValue);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
    // /volume/value/17
    projectorRequest(`volume/value/${value}`)
  };

  return (
    <Box sx={{ width: 200 }}>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <VolumeDown />
        <Slider
          aria-label="Volume"
          value={value}
          onChange={handleChange}
          min={props.min}
          max={props.max}
        />
        <VolumeUp />
      </Stack>
      <div>{ value }</div>
    </Box>
  );
}

