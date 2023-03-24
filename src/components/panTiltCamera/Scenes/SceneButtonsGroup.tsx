import React from 'react';

import Card from '../../UI/Card';
import SceneButton from './SceneButton';
import { useStore } from '../../../store/store';
import { SceneState } from '../../../store/scenes-store';
import { recallScenes } from '../../../util/obs-http-requests';
import classes from './SceneButtonsGroup.module.css';

const SceneButtonsGroup: React.FC<{
  className?: string;
  action?: string;
  list?: string;
}> = (props) => {
  const [state, dispatch] = useStore();
  const scenes: SceneState[] = state.scenes;

  let showHiddenList = props.list === 'showHidden' ? true : false;

  const onClickHandler = (name: string) => {
    switch (props.action) {
      case 'recallScene':
        recallScenes(name);
        dispatch('CURRENT_SCENE', name);
        break;
      case 'toggleShow':
        dispatch('TOGGLE_SHOW_SCENE', name);
        break;
      default:
        return;
    }
  };

  const sceneList = (
    <>
      <h3 className={`${classes.title} ${props.className || ''}`}>
        {showHiddenList ? 'Hidden ' : 'Current '} Scenes
      </h3>
      <div className={`${classes.btnGrp} ${props.className || ''}`}>
        {scenes.length > 0 ? (
          scenes.map(
            (scene: SceneState) =>
              (showHiddenList ? !scene.isShow : scene.isShow) && (
                <SceneButton
                  className={`${classes.btn} ${props.className || ''}`}
                  key={scene.name}
                  name={scene.name}
                  description={scene.description}
                  isShow={scene.isShow}
                  isCurrent={scene.isCurrent}
                  onClick={() => onClickHandler(scene.name)}
                >
                  {scene.name}
                </SceneButton>
              )
          )
        ) : (
          <p>No scenes found.</p>
        )}
      </div>
    </>
  );

  return (
    <Card className={`${classes.card || ''} ${props.className || ''}`}>
      {sceneList}
    </Card>
  );
};

export default SceneButtonsGroup;
