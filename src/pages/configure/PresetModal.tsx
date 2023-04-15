import PresetButtonsGroup from "../../components/panTiltCamera/Presets/PresetButtonsGroup"
type Props = {
  modal: string;
  onConfig: any;
}

const PresetModal = ({modal, onConfig}: Props) => {
  return (
    <>
      <PresetButtonsGroup
        action='toggleShow'
        title='Remove from Visible Presets'
        modal={modal}
        onConfig={onConfig}
      />
      <PresetButtonsGroup
        action='toggleShow'
        title='Add to Visible Presets '
        list='hidden'
        modal={modal}
        onConfig={onConfig}
      />
    </>
  )
}

export default PresetModal