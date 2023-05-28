import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator, createDrawerNavigator, } from 'react-navigation';
import { reduxifyNavigator, createReactNavigationReduxMiddleware, createNavigationReducer, } from 'react-navigation-redux-helpers';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import AppNavigatorDrawerHeader    from './AppNavigatorDrawerHeader.js';
import DrawerOpen                  from './DrawerOpen.js';

import SplashScreen                from '../screens/Splash';
import UserLoginScreen             from '../screens/UserLogin';
import UserLoginCadastroScreen     from '../screens/UserLoginCadastro';
import UserLoginSenhaScreen        from '../screens/UserLoginSenha';
import HomeScreen                  from '../screens/Home';
import HomeFatosMensalScreen       from '../screens/HomeFatosMensal';
import HomeValorizDiaScreen        from '../screens/HomeValorizDia';
import HomeOperacMensalScreen      from '../screens/HomeOperacMensal';
import HomeProventDivulgadoScreen  from '../screens/HomeProventDivulgado';
import HomeProventReceberScreen    from '../screens/HomeProventReceber';
import PDFScreen                   from '../screens/PDF';
import OperacoesScreen             from '../screens/Operacoes';
import ProventosScreen             from '../screens/Proventos';
import ApuracaoScreen              from '../screens/Apuracao';
import PortfolioScreen             from '../screens/Portfolio';
import PortfolioDetalheScreen      from '../screens/PortfolioDetalhe';

const RootAuthStack = createStackNavigator(
  { 
    UserLogin    : { screen: UserLoginScreen,        },
    UserEsqSenha : { screen: UserLoginSenhaScreen,   },
    UserCadastro : { screen: UserLoginCadastroScreen,},
  },
  {
    navigationOptions: {header: null, }
  }
);

const HomeStack = createStackNavigator(
  {
    Home                 : { screen: HomeScreen,                 navigationOptions: { title: 'Home', headerLeft: <DrawerOpen />    } },
    HomeValorizDia       : { 
      screen: HomeValorizDiaScreen,       
      navigationOptions: { 
          title: 'Valorização do Dia',
          headerStyle: { backgroundColor: '#353535', shadowColor: 'transparent', shadowOpacity: 0, elevation: 0,  borderWidth: 0, borderBottomColor:'transparent', borderBottomWidth: 0, },
      } 
    },
    HomeOperacMensal     : { 
      screen: HomeOperacMensalScreen,     
      navigationOptions: { 
        title: 'Operações no Mês',
        headerStyle: { backgroundColor: '#353535', shadowColor: 'transparent', shadowOpacity: 0, elevation: 0,  borderWidth: 0, borderBottomColor:'transparent', borderBottomWidth: 0, },
      } 
    },
    HomeProventDivulgado : { screen: HomeProventDivulgadoScreen, navigationOptions: { title: 'Proventos Divulgados' } },
    HomeProventReceber   : { screen: HomeProventReceberScreen,   navigationOptions: { title: 'Proventos a Receber' } },
    HomeFatosMensal      : { screen: HomeFatosMensalScreen,      navigationOptions: { title: 'Fatos Relevantes' } },
    HomePDF              : { screen: PDFScreen,                  navigationOptions: { title: 'Fatos Relevantes - PDF ' } },
  },
  {
    navigationOptions: {
      headerStyle: { backgroundColor: '#353535', shadowColor: 'transparent',  },
      headerTintColor: '#fff',
      headerTitleStyle: { fontSize: 16, color: '#fff', fontWeight: 'bold', flex:1,  },
    }
  }
);

const PortfolioStack = createStackNavigator(
  {
    Portfolio        : { screen: PortfolioScreen, navigationOptions:{ title: 'Portfólio', headerLeft: <DrawerOpen /> } },
    PortfolioDetalhe : { 
      screen: PortfolioDetalheScreen,
      navigationOptions: {
        headerStyle: { backgroundColor: '#353535', shadowColor: 'transparent', shadowOpacity: 0, elevation: 0, borderWidth: 0, borderBottomColor:'transparent', borderBottomWidth: 0, },
        headerTintColor: '#fff',
        headerTitleStyle: { fontSize: 16, color: '#fff', fontWeight: 'bold', flex: 1, borderColor: 'blue', },
      }
    },
  },
  {
    navigationOptions: {
      headerStyle: { backgroundColor: '#353535', shadowColor: 'transparent',  },
      headerTintColor: '#fff',
      headerTitleStyle: { fontSize: 16, color: '#fff', fontWeight: 'bold', flex:1,  },
    }
  }
);

