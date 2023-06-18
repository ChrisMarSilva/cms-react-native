import React, { useState, useEffect, useRef, } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Dimensions, FlatList, Keyboard, Alert, } from 'react-native'
import { FontAwesome, } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Modal from 'react-native-modal'
import InputSpinner from "react-native-input-spinner"
import uuid from 'react-native-uuid'
import { connect } from 'react-redux'
import SuperAlert from "react-native-super-alert";

import { colors } from '../styles'
import * as CONSTANTE from '../util/Constante'
import HomeModalProdutoObservacao from './HomeModalProdutoObservacao'
import HomeModalProdutoOpcionais from './HomeModalProdutoOpcionais'
import { modificaUrl, } from '../store/ducks/config'
import { limpaListaOpcionais, buscaListaOpcionais } from '../store/ducks/produto'
import { modificaPedidoProduto, modificaPedidoProdutoDescricao, modificaListaPedidoProduto, } from '../store/ducks/pedido'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const HomeModalProduto = (props) => {

    const isVisible = props.isModalVisible
    if (!isVisible) return null

    const [isModalObservacaoVisible, setModalObservacaoVisible] = useState(false)
    const [isModalOpcionaisVisible, setModalOpcionaisVisible] = useState(false)
    const [txtQuantidade, setTxtQuantidade] = useState(1)
    const [txtObsId, setTxtObsId] = useState('')
    const [txtObsCod, setTxtObsCod] = useState('')
    const [txtObsDescr, setTxtObsDescr] = useState('')
    const [txtObsQtde, setTxtObsQtde] = useState(0)
    const [txtObsTexto, setTxtObsTexto] = useState('')
    const refInputProduto = useRef(null)
    const refFlatList = useRef(null)
    const shouldScrollToEndRef = useRef(false);

    useEffect(() => {
        // console.log('HomeModalProduto.Entrar')
        _LimparDados()
        _CarregarDados()
        refInputProduto.current.focus()

        return () => {
            //console.log('HomeModalProduto.Sair')
            _LimparDados()
        }
    }, [])

    useEffect(() => {
        if (props.listaOpcionais.length) {
            setModalOpcionaisVisible(true)
        }
    }, [props.listaOpcionais])

    useEffect(() => {
        if (shouldScrollToEndRef.current && props.listaPedidoProduto.length > 0) {
            refFlatList.current.scrollToEnd({ animated: false });
            shouldScrollToEndRef.current = false;
        }
    }, [props.listaPedidoProduto]);

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
        // props.modificaPedidoProduto('')
        // props.modificaPedidoProdutoDescricao('...')
        setTxtQuantidade(1)
        setTxtObsId("")
        setTxtObsCod("")
        setTxtObsDescr("")
        setTxtObsQtde(1)
        setTxtObsTexto("")
        props.limpaListaOpcionais()
    }

    const _onPressConfirmar = async () => {

        props.limpaListaOpcionais()

        let lista = props.listaPedidoProduto
        let codigo = props.txtPedidoProduto.toString().trim()
        let quant = parseInt(txtQuantidade.toString().trim())
        let observacao = ""
        let opcionais = []

        if (codigo == '') {
            _ConfirmarAlteracoes()
            return
        }

        codigo = codigo.padStart(4, '0')
        // props.modificaPedidoProduto(codigo) 

        const produtos = props.listaProdutoFull.filter((item) => item.codigo.toString().trim() == codigo)

        if (produtos == null || produtos.length <= 0) {
            //Alert.alert('', 'Produto não localizado!')
            alert('', 'Produto não localizado!', { textConfirm: '     OK     ' });
            refInputProduto.current.focus()
            return false
        }

        const produto = produtos[0]
        // props.modificaPedidoProdutoDescricao(produto.descricao)

        if (lista) {

            const resultFind = lista.find(item => item.codigo == codigo && item.opcionais.length <= 0)

            if (resultFind) {
                // ALTERAR ITEM
                lista.forEach(item => {
                    if (item.codigo == codigo && item.opcionais.length <= 0) {
                        item.quant = item.status == 'exc-pend' || item.status == 'exc-ok'
                            ? quant
                            : item.quant + quant
                        item.status = 'inc-pend'
                        quant = item.quant
                        observacao = item.observacao
                        opcionais = item.opcionais
                        return
                    }
                })
                // lista = lista.filter(item => item.codigo != codigo)
            } else {
                // ADD ITEM

                var id = uuid.v4().toString()

                const item = {
                    'id': id,
                    'codigo': produto.codigo.toString().trim().padStart(4, '0'),
                    'descricao': produto.descricao.toString().trim(),
                    'quant': quant,
                    'observacao': observacao,
                    'opcionais': opcionais,
                    'status': 'inc-pend',
                }

                lista.push(item)  // push-ultimo // unshift-primeiro

                //if (quant == 1) { // SOMENTE PARA PRODUTOS COM QTD IGUAL A 1
                const url = await _GetUrlPadrao()
                if (url) props.buscaListaOpcionais(url, id, produto.codigo, produto.descricao)
                //}
            }

        }

        _LimparDados()
        props.modificaPedidoProduto('')
        props.modificaPedidoProdutoDescricao('...')
        props.modificaListaPedidoProduto(lista)
        refInputProduto.current.focus()
        refFlatList.current.scrollToEnd()
        // setTimeout(function(){ refFlatList.current.scrollToEnd(); }, 200) // para dar tempo do componente renderizar o item add
    }

    const _onPressExcluir = async (id = '', codigo = '', descricao = '') => {

        id = id.toString().trim()
        if (id == '')
            return

        codigo = codigo.toString().trim()
        if (codigo == '')
            return

        codigo = codigo.padStart(4, '0')

        // Alert.alert('', 'Deseja excluir o Produto ' + codigo + '?\n\n' + descricao,
        //     [
        //         {
        //             text: "SIM",
        //             onPress: () => {
        //                 const lista = props.listaPedidoProduto.map(item => (
        //                     item.id.toString().trim() == id && item.codigo.toString().trim().padStart(4, '0') == codigo
        //                         ? { ...item, status: 'exc-pend' }
        //                         : item
        //                 ))
        //                 props.modificaListaPedidoProduto(lista)
        //             }
        //         },
        //         { text: "NÃO", style: "cancel" },
        //     ],
        //     { cancelable: true, }
        // );

        alert(
            '',
            'Deseja excluir o Produto ' + codigo + '?\n\n' + descricao,
            {
                textConfirm: '     SIM     ',
                textCancel: '     NÃO     ',
                onConfirm: () => {
                    const lista = props.listaPedidoProduto.map(item => (
                        item.id.toString().trim() == id && item.codigo.toString().trim().padStart(4, '0') == codigo
                            ? { ...item, status: 'exc-pend' }
                            : item
                    ))
                    props.modificaListaPedidoProduto(lista);
                    refInputProduto.current.focus();
                },
            },
        );


    }

    const _onPressObservacao = async (id = '', codigo = '', descricao = '', quantidade = 0, observacao = '') => {
        setTxtObsId(id)
        setTxtObsCod(codigo)
        setTxtObsDescr(descricao)
        setTxtObsQtde(quantidade)
        setTxtObsTexto(observacao)
        setModalObservacaoVisible(true)
    }

    const _onPressCancelar = async () => {
        const listaAlterada = props.listaPedidoProduto.filter(item => item.status != 'inc-ok')

        if (listaAlterada.length <= 0) {
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

    const _LocalizarProduto = async (codigo) => {

        props.modificaPedidoProduto(codigo)
        props.modificaPedidoProdutoDescricao('...')

        if ((codigo == '') || (codigo == '...')) {
            refInputProduto.current.focus()
            return false
        }

        codigo = codigo.padStart(4, '0')

        const produtos = props.listaProdutoFull.filter(item => item.codigo.toString().trim() == codigo)

        if (produtos == null || produtos.length <= 0) {
            props.modificaPedidoProdutoDescricao('Produto não localizado!')
            refInputProduto.current.focus()
            return false
        }

        const produto = produtos[0]
        //props.modificaPedidoProdutoDescricao(produto.codigo + ' - ' + produto.descricao)
        props.modificaPedidoProdutoDescricao(produto.descricao)
        refInputProduto.current.focus()
    }

    const _onPressPesquisar = async () => {
        props.setModalVisible(false)
        props.modificaPedidoProduto('')
        props.modificaPedidoProdutoDescricao('...')
        props.navigation.navigate('HomePesquisaProduto', { _onPressShowModalProduto: props._onPressShowModalProduto })
    }

    const _ConfirmarAlteracoes = async () => {
        let lista = props.listaPedidoProduto
        lista = lista.filter((item) => item.status != 'exc-ok') // remover
        lista = lista.filter((item) => item.status != 'exc-pend') // remover
        lista = lista.map((item) => ({ ...item, 'status': 'inc-ok' })) // alterar restante para 'inc-ok'
        props.modificaListaPedidoProduto(lista)
        props.modificaPedidoProduto('')
        props.modificaPedidoProdutoDescricao('...')
        props.setModalVisible(false)
        _LimparDados()
        Keyboard.dismiss()
    }

    const _CancelarAlteracoes = async () => {
        let lista = props.listaPedidoProduto
        lista = lista.filter(item => item.status != 'inc-pend') // remover
        lista = lista.filter(item => item.status != 'exc-ok') // remover
        lista = lista.map(item => ({ ...item, 'status': 'inc-ok' })) // alterar restante para 'inc-ok'
        props.modificaListaPedidoProduto(lista)
        props.modificaPedidoProduto('')
        props.modificaPedidoProdutoDescricao('...')
        props.setModalVisible(false)
        _LimparDados()
        Keyboard.dismiss()
    }

    return (
        <Modal style={{ justifyContent: 'flex-start', paddingTop: 10, }} isVisible={isVisible} useNativeDriver avoidKeyboard={true} deviceWidth={deviceWidth} deviceHeight={deviceHeight} animationInTiming={200} animationOutTiming={200} backdropTransitionInTiming={200} backdropTransitionOutTiming={200} onBackButtonPress={() => _onPressCancelar()}>

            <View style={[{ flex: 1, padding: 10, borderRadius: 20, borderColor: colors.preto, backgroundColor: colors.branco, }, (props.listaPedidoProduto.length > 3) && { flex: 1, }]}>

                <View style={{ marginTop: 10, flexDirection: 'row', }}>
                    <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ color: colors.default, fontSize: 18, fontWeight: 'bold', marginBottom: 10, }}>Informe o código do Produto</Text>
                        <TextInput ref={refInputProduto} placeholder="..." placeholderTextColor={colors.cinza_escuro} maxLength={4} style={{ width: 250, color: colors.default, borderWidth: 1, borderColor: colors.cinza_escuro, borderRadius: 15, height: 50, textAlign: 'center', fontSize: 30, fontWeight: 'bold', }} autoCapitalize="none" keyboardType='numeric' autoFocus={true} autoCorrect={false} underlineColorAndroid='transparent' returnKeyType={'done'} value={props.txtPedidoProduto} onChangeText={value => _LocalizarProduto(value)} onSubmitEditing={_onPressConfirmar} onEndEditing={props.clearFocus} />
                    </View>
                </View>

                {isModalObservacaoVisible &&
                    <HomeModalProdutoObservacao
                        isModalVisible={isModalObservacaoVisible}
                        setModalVisible={setModalObservacaoVisible}
                        navigation={props.navigation}
                        txtId={txtObsId}
                        txtCodigo={txtObsCod}
                        txtDescricao={txtObsDescr}
                        txtQuantidade={txtObsQtde}
                        txtObservacao={txtObsTexto}
                    />
                }

                {isModalOpcionaisVisible &&
                    <HomeModalProdutoOpcionais
                        isModalVisible={isModalOpcionaisVisible}
                        setModalVisible={setModalOpcionaisVisible}
                        navigation={props.navigation}
                        txtId={props.idOpcionais}
                        txtCodigo={props.codigoOpcionais}
                        txtDescricao={props.descricaoOpcionais}
                        txtLista={props.listaOpcionais}
                    />
                }

                {
                    props.txtPedidoProdutoDescricao != '' &&
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, }} >
                        <Text
                            style={[{ fontSize: 18, color: colors.default, fontWeight: "bold", }, (props.txtPedidoProdutoDescricao == 'Produto não localizado!' || props.txtPedidoProdutoDescricao == 'Produto inativo!') && { color: colors.error, }]}
                        >
                            {props.txtPedidoProdutoDescricao}
                        </Text>
                    </View>
                }

                <View style={{ marginTop: 10, flexDirection: 'row', }}>
                    <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center', }}>
                        <InputSpinner
                            min={1}
                            max={100}
                            editable={false}
                            selectTextOnFocus={false}
                            value={txtQuantidade}
                            onChange={(value) => setTxtQuantidade(value)}
                            style={{ width: 200, }}
                            buttonStyle={{ width: 60, height: 60, }}
                            inputStyle={{ color: colors.default, fontSize: 30, fontWeight: 'bold', }}
                        />
                    </View>
                </View>

                <SuperAlert customStyle={styles.customStyle} />

                <View style={{ flex: 1, }}>
                    <FlatList
                        ref={refFlatList}
                        //onContentSizeChange={() => refFlatList.current.scrollToEnd()}
                        onContentSizeChange={() => shouldScrollToEndRef.current = props.listaPedidoProduto.length > 0}
                        keyboardShouldPersistTaps={'handled'}
                        style={{ flexGrow: 0, marginTop: 10, marginLeft: 10, marginRight: 10, }}
                        data={props.listaPedidoProduto}
                        scrollEnabled={true}
                        //keyExtractor={item => item.id}
                        keyExtractor={(item, index) => index.toString()}
                        ListEmptyComponent={() =>
                            <Text style={{ flex: 1, fontSize: 20, fontWeight: 'bold', color: colors.cinza_escuro, alignSelf: 'center', }}>
                                Nenhum produto informado...
                            </Text>
                        }
                        renderItem={({ item, index }) =>
                            <HomeModalProdutoItem
                                index={index}
                                item={item}
                                _onPressExcluir={_onPressExcluir}
                                _onPressObservacao={_onPressObservacao}
                            />
                        }
                        initialNumToRender={30}
                        maxToRenderPerBatch={30}
                        windowSize={31}
                        removeClippedSubviews={true}
                        updateCellsBatchingPeriod={50}
                        showsVerticalScrollIndicator={false}
                        viewabilityConfig={{ minimumViewTime: 300, viewAreaCoveragePercentThreshold: 100, }}
                    />
                </View>

                <View style={{ justifyContent: 'flex-end', flexDirection: 'row', height: 70, marginTop: 30, marginBottom: 15, }}>
                    <View style={{ flex: 1, alignItems: 'flex-start', }}>
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

