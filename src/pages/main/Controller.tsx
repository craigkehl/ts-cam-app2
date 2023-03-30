import SceneButtonsGroup from '../../components/panTiltCamera/Scenes/SceneButtonsGroup';
import PresetButtonsGroup from '../../components/panTiltCamera/Presets/PresetButtonsGroup';
import PanTiltZoomGroup from '../../components/panTiltCamera/panTiltZoomControls/PanTiltZoomGroup';
import ControlIcon from '@mui/icons-material/SettingsRemote';

import classes from './Controller.module.css'


const Controller: React.FC = props => {

    return (
        <>
            <div className={classes.iconHeader}>
                <ControlIcon />
                <h1>Controller</h1>
            </div>
            <SceneButtonsGroup action='recallScene' title='Scenes'/>
            <PresetButtonsGroup action='recallPreset' title='Presets' />
            <PanTiltZoomGroup />  
        </>
    );
};

export default Controller;
