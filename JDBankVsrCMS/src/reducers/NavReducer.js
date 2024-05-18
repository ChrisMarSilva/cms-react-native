import { NavigationActions } from 'react-navigation'; 
import * as ACTION from '../actions/TypesActions';
import { AppContainer }      from '../JDBankApp'; 

const router       = AppContainer.router;
const initalAction = router.getActionForPathAndParams('Login');
const initialState = router.getStateForAction(initalAction);

export default NavReducer = (state = initialState, action) => { 
  //console.log('NavReducer', action); 
  let nextState;
  switch (action.type) {
    case ACTION.NAV_SPLASH:
      nextState = router.getStateForAction( NavigationActions.navigate({ routeName: 'Home' }), state );
      break;
    case ACTION.NAV_LOGIN:
      nextState = router.getStateForAction( NavigationActions.navigate({ routeName: 'Login' }), state );
      break;
    case ACTION.NAV_HOME:
      nextState = router.getStateForAction( NavigationActions.navigate({ routeName: 'Home' }), state );
      break;
    default:
      nextState = router.getStateForAction(action, state);
      break;
  }
  return nextState || state;
}
