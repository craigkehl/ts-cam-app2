import { useState } from 'react';

import Card from "../components/UI/Card"
import FormSwitchControl from "../components/projector/FormSwitchControl"
import RemoteKeys from "../components/projector/Remote-Keys"
import Status from '../components/projector/Status';

const Projector = () => {

  const [showKeys, setShowKeys] = useState(false)

  return (
    <Card>
      <h3>Projector</h3>
      <FormSwitchControl setShowKeys={setShowKeys} showKeys={showKeys} />
      {showKeys && <RemoteKeys setShowKeys={setShowKeys}/>}
      <Status />
    </Card>
  )
}

export default Projector