import PresetVisibility from './Preset-visibility';
import AddPreset from '../../../components/panTiltCamera/Presets/AddPreset';
import Card from '../../../components/UI/Card';

const ConfigPresets: React.FC<{ className?: string }> = (props) => {
  return (
    <>
      <h1>Configure Presets</h1>
      <PresetVisibility />
      
      <Card className='notice'>
        <p>Added presets are temporary and only added to the device you add them to.</p>
        <ol>
          <li>Adjust the position and zoom desired for the preset.</li>
          <li>Name the preset.</li>
          <li>Click "Add"</li>
        </ol>
      </Card>
      <AddPreset />
    </>
  );
};

export default ConfigPresets;
