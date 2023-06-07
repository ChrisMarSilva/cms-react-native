
import * as React from 'react'
import { SafeAreaView, Keyboard, Text, View, TextInput, Image, TouchableOpacity, ActivityIndicator, } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import { connect } from 'react-redux'

import * as HelperToast from '../util/HelperToast'
import { modificaMsgCadastro, modificaMsgLogin, cadastrarUsuario, modificaNome, modificaEmail, modificaSenha, modificaSenhaConf, } from '../store/ducks/login'

const imgDefault = require('../assets/iconeB.png')

class UserCadastro extends React.Component {

  constructor(props){
    super(props); 
    this.state = { secureTextEntry: true, }
  }

  componentDidUpdate(prevState, prevProps) {
    if (this.props.txtSucessoCadastro != '') { 
      HelperToast.displayMsgSuccess(text = this.props.txtSucessoCadastro)
      this.props.modificaMsgCadastro('')
      this.props.modificaMsgLogin('')
    }
    if (this.props.txtErroCadastro != '') { 
      HelperToast.displayMsgError(text = this.props.txtErroCadastro)
      this.props.modificaMsgCadastro('')
      this.props.modificaMsgLogin('')
    }
  }
  _onPressCriaConta = () => { 
      const { txtNome, txtEmail, txtSenha, txtSenhaConf } = this.props;
      this.props.cadastrarUsuario(txtNome, txtEmail, txtSenha, txtSenhaConf);
  }

  _onPressLogin = () => { 
    this.props.navigation.navigate('UserLogin')
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#152d44', }}>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 20, }}>
          <Image source={imgDefault} style={{ width: 100, height: 100, }}/> 
        </View>

        <View style={{ flex: 3, padding: 10, backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingHorizontal: 20, paddingVertical: 30, }}>

          <Text style={{ color: '#152d44', fontSize: 15, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, }}>Cadastre-se usando o seu E-mail</Text>

          <Text style={{ color: '#152d44', fontSize: 18, fontWeight: 'bold', }}>Nome</Text>

          <View style={{ flexDirection: 'row', marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#f2f2f2', paddingBottom: 5, }}>
            <FontAwesome name="user-o" color={'gray'} size={20} style={{ marginBottom: 8, }}/>
            <TextInput
              ref='TextInputNome'
              placeholder="Seu Nome..."
              placeholderTextColor="#666666"
              style={{ flex: 1, marginTop: -12, paddingLeft: 10, color: '#05375a', }}
              autoCapitalize="none"
              autoFocus = {false}
              keyboardType='default'
              autoCorrect={false} 
              underlineColorAndroid='transparent'
              returnKeyType={"next"}
              value={this.props.txtNome}
              onChangeText={value => this.props.modificaNome(value) }
              onSubmitEditing={(event) => { this.refs.TextInputEmail.focus() }}
            />
          </View>

          <Text style={{ color: '#152d44', fontSize: 18, fontWeight: 'bold', marginTop: 15, }}>E-mail</Text>

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

          <Text style={{ color: '#152d44', fontSize: 18, fontWeight: 'bold', marginTop: 15, }}>Senha</Text>

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
          
          <View style={{ alignItems: 'center', marginTop: 30, }}>
            <TouchableOpacity style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }} onPress={() => { Keyboard.dismiss(); this._onPressCriaConta(); }} >
              <LinearGradient colors={['#152d44', '#1f3b5a', '#2c4970', '#3b5887', '#4c669f']} style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }} >
                { this.props.isLoadingCadastro ?  <ActivityIndicator color='#fff' size='small' style={{}} />  : <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>CRIAR</Text> }
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
  txtNome: state.login.txtNome,
  txtEmail: state.login.txtEmail,
  txtSenha: state.login.txtSenha,
  txtSenhaConf: state.login.txtSenhaConf,
  txtErroCadastro: state.login.txtErroCadastro,
  txtSucessoCadastro: state.login.txtSucessoCadastro,
  isLoadingCadastro: state.login.isLoadingCadastro,
})

const mapDispatchToProps = { modificaMsgCadastro, modificaMsgLogin, cadastrarUsuario, modificaNome,  modificaEmail,  modificaSenha, modificaSenhaConf, }

export default connect(mapStateToProps, mapDispatchToProps)(UserCadastro)
