import SceneButtonsGroup from '../../components/panTiltCamera/Scenes/SceneButtonsGroup';
import PresetButtonsGroup from '../../components/panTiltCamera/Presets/PresetButtonsGroup';
import PanTiltZoomGroup from '../../components/panTiltCamera/panTiltZoomControls/PanTiltZoomGroup';


const Controller: React.FC = props => {

    return (
        <>
            <SceneButtonsGroup action='recallScene' />
            <PresetButtonsGroup action='recallPreset' />
            <PanTiltZoomGroup />  
        </>
    );
};

export default Controller;
