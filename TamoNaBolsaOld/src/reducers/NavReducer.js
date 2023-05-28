import { NavigationActions } from "react-navigation";

import { AppNavigator } from '../util/AppNavigator';
import * as ACTION from '../actions/TypesActions';

const router        = AppNavigator.router;
const initalAction  = router.getActionForPathAndParams('Auth'); // Splash // Auth
const INITIAL_STATE = router.getStateForAction(initalAction);

export default NavReducer = (state = INITIAL_STATE, action) => {

  //console.log('NavReducer', action); 

  let nextState;

  switch (action.type) {
    case ACTION.NAV_SPLASH:
      nextState = router.getStateForAction( NavigationActions.navigate({ routeName: 'Home' }), state );
      break;
    case ACTION.NAV_LOGIN:
      nextState = router.getStateForAction( NavigationActions.navigate({ routeName: 'UserLogin' }), state );
      break;
    case ACTION.NAV_LOGINESQSENHA:
      nextState = router.getStateForAction( NavigationActions.navigate({ routeName: 'UserEsqSenha' }), state );
      break;
    case ACTION.NAV_LOGINCAD:
      nextState = router.getStateForAction( NavigationActions.navigate({ routeName: 'UserCadastro' }), state );
      break;
    case ACTION.NAV_HOME:
      nextState = router.getStateForAction( NavigationActions.navigate({ routeName: 'Home' }), state );
      break;
    case ACTION.NAV_PDF:
      nextState = router.getStateForAction( NavigationActions.navigate({ routeName: 'HomePDF' }), state );
      break;
    case ACTION.NAV_PORTFOLIO:
      nextState = router.getStateForAction( NavigationActions.navigate({ routeName: 'Portfolio' }), state );
      break;
    case ACTION.NAV_PORTFOLIO_ATIVO:
      nextState = router.getStateForAction( NavigationActions.navigate({ routeName: 'PortfolioAtivo' }), state );
      break;
    case ACTION.NAV_OPERACOES:
      nextState = router.getStateForAction( NavigationActions.navigate({ routeName: 'Operacoes' }), state );
      break;
    case ACTION.NAV_PROVENTOS:
      nextState = router.getStateForAction( NavigationActions.navigate({ routeName: 'Proventos' }), state );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  return nextState || state;

}

