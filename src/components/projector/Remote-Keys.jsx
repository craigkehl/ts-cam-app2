import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {
  ArrowCircleUp,
  ArrowCircleDown,
  ArrowCircleLeft,
  ArrowCircleRight
} from '@mui/icons-material';

import { useStore } from '../../store/store'

import { projectorRequest } from '../../util/projector-http-request';

export default function RemoteKeys() {
  const [state, dispatch] = useStore();
  
  const onRemoteKeyHandler = (command) => {
    const remoteKeyCommand = `remote-key/${command}`
    switch (command) {
      case 'menu':
        dispatch('PROJECTOR_SHOW_MENU_KEYS', true)
        break;
      case 'exit':
        dispatch('PROJECTOR_SHOW_MENU_KEYS', false)
        break;
      default:
    }
    console.log(`Sending projector ${remoteKeyCommand}`)
    projectorRequest(remoteKeyCommand)
  }


  return (
    <Box sx={{
      width: 1,
      margin: '2rem auto'
    }}>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap={2}
        justifyItems="space-between">
        <Box gridColumn='span 4' display='flex' justifyContent='center'>
          <Button
            variant="filled"
            width='90%'
            onClick={onRemoteKeyHandler.bind(this, 'menu')}
          >
            Menu
          </Button>
        </Box>
        <Box gridColumn='span 4' display='flex' justifyContent='center' >
          <ArrowCircleUp
            variant='filled'
            color="primary"
            fontSize='large'
            onClick={onRemoteKeyHandler.bind(this, 'top')}
          />
        </Box>
        <Box gridColumn='span 4' display='flex' justifyContent='center' >
          <Button variant="filled"
            onClick={onRemoteKeyHandler.bind(this, 'exit')}>Exit</Button>
        </Box>
        <Box gridColumn='span 4' display='flex' justifyContent='center' >
          <ArrowCircleLeft color="primary" fontSize='large' 
            onClick={onRemoteKeyHandler.bind(this, 'left')}/>
        </Box>
        <Box gridColumn='span 4' display='flex' justifyContent='center' >
          <Button variant="filled"
            onClick={onRemoteKeyHandler.bind(this, 'enter')}>Enter</Button>
        </Box>
        <Box gridColumn='span 4' display='flex' justifyContent='center' >
          <ArrowCircleRight color="primary" fontSize='large' 
            onClick={onRemoteKeyHandler.bind(this, 'right')}/>
        </Box>
        <Box gridColumn='span 4' display='flex' justifyContent='center' >
          <Button variant="filled"
            onClick={onRemoteKeyHandler.bind(this, 'source')}>Source</Button>
        </Box>
        <Box gridColumn='span 4' display='flex' justifyContent='center' >
          <ArrowCircleDown variant='filled' color="primary" fontSize='large' 
            onClick={onRemoteKeyHandler.bind(this, 'bottom')}/>
        </Box>
        <Box gridColumn='span 4' display='flex' justifyContent='center' >
          <Button variant="filled"
            onClick={onRemoteKeyHandler.bind(this, 'auto')}>Auto</Button>
        </Box>
      </Box>
    </Box>
  );
}