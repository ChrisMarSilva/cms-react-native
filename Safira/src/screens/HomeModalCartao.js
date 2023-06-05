import React, { useState, useEffect, useRef, } from 'react'
import { View, Text, TouchableOpacity, TextInput, Dimensions, FlatList, Keyboard, Alert, ActivityIndicator, } from 'react-native'
import { FontAwesome, } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import { colors } from '../styles'
import * as CONSTANTE from '../util/Constante'
import { modificaUrl, } from '../store/ducks/config'
import { modificaMsgCartao, buscarCartao, modificaCartaoOK, } from '../store/ducks/cartao'
import { modificaPedidoCartao, modificaListaPedidoCartao, } from '../store/ducks/pedido'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const HomeModalCartao = (props) => {

    const isVisible = props.isModalVisible
    if (!isVisible) return null

    const [txtCartao, setTxtCartao] = useState('')
    const refInputCartao = useRef(null)
    const refFlatList = useRef(null)
    const shouldScrollToEndRef = useRef(false);

    useEffect(() => {
        // console.log('HomeModalCartao.Entrar')
        _LimparDados()
        _CarregarDados()
        refInputCartao.current.focus()

        return () => {
            //console.log('HomeModalCartao.Sair')
            _LimparDados()
        }
    }, [])

    useEffect(() => {
        if (props.txtCartaoErro.toString().trim() != '') {
            Alert.alert("", props.txtCartaoErro, [{ text: "OK" }], { cancelable: true, onDismiss: () => props.modificaMsgCartao('') })
            props.modificaMsgCartao('')
        }
    }, [props.txtCartaoErro])

    useEffect(() => {
        if (props.isCartaoOK) {
            const lista = props.listaPedidoCartao
            const item = { 'cartao': txtCartao.toString().trim().padStart(5, '0'), 'codigo': props.txtCartaoCodigo.toString().trim(), 'status': 'inc-pend' }
            lista.push(item)  // push-ultimo // unshift-primeiro
            props.modificaListaPedidoCartao(lista)
            props.modificaCartaoOK()
            _LimparDados()
            refInputCartao.current.focus()
        }
    }, [props.isCartaoOK])

    useEffect(() => {
        if (shouldScrollToEndRef.current && props.listaPedidoCartao.length > 0) {
            refFlatList.current.scrollToEnd({ animated: false });
            shouldScrollToEndRef.current = false;
        }
    }, [props.listaPedidoCartao]);

    const _GetUrlPadrao = async () => {
        let url = props.txtURL
        if (url == '') {
            url = await AsyncStorage.getItem(CONSTANTE.SESSAO_URL)
            props.modificaUrl(url)
        }
        return url
    }

    const _CarregarDados = async () => {
        _GetUrlPadrao()
    }

    const _LimparDados = async () => {
        setTxtCartao('')
    }

    const _onPressConfirmar = async () => {

        let lista = props.listaPedidoCartao

        if (txtCartao.toString().trim() == '') {
            _ConfirmarAlteracoes()
            return
        }

        const cartao = txtCartao.toString().trim().padStart(5, '0')

        if (lista) {
            let existe = false
            lista.forEach(item => {
                if (item.cartao.toString().trim().padStart(5, '0') == cartao) {
                    existe = true
                    if (item.status == 'inc-pend' || item.status == 'inc-ok') {
                        Alert.alert('', 'Cartão já incluído!')
                    } else {
                        item.status = 'inc-pend'
                    }
                }
            })
            if (existe) {
                _LimparDados()
                props.modificaListaPedidoCartao(lista)
                refInputCartao.current.focus()
                return
            }
        }

        const url = await _GetUrlPadrao()
        props.buscarCartao(url, cartao)
        refInputCartao.current.focus()
    }

    const _onPressExcluir = async (cartao = '') => {
        cartao = cartao.toString().trim()
        if (cartao == '')
            return
        cartao = cartao.padStart(5, '0')
        Alert.alert("", "Deseja excluir o Cartão " + cartao + "?",
            [
                {
                    text: "SIM",
                    onPress: () => {
                        const lista = props.listaPedidoCartao.map(item => (item.cartao.toString().trim() == cartao ? { ...item, status: 'exc-pend' } : item))
                        props.modificaListaPedidoCartao(lista)
                    }
                },
                {
                    text: "NÃO",
                    style: "cancel"
                },
            ],
            {
                cancelable: true,
            }
        )
    }

    const _onPressCancelar = async () => {
        const listaAlterada = props.listaPedidoCartao.filter((item) => item.status != 'inc-ok')
        if (listaAlterada.length <= 0) {
            _CancelarAlteracoes()
            return
        }
        Alert.alert("", "Deseja cancelar as alterações?",
            [
                { text: "SIM", onPress: () => _CancelarAlteracoes() },
                { text: "NÃO", style: "cancel", }, // onPress: () => _ConfirmarAlteracoes() 
            ],
            { cancelable: true }
        )
    }

    const _ConfirmarAlteracoes = async () => {
        let lista = props.listaPedidoCartao
        lista = lista.filter((item) => item.status != 'exc-ok') // remover
        lista = lista.filter((item) => item.status != 'exc-pend') // remover
        lista = lista.map((item) => ({ ...item, 'status': 'inc-ok' })) // alterar restante para 'inc-ok'
        props.modificaListaPedidoCartao(lista)
        _LimparDados()
        props.setModalVisible(false)
        Keyboard.dismiss()
    }

    const _CancelarAlteracoes = async () => {
        let lista = props.listaPedidoCartao
        lista = lista.filter((item) => item.status != 'inc-pend') // remover
        lista = lista.filter((item) => item.status != 'exc-ok') // remover
        lista = lista.map((item) => ({ ...item, 'status': 'inc-ok' })) // alterar restante para 'inc-ok'
        props.modificaListaPedidoCartao(lista)
        _LimparDados()
        props.setModalVisible(false)
        Keyboard.dismiss()
    }

    return (
        <Modal
            style={{ justifyContent: 'flex-start', paddingTop: 10, }}
            isVisible={isVisible}
            useNativeDriver
            avoidKeyboard={true}
            deviceWidth={deviceWidth}
            deviceHeight={deviceHeight}
            animationInTiming={200}
            animationOutTiming={200}
            backdropTransitionInTiming={200}
            backdropTransitionOutTiming={200}
            onBackButtonPress={() => _onPressCancelar()}
        >
            <View style={[{ padding: 15, borderRadius: 20, borderColor: colors.preto, backgroundColor: colors.branco, }, (props.listaPedidoCartao.length > 4) && { flex: 1, }]}>

                <View style={{ marginTop: 10, flexDirection: 'row', }}>
                    <View style={{ flex: 6, justifyContent: 'center', alignItems: 'center', }}>
                        <Text
                            style={{ color: colors.default, fontSize: 18, fontWeight: 'bold', marginBottom: 10, }}
                        >
                            Informe o código do Cartão
                        </Text>
                        <TextInput
                            ref={refInputCartao}
                            placeholder="..."
                            placeholderTextColor={colors.cinza_escuro}
                            maxLength={5}
                            style={{ width: 250, color: colors.default, borderWidth: 1, borderColor: colors.cinza_escuro, borderRadius: 15, height: 50, textAlign: 'center', fontSize: 30, fontWeight: 'bold', }}
                            autoCapitalize="none"
                            keyboardType='numeric'
                            autoFocus={true}
                            autoCorrect={false}
                            underlineColorAndroid='transparent'
                            returnKeyType={'done'}
                            value={txtCartao}
                            onChangeText={value => setTxtCartao(value)}
                            onSubmitEditing={_onPressConfirmar}
                            onEndEditing={props.clearFocus}
                        />
                    </View>
                </View>

                <FlatList
                    ref={refFlatList}
                    // onContentSizeChange={() => refFlatList.current.scrollToEnd()}
                    onContentSizeChange={() => shouldScrollToEndRef.current = props.listaPedidoCartao.length > 0}
                    keyboardShouldPersistTaps={'handled'}
                    style={{ flexGrow: 0, minHeight: 20, marginTop: 20, marginLeft: 10, marginRight: 10, }}
                    data={props.listaPedidoCartao}
                    scrollEnabled={true}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={() => <Text style={{ flex: 1, fontSize: 20, fontWeight: 'bold', color: colors.cinza_escuro, alignSelf: 'center', }}>Nenhum cartão informado...</Text>}
                    renderItem={({ item, index }) => <HomeModalCartaoItem index={index} item={item} _onPressExcluir={_onPressExcluir} />}
                    initialNumToRender={30}
                    maxToRenderPerBatch={30}
                    windowSize={31}
                    removeClippedSubviews={true}
                    updateCellsBatchingPeriod={50}
                    showsVerticalScrollIndicator={false}
                    viewabilityConfig={{ minimumViewTime: 300, viewAreaCoveragePercentThreshold: 100, }}
                />

                <View style={{ flexDirection: 'row', height: 70, marginTop: 20, marginBottom: 10 }}>
                    <View style={{ flex: 1, alignItems: 'flex-start', }}>
                        <TouchableOpacity onPress={() => _onPressCancelar()} disabled={props.isCartaoLoading} style={{ height: 70, width: 70, shadowColor: colors.preto, shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.32, shadowRadius: 5.46, elevation: 10, backgroundColor: colors.branco, borderRadius: 50, justifyContent: 'center', alignItems: 'center', }}>
                            <FontAwesome name="reply-all" size={35} color={colors.preto_claro} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', }}>
                        <TouchableOpacity onPress={() => _onPressConfirmar()} disabled={props.isCartaoLoading} style={{ marginRight: 10, height: 70, width: 70, shadowColor: colors.preto, shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.32, shadowRadius: 5.46, elevation: 10, backgroundColor: colors.branco, borderRadius: 50, justifyContent: 'center', alignItems: 'center', }}>
                            {props.isCartaoLoading ? <ActivityIndicator color={colors.preto_claro} size='large' /> : <FontAwesome name="check" size={60} color={colors.successo} />}
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </Modal>
    )
}

