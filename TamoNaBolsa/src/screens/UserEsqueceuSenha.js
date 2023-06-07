
import * as React from 'react'
import { SafeAreaView, Keyboard, Text, View, TextInput, Image, TouchableOpacity, ActivityIndicator, } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'

import * as HelperToast from '../util/HelperToast'
import { resetarSenhaUsuario, modificaEmail, modificaMsgLogin, modificaMsgResetSenha, } from '../store/ducks/login'

const imgDefault = require('../assets/iconeB.png')

class UserEsqueceuSenha extends React.Component {

  constructor(props){
    super(props); 
    this.state = { secureTextEntry: true, }
  }

  componentDidMount() {
    // this._CarregarDados()
  }

  componentDidUpdate(prevState, prevProps) {
    if (this.props.txtSucessoResetSenha != '') { 
      HelperToast.displayMsgSuccess(text = this.props.txtSucessoResetSenha)
      this.props.modificaMsgResetSenha('')
      this.props.modificaMsgLogin('')
    }
    if (this.props.txtErroResetSenha != '') { 
      HelperToast.displayMsgError(text = this.props.txtErroResetSenha)
      this.props.modificaMsgResetSenha('')
      this.props.modificaMsgLogin('')
    }
  }

  _CarregarDados = async () => { 
    
  }
 
  _onPressResetarSenha = () => { 
    const { txtEmail, txtSenha } = this.props
    this.props.resetarSenhaUsuario(txtEmail)
  }

  _onPressLogin = () => { 
    this.props.modificaMsgLogin('')
    this.props.navigation.navigate('UserLogin')
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#152d44', }}>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 20, }}>
          <Image source={imgDefault} style={{ width: 100, height: 100, }}/> 
        </View>

        <View style={{ flex: 3, padding: 10, backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingHorizontal: 20, paddingVertical: 30, }}>

          <Text style={{ color: '#152d44', fontSize: 15, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, }}>Esqueceu a Senha?</Text>
          
          <Text style={{ fontSize: 12, color:'#6E7B8B', alignItems: 'center', marginBottom: 10, }}>Digite seu e-mail cadastrado e nós lhe enviaremos instruções sobre como resetar sua senha.</Text>

          <Text style={{ color: '#152d44', fontSize: 18, fontWeight: 'bold', }}>E-mail</Text>

          <View style={{ flexDirection: 'row', marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#f2f2f2', paddingBottom: 5, }}>
            <FontAwesome name="envelope-o" color={'gray'} size={20} style={{ marginBottom: 8, }}/>
            <TextInput
              ref='TextInputEmail'
              placeholder="Seu e-mail..."
              placeholderTextColor="#666666"
              style={{ flex: 1, marginTop: -12, paddingLeft: 10, color: '#05375a',  }}
              autoCapitalize="none"
              autoFocus = {false}
              keyboardType='email-address'
              autoCorrect={false} 
              underlineColorAndroid='transparent'
              returnKeyType = {"next"}
              value={this.props.txtEmail}
              onChangeText={value => this.props.modificaEmail(value) }
              onSubmitEditing={Keyboard.dismiss}
              onEndEditing={this.clearFocus}
            />
          </View>
          
          <View style={{ alignItems: 'center', marginTop: 30, }}>
            <TouchableOpacity style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }} onPress={() => { Keyboard.dismiss(); this._onPressResetarSenha(); }} >
              <LinearGradient colors={['#152d44', '#1f3b5a', '#2c4970', '#3b5887', '#4c669f']} style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }} >
                { this.props.isLoadingResetSenha ? <ActivityIndicator color='#fff' size='small' style={{}} />  : <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>RESETAR SENHA</Text> }
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { this._onPressLogin() }} style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10, borderColor: '#1f3b5a', borderWidth: 1.5, marginTop: 15 }} >
              <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#1f3b5a' }}>Voltar para o Login</Text>
            </TouchableOpacity>
          </View>

        </View>
          
      </SafeAreaView>
    )
  }

}

const mapStateToProps = state => ({
  txtEmail: state.login.txtEmail,
  txtErroResetSenha: state.login.txtErroResetSenha,
  txtSucessoResetSenha: state.login.txtSucessoResetSenha,
  isLoadingResetSenha: state.login.isLoadingResetSenha,
})

const mapDispatchToProps = { resetarSenhaUsuario, modificaEmail, modificaMsgLogin, modificaMsgResetSenha, }

export default connect(mapStateToProps, mapDispatchToProps)(UserEsqueceuSenha)
