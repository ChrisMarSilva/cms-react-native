
import React from 'react';
import { SafeAreaView, View, Image, Text, ScrollView, RefreshControl, TouchableOpacity, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { CommonActions, } from '@react-navigation/native'
import { connect } from 'react-redux'

import * as CONSTANTE from '../util/Constante'
import { desautenticarUsuario, modificaLoginOKErro, } from '../store/ducks/login'

const imgDefault = require('../assets/pessoa-icon.png')

class Perfil extends React.Component { 
  
  constructor(props) {
    super(props)  
    this.state = {
      txtNome: 'Investidor',
      txtEmail: 'N/D',
      txtSrc: imgDefault,
    }
    this._CarregarDados = this._CarregarDados.bind(this)
    this._HandleOnPressItem = this._HandleOnPressItem.bind(this)
  }

  componentDidMount() {
    this._CarregarDados()
  }
  
  _HandleOnPressItem = (codigo) => { 
    // this.props.navigation.navigate('PortfolioAtivo', { codigo: codigo })
  }

  _CarregarDados = async () => { 
    this.setState({
      txtNome: this.props.txtNome,
      txtEmail: this.props.txtEmail,
      txtSrc: {uri: CONSTANTE.URL_PADRAO + this.props.txtFoto, headers: { Pragma: 'only-if-cached' }},
    })
  }

  loadFallback() {
    this.setState({ txtSrc: imgDefault, })
  }

  render() {

    const txtNome = this.state.txtNome || 'Investidor'
    const txtEmail = this.state.txtEmail || 'N/D'
    const txtSrc = this.state.txtSrc

    return (
      <ScrollView style={{ flex: 1, }} refreshControl={<RefreshControl refreshing={false} onRefresh={() => { this._CarregarDados() }}  title="Carregando..."  />} >
        <SafeAreaView style={{ flex: 1, backgroundColor: '#152d44', }}>

          <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 15, marginTop: 15, paddingBottom: 20, }}>
            <Image source={txtSrc} style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: '#fff', marginBottom: 20, }} onError={() => this.loadFallback()} />            
            <Text style={{ fontSize: 20, color: "#fff", marginBottom: 5, fontWeight: "bold", }}>{txtNome}</Text>
            <Text style={{ fontSize: 12, color: "#fff", marginBottom: 10, }}>{txtEmail}</Text>
          </View>

          <View style={{ padding: 10, backgroundColor: '#ECF0F1', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingHorizontal: 10, }}>
            
            <View style={{ alignItems: 'center', marginTop: 40, }}>
              <TouchableOpacity style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                onPress={() => {
                  this.props.modificaLoginOKErro()
                  this.props.desautenticarUsuario()
                  // this.props.navigation.navigate('Auth')
                  // this.props.navigation.dispatch( CommonActions.navigate({ name: 'Auth' }) )
                  this.props.navigation.dispatch( CommonActions.reset({ index: 0, routes: [{name: 'Auth'}] }) )
                }}
              >
                <LinearGradient colors={['#152d44', '#1f3b5a', '#2c4970', '#3b5887', '#4c669f']} style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }} >
                  <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>SAIR</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            
          </View>

        </SafeAreaView>
      </ScrollView>
    )

  }

}
const mapStateToProps = state => ({
  txtNome: state.login.txtNome,
  txtEmail: state.login.txtEmail,
  txtFoto: state.login.txtFoto,
})

const mapDispatchToProps = { desautenticarUsuario, modificaLoginOKErro, }

export default connect(mapStateToProps, mapDispatchToProps)(Perfil)
