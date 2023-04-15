import SceneButtonsGroup from "../../components/panTiltCamera/Scenes/SceneButtonsGroup"

type Props = {
  modal: string;
  onConfig: any;
}

const ScenesModule = ({modal, onConfig}: Props) => {
  return (
    <>
      <SceneButtonsGroup 
        action='toggleShow'
        modal={modal}
        onConfig={onConfig}
      />
      <SceneButtonsGroup
        action='toggleShow'
        list='showHidden'
        modal={modal}
        onConfig={onConfig}
      />
    </>
  )
}

export default ScenesModule