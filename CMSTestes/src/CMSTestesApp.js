import React, {Component} from 'react';
import { createStore, applyMiddleware, } from 'redux';
import { Provider, } from 'react-redux';
import { createLogger, } from 'redux-logger';
import thunk from 'redux-thunk'; 
//import createSagaMiddleware from 'redux-saga'; 
import AppReducer from './reducers';
import { AppWithNavigationState, appNavigatorMiddleware, } from './AppNavigator';

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

// const thunk = createSagaMiddleware();
const store = createStore( AppReducer, {}, applyMiddleware(appNavigatorMiddleware, thunk, logger) ); 
// store.subscribe(() => console.log(store.getState()));

export default class CMSTestesApp extends Component {
  render() {
    // console.log(store.getState());
    return(
      <Provider store={store}>
        <AppWithNavigationState /> 
      </Provider>
    );
  }
}
