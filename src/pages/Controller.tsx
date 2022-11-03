import SceneBtns from '../components/Scenes/SceneBtns';
import DoubleSlider from '../components/Sliders/DoubleSlider';
import PresetBtnGrp from '../components/Presets/PresetBtnGrp';
import Slider from '../components/Sliders/Slider';
import Card from '../components/UI/Card';

import { useStore } from '../store/store';
import classes from './Controller.module.css';

const Controller: React.FC<{ className?: string }> = props => {
    const globalState = useStore()[0];

    return (
        <div className={`${classes['controller-page']} ${props.className}`}>
            <SceneBtns
                className={`${classes['scene-btns']} ${props.className}`}
                action='recallScene'
            />
            <Card className={`${classes['preset-btns']} ${props.className}`}>
                <PresetBtnGrp action='recallPreset' />
            </Card>
            <Card className={`${classes['pan-tilt-btns']} ${props.className}`}>
                <Slider className={`${classes} ${props.className}`} />
                <DoubleSlider
                    className={`${classes} ${props.className}`}
                    xMax='24'
                    yMax='20'
                    resolution={globalState.ptzSettings.resolution}
                />
            </Card>
        </div>
    );
};

export default Controller;
