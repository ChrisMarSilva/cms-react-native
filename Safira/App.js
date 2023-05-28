import 'react-native-gesture-handler'
import * as React from 'react';
import { LogBox, } from 'react-native';
import { StatusBar, } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import { MainStackNavigator } from './src/navigation/MainNavigator';
import store from './src/store';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message:
LogBox.ignoreLogs(['Animated: `useNativeDriver`'])
LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified.'])
LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
LogBox.ignoreLogs(['console.disableYellowBox has been deprecated'])
LogBox.ignoreAllLogs(true); // Ignore all log notifications:

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="light" backgroundColor="#152d44" />
        <MainStackNavigator />
      </NavigationContainer>
    </Provider>
  );
}
