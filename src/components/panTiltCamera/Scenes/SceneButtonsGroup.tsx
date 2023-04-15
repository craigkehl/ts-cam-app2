import React from 'react';

import Card from '../../UI/Card';
import SceneButton from './SceneButton';
import ScenesIcon from '@mui/icons-material/BurstMode';
import { useStore } from '../../../store/store';
import { SceneState } from '../../../store/scenes-store';
import { recallScenes } from '../../../util/obs-http-requests';
import classes from './SceneButtonsGroup.module.css';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseConfig from '@mui/icons-material/CancelPresentation';

const SceneButtonsGroup: React.FC<{
  className?: string;
  action?: string;
  list?: string;
  title?: string;
  onConfig?: any;
  modal?: string;
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

  const header = (
    <div className={classes.header}>
      <div className={classes.iconHeader}>
        <ScenesIcon />
        <h3 className={`${classes.title} ${props.className || ''}`}>
          {showHiddenList ? 'Hidden ' : 'Current '}
          {props.title}
        </h3>
      </div>
      <span onClick={props.onConfig}>
        {((props.modal === 'Scenes') && <CloseConfig className={classes.iconHeader} />) ||
        <SettingsIcon className={classes.iconHeader} />}
      </span>
    </div>
  )

  const sceneList = (
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
  );

  return (
    <Card className={`${classes.card || ''} ${props.className || ''}`}>
      {header}
      {sceneList}
    </Card>
  );
};

export default SceneButtonsGroup;
