import React, { useEffect, useRef } from 'react';

import Card from '../../UI/Card';
import SceneButton from './SceneButton';
import ObsStatusBanner from '../../UI/ObsStatusBanner';
import ScenesIcon from '@mui/icons-material/BurstMode';
import { useStore } from '../../../store/store';
import { SceneState } from '../../../store/scenes-store';
import { recallScenes, setSceneVisibility } from '../../../util/obs-http-requests';
import { useObsState } from '../../../util/useObsState';
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
  const { state: obsState, reconnect: obsReconnect } = useObsState();

  const failTimerRef = useRef<{ name: string; timer: ReturnType<typeof setTimeout> } | null>(null);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showHiddenList = props.list === 'showHidden';

  // Sync store from every poll result when OBS has data
  useEffect(() => {
    if (obsState.scenes.length > 0 || obsState.currentScene !== null) {
      dispatch('SYNC_SCENES', { scenes: obsState.scenes, currentScene: obsState.currentScene });
    }
  }, [obsState]); // eslint-disable-line react-hooks/exhaustive-deps

  // Reset confirmed/failed back to idle after a 2s visual flash
  useEffect(() => {
    const needsReset = scenes.some(
      s => s.requestStatus === 'confirmed' || s.requestStatus === 'failed'
    );
    if (needsReset && !resetTimerRef.current) {
      resetTimerRef.current = setTimeout(() => {
        resetTimerRef.current = null;
        dispatch('RESET_REQUEST_STATUS', null);
      }, 2000);
    }
    return () => {
      if (resetTimerRef.current && !needsReset) {
        clearTimeout(resetTimerRef.current);
        resetTimerRef.current = null;
      }
    };
  }, [scenes]); // eslint-disable-line react-hooks/exhaustive-deps

  const onClickHandler = (name: string) => {
    switch (props.action) {
      case 'recallScene': {
        // Cancel any in-flight fail timer for a previous click
        if (failTimerRef.current) {
          clearTimeout(failTimerRef.current.timer);
          failTimerRef.current = null;
        }

        dispatch('SET_SCENE_REQUEST', name);

        recallScenes(name).then(success => {
          if (!success) {
            dispatch('FAIL_SCENE', name);
            if (failTimerRef.current?.name === name) {
              clearTimeout(failTimerRef.current.timer);
              failTimerRef.current = null;
            }
          }
        });

        // Fail if OBS hasn't confirmed within 6 seconds
        failTimerRef.current = {
          name,
          timer: setTimeout(() => {
            dispatch('FAIL_SCENE', name);
            failTimerRef.current = null;
          }, 6000),
        };
        break;
      }
      case 'toggleShow': {
        const scene = scenes.find(s => s.name === name);
        if (scene) {
          const newIsShow = !scene.isShow;
          setSceneVisibility(name, newIsShow);
          dispatch('TOGGLE_SHOW_SCENE', name);
        }
        break;
      }
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
        {(props.modal === 'Scenes' && <CloseConfig className={classes.iconHeader} />) || (
          <SettingsIcon className={classes.iconHeader} />
        )}
      </span>
    </div>
  );

  const sceneList =
    props.action === 'recallScene' && obsState.connection !== 'connected' ? (
      <ObsStatusBanner status={obsState.connection} onReconnect={obsReconnect} />
    ) : (
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
                  requestStatus={scene.requestStatus}
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
