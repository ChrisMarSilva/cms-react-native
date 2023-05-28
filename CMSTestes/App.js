import React, {Component} from 'react';
import { YellowBox } from "react-native";
import CMSTestesApp from './src/CMSTestesApp';

YellowBox.ignoreWarnings([ "Warning: isMounted(...) is deprecated", "Module RCTImageLoader" ]);

export default class App extends Component {
  render() {
    console.disableYellowBox = true;
    console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed', 'Warning: ReactNative.createElement'];
    return ( 
      <CMSTestesApp /> 
    );
  }
}