const HomeModalCartaoItem = (props) => {
    const id = props.index
    const cartao = props.item.cartao.toString().trim()
    // const codigo  = props.item.codigo.toString().trim()
    const status = props.item.status.toString().trim() // 'inc-ok' ou 'inc-pend' // 'exc-ok' ou 'exc-pend' 
    const isDisabled = status == 'exc-ok' || status == 'exc-pend'
    return (
        <View key={id} style={{ flex: 1, backgroundColor: colors.branco, borderBottomColor: colors.cinza, borderBottomWidth: 1, height: 60, alignItems: 'center', flexDirection: "row", justifyContent: 'space-between', }}>
            <Text numberOfLines={1} style={[{ color: colors.default, fontSize: 25, }, (isDisabled) && { color: colors.error, }]}>Cartão {cartao} {isDisabled ? '' : ''}</Text>
            <TouchableOpacity onPress={() => props._onPressExcluir(cartao)} disabled={isDisabled} style={{ height: 80, width: 80, alignItems: 'center', justifyContent: 'center', }}>
                <FontAwesome name="trash-o" color={isDisabled ? colors.branco : colors.cinza_escuro} size={30} />
            </TouchableOpacity>
        </View>
    )
}

const mapStateToProps = state => ({

    // config
    txtURL: state.config.txtURL,

    // Cartao
    isCartaoOK: state.cartao.isCartaoOK,
    isCartaoLoading: state.cartao.isCartaoLoading,
    txtCartaoErro: state.cartao.txtCartaoErro,
    txtCartaoCodigo: state.cartao.txtCartaoCodigo,

    // Pedido
    listaPedidoCartao: state.pedido.listaPedidoCartao,
})

const mapDispatchToProps = {
    // Config
    modificaUrl,
    // Cartao
    modificaMsgCartao,
    buscarCartao,
    modificaCartaoOK,
    // Pedido
    modificaPedidoCartao,
    modificaListaPedidoCartao,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeModalCartao)
