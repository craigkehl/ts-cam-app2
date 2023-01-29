import { useState } from 'react';

import Card from "../components/UI/Card"
import FormSwitchControl from "../components/projector/FormSwitchControl"
import Volume from '../components/projector/Volume'
import RemoteKeys from "../components/projector/Remote-Keys"
import Status from '../components/projector/Status';

const Projector = () => {

  const [showKeys, setShowKeys] = useState(false)

  return (
    <Card>
      <h3>Projector</h3>
      <FormSwitchControl setShowKeys={setShowKeys} showKeys={showKeys} />
      <Volume min={0} max={20} defaultValue={17} />
      {showKeys && <RemoteKeys setShowKeys={setShowKeys}/>}
      <Status />
    </Card>
  )
}

export default Projector