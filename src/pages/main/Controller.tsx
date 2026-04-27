import { useState } from 'react'
import SceneButtonsGroup from '../../components/panTiltCamera/Scenes/SceneButtonsGroup';
import PresetButtonsGroup from '../../components/panTiltCamera/Presets/PresetButtonsGroup';
import PanTiltZoomGroup from '../../components/panTiltCamera/panTiltZoomControls/PanTiltZoomGroup';
import Modal from '../../components/UI/Modal'
import ControlIcon from '@mui/icons-material/SettingsRemote';
import MeetingIcon from '@mui/icons-material/EventAvailable';

import classes from './Controller.module.css'
import PresetModal from '../configure/PresetModal';
import ScenesModal from '../configure/ScenesModal'
import { startNewMeeting } from '../../util/obs-http-requests';

type ModalState = 'Scenes' | 'Presets' | 'Closed'

const Controller: React.FC = () => {
    const [modal, setModal] = useState<ModalState>('Closed')

    const presetConfigHandler = () => {
        if (modal === 'Closed') setModal('Presets')
        else setModal('Closed')
    }

    const scenesConfigHandler = () => {
        if (modal === 'Closed') setModal('Scenes')
        else setModal('Closed')
    }

    const newMeetingHandler = () => {
        startNewMeeting();
    }

    return (
        <>
            {(modal === 'Presets') &&
                <Modal onClose={presetConfigHandler}>
                    <PresetModal
                        modal={modal}
                        onConfig={presetConfigHandler}
                    />
                </Modal>
            }
            {(modal === 'Scenes') &&
                <Modal onClose={scenesConfigHandler}>
                    <ScenesModal
                        modal={modal}
                        onConfig={scenesConfigHandler}
                    />
                </Modal>
            }
            <div className={classes.pageHeader}>
                <div className={classes.iconHeader}>
                    <ControlIcon />
                    <h1>Controller</h1>
                </div>
                <button className={classes.newMeetingBtn} onClick={newMeetingHandler}>
                    <MeetingIcon fontSize="small" />
                    New Meeting
                </button>
            </div>
            <SceneButtonsGroup
                action='recallScene'
                title='Scenes'
                onConfig={scenesConfigHandler}
                modal={modal}
            />
            <PresetButtonsGroup
                action='recallPreset'
                title='Presets'
                onConfig={presetConfigHandler}
                modal={modal}
            />
            <PanTiltZoomGroup />
        </>
    );
};

export default Controller;
