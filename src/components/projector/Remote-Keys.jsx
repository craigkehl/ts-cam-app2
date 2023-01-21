import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {
  ArrowCircleUp,
  ArrowCircleDown,
  ArrowCircleLeftOutlined,
  ArrowCircleRightOutlined
} from '@mui/icons-material';

export default function RemoteKeys() {
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
          <Button variant="outlined" width='90%' >Menu</Button>
        </Box>
        <Box gridColumn='span 4' display='flex' justifyContent='center' >
          <ArrowCircleUp color="primary" fontSize='large'/>
        </Box>
        <Box gridColumn='span 4' display='flex' justifyContent='center' >
          <Button variant="outlined">Exit</Button>
        </Box>
        <Box gridColumn='span 4' display='flex' justifyContent='center' >
          <ArrowCircleLeftOutlined color="primary" fontSize='large' />
        </Box>
        <Box gridColumn='span 4' display='flex' justifyContent='center' >
          <Button variant="outlined">Enter</Button>
        </Box>
        <Box gridColumn='span 4' display='flex' justifyContent='center' >
          <ArrowCircleRightOutlined color="primary" fontSize='large' />
        </Box>
        <Box gridColumn='span 4' display='flex' justifyContent='center' >
          <Button variant="outlined">Source</Button>
        </Box>
        <Box gridColumn='span 4' display='flex' justifyContent='center' >
          <ArrowCircleDown color="primary" fontSize='large' />
        </Box>
        <Box gridColumn='span 4' display='flex' justifyContent='center' >
          <Button variant="outlined">Auto</Button>
        </Box>
      </Box>
    </Box>
  );
}