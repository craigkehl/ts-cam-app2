import { useState, useEffect } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { projectorRequest } from '../../util/projector-http-request';

let initialBlankLoad = true

export default function BlankSwitch() {
  const [blankScreen, setBlankScreen] = useState(false)

  const onBlankChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (event.target){
      setBlankScreen(event.target.checked)
    }
  }
  
  useEffect(() => {
    const command = blankScreen ? 'blank/on': 'blank/off'
    if (!initialBlankLoad) {
      console.log(`Sending projector ${command}`)
      projectorRequest(command)
    } else {
      initialBlankLoad = false
    }
  }, [blankScreen])

  return (
    <FormControlLabel
      control={
        <Switch
          color="primary"
          onChange={onBlankChangeHandler}
          checked={blankScreen}
        />}
      label="Blank Screen"
      labelPlacement="top"
    />
  );
}