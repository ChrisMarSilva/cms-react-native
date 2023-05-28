import React, {Component} from 'react';
import { YellowBox } from "react-native";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
//import { devToolsEnhancer , composeWithDevTools } from 'remote-redux-devtools';

import { AppWithNavigationState, AppNavigatorMiddleware} from './util/AppNavigator';
import AppReducer from './reducers';

const store = createStore(AppReducer, {}, applyMiddleware(ReduxThunk, AppNavigatorMiddleware), ); // atual
//const store = createStore( AppReducer, {}, composeWithDevTools( applyMiddleware(ReduxThunk, AppNavigatorMiddleware), ) );
//const store = createStore(reducer, devToolsEnhancer(), applyMiddleware(ReduxThunk, AppNavigatorMiddleware) );

//const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });
//const store = createStore( AppReducer, {}, composeEnhancers( applyMiddleware(ReduxThunk, AppNavigatorMiddleware), ) );

YellowBox.ignoreWarnings([ "Warning: isMounted(...) is deprecated", "Module RCTImageLoader" ]);

export default class TamoNaBolsaApp extends Component {
  render() {
    // console.disableYellowBox = true;
    // console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
		return(
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
	}
}
