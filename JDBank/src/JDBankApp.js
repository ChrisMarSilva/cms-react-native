import React, {Component} from 'react';
import { createAppContainer, addNavigationHelpers, } from 'react-navigation';  //reateSwitchNavigator, NavigationActions,
import { createStackNavigator } from 'react-navigation-stack';
import { Provider, connect  } from 'react-redux';
import { createStore, applyMiddleware, } from 'redux';
import { createReduxContainer, createReactNavigationReduxMiddleware, } from 'react-navigation-redux-helpers'; // reduxifyNavigator // createNavigationReducer
import { createLogger } from 'redux-logger'; // logger // para config de logs
import thunk from 'redux-thunk'; //ReduxThunk  // para metodos async

import AppReducer                    from './reducers';
import SplashScreen                  from './screens/01Splash';
import LoginScreen                   from './screens/02Login';
import LoginCadastroScreen           from './screens/02LoginCadastro';
import HomeScreen                    from './screens/03Home';
import MovimentacaoScreen            from './screens/04Movimentacao';
import PagarTransferirScreen         from './screens/05PagarTransferir';
import PagarTransferirConfirmaScreen from './screens/05PagarTransferirConfirma';
import PagarTransferirReciboScreen   from './screens/05PagarTransferirRecibo';
import CobrarAlguemScreen            from './screens/06CobrarAlguem';
import CobrarAlguemQRCodeScreen      from './screens/06CobrarAlguemQRCode';
import CobrarAlguemReciboScreen      from './screens/06CobrarAlguemRecibo';
import PerfilScreen                  from './screens/99Perfil';

export const AppNavigator = createStackNavigator(
  {
    Splash                  : { screen: SplashScreen,                  navigationOptions: { header: null, gesturesEnabled: false, }, },  
    Login                   : { screen: LoginScreen,                   navigationOptions: { header: null, gesturesEnabled: false, }, },
    Cadastro                : { screen: LoginCadastroScreen,           navigationOptions: { header: null, gesturesEnabled: false, }, },
    Home                    : { screen: HomeScreen, navigationOptions: { gesturesEnabled: false, }, },//  navigationOptions: { title: 'Home', },
    Movimentacao            : { screen: MovimentacaoScreen, }, //             navigationOptions: { title: 'Movimentações' , },
    PagarTransferir         : { screen: PagarTransferirScreen, }, //          navigationOptions: { title: 'pagar via código', }, 
    PagarTransferirConfirma : { screen: PagarTransferirConfirmaScreen, }, // navigationOptions: { title: 'confirmação', },
    PagarTransferirRecibo   : { screen: PagarTransferirReciboScreen, }, //   navigationOptions: { title: 'recibo de pagamento', },
    CobrarAlguem            : { screen: CobrarAlguemScreen, },  //           navigationOptions: { title: 'cobrar alguém', },
    CobrarAlguemQRCode      : { screen: CobrarAlguemQRCodeScreen, }, // navigationOptions: { title: 'código gerado!', },
    CobrarAlguemRecibo      : { screen: CobrarAlguemReciboScreen, }, //       navigationOptions: { title: 'recibo de recebimento', }, 
    Perfil                  : { screen: PerfilScreen, },//                   navigationOptions: { title: 'Perfil', }, 
  },
  {
    initialRouteName: 'Login',  
    defaultNavigationOptions: {
      headerTintColor: '#fff',
      headerStyle: { height: 68, backgroundColor: "transparent", color: '#fff', borderBottomWidth: 0, elevation: 0, shadowOpacity: 0, shadowRadius: 0, shadowOffset: { height: 0, }, shadowColor: 'transparent', }, 
      headerTitleStyle: { flex:1, justifyContent: 'space-between', textAlign: 'center', alignSelf:'center', fontSize: 16, color: '#fff', fontWeight: 'bold', },
    },
  },
);

const logger = createLogger({
  predicate: undefined,// predicate, // se especificada, essa função será chamada antes de cada ação ser processada com este middleware.
  collapsed: undefined,// collapsed: (getState, action) => action.type === FORM_CHANGE, // usa um booleano ou opcionalmente uma função que recebe a função `getState` para acessar o estado atual da loja e o objeto` action` como parâmetros. Retorna `true` se o grupo de logs deve ser recolhido,` false` caso contrário.
  duration: true,// duration = false: Boolean, // imprimir a duração de cada ação?
  timestamp: true,// timestamp = true: Boolean, // imprimir o carimbo de data / hora com cada ação?
  level: 'log' | 'console' | 'warn' | 'error' | 'info', // console's level
  colors: { title: () => 'inherit', prevState: () => '#9E9E9E', action: () => '#03A9F4', nextState: () => '#4CAF50', error: () => '#F20404', },// colors: ColorsObject, // colors for title, prev state, action and next state: https://github.com/LogRocket/redux-logger/blob/master/src/defaults.js#L12-L18
  titleFormatter (action, time, took) {return `${time}: ${action.type} (in ${took.toFixed(2)})`; }, // titleFormatter (action, time, took) {return [`%caction %c${action.type} %c@ ${time} %c(in ${took.toFixed(2)})`,'color: gray; font-weight: lighter;','color: red;','color: blue; font-weight: lighter;','color: green; font-weight: lighter;']; }, // Formate o título usado ao registrar ações.
  stateTransformer: state => state,// stateTransformer, // Transforme o estado antes da impressão. Por exemplo. converter objeto imutável em JSON simples.
  actionTransformer: action => action,// actionTransformer, // Transforme a ação antes da impressão. Por exemplo. converter objeto imutável em JSON simples.
  errorTransformer: error => error,// errorTransformer, // Erro de transformação antes da impressão. Por exemplo. converter objeto imutável em JSON simples.
  // logger = console: LoggerObject, // implementação da API do console.
  logErrors: true, // o criador de logs deve capturar, registrar e repetir erros?
  diff: false,// diff = false: Boolean, // (alfa) mostra diferenças entre estados?
  diffPredicate: undefined,// diffPredicate // função de filtro (alpha) para mostrar estados diff, semelhante ao `predicado` 
  transformer: undefined,
});

export const appNavigatorMiddleware = createReactNavigationReduxMiddleware(state => state.navigation,);  // 'root',  //state.nav // state.navigation // state.navReducer
export const middleware             = applyMiddleware(thunk, appNavigatorMiddleware, logger, );
export const store                  = createStore( AppReducer, {}, middleware, ); 

export const mapStateToProps        = (state) => ({ state: state.navigation }); // state.nav // state.navigation // state.navReducer
export const ReduxNavigation        = createReduxContainer(AppNavigator); 
export const AppWithNavigationState = connect(mapStateToProps)(ReduxNavigation);
export const AppContainer           = createAppContainer(AppNavigator);   // AppNavigator // AppWithNavigationState

export default class JDBankApp extends Component {
  render() {
    //console.log(store.getState());
    return(
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
