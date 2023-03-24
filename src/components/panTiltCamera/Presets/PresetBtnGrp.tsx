import React from "react"

import Card from "../../UI/Card"
import { useStore } from "../../../store/store"
import { PresetState } from "../../../store/presets-store"
import Preset from "./Preset"
import { recallPreset } from "../../../util/cam-http-requests"
import classes from "./PresetBtnGrp.module.css"

const PresetBtnGrp: React.FC<{
  // className?: string
  title?: string
  action?: string
  list?: string
}> = (props) => {
  const [state, dispatch] = useStore()
  const presets: PresetState[] = state.presets

  let showHiddenList = props.list === "showHidden" ? true : false

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

  const presetList = (
    <div className={classes.btnGrp}>
      {
        presets.length > 0 ? (
          presets.map(
            (preset: PresetState) =>
              (showHiddenList ? !preset.isShow : preset.isShow) && (
                <Preset
                  className={`${classes.btn} ${showHiddenList && classes.hidden}`}
                  key={preset.id}
                  id={preset.id}
                  name={preset.name}
                  isShow={preset.isShow}
                  isCurrent={preset.isCurrent}
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
      <h3 className={classes.title}>
       {props.title}
      </h3>
      {presetList}
    </Card>
  )
}

export default PresetBtnGrp
