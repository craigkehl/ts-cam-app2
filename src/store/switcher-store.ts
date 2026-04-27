import { initStore, GlobalState } from './store';

export type SwitcherRequestStatus = 'idle' | 'requested' | 'confirmed' | 'failed';

export interface SwitcherState {
  switcherInput: number | null;
  switcherRequested: number | null;
  switcherStatus: SwitcherRequestStatus;
}

const configureStore = () => {
  const actions = {
    // Mark an input as pending; fired immediately on button click
    SET_SWITCHER_REQUEST: (_curState: GlobalState, input: number) => ({
      switcherRequested: input,
      switcherStatus: 'requested' as SwitcherRequestStatus,
    }),

    // Called when the server confirms the switch succeeded
    CONFIRM_SWITCHER_INPUT: (_curState: GlobalState, input: number) => ({
      switcherInput: input,
      switcherRequested: null,
      switcherStatus: 'confirmed' as SwitcherRequestStatus,
    }),

    // Called on network/server error — only if still pending
    FAIL_SWITCHER: (curState: GlobalState, input: number) => {
      if (curState.switcherRequested === input && curState.switcherStatus === 'requested') {
        return { switcherStatus: 'failed' as SwitcherRequestStatus };
      }
      return {};
    },

    // Sync active input from a poll; auto-confirms if it matches what was requested
    SYNC_SWITCHER_INPUT: (curState: GlobalState, input: number) => {
      const status: SwitcherRequestStatus =
        curState.switcherStatus === 'requested' && curState.switcherRequested === input
          ? 'confirmed'
          : curState.switcherStatus;
      const requested =
        curState.switcherStatus === 'requested' && curState.switcherRequested === input
          ? null
          : curState.switcherRequested;
      return { switcherInput: input, switcherRequested: requested, switcherStatus: status };
    },

    // Reset confirmed/failed → idle after visual flash
    RESET_SWITCHER_STATUS: (curState: GlobalState) => {
      if (curState.switcherStatus === 'confirmed' || curState.switcherStatus === 'failed') {
        return { switcherStatus: 'idle' as SwitcherRequestStatus };
      }
      return {};
    },
  };

  initStore(actions, {
    switcherInput: null,
    switcherRequested: null,
    switcherStatus: 'idle',
  });
};

export default configureStore;
