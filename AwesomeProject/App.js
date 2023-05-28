import React, { Component, useState, useEffect, useRef,  } from 'react'
import { Linking, FlatList, TextInput, StyleSheet, View, Animated, SafeAreaView, NativeModules, ScrollView, Text, Button, Vibration, Platform, TouchableOpacity, ActivityIndicator, TouchableHighlight, Image, Alert, Dimensions, } from 'react-native'
import { LogBox } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Constants from 'expo-constants'
//import * as Device from 'expo-device'
import styled from 'styled-components/native'
// import cio from 'cheerio-without-node-native'
// import NavigationBar from 'react-native-navbar-color'
// import { RecyclerListView, DataProvider, LayoutProvider, BaseItemAnimator, } from 'recyclerlistview'
// import Icon from 'react-native-vector-icons/FontAwesome'
// import Feather from 'react-native-vector-icons/Feather'
// import Ionicons from 'react-native-vector-icons/Ionicons'
// import Fontisto from 'react-native-vector-icons/Feather'
// import { Ionicons, Feather, Feather, Fontisto, MaterialCommunityIcons, } from '@expo/vector-icons'
// import { LinearGradient, Fontisto } from 'expo-linear-gradient'
// import { AnimatedCircularProgress } from 'react-native-circular-progress'
// npm i cheerio-without-node-native@0.20.2
// yarn add cheerio@npm:react-native-cheerio && yarn add --dev @types/cheerio
// import cio from 'cheerio-without-node-native';
// import { NetworkInfo } from "react-native-network-info";
// import publicIP from 'react-native-public-ip';
// import DeviceInfo from 'react-native-device-info';
import * as Updates from 'expo-updates';

LogBox.ignoreLogs(['Warning: ...'])
LogBox.ignoreAllLogs(true)
const { height, width } = Dimensions.get('window')

const CMSText = styled.Text`
  font-size: 18px;
  color: blue;
  font-weight: 500;
`;

export default class App extends React.PureComponent {

  constructor(props) {
    super(props)  
    this.state = {
      testeIp00: '', testeIp01: '', testeIp02: '', testeIp03: '', testeIp04: '', testeIp05: '',
      testeIp06: '', testeIp07: '', testeIp08: '', testeIp09: '', testeIp10: '', testeIp11: '',
      testeIp12: '', testeIp13: '', testeIp14: '', testeIp15: '', testeIp16: '', status: '...',
    }
  }

  componentDidMount() {
    this._onPress01()
    //Linking.openURL('http://localhost:5000/')
    //  npm i react-native-public-ip
    // publicIP().then(ip => { console.log(ip); }).catch(error => { console.log(error); });
    // npm i react-native-network-info
    // react-native link react-native-network-info
   // NetworkInfo.getIPAddress().then(ipAddress => {    console.log(ipAddress);    }); 
   // NetworkInfo.getIPV4Address().then(ipv4Address => {    console.log(ipv4Address);    }); //'Get IPv4 IP (priority: WiFi first, cellular second): '
    // NetworkInfo.getBroadcast().then(broadcast => {    console.log(' Get Broadcast: ', broadcast);    });
    // NetworkInfo.getSSID().then(ssid => {    console.log('Get SSID: ', ssid);    });
    // NetworkInfo.getBSSID().then(bssid => {    console.log('Get BSSID: ', bssid);    });
    // NetworkInfo.getSubnet().then(subnet => {    console.log(' Get Subnet: ', subnet);    });
    // NetworkInfo.getGatewayIPAddress().then(defaultGateway => {    console.log('Get Default Gateway IP: ', defaultGateway);    });
    // NetworkInfo.getFrequency().then(frequency => { console.log(' Get frequency (supported only for Android): ', frequency); });
  }

  async _testeFetch (urlIP) {  //_testeFetch = async (urlIP) => { 
    try {
      // const urlHttp = 'http://'  // 'http://' / 'https://'
      // const urlPort = ':5000' // ':5000' // ':3000' // ':8000' // ':8080' // ':19000'// ':19002' // ':44319'
      // let url = urlHttp + urlIP + urlPort + '/cartoes'  // '/cartoes' // '/weatherforecast'
      // if (urlIP == 'jsonplaceholder') url = 'https://jsonplaceholder.typicode.com/todos/1'
      // if (urlIP == 'ngrok') url = 'http://511eb8d6ea0e.ngrok.io' + '/cartoes'
      // this._testeFetchResultado(url, 'Processando...', '')
      // console.log('  => TesteFetch:', url)
      // // const response = await fetch('https://192.168.1.14:4546/')
      // // const json = await response.json();
      // // const { data: response } = await fetch('https://192.168.1.14:4546/')
      // // fetch( `http://${ip}:3030/feed`) 
      // fetch(url) // ,{method: 'GET', timeout = 7000, headers: {Accept: 'application/json','Content-Type': 'application/json',}}
      //   //.then((response) => this._testeFetchResultado(urlIP, ' - OK - ', response ) ) // response.status, response.json()
      //   .then(response => response.json())
      //   .then( data => this._testeFetchResultado(urlIP, ' - OK - ', JSON.stringify(data[0])) ) // , JSON.stringify(data)
      //   .catch((error) => this._testeFetchResultado(urlIP, ' - ERRO - ', error))
    } catch(error){
      this._testeFetchResultado(urlIP, ' - CATCH - ', error)
    }
  }

