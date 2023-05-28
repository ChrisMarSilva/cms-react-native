import React, { useState, useEffect, useRef, } from 'react'
import { View, Text, TouchableOpacity, TextInput, Dimensions, Keyboard, Alert, ActivityIndicator, } from 'react-native'
import { FontAwesome, Feather, } from '@expo/vector-icons'
import Modal from 'react-native-modal'
import * as Device from 'expo-device'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { connect } from 'react-redux'
import { colors } from '../styles'
import * as CONSTANTE from '../util/Constante'
import { modificaUrl, } from '../store/ducks/config'
import { modificaCodigo, } from '../store/ducks/login'
import { fecharVenda, } from '../store/ducks/pedido'
import { modificaAcessoUsuario, modificaAcessoSenha, modificaAcessoMsg, modificaAcessoOKErro, verificaAcessoLiberaLimite, } from '../store/ducks/pedidoacesso'

const deviceWidth  = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const HomeModaAcessoELimite = (props) => {

    const isVisible = props.isModalVisible
    if (!isVisible) return null
    
    const refInputCodigo = useRef(null)
    const refInputSenha  = useRef(null)

    const [secureTextEntry, setSecureTextEntry] = useState(true)

    useEffect(() => {
        // console.log('HomeModaAcessoELimite.Entrar')
        _LimparDados()
        _CarregarDados()
        refInputCodigo.current.focus()
        return () => {
            //console.log('HomeModaAcessoELimite.Sair')
            _LimparDados()
        }
    }, [])

    useEffect(() => {
        if (props.txtAcessoMsgErro != '') { 
            Alert.alert("", props.txtAcessoMsgErro, [{text: "OK"}], {cancelable: true, onDismiss: () => props.modificaAcessoMsg('') })
            props.modificaAcessoMsg('')
        }
    }, [props.txtAcessoMsgErro])
    
    useEffect(() => {
        if (props.isAcessoOK) {
            props.modificaAcessoOKErro()
            const autorizador = ""
            _onPressFecharPedido(autorizador)
            // _LimparDados()
        }
    }, [props.isAcessoOK])
    
    useEffect(() => {
        if (props.isAcessoEspecialOK) {
            const autorizador = props.txtAcessoUsuario.toString().trim().padStart(6, '0')
            props.modificaAcessoOKErro()
            _onPressFecharPedido(autorizador)
            // _LimparDados()
        }
    }, [props.isAcessoEspecialOK])

    const _LimparDados = async () => {
        props.modificaAcessoUsuario('')
        props.modificaAcessoSenha('')
    }

    const _GetUrlPadrao = async () => {
        let url = props.txtURL
        if ( url == '') {
            url = await AsyncStorage.getItem(CONSTANTE.SESSAO_URL)
            props.modificaUrl(url)
        }
        return url
    }

    const _GetCodigoGarcom = async () => {
        let codigo = props.txtCodigo
        if (codigo == '') {
            codigo = await AsyncStorage.getItem(CONSTANTE.SESSAO_USER_CODIGO) || ''
            props.modificaCodigo(codigo) 
        }
        return codigo
    }

    const _GetCodigoUsuario = async () => {
        let usuario = await AsyncStorage.getItem(CONSTANTE.SESSAO_USER_LIBERADOR) || ''
        if (usuario.toString().trim() != '') {
            usuario = usuario.toString().trim().padStart(6, '0')
            props.modificaAcessoUsuario(usuario)
            refInputSenha.current.focus()
            return 
        }
        refInputCodigo.current.focus()
    }

    const _CarregarDados = async () => {
        _GetUrlPadrao()
        _GetCodigoGarcom()
        _GetCodigoUsuario()
    }

    const selectAllText = (e) => {
        // e.target.select()
        refInputCodigo.current.select()
    }

    const _onPressConfirmar = async () => {

        let   usuario = props.txtAcessoUsuario.toString().trim()
        const senha   = props.txtAcessoSenha.toString().trim() 
        const form    = props.txtPedidoVerificaAcessoForm.toString().trim() 
        const recurso = props.txtPedidoVerificaAcessoRecurso.toString().trim() 
        const cartao  = props.txtPedidoVerificaAcessoCartao

        let celular = "SEM-APP"
        try {
            celular = Device.deviceName.toString().trim()
        } catch (error) {
            celular = "ERRO"
        }
        
        if (usuario != '') {
            usuario = usuario.toString().trim().padStart(6, '0')
            props.modificaAcessoUsuario(usuario)
        }

        if( refInputCodigo.current.isFocused() ){
            if ( usuario != '' && senha == '' ) {
                refInputSenha.current.focus()
                return false
            }
        }

        if (usuario == '') {
            Alert.alert("", "Usuário não informado!")
            refInputCodigo.current.focus()
            return false
        }

        if (senha == '') {
            Alert.alert("", "Senha não informada!")
            refInputSenha.current.focus()
            return false
        }

        const url = await _GetUrlPadrao()
        props.verificaAcessoLiberaLimite(url, usuario, senha, form, recurso, cartao, celular)
        Keyboard.dismiss()
    }

    const _onPressFecharPedido = async ( autorizador = "" ) => {
        Keyboard.dismiss()
        const url    = await _GetUrlPadrao()
        const garcom = await _GetCodigoGarcom() 
        const moca   = props.txtPedidoMoca.toString().trim() == '...' ? '' : props.txtPedidoMoca.toString().trim()
        let celular  = "SEM-APP"
        try {
            celular = Device.deviceName.toString().trim()
        } catch (error) {
            celular = "ERRO"
        }
        const cartoes  = props.listaPedidoCartao.length <= 0 ? [] : props.listaPedidoCartao.map((item) => parseInt(item.codigo))
        const produtos = props.listaPedidoProduto.length <= 0 ? [] : props.listaPedidoProduto.map((item) => ({'codigo': item.codigo.toString(), 'quantidade': parseInt(item.quant), 'observacao': item.observacao.toString().trim().substring(0, 80) }))
        props.fecharVenda(url, garcom, moca, autorizador, celular, cartoes, produtos)
        _onFecharTela()
    }

    const _onPressCancelar = async () => {
        _onFecharTela()
    }

    const _onFecharTela = async () => {
        Keyboard.dismiss()
        _LimparDados()
        props.setModalVisible(false)
    }

    return(
        <Modal style={{ justifyContent: 'flex-start', paddingTop: 10, }} isVisible={isVisible} useNativeDriver avoidKeyboard={true} deviceWidth={deviceWidth} deviceHeight={deviceHeight} animationInTiming={200} animationOutTiming={200} backdropTransitionInTiming={200} backdropTransitionOutTiming={200} onBackButtonPress={() => _onPressCancelar()}>
            <View style={{ padding: 15, borderRadius: 20, borderColor: colors.preto, backgroundColor: colors.branco, }}>

                <View style={{ paddingTop: 15, paddingLeft: 15, paddingRight: 10, }}>
                    <Text style={{ color: colors.default, fontSize: 18, }}>{props.txtPedidoVerificaAcessoMessage}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 20, }}>
                    <View style={{ paddingLeft: 20, }}>
                        <Text style={{ color: colors.default, fontSize: 18, fontWeight: 'bold', marginBottom: 10, }}>Usuário</Text>
                        <TextInput ref={refInputCodigo} placeholder="..." placeholderTextColor={colors.cinza_escuro} maxLength={6} style={{ width: 250, color: colors.default, borderWidth: 1, borderColor: colors.cinza_escuro, borderRadius: 15, height: 50, textAlign: 'center', fontSize: 30, fontWeight: 'bold', }} autoCapitalize="none" keyboardType='numeric' autoFocus={true} removeClippedSubviews={true} onClick={selectAllText} selectTextOnFocus={true} autoCorrect={false} underlineColorAndroid='transparent' returnKeyType={'next'} value={props.txtAcessoUsuario} onChangeText={value => {props.modificaAcessoUsuario(value); props.modificaAcessoSenha("");}} onSubmitEditing={(event) => refInputSenha.current.focus()} blurOnSubmit={false} />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10, }}>
                    <View style={{ paddingLeft: 20, }}>
                        <Text style={{ color: colors.default, fontSize: 18, fontWeight: 'bold', marginBottom: 10, }}>Senha</Text>
                        <TextInput ref={refInputSenha} placeholder="..." placeholderTextColor={colors.cinza_escuro} style={{ width: 250, color: colors.default, borderWidth: 1, borderColor: colors.cinza_escuro, borderRadius: 15, height: 50, textAlign: 'center', fontSize: 30, fontWeight: 'bold', }} autoCapitalize="none" keyboardType='numeric' autoFocus={false} autoCorrect={false} secureTextEntry={secureTextEntry ? true : false} underlineColorAndroid='transparent' returnKeyType={'done'} enablesReturnKeyAutomatically={true} value={props.txtAcessoSenha} onChangeText={value => props.modificaAcessoSenha(value)} onSubmitEditing={_onPressConfirmar} onEndEditing={props.clearFocus} />
                    </View>
                    <View style={{ justifyContent: 'flex-end', marginLeft: 10, }}>
                        <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)} style={{ paddingBottom: 10, }}>
                            {secureTextEntry ? <Feather  name="eye-off" color="grey" size={30} /> : <Feather  name="eye" color="grey" size={30} /> }
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', height: 70, marginTop: 40, marginBottom: 10 }}>
                    <View style={{ flex: 1, alignItems: 'flex-start',  }}>    
                        <TouchableOpacity onPress={() => _onPressCancelar()} disabled={props.isAcessoLoading} style={{ height: 70, width: 70, shadowColor: colors.preto, shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.32, shadowRadius: 5.46, elevation: 10, backgroundColor: colors.branco, borderRadius: 50, justifyContent: 'center', alignItems: 'center', }}>
                            <FontAwesome name="reply-all" size={35} color={colors.preto_claro} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end',}}>
                        <TouchableOpacity onPress={() => _onPressConfirmar()} disabled={props.isAcessoLoading} style={{ marginRight: 10, height: 70, width: 70, shadowColor: colors.preto, shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.32, shadowRadius: 5.46, elevation: 10, backgroundColor: colors.branco, borderRadius: 50, justifyContent: 'center', alignItems: 'center', }}>
                            {props.isAcessoLoading ? <ActivityIndicator color={colors.preto_claro} size='large' /> : <FontAwesome name="check" size={60} color={colors.successo} /> }
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </Modal>
    )
}

