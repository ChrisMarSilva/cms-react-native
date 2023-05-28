import React, { Component } from 'react';
import { Text, View, AsyncStorage, ImageBackground } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import bgSrc from '../../imgs/fundo05.png';
import * as CONSTANTE from '../../util/Constante';
import * as HelperLog from '../../util/HelperLog';
import { modificaEmail, modificaSenha, autenticarUsuario,  } from '../../actions/AuthActions';

class Splash extends Component {
  
    constructor(props){
        super(props);  
        this.state = {};

        // HelperLog.entrada('Splash.constructor');
        try {
        }catch(err) {
            // HelperLog.erro('Splash.constructor', err.message);
        }finally {
            // HelperLog.saida('Splash.constructor');
        }
    }

    componentWillMount() {  
        // HelperLog.entrada('Splash.componentWillMount');
        try {

            setTimeout(()=>{ this._definirRota(); }, 1500);

        }catch(err) {
            // HelperLog.erro('Splash.componentWillMount', err.message);
        }finally {
            // HelperLog.saida('Splash.componentWillMount');
        }
    }

    componentDidMount() {
        // HelperLog.entrada('Splash.componentDidMount');
        try {

        }catch(err) {
            // HelperLog.erro('Splash.componentDidMount', err.message);
        }finally {
            // HelperLog.saida('Splash.componentDidMount');
        }
    }

    componentWillUnmount() {
        // HelperLog.entrada('Splash.componentWillUnmount');
        try {
        }catch(err) {
            // HelperLog.erro('Splash.componentWillUnmount', err.message);
        }finally {
            // HelperLog.saida('Splash.componentWillUnmount');
        }
    }

    _definirRota = async () => {
        // HelperLog.entrada('Splash._definirRota');
        try {

            // const txtLembrar = await AsyncStorage.getItem(CONSTANTE.SESSAO_USER_TOKEN);
            // this.props.navigation.navigate(txtLembrar ? 'Home' : 'Auth');

            //const txtLembrar = await AsyncStorage.getItem(CONSTANTE.SESSAO_USER_LEMBRAR);
            // if ( txtLembrar == "S" ) {
            //     const txtEmail = await AsyncStorage.getItem(CONSTANTE.SESSAO_USER_EMAIL);
            //     if ( txtEmail ) this.props.modificaEmail(txtEmail);    
            //     const txtSenha = await AsyncStorage.getItem(CONSTANTE.SESSAO_USER_SENHA);
            //     if ( txtSenha ) this.props.modificaSenha(txtSenha);   
            //     if ( txtEmail && txtSenha ) this.props.autenticarUsuario({ txtEmail, txtSenha, txtLembrar });
            // }else{
            //     this.props.navigation.navigate('Auth');
            // }

            this.props.navigation.navigate('Auth');

        }catch(err) {
            // HelperLog.erro('Splash._definirRota', err.message);
        }finally {
            // HelperLog.saida('Splash._definirRota');
        }
    }

    render() {

        // HelperLog.entrada('Splash.render');

        return (
            <View style={styles.MainContainer}>
                <ImageBackground style={styles.LogoContainer} source={bgSrc}>
                    <View style={styles.TextoLogoContainer}>
                        <Text style={styles.TextoLogoPrinc}><Text>&lt;</Text><Text style={styles.TextoLogoPreto}></Text><Text style={styles.TextoLogoVerde}>T</Text>amo<Text style={styles.TextoLogoVerde}>N</Text>a<Text style={styles.TextoLogoVerde}>B</Text>olsa<Text>/&gt;</Text></Text>
                    </View>              
                    <View style={styles.TextooDesenvContainer}>
                        <Text style={styles.TextoDesenvTitulo}>Desenvolvido por <Text style={styles.TextoDesenvNome}>Chris MarSil</Text></Text>
                    </View>
                </ImageBackground>
            </View>
        );

    }

}

const mapStateToProps = state => ({
    txtEmail : state.AuthReducer.txtEmail,
    txtSenha : state.AuthReducer.txtSenha,
});

const mapDispatchToProps = { modificaEmail, modificaSenha, autenticarUsuario, };

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
