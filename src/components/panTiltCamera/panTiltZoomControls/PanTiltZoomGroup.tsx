import Card from '../../UI/Card';
import Slider from './Slider';
import TwoDimensionSlider from './TwoDimensionSlider';
import { useStore } from '../../../store/store';
import classes from './PanTiltZoomGroup.module.css';


const PanTiltZoomGroup: React.FC<{
  className?: string
}> = props => {
  const globalState = useStore()[0];

  return (
    <Card
      className={`${classes.card ? classes.card : ''} ${classes['pan-tilt-card']} ${props.className}`}>
       <h3 className={`${classes.title} ${props.className}`}>
        Camera Zoom, Pan, and Tilt
      </h3>
      <Slider className={`${classes.zoom} ${props.className} zoom`} />
      <TwoDimensionSlider
                    className={`${classes['pan-tilt-pad']} ${props.className}`}
                    xMax='24'
                    yMax='20'
                    resolution={globalState.ptzSettings.resolution}
                 />
    </Card>
  )
};

export default PanTiltZoomGroup;