import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Drawer, Button, List, Divider } from '@mui/material';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import ScenesIcon from '@mui/icons-material/BurstMode';
import PtzIcon from '@mui/icons-material/ControlCamera';
import ControlIcon from '@mui/icons-material/SettingsRemote';
import PresetsIcon from '@mui/icons-material/Cameraswitch';
// import ExtrasIcon from '@mui/icons-material/Ballot';
import MenuIcon from '@mui/icons-material/Menu';
// import ProfileIcon from '@mui/icons-material/Face';
import ExitIcon from '@mui/icons-material/ExitToApp';
import SlideshowIcon from '@mui/icons-material/Slideshow';

const menuItems = [
  {
    name: 'Controller',
    icon: ControlIcon,
    path: '/controller',
  },
  {
    name: 'Projector',
    icon: SlideshowIcon,
    path: '/projector',
  },
  // {
  //   name: 'Profile',
  //   icon: ProfileIcon,
  //   path: '/profile',
  // },
  {
    name: 'Exit',
    icon: ExitIcon,
    path: '/',
  },
];

const configMenuItems = [
  {
    name: 'Scenes',
    icon: ScenesIcon,
    path: '/config/scenes',
  },
  {
    name: 'Presets',
    icon: PresetsIcon,
    path: '/config/presets',
  },
  {
    name: 'PTZ',
    icon: PtzIcon,
    path: '/config/ptz',
  },
  // {
  //   name: 'Extra',
  //   icon: ExtrasIcon,
  //   path: '/config/extras',
  // },
];

const TemporaryDrawer: React.FC = (props) => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setDrawerOpen(open);
    };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <ListItem
              button
              key={item.name}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <h3>Configure</h3>
      <List>
        {configMenuItems.map((item) => {
          const Icon = item.icon;
          return (
            <ListItem
              button
              key={item.name}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          );
        })}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Button onClick={toggleDrawer(true)}>
          <MenuIcon />
        </Button>
        <Drawer anchor={'right'} open={drawerOpen} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default TemporaryDrawer;
