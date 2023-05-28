import { NavigationActions } from 'react-navigation'; 
import { AppContainer } from '../AppNavigator';
import * as ACTION from '../actions/TypesActions';

const initialAction = { type: NavigationActions.Init };
const initialState  = AppContainer.router.getStateForAction(initialAction);

const NavReducer = (state = initialState, action) => { 
  //console.log('NavReducer', action); 
  let nextState;
  switch (action.type) {
    case ACTION.NAV_HOME: 
      nextState = AppContainer.router.getStateForAction( NavigationActions.navigate({ routeName: 'Home' }), state );
      break;
    case ACTION.NAV_PERFIL:
      nextState = AppContainer.router.getStateForAction( NavigationActions.navigate({ routeName: 'Perfil' }), state );
      break;
     default:
       nextState = AppContainer.router.getStateForAction(action, state);
       break;
  }
  return nextState || state;
}
 
 export default NavReducer;