const OperacoesStack = createStackNavigator(
  {
    Operacoes: { screen: OperacoesScreen, navigationOptions:{ title: 'Operações', headerLeft: <DrawerOpen /> } },
  },
  {
    navigationOptions: {
      headerStyle: { backgroundColor: '#353535', shadowColor: 'transparent',  },
      headerTintColor: '#fff',
      headerTitleStyle: { fontSize: 16, color: '#fff', fontWeight: 'bold', flex:1,  },
    }
  }
);

const ProventosStack = createStackNavigator(
  {
    Proventos: { screen: ProventosScreen, navigationOptions:{ title: 'Proventos', headerLeft: <DrawerOpen /> } },
  },
  {
    navigationOptions: {
      headerStyle: { backgroundColor: '#353535', shadowColor: 'transparent',  },
      headerTintColor: '#fff',
      headerTitleStyle: { fontSize: 16, color: '#fff', fontWeight: 'bold',  flex:1,  },
    }
  }
);

const ApuracaoStack = createStackNavigator(
  {
    Apuracao: { screen: ApuracaoScreen, navigationOptions:{ title: 'Apuração', headerLeft: <DrawerOpen /> } },
  },
  {
    navigationOptions: {
      headerStyle: { backgroundColor: '#353535', shadowColor: 'transparent', shadowOpacity: 0, elevation: 0,  borderWidth: 0, borderBottomColor:'transparent', borderBottomWidth: 0, },
      headerTintColor: '#fff',
      headerTitleStyle: { fontSize: 16, color: '#fff', fontWeight: 'bold', flex: 1, borderColor: 'blue', },
    }
  }
);

const RootHomeTab = createBottomTabNavigator(
  {
    Home      : { screen: HomeStack,       navigationOptions: { title: 'Home'      } },
    Portfolio : { screen: PortfolioStack,  navigationOptions: { title: 'Portfólio' } },
    Operacoes : { screen: OperacoesStack,  navigationOptions: { title: 'Operações' } },
    Proventos : { screen: ProventosStack,  navigationOptions: { title: 'Proventos' } },
    Apuracao  : { screen: ApuracaoStack,   navigationOptions: { title: 'Apuração'  } },
  },
  {
    navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if        (routeName == 'Home'     ) { iconName = `ios-home${focused? '' : ''}`;
            } else if (routeName == 'Portfolio') { iconName = `ios-stats${focused       ? '' : ''}`;
            } else if (routeName == 'Operacoes') { iconName = `ios-book${focused        ? '' : ''}`;
            } else if (routeName == 'Proventos') { iconName = `ios-cash${focused        ? '' : ''}`;
            } else if (routeName == 'Apuracao' ) { iconName = `ios-calculator${focused  ? '' : ''}`; 
            }
            //console.log('routeName: '+ routeName+' iconName: '+ iconName); 
            return <Ionicons name={iconName} size={25} color={tintColor} />;
        },
    }),
    tabBarOptions: { activeTintColor: '#4086ff', inactiveTintColor: '#4c4c4c', activeBackgroundColor :'#E8EAF6', },
  }
);

const HomeDrawer = createDrawerNavigator(
  {
    Home: RootHomeTab,
  },
  {
    initialRouteName : 'Home',
    drawerPosition   : 'left',
    contentComponent : AppNavigatorDrawerHeader,
    contentOptions   : { activeTintColor: '#4086ff', inactiveTintColor :'#4c4c4c', activeBackgroundColor :'#E8EAF6', },
    drawerOpenRoute  : 'DrawerOpen',
    drawerCloseRoute : 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
  }
);

export const AppNavigator = createSwitchNavigator(
  {
    Auth  : RootAuthStack,
    Home  : HomeDrawer, 
    Splash: SplashScreen,
  },
  {
    initialRouteName: 'Auth',
  }
);

export const AppNavigatorMiddleware = createReactNavigationReduxMiddleware( "root", state => state.nav );

const App2 = reduxifyNavigator(AppNavigator, "root");

const mapStateToProps = (state) => ({ state: state.nav });

export const AppWithNavigationState = connect(mapStateToProps)(App2);
