import * as React from 'react';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function FormSwitchControl () {
  return (
    <FormControl component="fieldset">
      {/* <FormLabel component="legend">Projector Controls</FormLabel> */}
      <FormGroup aria-label="controls" row>
        <FormControlLabel
          value="power"
          control={<Switch color="primary" />}
          label="Power"
          labelPlacement="top"
        />
        <FormControlLabel
          value="blank"
          control={<Switch color="primary" />}
          label="Blank"
          labelPlacement="top"
        />
      </FormGroup>
    </FormControl>
  );
}