  async _testeFetchResultado (urlIP, tipo, texto) { 
    // // console.log('  => TesteFetch:', urlIP, tipo, texto)
    // if (urlIP == 'jsonplaceholder') this.setState({testeIp00: tipo + texto })
    // if (urlIP == 'localhost') this.setState({testeIp01: tipo + texto })
    // if (urlIP == '10.0.0.1') this.setState({testeIp02: tipo + texto })
    // if (urlIP == '10.0.0.82') this.setState({testeIp03: tipo + texto })
    // if (urlIP == '10.0.0.169') this.setState({testeIp04: tipo + texto })
    // if (urlIP == '10.0.2.2') this.setState({testeIp05: tipo + texto })
    // if (urlIP == '127.0.0.1') this.setState({testeIp06: tipo + texto })
    // if (urlIP == '172.28.80.1') this.setState({testeIp07: tipo + texto })
    // if (urlIP == '172.27.64.1') this.setState({testeIp08: tipo + texto })
    // if (urlIP == '192.168.0.102') this.setState({testeIp09: tipo + texto })
    // if (urlIP == 'safiramobile.com.br') this.setState({testeIp10: tipo + texto })
    // if (urlIP == '170.0.160.137') this.setState({ testeIp11: tipo + texto })
    // if (urlIP == '0.0.0.0') this.setState({ testeIp12: tipo + texto })
    // if (urlIP == '10.0.3.2') this.setState({ testeIp13: tipo + texto })
    // if (urlIP == '10.0.0.118') this.setState({ testeIp14: tipo + texto })
    // if (urlIP == '172.28.80.2') this.setState({testeIp15: tipo + texto }) 
    // if (urlIP == 'ngrok') this.setState({testeIp16: tipo + texto }) 
  }

  _onPress01 = async () => {
    try {
      // expo publish
      this.setState({ status: "iniciando verificacao" })
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        this.setState({ status: "baixando nova versao" })
        await Updates.fetchUpdateAsync();
        this.setState({ status: "versao baixada" })
        Updates.reloadAsync();
        this.setState({ status: "app recarregado" })
      } else{
        this.setState({ status: "sem nova versao" })
      }
    } catch (e) {
      this.setState({ status: "erro: " + e })
    }


    // console.log('----------')
    
    // console.log('Expo.Constants')
    // console.log('Expo.Constants.deviceId:', Constants.deviceId)
    // console.log('Expo.Constants.deviceName:', Constants.deviceName)
    // console.log('Expo.Constants.installationId:', Constants.installationId)
    // console.log('Expo.Constants.sessionId:', Constants.sessionId)

    // console.log('Expo.Device')
    // console.log('Expo.Device.deviceName:', Device.deviceName)

  //  const DeviceInfo = NativeModules.DeviceInfo;
  //   // console.log('DeviceInfo.getName()', DeviceInfo.getName())
  //   DeviceInfo.getName().then(deviceName => {
  //     console.log("DeviceInfo.getName(): "+deviceName);
  //   }
    // console.log('NativeModules.SettingsManager.clientUniqueId',NativeModules.SettingsManager.clientUniqueId)
    // console.log('NativeModules.PlatformConstants.fingerprint',NativeModules.PlatformConstants.fingerprint)
    // console.log('NativeModules.PlatformConstants.serial)',NativeModules.PlatformConstants.serial)

    // DeviceInfo.getDevice().then((device) => {
    //   console.log('getDevice', device)
    // });

    // console.log('getDeviceId', DeviceInfo.getDeviceId())
    
    // DeviceInfo.getDeviceName().then((deviceName) => {
    //   console.log('getDeviceName', deviceName)
    // });

    // DeviceInfo.getHost().then((host) => {
    //   console.log('getHost', host)
    // })

    // console.log('getUniqueId', DeviceInfo.getUniqueId())


    // console.log('getUniqueId', getUniqueId())
    // console.log('getManufacturer', getManufacturer())
    // console.log('getManufacturer', DeviceInfo.getManufacturer())

