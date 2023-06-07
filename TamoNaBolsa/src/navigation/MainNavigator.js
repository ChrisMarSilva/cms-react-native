
import React, { useState, useEffect, } from 'react';
import { Text, View, Image, TouchableOpacity, } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome'
import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer'
import { DrawerActions, CommonActions,  } from '@react-navigation/native'
// import { createReduxContainer, reduxifyNavigator, createReactNavigationReduxMiddleware,  } from 'react-navigation-redux-helpers'
// import { bindActionCreators } from "redux"
import { connect } from 'react-redux'

import SplashScreen from '../screens/Splash'
import BemVindoScreen from '../screens/BemVindo'
import UserLoginScreen from '../screens/UserLogin'
import UserCadastroScreen from '../screens/UserCadastro'
import UserEsqueceuSenhaScreen from '../screens/UserEsqueceuSenha'
import HomeScreen from '../screens/Home'
import ValorizacaoDiaScreen from '../screens/ValorizacaoDia'
import PortfolioScreen from '../screens/Portfolio'
import PortfolioAtivoScreen from '../screens/PortfolioAtivo'
import OperacoesScreen from '../screens/Operacoes'
import OperacoesDetalheScreen from '../screens/OperacoesDetalhe'
import OperacoesMesScreen from '../screens/OperacoesMes'
import ProventosScreen from '../screens/Proventos'
import ProventosDetalheScreen from '../screens/ProventosDetalhe'
import ProventosReceberScreen from '../screens/ProventosReceber'
import ProventosCalendarioScreen from '../screens/ProventosCalendario'
import ProventosDivulgadosScreen from '../screens/ProventosDivulgados'
import FatosRelevantesScreen from '../screens/FatosRelevantes'
import FatosRelevantesMesScreen from '../screens/FatosRelevantesMes'
import NoticiasDiaScreen from '../screens/NoticiasDia'
import ApuracoesScreen from '../screens/Apuracoes'
import ApuracoesDetalheScreen from '../screens/ApuracoesDetalhe'
import IRScreen from '../screens/IR'
import ComentariosScreen from '../screens/Comentarios' 
import DrawdownScreen from '../screens/Drawdown'
import PerfilScreen from '../screens/Perfil' 

import { desautenticarUsuario, modificaLoginOKErro, } from '../store/ducks/login'
import * as CONSTANTE from '../util/Constante'

const imgDefault = require('../assets/pessoa-icon.png')

const Stack  = createStackNavigator()
const Tab    = createBottomTabNavigator()
const Drawer = createDrawerNavigator()

const screenOptionStyle = {
  headerStyle: { backgroundColor: "#152d44", shadowColor: 'transparent', shadowOpacity: 0, elevation: 0,  borderWidth: 0, borderBottomColor:'transparent', borderBottomWidth: 0, },
  headerTintColor: '#fff',
  headerTitleStyle: { fontWeight: 'bold', },
  headerBackTitle: "Back",
}

const DrawerOpen = ({ navigation }) => {
  return (
    <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginLeft: 5, width: 50, borderColor: 'red', borderWidth: 0, }} onPress={() => { navigation.openDrawer() }} >
      <Ionicons name="md-menu" size={32} color='#fff' />
    </TouchableOpacity>
  )
}

const DrawerNotic = ({ navigation }) => {
  return (
    <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginLeft: 5, width: 50, borderColor: 'red', borderWidth: 0, }} onPress={() => navigation.navigate('Portfolio')} >
      <Icon name="bell-o" size={25} color="#fff" />
    </TouchableOpacity>
  )
}

