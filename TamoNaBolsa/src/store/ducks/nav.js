
import { CommonActions, } from '@react-navigation/native'
import { MainStackNavigator } from '../../navigation/MainNavigator'

// Action Types

const ACTION = {
    // MENU
    NAV_SPLASH: 'tnb/nav/splash',
    NAV_LOGIN: 'tnb/nav/login',
    NAV_LOGINESQSENHA: 'tnb/nav/login/esqueceu',
    NAV_LOGINCAD: 'tnb/nav/login/cad',
    NAV_HOME:'tnb/nav/home',
    NAV_PDF:'tnb/nav/pdf',
    NAV_PORTFOLIO:'tnb/nav/portf',
    NAV_PORTFOLIO_ATIVO:'tnb/nav/portf/ativo',
    NAV_OPERACOES:'tnb/nav/oper',
    NAV_PROVENTOS:'tnb/nav/prov',
}

// Reducer

// const router = MainStackNavigator.router
// const mainNavAction = router.getActionForPathAndParams('Auth')
// const INITIAL_STATE = router.getStateForAction(mainNavAction) 
const INITIAL_STATE = MainStackNavigator.router.getStateForAction(MainStackNavigator.router.getActionForPathAndParams('Auth'));

export default function reducer(state = INITIAL_STATE, action) { 
  //const nextState = MainStackNavigator.router.getStateForAction(action, state);
  const nextState = MainStackNavigator.router.getStateForAction( CommonActions.navigate({ routeName: "Home" }), state )
  return nextState || state
};
  
//export default function reducer(state = INITIAL_STATE, action) { 
 // let nextState;
  // switch (action.type) {
  //   case ACTION.NAV_SPLASH:
  //     nextState = router.getStateForAction( CommonActions.navigate({ routeName: 'Splash' }), state );
  //     break;
  //   case ACTION.NAV_LOGIN:
  //     nextState = router.getStateForAction( CommonActions.navigate({ routeName: 'UserLogin' }), state );
  //     break;
  //   case ACTION.NAV_LOGINESQSENHA:
  //     nextState = router.getStateForAction( CommonActions.navigate({ routeName: 'UserSenha' }), state );
  //     break;
  //   case ACTION.NAV_LOGINCAD:
  //     nextState = router.getStateForAction( CommonActions.navigate({ routeName: 'UserCad' }), state );
  //     break;
  //   case ACTION.NAV_HOME:
  //     nextState = router.getStateForAction( CommonActions.navigate({ routeName: 'Home' }), state );
  //     break;
  //   case ACTION.NAV_PDF:
  //     nextState = router.getStateForAction( CommonActions.navigate({ routeName: 'HomePDF' }), state );
  //     break;
  //   case ACTION.NAV_PORTFOLIO:
  //     nextState = router.getStateForAction( CommonActions.navigate({ routeName: 'Portfolio' }), state );
  //     break;
  //   case ACTION.NAV_PORTFOLIO_ATIVO:
  //     nextState = router.getStateForAction( CommonActions.navigate({ routeName: 'PortfolioAtivo' }), state );
  //     break;
  //   case ACTION.NAV_OPERACOES:
  //     nextState = router.getStateForAction( CommonActions.navigate({ routeName: 'Operacoes' }), state );
  //     break;
  //   case ACTION.NAV_PROVENTOS:
  //     nextState = router.getStateForAction( CommonActions.navigate({ routeName: 'Proventos' }), state );
  //     break;
  //   default:
  //     nextState = AppNavigator.router.getStateForAction(action, state);
  //     break;
  // }
//   return nextState || state;
// }

// Action Creators
