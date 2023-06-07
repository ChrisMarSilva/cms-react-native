
import * as React from 'react'
import { SafeAreaView, Keyboard, Text, View, TextInput, Image, TouchableOpacity, ActivityIndicator, } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CommonActions, } from '@react-navigation/native'
import { connect } from 'react-redux'

import * as CONSTANTE from '../util/Constante'
import * as HelperToast from '../util/HelperToast'
import { autenticarUsuario, modificaEmail, modificaSenha, modificaMsgLogin, modificaLoginOKErro, } from '../store/ducks/login'

const imgDefault = require('../assets/iconeB.png')

class UserLogin extends React.Component {

  constructor(props){
    super(props); 
    this.state = { secureTextEntry: true, }
  }

  componentDidMount() {
    this._CarregarDados()
  }

  componentDidUpdate(prevState, prevProps) {
    if (this.props.isLoginOK) { 
      // this.props.navigation.navigate('Home')
      // this.props.navigation.dispatch(CommonActions.navigate({ name: 'Home' }))
      this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'Home' }] }))
      this.props.modificaLoginOKErro() 
    }
    if (this.props.txtErroLogin != '') { 
      HelperToast.displayMsgError(text = this.props.txtErroLogin)
      this.props.modificaMsgLogin('')
    }
  }

  _CarregarDados = async () => { 
    this.props.modificaLoginOKErro() 
    let txtEmail = await AsyncStorage.getItem(CONSTANTE.SESSAO_USER_EMAIL)
    let txtSenha = await AsyncStorage.getItem(CONSTANTE.SESSAO_USER_SENHA)
    let txtLembrar = true
    if (txtEmail) this.props.modificaEmail(txtEmail)  
    if ( txtSenha ) this.props.modificaSenha(txtSenha)
    // if ( txtEmail && txtSenha ) this.props.autenticarUsuario(txtEmail, txtSenha, txtLembrar)
  }
 
  _onPressLogin = () => { 
    const { txtEmail, txtSenha } = this.props
    let txtLembrar = true
    this.props.autenticarUsuario(txtEmail, txtSenha, txtLembrar)
  }

  _onPressNovaConta = () => { 
    this.props.modificaLoginOKErro()
    this.props.modificaMsgLogin('')
    this.props.navigation.navigate('UserCad')
  }

  _onPressEsqueceuSenha = () => { 
    this.props.modificaLoginOKErro()
    this.props.modificaMsgLogin('')
    this.props.navigation.navigate('UserSenha')
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#152d44', }}>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 20, }}>
          <Image source={imgDefault} style={{ width: 100, height: 100, }}/> 
        </View>

        <View style={{ flex: 3, padding: 10, backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingHorizontal: 20, paddingVertical: 30, }}>

          <Text style={{ color: '#152d44', fontSize: 18, fontWeight: 'bold', }}>E-mail</Text>

          <View style={{ flexDirection: 'row', marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#f2f2f2', paddingBottom: 5, }}>
            <FontAwesome name="envelope-o" color={'gray'} size={20} style={{ marginBottom: 8, }}/>
            <TextInput
              ref='TextInputEmail'
              placeholder="Seu e-mail..."
              placeholderTextColor="#666666"
              style={{ flex: 1, marginTop: -12, paddingLeft: 10, color: '#05375a', }}
              autoCapitalize="none"
              autoFocus = {false}
              keyboardType='email-address'
              autoCorrect={false} 
              underlineColorAndroid='transparent'
              returnKeyType = {"next"}
              value={this.props.txtEmail}
              onChangeText={value => this.props.modificaEmail(value) }
              onSubmitEditing={(event) => { this.refs.TextInputSenha.focus() }}
            />
          </View>

          <Text style={{ color: '#152d44', fontSize: 18, fontWeight: 'bold', marginTop: 35 }}>Senha</Text>

          <View style={{ flexDirection: 'row', marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#f2f2f2', paddingBottom: 5 }}>
            <Feather name="lock" color={'gray'} size={20} style={{ marginBottom: 8, }}/>
            <TextInput
              ref='TextInputSenha'
              placeholder="Sua senha..."
              placeholderTextColor="#666666"
              autoFocus={false}
              autoCorrect={false} 
              secureTextEntry={this.state.secureTextEntry ? true : false}
              style={{ flex: 1, marginTop: -12, paddingLeft: 10, color: '#05375a', }}
              autoCapitalize="none"
              returnKeyType={'done'} 
              underlineColorAndroid='transparent'
              enablesReturnKeyAutomatically={true}
              value={this.props.txtSenha}
              onChangeText={value => this.props.modificaSenha(value) }
              onSubmitEditing={Keyboard.dismiss}
              onEndEditing={this.clearFocus}
            />
            <TouchableOpacity onPress={ () => this.setState({ secureTextEntry: !this.state.secureTextEntry }) } >
              {this.state.secureTextEntry ? <Feather  name="eye-off" color="grey" size={20} /> : <Feather  name="eye" color="grey" size={20} /> }
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={ ()=>{ this._onPressEsqueceuSenha(); }}>
            <Text style={{color: '#2196F3', marginTop: 15, }}>Esqueceu a Senha?</Text>
          </TouchableOpacity>
          
          <View style={{ alignItems: 'center', marginTop: 40, }}>
            <TouchableOpacity style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }} onPress={() => { Keyboard.dismiss(); this._onPressLogin(); }} >
              <LinearGradient colors={['#152d44', '#1f3b5a', '#2c4970', '#3b5887', '#4c669f']} style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }} >
                { this.props.isLoadingLogin ?  <ActivityIndicator color='#fff' size='small' style={{}} />  : <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>LOGIN</Text> }
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { this._onPressNovaConta() }} style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10, borderColor: '#1f3b5a', borderWidth: 1.5, marginTop: 15 }} >
              <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#1f3b5a' }}>Criar Conta</Text>
            </TouchableOpacity>
          </View>

        </View>
          
      </SafeAreaView>

      // <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', }}>

      //   <View style={{ justifyContent: 'center', marginBottom: 20,}}>
      //     <Image source={require('../assets/logo.png')} style={{ width: 80, height: 80, }}/> 
      //   </View>  
        
      //   <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', }} behavior="padding" enabled >
          
      //     <TextInput
      //       ref='TextInputEmail'
      //       style={{ width: '90%',padding: 5, marginBottom: 10, height: 40, borderWidth: 1, color: '#222', borderColor: '#2196F3', borderRadius: 7, backgroundColor : "#fff", textAlign: 'center', fontSize: 17,}}
      //       editable={true}
      //       autoFocus = {false}
      //       autoCorrect={false} 
      //       keyboardType='email-address'
      //       placeholder="E-mail" 
      //       autoCapitalize={'sentences'} 
      //       underlineColorAndroid='transparent'
      //       returnKeyType = {"next"}
      //       value={this.props.txtEmail}
      //       onChangeText={value => this.props.modificaEmail(value) }
      //       onSubmitEditing={(event) => { this.refs.TextInputSenha.focus(); }}
      //     />

      //     <TextInput
      //       ref='TextInputSenha'
      //       style={{ width: '90%', padding: 5, marginBottom: 10, height: 40, borderWidth: 1, color: '#222', borderColor: '#2196F3', borderRadius: 7, backgroundColor : "#fff", textAlign: 'center', fontSize: 17,}}
      //       autoFocus = {false}
      //       editable={true}
      //       autoCorrect={false} 
      //       placeholder="Senha" 
      //       autoCapitalize={'none'} 
      //       returnKeyType={'done'} 
      //       underlineColorAndroid='transparent'
      //       secureTextEntry={true}
      //       enablesReturnKeyAutomatically={true}
      //       value={this.props.txtSenha}
      //       onChangeText={value => this.props.modificaSenha(value) }
      //       onSubmitEditing={Keyboard.dismiss}
      //       onEndEditing={this.clearFocus}
      //     />
                      
      //     <TouchableOpacity style={{ width: '90%', paddingTop:10, paddingBottom: 10, borderRadius:5, marginTop:10, marginBottom:10, backgroundColor: '#2196F3' }} activeOpacity={0.7} onPress={ ()=>{ Keyboard.dismiss(); this._onPressLogin(); }} >
      //       { this.props.isLoadingLogin ?  <ActivityIndicator color='#fff' size='small' style={{}} />  : <Text style={{ color:'#fff', textAlign:'center', }}>LOGIN</Text> }
      //     </TouchableOpacity> 
          
      //   </View>

      //   <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, }}>
      //       <Text style={{ fontWeight: 'bold', fontSize: 15, color:'#6C7B8B', textAlign: "left", }} onPress={ ()=>{ this._onPressNovaConta(); }} >Criar Conta</Text>
      //       <Text style={{ fontWeight: 'bold', fontSize: 15, color:'#6E7B8B', textAlign: "right", }} onPress={ ()=>{ this._onPressEsqueceuSenha(); }}>Esqueceu a Senha?</Text>
      //   </View>

      //   <Text style={{ position: 'absolute', bottom: 0, textAlign: "center", fontSize: 12, color: '#000', }}>Versão: {Constants.manifest.version}</Text>
        
      // </KeyboardAvoidingView>
    )
  }

}

const mapStateToProps = state => ({
  txtEmail: state.login.txtEmail,
  txtSenha: state.login.txtSenha,
  txtLembrar: state.login.txtLembrar,
  txtErroLogin: state.login.txtErroLogin,
  isLoadingLogin: state.login.isLoadingLogin,
  isLoginOK: state.login.isLoginOK,
})

const mapDispatchToProps = { autenticarUsuario, modificaEmail, modificaSenha, modificaMsgLogin, modificaLoginOKErro, }

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin)
