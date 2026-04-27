import React, { useEffect, useRef } from 'react';
import Button from '../UI/Button';
import { useStore } from '../../store/store';
import { SwitcherState, SwitcherRequestStatus } from '../../store/switcher-store';
import { selectSwitcherInput } from '../../util/switcher-http-requests';
import classes from './SwitcherInputButtons.module.css';

const INPUTS: { num: number; label: string }[] = [
  { num: 2, label: 'Rack Input' },
  { num: 3, label: 'Chapel PTZ Camera' },
  { num: 4, label: 'Podium' },
  { num: 5, label: 'Rear Chapel' },
  { num: 6, label: 'Rack Roku' },
];

const SwitcherInputButtons: React.FC = () => {
  const [state, dispatch] = useStore();
  const switcherInput: SwitcherState['switcherInput'] = state.switcherInput;
  const switcherRequested: SwitcherState['switcherRequested'] = state.switcherRequested;
  const switcherStatus: SwitcherRequestStatus = state.switcherStatus;

  const failTimerRef = useRef<{ input: number; timer: ReturnType<typeof setTimeout> } | null>(null);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset confirmed/failed → idle after 2s visual flash
  useEffect(() => {
    const needsReset = switcherStatus === 'confirmed' || switcherStatus === 'failed';
    if (needsReset && !resetTimerRef.current) {
      resetTimerRef.current = setTimeout(() => {
        resetTimerRef.current = null;
        dispatch('RESET_SWITCHER_STATUS', null);
      }, 2000);
    }
    return () => {
      if (resetTimerRef.current && !needsReset) {
        clearTimeout(resetTimerRef.current);
        resetTimerRef.current = null;
      }
    };
  }, [switcherStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  const onClickHandler = (input: number) => {
    if (switcherStatus === 'requested') return;

    if (failTimerRef.current) {
      clearTimeout(failTimerRef.current.timer);
      failTimerRef.current = null;
    }

    dispatch('SET_SWITCHER_REQUEST', input);

    selectSwitcherInput(input).then((confirmed) => {
      if (confirmed !== null) {
        dispatch('CONFIRM_SWITCHER_INPUT', confirmed);
        if (failTimerRef.current?.input === input) {
          clearTimeout(failTimerRef.current.timer);
          failTimerRef.current = null;
        }
      } else {
        dispatch('FAIL_SWITCHER', input);
        if (failTimerRef.current?.input === input) {
          clearTimeout(failTimerRef.current.timer);
          failTimerRef.current = null;
        }
      }
    });

    // Fail if server hasn't responded within 6 seconds
    failTimerRef.current = {
      input,
      timer: setTimeout(() => {
        dispatch('FAIL_SWITCHER', input);
        failTimerRef.current = null;
      }, 6000),
    };
  };

  return (
    <div className={classes.btnGrp}>
      {INPUTS.map(({ num, label }) => {
        const isActive = switcherInput === num;
        const isRequested = switcherRequested === num && switcherStatus === 'requested';
        const statusClass =
          switcherRequested === num ? classes[switcherStatus] ?? '' : '';

        return (
          <Button
            key={num}
            className={`${classes.btn} ${isActive ? classes.selected : ''} ${statusClass}`}
            onClick={() => onClickHandler(num)}
            disabled={isRequested}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
};

export default SwitcherInputButtons;
