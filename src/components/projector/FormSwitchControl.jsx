import { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

import { projectorRequest } from '../../util/projector-http-request';

let initialPowerLoad = true
let initialBlankLoad = true

export default function FormSwitchControl({ showKeys, setShowKeys }) {
  const [ powerChecked, setPowerChecked ] = useState(false)
  const [blankChecked, setBlankChecked] = useState(false)
  
  const onPowerChangeHandler = (event) => {
    setPowerChecked(event.target.checked)
  }

  const onBlankChangeHandler = (event) => {
    setBlankChecked(event.target.checked)
  }

  useEffect(() => {
    const command = powerChecked ? 'power/on' : 'power/off'
    if (!initialPowerLoad) {
      console.log(`Sending projector ${command}`)
      projectorRequest(command)
    } else {
      initialPowerLoad = false
    }
  }, [powerChecked])
  
  useEffect(() => {
    const command = blankChecked ? 'blank/on': 'blank/off'
    if (!initialBlankLoad) {
      console.log(`Sending projector ${command}`)
      projectorRequest(command)
    } else {
      initialBlankLoad = false
    }
  }, [blankChecked])
  
  return (
    <FormControl component="fieldset">
      <FormGroup aria-label="controls" row>
        {!showKeys && (
          <FormControlLabel
            value="menu"
            control={
              <MenuOpenIcon
                onClick={() => setShowKeys(true)}
                fontSize='large' />}
            label='Menu'
            labelPlacement='top'
          />
        )}
        <FormControlLabel
          value="power"
          control={
            <Switch
              color="primary"
              onChange={onPowerChangeHandler}
              checked={powerChecked}
            />}
          label="Power"
          labelPlacement="top"
        />
        <FormControlLabel
          value="blank"
          control={
            <Switch
              color="primary"
              onChange={onBlankChangeHandler}
              checked={blankChecked}
            />}
          label="Blank Screen"
          labelPlacement="top"
        />
      </FormGroup>
    </FormControl>
  );
}