import Card from '../components/UI/Card';
import SceneBtns from '../components/panTiltCamera/Scenes/SceneBtns';
import PresetBtnGrp from '../components/panTiltCamera/Presets/PresetBtnGrp';
import PanTiltZoomGroup from '../components/panTiltCamera/panTiltZoomControls/PanTiltZoomGroup';
import classes from './Controller.module.css';


const Controller: React.FC<{ className?: string }> = props => {

    return (
        <div className={`${classes['controller-page']} ${props.className}`}>
            <SceneBtns
                className={`${classes['scene-btns']} ${props.className}`}
                action='recallScene'
            />
            <Card className={`${classes['preset-btns']} ${props.className}`}>
                <PresetBtnGrp action='recallPreset' />
            </Card>
            <PanTiltZoomGroup className={classes.PTZGroup} />  
        </div>
    );
};

export default Controller;
