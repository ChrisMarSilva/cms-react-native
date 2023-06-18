import React, { useState, useEffect, useRef, } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Keyboard, TextInput, Alert, Platform, } from 'react-native'
import { FontAwesome, } from '@expo/vector-icons'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import SuperAlert from "react-native-super-alert";

import { colors } from '../styles'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const HomeModalProdutoObservacao = (props) => {

    const isVisible = props.isModalVisible
    if (!isVisible) return null

    const [txtObservacao, setTxtObservacao] = useState('')
    const refInpuObservacao = useRef(null)

    useEffect(() => {
        // console.log('HomeModalProdutoObservacao.Entrar')
        _LimparDados()
        _CarregarDados()
        refInpuObservacao.current.focus()

        return () => {
            //console.log('HomeModalProdutoObservacao.Sair')
            _LimparDados()
        }
    }, [])

    const _LimparDados = async () => {
        setTxtObservacao('')
    }

    const _CarregarDados = async () => {
        setTxtObservacao(props.txtObservacao)
    }

    const _onPressConfirmar = async () => {

        let lista = props.listaPedidoProduto
        const id = props.txtId.toString().trim()
        const codigo = props.txtCodigo.toString().trim().padStart(4, '0')
        const observacao = txtObservacao.toString().toUpperCase().trim().substring(0, 80)

        lista.forEach(item => {
            if (item.id == id && item.codigo == codigo) {
                item.status = 'inc-pend'
                item.observacao = observacao
                return
            }
        })

        _LimparDados()
        props.setModalVisible(false)
        Keyboard.dismiss()

    }

    const _onPressCancelar = async () => {

        if (txtObservacao == props.txtObservacao) {
            _CancelarAlteracoes()
            return
        }

        // Alert.alert('', 'Deseja cancelar as alterações?',
        //     [
        //         { text: "SIM", onPress: () => _CancelarAlteracoes() },
        //         { text: "NÃO", style: "cancel", }, // onPress: () => _ConfirmarAlteracoes() 
        //     ],
        //     { cancelable: true }
        // );

        alert(
            '',
            'Deseja cancelar as alterações?',
            {
                textConfirm: '     SIM     ',
                textCancel: '     NÃO     ',
                onConfirm: () => _CancelarAlteracoes(),
                // onCancel: () => _ConfirmarAlteracoes(),
            },
        );

    }

    const _CancelarAlteracoes = async () => {
        _LimparDados()
        props.setModalVisible(false)
        Keyboard.dismiss()
    }

    return (
        <Modal style={{ justifyContent: 'flex-start', paddingTop: 10, }} isVisible={isVisible} useNativeDriver avoidKeyboard={true} deviceWidth={deviceWidth} deviceHeight={deviceHeight} animationInTiming={200} animationOutTiming={200} backdropTransitionInTiming={200} backdropTransitionOutTiming={200} onBackButtonPress={() => _onPressCancelar()}>

            <View style={{ padding: 15, borderRadius: 20, borderColor: colors.preto, backgroundColor: colors.branco, }}>

                <View style={{ backgroundColor: colors.branco, flexDirection: "row", justifyContent: 'flex-start', }}>
                    <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: 'bold', color: colors.preto, textAlign: 'center', paddingTop: 4, height: 30, width: 30, backgroundColor: colors.cinza, borderRadius: 5, }}>{props.txtQuantidade}x</Text>
                    <Text numberOfLines={1} style={{ fontSize: 20, fontWeight: 'bold', color: colors.default, marginBottom: 10, marginLeft: 10, }}>{props.txtDescricao}</Text>
                </View>

                <View style={{ marginTop: 5, }}>
                    <Text style={{ color: colors.default, fontSize: 18, fontWeight: 'bold', marginBottom: 10, }}>Observação:</Text>
                    <TextInput
                        ref={refInpuObservacao}
                        placeholder=''
                        placeholderTextColor={colors.cinza_escuro}
                        maxLength={80}
                        multiline={true}
                        //numberOfLines={7}  
                        numberOfLines={Platform.OS === 'ios' ? null : 7}
                        minHeight={Platform.OS === 'ios' ? (20 * 7) : null}
                        textAlignVertical='top'
                        style={{
                            color: colors.default,
                            borderWidth: 1,
                            borderColor: colors.cinza_escuro,
                            borderRadius: 15,
                            fontSize: 20,
                            fontWeight: 'bold',
                            paddingLeft: 15,
                            paddingTop: 10,
                            // minHeight: 40,
                            // maxHeight: 200, 
                        }}
                        autoCapitalize="characters"
                        autoFocus={true}
                        autoCorrect={false}
                        underlineColorAndroid='transparent'
                        returnKeyType={'done'}
                        value={txtObservacao}
                        onChangeText={value => setTxtObservacao(value.toUpperCase())}
                        onEndEditing={props.clearFocus}
                    />
                </View>

                <SuperAlert customStyle={styles.customStyle} />

                <View style={{ flexDirection: 'row', height: 70, marginTop: 20, marginBottom: 10 }}>
                    <View style={{ flex: 1, alignItems: 'flex-start', }}>
                        <TouchableOpacity onPress={() => _onPressCancelar()} style={{ height: 70, width: 70, shadowColor: colors.preto, shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.32, shadowRadius: 5.46, elevation: 10, backgroundColor: colors.branco, borderRadius: 50, justifyContent: 'center', alignItems: 'center', }}>
                            <FontAwesome name="reply-all" size={35} color={colors.preto_claro} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', }}>
                        <TouchableOpacity onPress={() => _onPressConfirmar()} style={{ marginRight: 10, height: 70, width: 70, shadowColor: colors.preto, shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.32, shadowRadius: 5.46, elevation: 10, backgroundColor: colors.branco, borderRadius: 50, justifyContent: 'center', alignItems: 'center', }}>
                            <FontAwesome name="check" size={60} color={colors.successo} />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    customStyle: {
        container: { backgroundColor: '#e8e8e8', borderRadius: 10, },
        message: { color: '#4f4f4f', fontSize: 20, },
        buttonCancel: { backgroundColor: '#c94040', borderRadius: 10, },
        buttonConfirm: { backgroundColor: '#059918', borderRadius: 10, },
        textButtonCancel: { color: '#fff', fontWeight: 'bold', fontSize: 25, },
        textButtonConfirm: { color: '#fff', fontWeight: 'bold', fontSize: 25, },
    },
});

const mapStateToProps = state => ({

    // pedido
    listaPedidoProduto: state.pedido.listaPedidoProduto,

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(HomeModalProdutoObservacao)