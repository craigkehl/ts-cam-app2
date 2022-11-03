import React from 'react';

import Card from '../UI/Card';
import Scene from './Scene';
import { useStore } from '../../store/store';
import { SceneState } from '../../store/scenes-store';
import { recallScenes } from '../../util/http-requests';
import classes from './SceneBtns.module.css';

const SceneBtns: React.FC<{
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
      <h3 className={`${classes.title} ${props.className}`}>
        {showHiddenList ? 'Hidden ' : 'Current '} Scenes
      </h3>
      <div className={`${classes.btnGrp} ${props.className}`}>
        {scenes.length > 0 ? (
          scenes.map(
            (scene: SceneState) =>
              (showHiddenList ? !scene.isShow : scene.isShow) && (
                <Scene
                  className={`${classes.btn} ${props.className}`}
                  key={scene.name}
                  name={scene.name}
                  description={scene.description}
                  isShow={scene.isShow}
                  isCurrent={scene.isCurrent}
                  onClick={() => onClickHandler(scene.name)}
                >
                  {scene.name}
                </Scene>
              )
          )
        ) : (
          <p>No scenes found.</p>
        )}
      </div>
    </>
  );

  return (
    <Card className={`${classes.card ? classes.card : ''} ${props.className}`}>
      {sceneList}
    </Card>
  );
};

export default SceneBtns;
