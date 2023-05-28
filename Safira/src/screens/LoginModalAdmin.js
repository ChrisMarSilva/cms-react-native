import React, { useState, useEffect, useRef, } from 'react'
import { View, Text, TouchableOpacity, TextInput, Dimensions, Keyboard, Alert, } from 'react-native'
import { FontAwesome, Feather, } from '@expo/vector-icons'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import { colors } from '../styles'
import * as CONSTANTE from '../util/Constante'

const deviceWidth  = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const LoginModalAdmin = (props) => {

    const isVisible = props.isModalVisible
    if (!isVisible) return null
    
    const refInputSenha = useRef(null)
    const [txtSenha, setTxtSenha] = useState('')
    const [secureTextEntry, setSecureTextEntry] = useState(true)

    useEffect(() => {
        // console.log('LoginModalAdmin.Entrar')
        _LimparDados()
        refInputSenha.current.focus()
        return () => {
            //console.log('LoginModalAdmin.Sair')
            _LimparDados()
        }
    }, [])

    const _LimparDados = async () => {
        setTxtSenha('')
    }

    const _onPressConfirmar = async () => {
        if ((txtSenha != CONSTANTE.SENHA_ADMIN_SAFIRA) && (txtSenha != CONSTANTE.SENHA_ADMIN_MOBILE)){
            Alert.alert("", 'Senha Inválida!')
            return false
        }
        props.navigation.navigate('Config')
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

                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10, }}>
                    <View style={{ }}>
                        <Text style={{ color: colors.default, fontSize: 18, fontWeight: 'bold', marginBottom: 10, }}>Informe a senha do Admin</Text>
                        <TextInput ref={refInputSenha} placeholder="..." placeholderTextColor={colors.cinza_escuro} maxLength={50} style={{ width: 250, color: colors.default, borderWidth: 1, borderColor: colors.cinza_escuro, borderRadius: 15, height: 50, textAlign: 'center', fontSize: 30, fontWeight: 'bold', }} autoCapitalize="none" autoFocus={true} autoCorrect={false} secureTextEntry={secureTextEntry ? true : false} underlineColorAndroid='transparent' returnKeyType={'done'} value={txtSenha} onChangeText={value => setTxtSenha(value)} onSubmitEditing={_onPressConfirmar} onEndEditing={props.clearFocus} />
                    </View>
                    <View style={{ justifyContent: 'flex-end', marginLeft: 10, }}>
                        <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)} style={{ paddingBottom: 10, }}>
                            {secureTextEntry ? <Feather  name="eye-off" color="grey" size={30} /> : <Feather  name="eye" color="grey" size={30} /> }
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', height: 70, marginTop: 20, marginBottom: 10 }}>
                    <View style={{ flex: 1, alignItems: 'flex-start',  }}>    
                        <TouchableOpacity onPress={() => _onPressCancelar()} style={{ height: 70, width: 70, shadowColor: colors.preto, shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.32, shadowRadius: 5.46, elevation: 10, backgroundColor: colors.branco, borderRadius: 50, justifyContent: 'center', alignItems: 'center', }}>
                            <FontAwesome name="reply-all" size={35} color={colors.preto_claro} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end',}}>
                        <TouchableOpacity onPress={() => _onPressConfirmar()} style={{ marginRight: 10, height: 70, width: 70, shadowColor: colors.preto, shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.32, shadowRadius: 5.46, elevation: 10, backgroundColor: colors.branco, borderRadius: 50, justifyContent: 'center', alignItems: 'center', }}>
                            <FontAwesome name="check" size={60} color={colors.successo} />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </Modal>
    )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModalAdmin)
