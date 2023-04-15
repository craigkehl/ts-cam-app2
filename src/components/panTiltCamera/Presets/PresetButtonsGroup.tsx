import React from "react"

import Card from "../../UI/Card"
import { useStore } from "../../../store/store"
import { PresetState } from "../../../store/presets-store"
import Preset from "./Preset"
import { recallPreset } from "../../../util/cam-http-requests"
import classes from "./PresetButtonsGroup.module.css"
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseConfig from '@mui/icons-material/CancelPresentation';

const PresetButtonsGroup: React.FC<{
  // className?: string
  title?: string
  action?: string
  list?: string
  onConfig?: any
  modal?: string
}> = (props) => {
  const [state, dispatch] = useStore()
  const presets: PresetState[] = state.presets

  const showHidden = (props.list === "hidden")
  const isConfigure = (props.action === "toggleShow")

  const recallPresetHandler = (id: number) => {
    switch (props.action) {
      case "recallPreset":
        recallPreset(id.toString())
        dispatch("CURRENT_PRESET", id)
        break
      case "toggleShow":
        dispatch("TOGGLE_SHOW_PRESET", id)
        break
      default:
        return
    }
  }

  const header = (
    <div className={classes.header}>
        <div className={classes.iconHeader}>
          <CameraswitchIcon />
          <h3 className={classes.title}>
          {props.title}
          </h3>
        </div>
        <span
          onClick={props.onConfig}
        >
          {((props.modal === 'Presets') && <CloseConfig className={classes.iconHeader} />) || <SettingsIcon className={classes.iconHeader} />}
        </span>
      </div>
  )

  const presetList = (
    <div className={classes.btnGrp}>
      {
        presets.length > 0 ? (
          presets.map(
            (preset: PresetState) =>
              (showHidden ? !preset.isShow : preset.isShow) && (
                <Preset
                  className={`${classes.btn} ${showHidden && classes.hidden}`}
                  key={preset.id}
                  id={preset.id}
                  name={preset.name}
                  isShow={preset.isShow}
                  isCurrent={preset.isCurrent}
                  isConfigure={isConfigure}
                  onRecallPreset={() => recallPresetHandler(preset.id)}>
                  {preset.name}
                </Preset>
              )
          )
        ) : (
          <p>No presets found.</p>
        )
      }
    </div>
  )

  return (
    <Card>
      {header}
      {presetList}
    </Card>
  )
}

export default PresetButtonsGroup
