import PresetBtnGrp from '../../../components/panTiltCamera/Presets/PresetBtnGrp';
import Card from '../../../components/UI/Card';


const PresetVisibility: React.FC<{ className?: string }> = (props) => {
  return (
    <>
      <Card className='notice'>
        <p>Touch a preset to change its visibility by moving to the other list.</p>
      </Card>
      <PresetBtnGrp action='toggleShow' title="Visible Presets List" />
      <PresetBtnGrp action='toggleShow' list='showHidden' title='Hidden Presets List' />
    </>
  );
};

export default PresetVisibility;