const HomeStackNavigator = () => {
  return ( // headerRight: () => <DrawerNotic navigation={navigation} />,
    <Stack.Navigator initialRouteName="Home" screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home"                component={HomeScreen}                options={({ navigation }) => ({ headerStyle: { backgroundColor: '#152d44', elevation: 0, }, title: 'Home', headerLeft: () => <DrawerOpen navigation={navigation} />, })} />
      <Stack.Screen name="ValorizacaoDia"      component={ValorizacaoDiaScreen}      options={({ navigation }) => ({ title: 'Valorização Dia ', })} />
      <Stack.Screen name="OperacoesMes"        component={OperacoesMesScreen}        options={({ navigation }) => ({ title: 'Operações do Mês', })} />
      <Stack.Screen name="OperacoesDetalhe"    component={OperacoesDetalheScreen}    options={({ navigation }) => ({ title: 'Detalhe da Operação', })} />
      <Stack.Screen name="ProventosReceber"    component={ProventosReceberScreen}    options={({ navigation }) => ({ title: 'Proventos a Receber', })} />
      <Stack.Screen name="ProventosDivulgados" component={ProventosDivulgadosScreen} options={({ navigation }) => ({ title: 'Proventos Divulgados', })} />
      <Stack.Screen name="ProventosDetalhe"    component={ProventosDetalheScreen}    options={({ navigation }) => ({ title: 'Detalhe do Provento', })} />
      <Stack.Screen name="FatosRelevantesMes"  component={FatosRelevantesMesScreen}  options={({ navigation }) => ({ title: 'Fatos do Mês', })} />
      <Stack.Screen name="NoticiasDia"         component={NoticiasDiaScreen}         options={({ navigation }) => ({ title: 'Notícias do Dia', })} />
    </Stack.Navigator>
  )
}

const PortfolioStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="PortfolioStack" screenOptions={screenOptionStyle}>
      <Stack.Screen name="PortfolioStack" component={PortfolioScreen} initialParams={{ index: 0 }} options={({ navigation }) => ({ title: 'Portfólio', headerLeft: () => <DrawerOpen navigation={navigation} />, })} />
      <Stack.Screen name="PortfolioAtivo" component={PortfolioAtivoScreen} options={({ navigation }) => ({ title: 'Detalhe do Portfólio', })} />
      <Stack.Screen name="ProventosDetalhe" component={ProventosDetalheScreen} options={({ navigation }) => ({ title: 'Detalhe do Provento', })} />
      <Stack.Screen name="OperacoesDetalhe" component={OperacoesDetalheScreen} options={({ navigation }) => ({ title: 'Detalhe da Operação', })} />
    </Stack.Navigator>
  )
}

const OperacoesStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Operacoes" screenOptions={screenOptionStyle}>
      <Stack.Screen name="Operacoes" component={OperacoesScreen} options={({ navigation }) => ({ title: 'Operações', headerLeft: () => <DrawerOpen navigation={navigation} />, })} />
      <Stack.Screen name="OperacoesDetalhe" component={OperacoesDetalheScreen} options={({ navigation }) => ({ title: 'Detalhe da Operação', })} />
    </Stack.Navigator>
  )
}

const ProventosStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Proventos" screenOptions={screenOptionStyle}>
      <Stack.Screen name="Proventos" component={ProventosScreen} options={({ navigation }) => ({ title: 'Proventos', headerLeft: () => <DrawerOpen navigation={navigation} />, })} />
      <Stack.Screen name="ProventosDetalhe" component={ProventosDetalheScreen} options={({ navigation }) => ({ title: 'Detalhe do Provento', })} />
    </Stack.Navigator>
  )
}

const ApuracoesStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Apuracoes" screenOptions={screenOptionStyle}>
      <Stack.Screen name="Apuracoes"        component={ApuracoesScreen}        options={({ navigation }) => ({ title: 'Apurações', headerLeft: () => <DrawerOpen navigation={navigation} />, })} />
      <Stack.Screen name="ApuracoesDetalhe" component={ApuracoesDetalheScreen} options={({ navigation }) => ({ title: 'Detalhe da Apuração', })} />
    </Stack.Navigator>
  )
}

const PerfilStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Perfil" screenOptions={screenOptionStyle}>
      <Stack.Screen name="Perfil" component={PerfilScreen} options={({ navigation }) => ({ title: 'Perfil', headerLeft: () => <DrawerOpen navigation={navigation} />, })} />
    </Stack.Navigator>
  )
}

const ComentariosStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Comentarios" screenOptions={screenOptionStyle}>
      <Stack.Screen name="Comentarios" component={ComentariosScreen} options={({ navigation }) => ({ title: 'Comentários', headerLeft: () => <DrawerOpen navigation={navigation} />, })} />
    </Stack.Navigator>
  )
}

const DrawdownStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Drawdown" screenOptions={screenOptionStyle}>
      <Stack.Screen name="Drawdown" component={DrawdownScreen} options={({ navigation }) => ({ title: 'Drawdown', headerLeft: () => <DrawerOpen navigation={navigation} />, })} />
    </Stack.Navigator>
  )
}

