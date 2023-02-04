import { initStore, GlobalState } from "./store";


export interface ProjectorState {
  projectorInput: 'hdmi' | 'roku' | 'off';
  showProjector: boolean;
  projectorShowMenuKeys: boolean;
}

const configureStore = () => {
  const actions = {
    TOGGLE_SHOW_CONTROL: (curState: GlobalState) => {
      const newState = !curState.showProjector
      console.log('The new state is: ', newState)
      return { showProjector: newState }
    },
    CURRENT_INPUT: (curState: GlobalState, projectorInput: ProjectorState['projectorInput']) => {
      console.log('the current input is ', projectorInput)
      return { projectorInput: projectorInput}
    },
    PROJECTOR_SHOW_MENU_KEYS: (curState: GlobalState, projectorShowMenuKeys: ProjectorState['projectorShowMenuKeys']) => {
      
      return { projectorShowMenuKeys: projectorShowMenuKeys}
    }
  }

  initStore(actions, {
    projectorInput: 'off',
    showProjector: false,
    projectorShowMenuKeys: false
  })
}

export default configureStore;