    // this._testeFetch('jsonplaceholder')// SIMULADOR: OK 
    // this._testeFetch('localhost')     // SIMULADOR: ERRO 
    // this._testeFetch('10.0.0.1')      // SIMULADOR: ERRO
    // this._testeFetch('10.0.0.82')     // SIMULADOR: ERRO
    // this._testeFetch('10.0.0.169')    // SIMULADOR: OK **************
    // this._testeFetch('10.0.2.2')      // SIMULADOR: OK
    // this._testeFetch('127.0.0.1')     // SIMULADOR: ERRO
    // this._testeFetch('172.28.80.1')   // SIMULADOR: OK
    // this._testeFetch('172.27.64.1')   // SIMULADOR: OK
    // this._testeFetch('192.168.0.102') // SIMULADOR: ERRO
    // this._testeFetch('safiramobile.com.br') // SIMULADOR: ERRO
    // this._testeFetch('170.0.160.137') // SIMULADOR: ERRO  // meu ip
    // this._testeFetch('0.0.0.0') // SIMULADOR: ERRO  
    // this._testeFetch('10.0.3.2') // SIMULADOR: ERRO  
    // this._testeFetch('10.0.0.118') // SIMULADOR: ERRO  
    // this._testeFetch('172.28.80.2') // SIMULADOR: ERRO  
    // this._testeFetch('ngrok')// SIMULADOR: OK 
    // this._testeFetch('192.168.1.14')  // SIMULADOR: ERRO
    // this._testeFetch('192.168.1.21')  // SIMULADOR: ERRO
    // this._testeFetch('192.168.1.89')  // SIMULADOR: ERRO
    // this._testeFetch('192.168.1.123') // SIMULADOR: ERRO
    // this._testeFetch('192.168.137.1') // SIMULADOR: ERRO
    // this._testeFetch('192.168.0.109') // SIMULADOR: ERRO
  }
  
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', alignContent: 'center', paddingTop: Constants.statusBarHeight, padding: 8, }}>

        <StatusBar style="light" backgroundColor="#152d44" />

        <CMSText style={{ marginBottom: 50, }}>CMS Teste #5</CMSText>

        <TouchableOpacity onPress={this._onPress01} style={{ borderRadius: 30, backgroundColor: '#152d44', alignItems: "center", justifyContent: "center", padding: 10, width: '100%', marginBottom: 20, }}>
          <Text style={{ color: '#fff', }}>PROCESSAR</Text>
        </TouchableOpacity>

        <Text>STATUS: {this.state.status}</Text>
        
        <Text style={{ fontSize: 12, fontWeight: 'bold', }}>Versão: {Constants.manifest.version}</Text>


        {/* <CMSTextResultado _tipo={'jsonplaceholder'} _resultado={this.state.testeIp00} />
        <CMSTextResultado _tipo={'localhost'} _resultado={this.state.testeIp01} />
        <CMSTextResultado _tipo={'10.0.0.1'} _resultado={this.state.testeIp02} />
        <CMSTextResultado _tipo={'10.0.0.82'} _resultado={this.state.testeIp03} />
        <CMSTextResultado _tipo={'10.0.0.169'} _resultado={this.state.testeIp04} />
        <CMSTextResultado _tipo={'10.0.2.2'} _resultado={this.state.testeIp05} />
        <CMSTextResultado _tipo={'127.0.0.1'} _resultado={this.state.testeIp06} />
        <CMSTextResultado _tipo={'172.28.80.1'} _resultado={this.state.testeIp07} />
        <CMSTextResultado _tipo={'172.27.64.1'} _resultado={this.state.testeIp08} />
        <CMSTextResultado _tipo={'192.168.0.102'} _resultado={this.state.testeIp09} />
        <CMSTextResultado _tipo={'safiramobile.com.br'} _resultado={this.state.testeIp10} />
        <CMSTextResultado _tipo={'170.0.160.137'} _resultado={this.state.testeIp11} />
        <CMSTextResultado _tipo={'0.0.0.0'} _resultado={this.state.testeIp12} />
        <CMSTextResultado _tipo={'10.0.3.2'} _resultado={this.state.testeIp13} />
        <CMSTextResultado _tipo={'10.0.0.118'} _resultado={this.state.testeIp14} />
        <CMSTextResultado _tipo={'172.28.80.2'} _resultado={this.state.testeIp15} />
        <CMSTextResultado _tipo={'ngrok'} _resultado={this.state.testeIp16} /> */}

      </SafeAreaView>
    )
  }

}



const CMSTextResultado = (props) => {
  // string.indexOf(substring) !== -1
  return (
    <CMSText style={[{ marginBottom: 10, fontSize: 12, color: 'gray', }, (props._resultado.includes('ERRO') || props._resultado.includes('CATCH')) && { color: 'red' }, props._resultado.includes('OK') && { color: 'green' }]}>
      {props._tipo}: {props._resultado}
    </CMSText>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', alignContent: 'center', paddingTop: Constants.statusBarHeight, padding: 8, },
})


