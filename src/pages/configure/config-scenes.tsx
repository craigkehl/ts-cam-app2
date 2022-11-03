import React from 'react';

import AddScene from '../../components/Scenes/AddScene';
import SceneBtns from '../../components/Scenes/SceneBtns';

const ConfigScenes: React.FC<{ className?: string }> = (props) => {
  return (
    <>
      <h1>Configure Scenes</h1>
      <SceneBtns action='toggleShow' />
      <SceneBtns action='toggleShow' list='showHidden' />
      <AddScene />
    </>
  );
};

export default ConfigScenes;
