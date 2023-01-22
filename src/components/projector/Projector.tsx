import { useState } from 'react';

import Card from "../UI/Card"
import FormSwitchControl from "./FormSwitchControl"
import RemoteKeys from "./Remote-Keys"

const Projector = () => {

  const [showKeys, setShowKeys] = useState(false)

  return (
    <Card>
        <h3>Projector</h3>
        <FormSwitchControl setShowKeys={setShowKeys} showKeys={showKeys} />
      {showKeys && <RemoteKeys setShowKeys={setShowKeys}/>}
    </Card>
  )
}

export default Projector