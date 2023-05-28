import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, Keyboard, KeyboardAvoidingView, AsyncStorage, Switch, } from 'react-native';
import { connect } from 'react-redux';
import { Constants } from 'expo';

import styles from './styles';
import logoImg from '../../imgs/logo.png';
import * as CONSTANTE from '../../util/Constante';
import * as HelperLog from '../../util/HelperLog';
import { modificaMsgLogin, modificaEmail, modificaSenha, modificaLembrar, autenticarUsuario, } from '../../actions/AuthActions';

class UserLogin extends React.Component {
  
    constructor(props){
        super(props);  
        this.state = {};
        // HelperLog.entrada('UserLogin.constructor');
        try {
        }catch(err) {
            // HelperLog.erro('UserLogin.constructor', err.message);
        }finally {
            // HelperLog.saida('UserLogin.constructor');
        }
    }

    componentWillMount() {  
        // HelperLog.entrada('UserLogin.componentWillMount');
        try {
            this._buscarDadosUsuario();
        }catch(err) {
            // HelperLog.erro('UserLogin.componentWillMount', err.message);
        }finally {
            // HelperLog.saida('UserLogin.componentWillMount');
        }
    }

    componentDidMount() {
        // HelperLog.entrada('UserLogin.componentDidMount');
        try {
            //this._buscarDadosUsuario();
        }catch(err) {
            // HelperLog.erro('UserLogin.componentDidMount', err.message);
        }finally {
            // HelperLog.saida('UserLogin.componentDidMount');
        }
    }

    componentWillUnmount() {
        // HelperLog.entrada('UserLogin.componentWillUnmount');
        try {
        }catch(err) {
            // HelperLog.erro('UserLogin.componentWillUnmount', err.message);
        }finally {
            // HelperLog.saida('UserLogin.componentWillUnmount');
        }
    }
    
    _buscarDadosUsuario = async () => {
        // HelperLog.entrada('UserLogin._buscarDadosUsuario');
        try {

            this.props.modificaLembrar(false);  
            
            const txtLembrar = await AsyncStorage.getItem(CONSTANTE.SESSAO_USER_LEMBRAR);
            //HelperLog.texto('UserLogin._buscarDadosUsuario', 'txtLembrar'+ txtLembrar);

            if ( txtLembrar == "S" ) {
                this.props.modificaLembrar(true); 
                const txtEmail = await AsyncStorage.getItem(CONSTANTE.SESSAO_USER_EMAIL);
                if ( txtEmail ) this.props.modificaEmail(txtEmail);    
                const txtSenha = await AsyncStorage.getItem(CONSTANTE.SESSAO_USER_SENHA);
                if ( txtSenha ) this.props.modificaSenha(txtSenha);   
                if ( txtEmail && txtSenha ) this.props.autenticarUsuario(txtEmail, txtSenha, txtLembrar);
            }

        }catch(err) {
            // HelperLog.erro('UserLogin._buscarDadosUsuario', err.message);
        }finally {
            // HelperLog.saida('UserLogin._buscarDadosUsuario');
        }
    }
    
    _onPressLogin=()=>{ 
        const { txtEmail, txtSenha, txtLembrar } = this.props;
        this.props.autenticarUsuario(txtEmail, txtSenha, txtLembrar);
    }

    _onPressNovaConta=()=>{ 
        this.props.modificaMsgLogin('');
        this.props.navigation.navigate('UserCadastro');
    }

    _onPressEsqueceuSenha=()=>{
        this.props.modificaMsgLogin('');
        this.props.txtErroLogin = ''; 
        this.props.navigation.navigate('UserEsqSenha');
    }
    
    _onChangeSwitch=(value)=>{
        console.log('_onChangeSwitch.value: ',value);
    }

