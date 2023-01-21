import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './layouts/drawer';
import Welcome from './pages/Welcome';
import Controller from './pages/Controller';
import ConfigScenes from './pages/configure/config-scenes';
import ConfigPresets from './pages/configure/Presets/Config-presets';
import ConfigPTZ from './pages/configure/config-ptz';
import ConfigExtras from './pages/configure/config-extras';

import Profile from './pages/Profile';
import Projector from './components/projector/Projector';

const App: React.FC<{ className?: string }> = (props) => {
  return (
    <>
      <Layout />
      <main>
        <Routes>
          <Route path='/controller' element={<Controller />} />
          <Route path='/projector' element={<Projector />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/config/presets' element={<ConfigPresets />} />
          <Route path='/config/scenes' element={<ConfigScenes />} />
          <Route path='/config/ptz' element={<ConfigPTZ />} />
          <Route path='/config/extras' element={<ConfigExtras />} />
          <Route path='/' element={<Welcome />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
