import SceneButtonsGroup from '../components/panTiltCamera/Scenes/SceneButtonsGroup';
import PresetBtnGrp from '../components/panTiltCamera/Presets/PresetBtnGrp';
import PanTiltZoomGroup from '../components/panTiltCamera/panTiltZoomControls/PanTiltZoomGroup';


const Controller: React.FC = props => {

    return (
        <>
            <SceneButtonsGroup action='recallScene' />
            <PresetBtnGrp action='recallPreset' />
            <PanTiltZoomGroup />  
        </>
    );
};

export default Controller;