const mapStateToProps = state => ({

    // config
    txtURL: state.config.txtURL,

    // login
    txtCodigo: state.login.txtCodigo,

    // Pedido
    txtPedidoMoca: state.pedido.txtPedidoMoca,
    listaPedidoCartao: state.pedido.listaPedidoCartao,
    listaPedidoProduto: state.pedido.listaPedidoProduto,
    txtPedidoVerificaAcessoMessage: state.pedido.txtPedidoVerificaAcessoMessage,
    txtPedidoVerificaAcessoCartao: state.pedido.txtPedidoVerificaAcessoCartao,
    txtPedidoVerificaAcessoSaldo: state.pedido.txtPedidoVerificaAcessoSaldo,
    txtPedidoVerificaAcessoForm: state.pedido.txtPedidoVerificaAcessoForm,
    txtPedidoVerificaAcessoRecurso: state.pedido.txtPedidoVerificaAcessoRecurso,
    
    // Pedido - Verifica Acesso
    txtAcessoUsuario: state.pedidoacesso.txtAcessoUsuario,
    txtAcessoSenha: state.pedidoacesso.txtAcessoSenha,
    isAcessoOK: state.pedidoacesso.isAcessoOK,
    isAcessoEspecialOK: state.pedidoacesso.isAcessoEspecialOK,
    txtAcessoMsgErro: state.pedidoacesso.txtAcessoMsgErro,
    isAcessoLoading: state.pedidoacesso.isAcessoLoading,

})

const mapDispatchToProps = {

    // Config
    modificaUrl,

    // Login
    modificaCodigo,

    // Pedido
    fecharVenda,

    // Pedido - Verifica Acesso
    modificaAcessoUsuario, 
    modificaAcessoSenha,
    modificaAcessoMsg, 
    modificaAcessoOKErro, 
    verificaAcessoLiberaLimite,

}

export default connect(mapStateToProps, mapDispatchToProps)(HomeModaAcessoELimite)
