import Card from "../UI/Card"
import FormSwitchControl from "./FormSwitchControl"
import RemoteKeys from "./Remote-Keys"

import classes from './Projector.module.css'

const Projector = () => {
  return (
    <Card>
      <div className={classes.header}>
        <h3>Projector</h3>
        <FormSwitchControl />
      </div>
      <RemoteKeys />
    </Card>
  )
}

export default Projector