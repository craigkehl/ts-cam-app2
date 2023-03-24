import React from 'react';

import AddScene from '../../components/panTiltCamera/Scenes/AddScene';
import SceneBtns from '../../components/panTiltCamera/Scenes/SceneButtonsGroup';

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
