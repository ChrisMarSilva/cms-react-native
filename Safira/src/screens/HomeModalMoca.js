import React, { useState, useEffect, useRef, } from 'react'
import { View, Text, TouchableOpacity, TextInput, Dimensions, Keyboard, Alert, } from 'react-native'
import { FontAwesome, } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import { colors } from '../styles'
import * as CONSTANTE from '../util/Constante'
import { modificaUrl, } from '../store/ducks/config'
import { buscaListaMoca, } from '../store/ducks/moca'
import { modificaPedidoMoca, } from '../store/ducks/pedido'

const deviceWidth  = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const HomeModalMoca = (props) => {

    const isVisible = props.isModalVisible
    if (!isVisible) return null
    
    const refInputMoca = useRef(null)
    
    const [txtCodigo, setTxtCodigo] = useState('')
    const [txtNome,   setTxtNome]   = useState('...')

    useEffect(() => {
        // console.log('HomeModalMoca.Entrar')
        _LimparDados()
        _CarregarDados()
        refInputMoca.current.focus()
        //setTimeout(function () { refInputMoca.current.focus(); }, 500)

        return () => {
            //console.log('HomeModalMoca.Sair')
            _LimparDados()
        }
    }, [])

    const _GetUrlPadrao = async () => {
        let url = props.txtURL
        if ( url == '') {
            url = await AsyncStorage.getItem(CONSTANTE.SESSAO_URL)
            props.modificaUrl(url)
        }
        return url
    }

    const _CarregarDados = async () => {
        const codigo = props.txtPedidoMoca
        if ((codigo != '') && (codigo != '...')) {
            setTxtCodigo(codigo)
            _LocalizarMoca(codigo)
        }
        refInputMoca.current.focus()
        const url = await _GetUrlPadrao()
        if (url) props.buscaListaMoca(url)
    }

    const _LimparDados = async () => {
        setTxtCodigo('')
        setTxtNome('...')
    }

    const _onPressConfirmar = async () => {
        let codigo = txtCodigo.toString().trim()
        if (codigo != '') {
            codigo = codigo.padStart(6, '0')
            const mocas = props.listaMocaFull.filter((item) => item.codigo.toString().trim() == codigo)
            if (mocas == null || mocas.length <= 0) {
                Alert.alert("", 'Moça não localizada!')
                refInputMoca.current.focus()
                return false
            }
            const moca = mocas[0]
            if (moca.situacao != 'A') {
                Alert.alert("", 'Moça inativa!')
                refInputMoca.current.focus()
                return false
            }
            Keyboard.dismiss()
            _LocalizarMoca(codigo)
            props.modificaPedidoMoca(moca.codigo)
            props.setModalVisible(false)
        } else {
            Keyboard.dismiss()
            _LimparDados()
            props.modificaPedidoMoca('...')
            props.setModalVisible(false)
        }
    }

    const _onPressCancelar = async () => {
        _LimparDados()
        props.setModalVisible(false)
        Keyboard.dismiss()
    }

    const _LocalizarMoca = async (codigo) => {
        setTxtCodigo(codigo)
        setTxtNome('...')
        if ((codigo == '') || (codigo == '...')) {
            return false
        }
        codigo = codigo.padStart(6, '0')
        const mocas = props.listaMocaFull.filter((item) => item.codigo.toString().trim() == codigo)
        if (mocas == null || mocas.length <= 0) {
            setTxtNome('Moça não localizada!')
            refInputMoca.current.focus()
            return false
        }
        const moca = mocas[0]
        if (moca.situacao != 'A') {
            setTxtNome('Moça inativa!')
            refInputMoca.current.focus()
            return false
        }
        setTxtNome(moca.codigo + '   ' + moca.guerra)
        //setTxtNome(moca.guerra)
    }

    const _onPressPesquisar = async () => {
        props.setModalVisible(false)
        props.navigation.navigate('HomePesquisaMoca')
    }

    return(
        <Modal style={{ justifyContent: 'flex-start', paddingTop: 10, }} isVisible={isVisible} useNativeDriver avoidKeyboard={true} deviceWidth={deviceWidth} deviceHeight={deviceHeight} animationInTiming={200} animationOutTiming={200} backdropTransitionInTiming={200} backdropTransitionOutTiming={200} onBackButtonPress={() => _onPressCancelar()}>
            <View style={{ padding: 20, borderRadius: 15, borderColor: colors.preto, backgroundColor: colors.branco, }} >

                <View style={{ marginTop: 20, flexDirection: 'row', }}>
                    <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ color: colors.default, fontSize: 18, fontWeight: 'bold', marginBottom: 10, }}>Informe o código da Moça</Text>
                        <TextInput 
                            ref={refInputMoca} 
                            placeholder="..." 
                            placeholderTextColor={colors.cinza_escuro} 
                            maxLength={6} style={{ width: 250, color: colors.default, borderWidth: 1, borderColor: colors.cinza_escuro, borderRadius: 15, height: 50, textAlign: 'center', fontSize: 30, fontWeight: 'bold', }} 
                            autoCapitalize="none" 
                            keyboardType='numeric' 
                            autoFocus={true} 
                            autoCorrect={false} 
                            underlineColorAndroid='transparent' 
                            returnKeyType={'done'} 
                            value={txtCodigo} 
                            onChangeText={value => _LocalizarMoca(value)} 
                            onSubmitEditing={_onPressConfirmar} 
                            onEndEditing={props.clearFocus} 
                        />
                    </View>    
                </View>

                {
                    txtNome != '' &&
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, }}>
                        <Text numberOfLines={1} style={[{ fontSize: 18, color: colors.default, fontWeight: "bold", }, (txtNome == 'Moça inativa!' || txtNome == 'Moça não localizada!') && {color: colors.error,}]}>{txtNome}</Text>
                    </View>
                }

                <View style={{ flexDirection: 'row', height: 70, marginTop: 20, marginBottom: 5, }}>
                    <View style={{ flex: 1, alignItems: 'flex-start',  }}>   
                        <TouchableOpacity onPress={() => _onPressCancelar()} style={{ height: 70, width: 70, shadowColor: colors.preto, shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.32, shadowRadius: 5.46, elevation: 10, backgroundColor: colors.branco, borderRadius: 50, justifyContent: 'center', alignItems: 'center', }}>
                            <FontAwesome name="reply-all" size={35} color={colors.preto_claro} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', }}>
                        <TouchableOpacity onPress={() => _onPressPesquisar()} style={{ height: 70, width: 70, shadowColor: colors.preto, shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.32, shadowRadius: 5.46, elevation: 10, backgroundColor: colors.branco, borderRadius: 50, justifyContent: 'center', alignItems: 'center', }}>
                            <FontAwesome name="search" size={35} color={colors.preto_claro} />
                        </TouchableOpacity> 
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', }}>
                        <TouchableOpacity onPress={() => _onPressConfirmar()} style={{ height: 70, width: 70, shadowColor: colors.preto, shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.32, shadowRadius: 5.46, elevation: 10, backgroundColor: colors.branco, borderRadius: 50, justifyContent: 'center', alignItems: 'center', }}>
                            <FontAwesome name="check" size={60} color={colors.successo} />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </Modal>
    )
}

const mapStateToProps = state => ({
    txtURL: state.config.txtURL,
    txtPedidoMoca: state.pedido.txtPedidoMoca,
    listaMocaFull: state.moca.listaMocaFull,
})

const mapDispatchToProps = {
    modificaUrl,
    modificaPedidoMoca,
    buscaListaMoca,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeModalMoca)