// tabBarOptions={{ showLabel: true, activeTintColor: '#152d44', activeBackgroundColor : '#ffffff', inactiveTintColor: '#999', inactiveBackgroundColor  : '#ffffff', }}
// tabBarOptions={{ showLabel: true, activeTintColor: '#f5deb3', activeBackgroundColor : '#152d44', inactiveTintColor: '#ffffff', inactiveBackgroundColor  : '#152d44', }}

const HomeTabNavigator = () => {
  return ( 
    <Tab.Navigator initialRouteName="HomeStack" tabBarOptions={{ showLabel: false, activeTintColor: '#f5deb3', activeBackgroundColor : '#152d44', inactiveTintColor: '#ffffff', inactiveBackgroundColor  : '#152d44', }} >
      <Tab.Screen name="HomeStack" component={HomeStackNavigator} options={{ unmountOnBlur: true, tabBarLabel: 'Home', tabBarIcon: ({ focused, color, size }) => (<Ionicons name="ios-home" size={size} color={color} />), }} />
      <Tab.Screen name="Operacoes" component={OperacoesStackNavigator} options={{ unmountOnBlur: true, tabBarLabel: 'Operações', tabBarIcon: ({ focused, color, size }) => (<Ionicons name="ios-book" size={size} color={color} />), }} />
      {/* <Tab.Screen name="Portfolio" component={PortfolioStackNavigator} options={{ unmountOnBlur: true, tabBarLabel: 'Portfólio', tabBarIcon: ({ focused, color, size }) => (<Ionicons name="ios-stats-chart" size={size} color={color} />), }} /> */}
      <Tab.Screen name="Portfolio" component={PortfolioStackNavigator} initialParams={{ index: 0 }}
        options={{
          unmountOnBlur: true, tabBarLabel: '',
        tabBarIcon: ({ focused, color, size }) => 
          <LinearGradient style={{ width: 60, height: 60, borderRadius: 30, marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 0.2, borderColor: '#ffffff', elevation: 6, shadowColor: '#ffcb06', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 5, }} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }} colors={['#152d44', '#1f3b5a', '#2c4970', '#3b5887', '#4c669f']}>
            <Ionicons name="ios-stats-chart" size={size} color={'#ffffff'} />
          </LinearGradient> ,
      }} />
      <Tab.Screen name="Proventos" component={ProventosStackNavigator} options={{ unmountOnBlur: true, tabBarLabel: 'Proventos', tabBarIcon: ({ focused, color, size }) => (<Ionicons name="ios-cash" size={size} color={color} />), }} />
      <Tab.Screen name="Apuracoes" component={ApuracoesStackNavigator} options={{ unmountOnBlur: true, tabBarLabel: 'Apurações', tabBarIcon: ({ focused, color, size }) => (<Ionicons name="calculator" size={size} color={color} />), }} />
    </Tab.Navigator>
  )
}

function CustomDrawerContent( props ) {

  const [src, setSrc] = useState(imgDefault) 

  const loadFallback = () => setSrc(imgDefault)
  
  useEffect(() => {
    async function getDadosInvestidor() {
      setSrc({ uri: CONSTANTE.URL_PADRAO + props.txtFoto, headers: {Pragma: 'force-cache'}, })
    }
    getDadosInvestidor()
  }, [])

  return (
    <DrawerContentScrollView {...props} style={{ flex: 1, }}>
      <View style={{ marginTop: 20, marginLeft: 25, marginBottom: 10, justifyContent: 'center', alignItems: 'flex-start', }}>
        <Image source={src} style={{ width: 75, height: 75, borderRadius: 50, }} onError={ () => loadFallback() }/> 
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, }}>{props.txtNome}</Text>
        <Text style={{ fontSize: 12, }}>{props.txtEmail}</Text>
      </View>
      <DrawerItemList {...props} />      
      <DrawerItem
        label="Sair"
        icon={({ focused, color, size }) => ( <Ionicons name="md-power" size={size} color={focused ? '#ffffff' : '#ccc'} />)}
        onPress={() => { 
          props.modificaLoginOKErro()
          props.desautenticarUsuario()
          props.navigation.closeDrawer()
          // props.navigation.dispatch( CommonActions.navigate({ name: 'Auth' }) )
          props.navigation.dispatch( CommonActions.reset({ index: 0, routes: [{name: 'Auth'}] }) )
        }}
      />
      <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center', }}>
        <Text style={{ fontSize: 12, color: '#000', fontWeight: 'bold' }}>Versão: {Constants.manifest.version}</Text>
      </View>
    </DrawerContentScrollView>
  )
  
}

