import { NavigationActions } from 'react-navigation'; 
import { combineReducers }   from 'redux';
//import NavReducer          from './NavReducer';
import AuthReducer           from './AuthReducer';
import HomeReducer           from './HomeReducer';
// import * as ACTION           from '../actions/TypesActions';
// import { AppContainer }      from '../JDBankApp'; // AppContainer // AppNavigator

//  const router       = AppContainer.router;
//  const initalAction = router.getActionForPathAndParams('Login');
//  const initialState = router.getStateForAction(initalAction); // getStateForAction;

export default combineReducers({
     // nav: NavReducer,
    //  nav: (state = initialState, action) => {
    //     //console.log('NavReducer', action); 
    //     let nextState;
    //     switch (action.type) {
    //         case ACTION.NAV_SPLASH:
    //             nextState = router.getStateForAction( NavigationActions.navigate({ routeName: 'Home' }), state );
    //             break;
    //         case ACTION.NAV_LOGIN:
    //             nextState = router.getStateForAction( NavigationActions.navigate({ routeName: 'Login' }), state );
    //             break;
    //         case ACTION.NAV_HOME:
    //             nextState = router.getStateForAction( NavigationActions.navigate({ routeName: 'Home' }), state );
    //             break;
    //         default:
    //             nextState = router.getStateForAction(action, state);
    //             break;
    //     }
    //     return nextState || state;
    //  },
     AuthReducer,
     HomeReducer,
    // PortfolioReducer,
    // OperacoesReducer,
    // ProventosReducer,
    // ApuracaoReducer,
    // AnaliseReducer,
});


// const defaultGetStateForAction = MyApp.router.getStateForAction;

// MyApp.router.getStateForAction = (action, state) => {
//   if (state && action.type === 'PushTwoProfiles') {
//     const routes = [
//       ...state.routes,
//       { key: 'A', routeName: 'Profile', params: { name: action.name1 } },
//       { key: 'B', routeName: 'Profile', params: { name: action.name2 } },
//     ];
//     return {
//       ...state,
//       routes,
//       index: routes.length - 1,
//     };
//   }
//   return defaultGetStateForAction(action, state);
// };