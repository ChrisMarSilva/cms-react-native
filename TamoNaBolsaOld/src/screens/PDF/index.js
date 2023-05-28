import React from 'react';
import { View, WebView, } from 'react-native';
//import PDFReader from 'rn-pdf-reader-js';
//import PDFReader from '@dmsi/rn-pdf-reader-js';
import { Constants } from 'expo';

import styles from './styles';
import * as HelperLog from '../../util/HelperLog';

export default  class PDF extends React.Component {
  
    constructor(props){
        super(props);  
        //this.state = {};

        // HelperLog.entrada('PDF.constructor');
        try {
        }catch(err) {
            // HelperLog.erro('PDF.constructor', err.message);
        }finally {
            // HelperLog.saida('PDF.constructor');
        }
    }

    componentWillMount() {  
        // HelperLog.entrada('PDF.componentWillMount');
        try {
        }catch(err) {
            // HelperLog.erro('PDF.componentWillMount', err.message);
        }finally {
            // HelperLog.saida('PDF.componentWillMount');
        }
    }

    componentDidMount() {
        // HelperLog.entrada('PDF.componentDidMount');
        try {
        }catch(err) {
            // HelperLog.erro('PDF.componentDidMount', err.message);
        }finally {
            // HelperLog.saida('PDF.componentDidMount');
        }
    }

    componentWillUnmount() {
        // HelperLog.entrada('PDF.componentWillUnmount');
        try {
        }catch(err) {
            // HelperLog.erro('PDF.componentWillUnmount', err.message);
        }finally {
            // HelperLog.saida('PDF.componentWillUnmount');
        }
    }

// {<PDFReader source={{ uri: this.props.navigation.state.params.url }}/>

    render() {

        // HelperLog.entrada('PDF.render');

        return (
            <View style={{flex: 1, paddingTop: Constants.statusBarHeight, backgroundColor: '#ecf0f1', }}>
                 <WebView
                        bounces={false}
                        scrollEnabled={false} 
                        source={{ uri: this.props.navigation.state.params.url }} />
            </View>
        );

    }

}