const mapStateToProps = state => ({ 
  txtNome: state.login.txtNome,
  txtEmail: state.login.txtEmail,
  txtFoto: state.login.txtFoto,
})
 
const mapDispatchToProps = { desautenticarUsuario, modificaLoginOKErro, }

const CustomDrawerContentRedux = connect(mapStateToProps, mapDispatchToProps)(CustomDrawerContent)

const HomeDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawerContentRedux {...props} />} // CustomDrawerContent // CustomDrawerContentRedux
      drawerContentOptions={{ activeBackgroundColor: '#5cbbff', activeTintColor: '#ffffff', itemStyle: { marginLeft: 0, paddingLeft: 10, borderBottomEndRadius: 25,  borderTopEndRadius: 25, }, }}
    >
      <Drawer.Screen name="Home" component={HomeTabNavigator} options={{ unmountOnBlur: true, title: 'Home', drawerIcon: ({focused, size}) => ( <Ionicons name={focused ? 'md-home-outline' : 'md-home'} size={size} color={focused ? '#ffffff' : '#ccc'} />), }}/>
      {/* <Drawer.Screen name="IRPF" component={IRScreen} /> */}
      {/* <Drawer.Screen name="FatosRelevantes" component={FatosRelevantesScreen} /> */}
      {/* <Drawer.Screen name="Noticias" component={NoticiasScreen} /> */}
      {/* <Drawer.Screen name="CalendarioProv" component={CalendarioProvScreen} /> */}
      <Drawer.Screen name="Comentarios" component={ComentariosStackNavigator} options={{ unmountOnBlur: true, title: 'Comentários', drawerIcon: ({focused, size}) => ( <Ionicons name={focused ? 'md-chatbox-ellipses-outline' : 'md-chatbox-ellipses'} size={size} color={focused ? '#ffffff' : '#ccc'} />), }}/>
      <Drawer.Screen name="Drawdown"   component={DrawdownStackNavigator}     options={{ unmountOnBlur: true, title: 'Drawdown',    drawerIcon: ({focused, size}) => ( <Ionicons name={focused ? 'md-calculator-outline' : 'md-calculator'} size={size} color={focused ? '#ffffff' : '#ccc'} />), }}/>
      <Drawer.Screen name="Perfil"     component={PerfilStackNavigator}       options={{ unmountOnBlur: true, title: 'Perfil',      drawerIcon: ({focused, size}) => ( <Ionicons name={focused ? 'md-person-outline' : 'md-person'} size={size} color={focused ? '#ffffff' : '#ccc'} />), }}/>
    </Drawer.Navigator>
  )
}

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="UserLogin" >
      <Stack.Screen name="UserLogin" component={UserLoginScreen}         options={{headerShown: false, gesturesEnabled: false, }}/>
      <Stack.Screen name="UserCad"   component={UserCadastroScreen}      options={{headerShown: false, gesturesEnabled: false, }}/>
      <Stack.Screen name="UserSenha" component={UserEsqueceuSenhaScreen} options={{headerShown: false, gesturesEnabled: false, }}/>
    </Stack.Navigator>
  )
}

export const MainStackNavigator = () => {
  return (
    // Splash // BemVindo // Auth // Home
    <Stack.Navigator initialRouteName="Splash"> 
      <Stack.Screen name="Splash"     component={SplashScreen} options={{headerShown: false}} />
      <Stack.Screen name="BemVindo"   component={BemVindoScreen} options={{headerShown: false}} />
      <Stack.Screen name="UserCad"    component={UserCadastroScreen} options={{headerShown: false, gestureEnabled: false, }} />
      <Stack.Screen name="Auth"       component={AuthStackNavigator} options={{headerShown: false, gestureEnabled: false, }} />
      <Stack.Screen name="Home"       component={HomeDrawerNavigator} options={{headerShown: false, gesturesEnabled: false, }} />
    </Stack.Navigator>
  )
}

// export const AppNavigatorMiddleware = createReactNavigationReduxMiddleware("root", state => state.nav, )
// export const AppNavigatorMiddleware = createReactNavigationReduxMiddleware( state => state.nav, )

//const App2 = reduxifyNavigator(MainStackNavigator, "root")
// const App2 = createReduxContainer(MainStackNavigator)
// const mapStateToProps = (state) => ({ state: state.nav, })
// export const AppWithNavigationState = connect(mapStateToProps)(App2)

// export default MainStackNavigator
