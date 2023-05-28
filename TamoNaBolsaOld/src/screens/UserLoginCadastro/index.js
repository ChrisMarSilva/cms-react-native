import React from 'react';
import { ActivityIndicator, AsyncStorage, Keyboard, KeyboardAvoidingView, StyleSheet, View, TextInput, Text, Image, TouchableOpacity, Alert, } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import logoImg from '../../imgs/logo.png';
import * as HelperLog from '../../util/HelperLog';
import { modificaMsgCadastro, modificaNome,  modificaEmail,  modificaSenha, modificaSenhaConf, cadastrarUsuario, } from '../../actions/AuthActions';

class UserLoginCadastro extends React.Component {
  
    constructor(props){
        super(props);  
        this.state = {};

        // HelperLog.entrada('UserLoginCadastro.constructor');
        try { 
        }catch(err) {
            // HelperLog.erro('UserLoginCadastro.constructor', err.message);
        }finally {
            // HelperLog.saida('UserLoginCadastro.constructor');
        }
    }

    componentWillMount() {  
        // HelperLog.entrada('UserLoginCadastro.componentWillMount');
        try {
        }catch(err) {
            // HelperLog.erro('UserLoginCadastro.componentWillMount', err.message);
        }finally {
            // HelperLog.saida('UserLoginCadastro.componentWillMount');
        }
    }

    componentDidMount() {
        // HelperLog.entrada('UserLoginCadastro.componentDidMount');
        try {
        }catch(err) {
            // HelperLog.erro('UserLoginCadastro.componentDidMount', err.message);
        }finally {
            // HelperLog.saida('UserLoginCadastro.componentDidMount');
        }
    }

    componentWillUnmount() {
        // HelperLog.entrada('UserLoginCadastro.componentWillUnmount');
        try {
        }catch(err) {
            // HelperLog.erro('UserLoginCadastro.componentWillUnmount', err.message);
        }finally {
            // HelperLog.saida('UserLoginCadastro.componentWillUnmount');
        }
    }

    _onPressEsqueceuSenha=()=>{ 
        this.props.modificaMsgCadastro();
        this.props.navigation.navigate('UserEsqSenha');
    }

    _onPressLogin=()=>{ 
        this.props.modificaMsgCadastro();
        this.props.navigation.navigate('UserLogin');
    }

    _onPressCriaConta=()=>{ 
        const { txtNome, txtEmail, txtSenha, txtSenhaConf } = this.props;
        this.props.cadastrarUsuario(txtNome, txtEmail, txtSenha, txtSenhaConf);
    }

    render() {

        // HelperLog.entrada('UserLoginCadastro.render');

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

                    <Text style={styles.TxtTitulo}>Cadastre-se usando seu E-mail</Text>

                        <TextInput 
                            style={styles.Input} 
                            ref='TextInputNome'
                            editable={true}
                            autoFocus = {false}
                            placeholder="Nome Completo" 
                            autoCapitalize={'none'} 
                            underlineColorAndroid='transparent'
                            returnKeyType = {"next"}
                            value={this.props.txtNome}
                            onChangeText={ (texto) => { this.props.modificaNome(texto); } }
                            onSubmitEditing={(event) => { this.refs.TextInputEmail.focus(); }}
                        />
                        
                        <TextInput 
                            style={styles.Input} 
                            ref='TextInputEmail'
                            editable={true}
                            autoFocus = {false}
                            placeholder="E-mail" 
                            autoCapitalize={'none'} 
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
                            returnKeyType={'next'} 
                            underlineColorAndroid='transparent'
                            secureTextEntry
                            value={this.props.txtSenha}
                            onChangeText={ (texto) => { this.props.modificaSenha(texto); } }
                            onSubmitEditing={(event) => { this.refs.TextInputSenhaConf.focus(); }}
                        />

                        <TextInput 
                            style={styles.Input} 
                            ref='TextInputSenhaConf'
                            autoFocus = {false}
                            editable={true}
                            placeholder="Confirme a Senha" 
                            autoCorrect={false} 
                            autoCapitalize={'none'} 
                            returnKeyType={'done'} 
                            underlineColorAndroid='transparent'
                            secureTextEntry
                            value={this.props.txtSenhaConf}
                            onChangeText={ (texto) => { this.props.modificaSenhaConf(texto); } }
                            onSubmitEditing={(event) => { Keyboard.dismiss; this._onPressCriaConta();  }}
                            onEndEditing={ () => { Keyboard.dismiss; }}
                        />
                        
                        { this.props.txtSucessoCadastro != '' ?  <Text style={{ color: '#09b700', fontSize: 14, marginBottom: 10, }}> {this.props.txtSucessoCadastro}</Text> : null }

                        { this.props.txtErroCadastro != '' ?  <Text style={{ color: '#ff0000', fontSize: 14, marginBottom: 10, }}> {this.props.txtErroCadastro}</Text> : null }

                    {
                        this.props.isLoadingCadastro
                        ? 
                            <ActivityIndicator color='#009688' size='large' style={styles.ActivityIndicatorStyle} /> 
                        : 
                            <TouchableOpacity style={styles.InputBtnLogin} activeOpacity={0.7} onPress={ ()=>{ Keyboard.dismiss; this._onPressCriaConta(); }} >
                                <Text style={styles.InputBtnLoginTexto}>CRIAR</Text>
                            </TouchableOpacity>
                    }

                </KeyboardAvoidingView>     
                

                <View style={styles.ContainerBtn}>
                    <Text style={styles.TxtBtnNovaConta} onPress={ ()=>{ this._onPressEsqueceuSenha(); }} >Esqueceu a Senha?</Text>
                    <Text style={styles.TxtBtnEsqueceuSenha} onPress={ ()=>{ this._onPressLogin(); }}>Voltar para Login</Text>
                </View>

        </View>
        );

    }

}

const mapStateToProps = state => ({
    txtNome            : state.AuthReducer.txtNome,
    txtEmail           : state.AuthReducer.txtEmail,
    txtSenha           : state.AuthReducer.txtSenha,
    txtSenhaConf       : state.AuthReducer.txtSenhaConf,
    txtErroCadastro    : state.AuthReducer.txtErroCadastro,
    txtSucessoCadastro : state.AuthReducer.txtSucessoCadastro,
    isLoadingCadastro  : state.AuthReducer.isLoadingCadastro,
});

const mapDispatchToProps = {  modificaNome, modificaEmail,  modificaSenha,  modificaSenhaConf,  cadastrarUsuario, modificaMsgCadastro, };

export default connect(mapStateToProps, mapDispatchToProps)(UserLoginCadastro);