    render() {

        // HelperLog.entrada('UserLogin.render');

        return (
            <View style={styles.MainContainer}>
            
                <View style={styles.TextoContainer}>
                    <Image source={logoImg} style={styles.TextoLogoImg} />
                    <Text style={styles.TextoLogoPrinc}>
                        <Text>&lt;</Text>
                        <Text style={styles.TextoLogoPreto}></Text>
                        <Text style={styles.TextoLogoVerde}>T</Text>amo
                        <Text style={styles.TextoLogoVerde}>N</Text>a
                        <Text style={styles.TextoLogoVerde}>B</Text>olsa<Text>/&gt;</Text>
                    </Text>
                </View>  

                <KeyboardAvoidingView behavior="padding" enabled style={styles.InputContainer}>

                        <TextInput 
                            style={styles.Input} 
                            ref='txtDtInicio'
                            editable={true}
                            autoFocus = {false}
                            autoCorrect={true} 
                            keyboardType='email-address'
                            placeholder="E-mail" 
                            autoCapitalize={'sentences'} 
                            underlineColorAndroid='transparent'
                            returnKeyType = {"next"}
                            value={this.props.txtEmail}
                            onChangeText={ (texto) => { this.props.modificaEmail(texto); } }
                            onSubmitEditing={(event) => { this.refs.TextInputSenha.focus(); }}
                        />

                        <TextInput 
                            style={styles.Input} 
                            ref='TextInputSenha'
                            autoFocus = {false}
                            editable={true}
                            placeholder="Senha" 
                            autoCorrect={false} 
                            autoCapitalize={'none'} 
                            returnKeyType={'done'} 
                            underlineColorAndroid='transparent'
                            secureTextEntry={true}
                            enablesReturnKeyAutomatically={true}
                            value={this.props.txtSenha} 
                            onChangeText={ (texto) => { this.props.modificaSenha(texto); } }
                            onSubmitEditing={Keyboard.dismiss}
                            onEndEditing={this.clearFocus}
                        />
                        
                        <View style={styles.LembrarContainer}>
                            <Switch onValueChange={ (value) => this.props.modificaLembrar(value) } value={this.props.txtLembrar} style={{ }} />
                            <Text style={styles.MsgLembrar} >Mantenha-me conectado?</Text>
                        </View>
        
                        { this.props.txtErroLogin != '' ? <Text style={styles.MsgErro}> {this.props.txtErroLogin}</Text> : null }
                    
                        <TouchableOpacity style={styles.InputBtnLogin} activeOpacity={0.7} onPress={ ()=>{ Keyboard.dismiss(); this._onPressLogin(); }} >
                        {
                            this.props.isLoadingLogin
                            ? 
                            <ActivityIndicator color='#fff' size='small' style={styles.ActivityIndicatorStyle} /> 
                            : 
                            <Text style={styles.InputBtnLoginTexto}>LOGIN</Text>
                        }
                    </TouchableOpacity>
                    
                    <View style={styles.ContainerBtn}>
                        <Text style={styles.TxtBtnNovaConta} onPress={ ()=>{ this._onPressNovaConta(); }} >Criar Conta</Text>
                        <Text style={styles.TxtBtnEsqueceuSenha} onPress={ ()=>{ this._onPressEsqueceuSenha(); }}>Esqueceu a Senha?</Text>
                    </View>

                </KeyboardAvoidingView> 

                <Text style={{ textAlign: "center", fontSize: 12, color: '#000', }}>Versão: {Constants.manifest.version}</Text>

        </View>
        );
    }

}

const mapStateToProps = state => ({
    txtEmail       : state.AuthReducer.txtEmail,
    txtSenha       : state.AuthReducer.txtSenha,
    txtLembrar     : state.AuthReducer.txtLembrar,
    txtErroLogin   : state.AuthReducer.txtErroLogin,
    isLoadingLogin : state.AuthReducer.isLoadingLogin,
});

const mapDispatchToProps = { modificaMsgLogin, modificaEmail, modificaSenha, modificaLembrar, autenticarUsuario, };

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
