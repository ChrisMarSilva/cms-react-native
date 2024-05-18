import React, {Component} from 'react';
import { YellowBox } from "react-native";
import JDBankApp from './src/JDBankApp';

YellowBox.ignoreWarnings([ "Warning: isMounted(...) is deprecated", "Module RCTImageLoader" ]);

export default class App extends Component {
  render() {
    console.disableYellowBox = true;
    console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed', 'Warning: ReactNative.createElement'];
    return ( 
      <JDBankApp /> 
    );
  }

}
