//import React, {Component} from 'react';
import { createAppContainer, } from 'react-navigation';
import { createStackNavigator, } from 'react-navigation-stack';
import { createReduxContainer, createReactNavigationReduxMiddleware, } from 'react-navigation-redux-helpers';
import { connect, } from 'react-redux';

import HomeScreen from './screens/Home';
import PerfilScreen from './screens/Perfil';

export const AppNavigator = createStackNavigator( 
  {
    Home   : { screen: HomeScreen,   navigationOptions: { title: 'Home',   }, }, 
    Perfil : { screen: PerfilScreen, navigationOptions: { title: 'Perfil', }, }, 
  },
  {
    initialRouteName: 'Home',
  }
);

export const appNavigatorMiddleware = createReactNavigationReduxMiddleware( state => state.nav );
export const AppContainer           = createAppContainer(AppNavigator);
const ReduxNavigation               = createReduxContainer(AppContainer); //AppNavigator
const mapStateToProps               = (state) => ({ state: state.nav });
export const AppWithNavigationState = connect(mapStateToProps)(ReduxNavigation);
