
import React from 'react'
import { Text, Image, Animated, SafeAreaView, LogBox, } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { connect } from 'react-redux'
import { CommonActions,  } from '@react-navigation/native'
// import * as SplashScreen from 'expo-splash-screen'

import * as CONSTANTE from '../util/Constante'
import { modificaLoginOKErro, autenticarUsuario, } from '../store/ducks/login'

LogBox.ignoreLogs(['Warning: ...'])
LogBox.ignoreLogs(['Animated: `useNativeDriver`'])
LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified.'])
LogBox.ignoreAllLogs(true)

const imgDefault = require('../assets/iconeB.png')

class Splash extends React.Component {
  
    constructor(props){
        super(props)  
        this.state = { appIsReady: false, LogoAnime:  new Animated.Value(0), LogoText: new Animated.Value(0), isLoadindSpinner: false, }
    }

    async componentDidMount() {
        // try { await SplashScreen.preventAutoHideAsync() } catch (e) { }
        this._CarregarDados()
        const { LogoAnime, LogoText } = this.state
        Animated.parallel([
            Animated.spring(LogoAnime, { toValue: 1, tension: 10, friction: 2, duration: 1000, }).start(), 
            Animated.timing(LogoText, { toValue: 1, duration: 1200, useNativeDriver: true, }), 
        ]).start(() => { 
            this.setState({ isLoadindSpinner: true })
        })
    }

    async componentDidUpdate(prevState, prevProps) {        
        // if (this.props.isLoginOK)   this.props.navigation.navigate('Home')
        // if (this.props.isLoginErro) this.props.navigation.navigate('Auth')        
        // if (this.props.isLoginOK)   this.props.navigation.dispatch(CommonActions.navigate({name: 'Home'})) 
        // if (this.props.isLoginErro) this.props.navigation.dispatch(CommonActions.navigate({name: 'Auth'}))
        if (this.props.isLoginOK) {
            // SplashScreen.hideAsync();
            this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'Home' }] }))
            this.props.modificaLoginOKErro() 
        }
        if (this.props.isLoginErro) {
            // SplashScreen.hideAsync();
            this.props.navigation.dispatch(CommonActions.reset({index: 0, routes: [{name: 'Auth'}]}))
            this.props.modificaLoginOKErro() 
        }
    }

    _CarregarDados = async () => { 
        let isUser = await AsyncStorage.getItem(CONSTANTE.SESSAO_USER)
        if (isUser != 'S') {
            setTimeout(() => {
                // SplashScreen.hideAsync()
                this.props.navigation.navigate('BemVindo')
            }, 500)
        } else{
            let txtEmail = await AsyncStorage.getItem(CONSTANTE.SESSAO_USER_EMAIL)
            let txtSenha = await AsyncStorage.getItem(CONSTANTE.SESSAO_USER_SENHA)
            let txtLembrar = true
            let isSplashScreem = true
            if (txtEmail && txtSenha) {
                this.props.autenticarUsuario(txtEmail, txtSenha, txtLembrar, isSplashScreem) 
            } else { 
                setTimeout(() => {
                    // SplashScreen.hideAsync()
                    this.props.navigation.navigate('Auth')
                }, 500)
            }
        }
    }

    render() {
        // if (!this.state.appIsReady)
        //     return null;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#152d44', alignItems: 'center', justifyContent: 'center', }}>
                <Animated.View style={{ opacity: this.state.LogoAnime, top: this.state.LogoAnime.interpolate({ inputRange: [0,1], outputRange: [80,0] }) }}>
                    <Image source={imgDefault} style={{ width: 80, height: 80, marginBottom: 30, }}/> 
                </Animated.View>
                <Animated.View style={{ opacity: this.state.LogoText, }}>
                    <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: 35, fontStyle: 'italic',  }}>TamoNaBolsa</Text>
                </Animated.View>
                <Text style={{ color: '#fff', fontSize: 13, textAlign: 'center', position: 'absolute', bottom: 0, marginBottom: 50, }}>Desenvolvido por <Text style={{ fontWeight: 'bold', }}>Chris MarSil</Text></Text>
            </SafeAreaView>
        )
    }

}
const mapStateToProps = state => ({
    txtEmail: state.login.txtEmail,
    txtSenha: state.login.txtSenha,
    txtErroLogin: state.login.txtErroLogin,
    isLoginOK: state.login.isLoginOK,
    isLoginErro: state.login.isLoginErro,
})

const mapDispatchToProps = { modificaLoginOKErro, autenticarUsuario, }

export default connect(mapStateToProps, mapDispatchToProps)(Splash)