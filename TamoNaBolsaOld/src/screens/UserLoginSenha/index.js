import React from 'react';
import { ActivityIndicator, AsyncStorage, Keyboard, KeyboardAvoidingView, StyleSheet, View, TextInput, Text, Image, TouchableOpacity, Alert, } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import logoImg from '../../imgs/logo.png';
import * as HelperLog from '../../util/HelperLog';
import { modificaMsgResetSenha, modificaEmail, resetarSenhaUsuario, } from '../../actions/AuthActions';

class UserLoginSenha extends React.Component {
  
    constructor(props){
        super(props);  
        this.state = {};

        // HelperLog.entrada('UserLoginSenha.constructor');
        try {
        }catch(err) {
            // HelperLog.erro('UserLoginSenha.constructor', err.message);
        }finally {
            // HelperLog.saida('UserLoginSenha.constructor');
        }
    }

    componentWillMount() {  
        // HelperLog.entrada('UserLoginSenha.componentWillMount');
        try {
        }catch(err) {
            // HelperLog.erro('UserLoginSenha.componentWillMount', err.message);
        }finally {
            // HelperLog.saida('UserLoginSenha.componentWillMount');
        }
    }

    componentDidMount() {
        // HelperLog.entrada('UserLoginSenha.componentDidMount');
        try {
        }catch(err) {
            // HelperLog.erro('UserLoginSenha.componentDidMount', err.message);
        }finally {
            // HelperLog.saida('UserLoginSenha.componentDidMount');
        }
    }

    componentWillUnmount() {
        // HelperLog.entrada('UserLoginSenha.componentWillUnmount');
        try {

        }catch(err) {
            // HelperLog.erro('UserLoginSenha.componentWillUnmount', err.message);
        }finally {
            // HelperLog.saida('UserLoginSenha.componentWillUnmount');
        }
    }

    _onPressNovaConta=()=>{ 
        this.props.modificaMsgResetSenha();
        this.props.navigation.navigate('UserCadastro');
    }

    _onPressLogin=()=>{ 
        this.props.modificaMsgResetSenha();
        this.props.navigation.navigate('UserLogin');
    }

    _onPressResetarSenha=()=>{ 
        const { txtEmail } = this.props;
        this.props.resetarSenhaUsuario(txtEmail);
    }

    render() {

        // HelperLog.entrada('UserLoginSenha.render');

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

                <KeyboardAvoidingView style={styles.InputContainer} behavior="padding" enabled>

                        <Text style={styles.TxtTitulo}>Esqueceu a sua Senha?</Text>

                        <Text style={styles.TxtSubTitulo}>Digite seu e-mail cadastrado e nós lhe enviaremos instruções sobre como resetar sua senha.</Text>
                        
                        <TextInput 
                            style={styles.Input} 
                            ref='TextInputEmail'
                            editable={true}
                            autoFocus = {false}
                            placeholder="E-mail" 
                            autoCapitalize={'none'} 
                            underlineColorAndroid='transparent'
                            returnKeyType = {"done"}
                            value={this.props.txtEmail}
                            onChangeText={ (texto) => { Keyboard.dismiss; this.props.modificaEmail(texto); } }
                            onEndEditing={ () => { Keyboard.dismiss; }}
                        />
                        
                        { this.props.txtSucessoResetSenha != '' ?  <Text style={{ color: '#09b700', fontSize: 14, marginBottom: 10, }}> {this.props.txtSucessoResetSenha}</Text> : null }

                        { this.props.txtErroResetSenha != '' ?  <Text style={{ color: '#ff0000', fontSize: 14, marginBottom: 10, }}> {this.props.txtErroResetSenha}</Text> : null }
                    
                        {
                            this.props.isLoadingResetSenha
                            ? 
                                <ActivityIndicator color='#009688' size='large' style={styles.ActivityIndicatorStyle} /> 
                            : 
                                <TouchableOpacity style={styles.InputBtnLogin} activeOpacity={0.7} onPress={ ()=>{ Keyboard.dismiss; this._onPressResetarSenha(); }} >
                                    <Text style={styles.InputBtnLoginTexto}>RESETAR SENHA</Text>
                                </TouchableOpacity>
                        }

                </KeyboardAvoidingView>  

                <View style={styles.ContainerBtn}>
                    <Text style={styles.TxtBtnNovaConta} onPress={ ()=>{ this._onPressNovaConta(); }} >Criar Conta</Text>
                    <Text style={styles.TxtBtnEsqueceuSenha} onPress={ ()=>{ this._onPressLogin(); }}>Voltar para Login</Text>
                </View>

        </View>
        );

    }

}

const mapStateToProps = state => ({
    txtEmail             : state.AuthReducer.txtEmail,
    txtErroResetSenha    : state.AuthReducer.txtErroResetSenha,
    txtSucessoResetSenha : state.AuthReducer.txtSucessoResetSenha,
    isLoadingResetSenha  : state.AuthReducer.isLoadingResetSenha,
});

const mapDispatchToProps = { modificaEmail, resetarSenhaUsuario, modificaMsgResetSenha, };

export default connect(mapStateToProps, mapDispatchToProps)(UserLoginSenha);