const HomeModalProdutoItem = (props) => {
    const id = props.item.id // props.index
    const codigo = props.item.codigo
    const descricao = props.item.descricao
    const quantidade = props.item.quant
    const observacao = props.item.observacao.toString().trim()
    const opcionais = props.item.opcionais
    const status = props.item.status.toString().trim() // 'inc-ok' ou 'inc-pend' // 'exc-ok' ou 'exc-pend' 
    const isDisabled = status == 'exc-ok' || status == 'exc-pend'

    return (
        <View
            key={props.index}
            style={{ flex: 1, paddingBottom: 10, backgroundColor: colors.branco, borderBottomColor: colors.cinza, borderBottomWidth: 1, alignItems: 'center', flexDirection: "row", justifyContent: 'space-around', }}
        >

            <Text
                numberOfLines={1}
                style={[{ flex: 2, fontSize: 16, fontWeight: 'bold', color: colors.preto, textAlign: 'center', paddingTop: 4, height: 30, backgroundColor: colors.cinza, borderRadius: 5, }, (isDisabled) && { color: colors.error, }]}
            >
                {quantidade}x
            </Text>

            <View style={{ flex: 10, marginLeft: 10, }}>

                <TouchableOpacity
                    onPress={() => props._onPressObservacao(id, codigo, descricao, quantidade, observacao)}
                    disabled={isDisabled}
                    style={{ flex: 1, }}
                >

                    <Text
                        numberOfLines={1}
                        style={[{ fontSize: 20, fontWeight: 'bold', color: colors.preto, textAlign: 'left', }, (isDisabled) && { color: colors.error, }]}
                    >
                        {descricao}
                    </Text>

                    {opcionais?.map((item, index) => (
                        <>
                            <Text
                                key={index}
                                numberOfLines={1}
                                style={[{ fontSize: 14, color: colors.preto_claro, textAlign: 'left', }, (isDisabled) && { color: colors.error, }]}
                            >
                                {item.observacao}
                            </Text>
                        </>
                    ))}

                    {observacao != '' &&
                        <Text
                            numberOfLines={1}
                            style={[{ fontSize: 14, color: colors.preto_claro, textAlign: 'left', }, (isDisabled) && { color: colors.error, }]}
                        >
                            <Text style={{ fontWeight: 'bold' }}>Obs: </Text>
                            {observacao}
                        </Text>
                    }

                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={() => props._onPressExcluir(id, codigo, descricao)}
                disabled={isDisabled}
                style={{ flex: 1, }}
            >
                <FontAwesome
                    name="trash-o"
                    color={isDisabled ? colors.branco : colors.cinza_escuro}
                    size={30}
                />
            </TouchableOpacity>

        </View>
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

    // config
    txtURL: state.config.txtURL,

    // produto
    listaProdutoFull: state.produto.listaProdutoFull,
    listaOpcionais: state.produto.listaOpcionais,
    idOpcionais: state.produto.idOpcionais,
    codigoOpcionais: state.produto.codigoOpcionais,
    descricaoOpcionais: state.produto.descricaoOpcionais,

    // pedido
    txtPedidoProduto: state.pedido.txtPedidoProduto,
    txtPedidoProdutoDescricao: state.pedido.txtPedidoProdutoDescricao,
    listaPedidoProduto: state.pedido.listaPedidoProduto,

})

const mapDispatchToProps = {

    // Config
    modificaUrl,

    // produto
    limpaListaOpcionais,
    buscaListaOpcionais,

    // pedido
    modificaPedidoProduto,
    modificaPedidoProdutoDescricao,
    modificaListaPedidoProduto,

}

export default connect(mapStateToProps, mapDispatchToProps)(HomeModalProduto)
