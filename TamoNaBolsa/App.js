
import 'react-native-gesture-handler';
import React from 'react'
import { LogBox } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer, } from "@react-navigation/native"
import { Provider } from 'react-redux'
import NetworkChecker from 'react-native-network-checker'
import Constants from 'expo-constants'

import { MainStackNavigator } from './src/navigation/MainNavigator'
import store from './src/store'

LogBox.ignoreLogs(['Warning: ...'])
LogBox.ignoreLogs(['Animated: `useNativeDriver`'])
LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified.'])
LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
LogBox.ignoreLogs(['console.disableYellowBox has been deprecated'])
LogBox.ignoreAllLogs(true)

export default function App() {
  return (
    <NetworkChecker style={{ paddingTop: Constants.statusBarHeight, }} position="top" duration={2000} connectedTextColor='#fff' connectedBackgroundColor='#059918' notConnectedMessage="Sem conexão com a Internet!!!" notConnectedTextColor='#fff' notConnectedBackgroundColor='#c94040' connectedMessage="Conectando a Internet..." > 
      <Provider store={store}>
        <NavigationContainer>
          <StatusBar style="light" backgroundColor="#152d44"/>
          <MainStackNavigator />
        </NavigationContainer>
      </Provider>
    </NetworkChecker>
  )
}
