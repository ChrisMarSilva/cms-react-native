import React, { useEffect, useState, useRef, } from 'react'
import { View, Text, TouchableOpacity, Dimensions, Keyboard, FlatList, } from 'react-native'
import { FontAwesome, } from '@expo/vector-icons'
import PagerView from 'react-native-pager-view'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import { colors } from '../styles'
import { modificaListaPedidoProduto, } from '../store/ducks/pedido'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const HomeModalProdutoOpcionais = (props) => {

    const isVisible = props.isModalVisible
    if (!isVisible) return null

    const refPagerView = useRef(null)
    const [indiceAtual, setIndiceAtual] = useState(0)
    const [listaNomes, setListaNomes] = useState([])
    const [listaOpcionais, setListaOpcionais] = useState([])

    useEffect(() => {
        // console.log('HomeModalProdutoOpcionais.Entrar')
        _LimparDados()
        _CarregarDados()

        return () => {
            //console.log('HomeModalProdutoOpcionais.Sair')
            _LimparDados()
        }
    }, [])

    const _LimparDados = async () => {
        setListaNomes([])
        setListaOpcionais([])
        setIndiceAtual(0)
    }

    const _CarregarDados = async () => {
        const nomes = [... new Set(props.txtLista.map(x => x.nome))]
        if (nomes) setListaNomes(nomes)
    }

    const _onPressConfirmar = async (index, produto, quantidade, observacao, tipo, nome) => {
        //console.log(`\n index: ${index} \n produto: ${produto} \n quantidade: ${quantidade} \n observacao: ${observacao} \n tipo: ${tipo} \n nome: ${nome}`)

        produto = produto === null || produto.trim() === '' ? '' : produto

        if (observacao != 'NENHUM') {
            const item = { 'indice': indiceAtual, 'grupo': nome, 'tipo': tipo, 'produto': produto, 'quant': quantidade, 'observacao': observacao, }
            listaOpcionais.push(item)
            // setListaOpcionais(prevState => [...prevState, item])
        }

        const ultIndex = listaNomes?.length ? listaNomes.length - 1 : 0

        if (indiceAtual == ultIndex) {

            const id = props.txtId.toString().trim()
            if (id == '')
                return

            let codigo = props.txtCodigo.toString().trim()
            if (codigo == '')
                return

            codigo = codigo.padStart(4, '0')

            let listaPedido = props.listaPedidoProduto

            if (listaPedido) {
                listaPedido = listaPedido.map(item => (
                    item.id.toString().trim() == id && item.codigo.toString().trim().padStart(4, '0') == codigo
                        ? { ...item, status: 'inc-pend', opcionais: listaOpcionais }
                        : item
                ))
                props.modificaListaPedidoProduto(listaPedido)
            }

            _LimparDados()
            props.setModalVisible(false)
            Keyboard.dismiss()
            return
        }

        if (refPagerView) refPagerView.current?.setPage(indiceAtual + 1)
        setIndiceAtual(prevState => prevState + 1);
    }

    const _onPressVoltar = async (index) => {

        if (indiceAtual == 0) { // parseInt(index)
            _CancelarAlteracoes()
            return
        }

        const id = props.txtId.toString().trim()
        if (id == '')
            return

        let codigo = props.txtCodigo.toString().trim()
        if (codigo == '')
            return

        codigo = codigo.padStart(4, '0')

        let listaPedido = props.listaPedidoProduto
        if (listaPedido) {

            const lista = listaOpcionais.filter(item => item.indice != indiceAtual - 1) // parseInt(index) - 1
            setListaOpcionais(lista)

            listaPedido = listaPedido.map(item => (
                item.id.toString().trim() == id && item.codigo.toString().trim().padStart(4, '0') == codigo
                    ? { ...item, status: 'inc-pend', opcionais: lista }
                    : item
            ))

            props.modificaListaPedidoProduto(listaPedido)
        }

        if (refPagerView) refPagerView.current?.setPage(indiceAtual - 1) // parseInt(index)
        setIndiceAtual(prevState => prevState - 1);
    }

    const _onPressCancelar = async () => {
        _CancelarAlteracoes()
        return
    }

    const _CancelarAlteracoes = async () => {
        _LimparDados()
        props.setModalVisible(false)
        Keyboard.dismiss()
    }

    return (
        <Modal
            style={{ justifyContent: 'flex-start', paddingTop: 10, }}
            isVisible={isVisible}
            useNativeDriver avoidKeyboard={true}
            deviceWidth={deviceWidth}
            deviceHeight={deviceHeight}
            animationInTiming={200}
            animationOutTiming={200}
            backdropTransitionInTiming={200}
            backdropTransitionOutTiming={200}
            onBackButtonPress={() => _onPressCancelar()}
        >
            <View style={{ flex: 1, padding: 15, borderRadius: 20, borderColor: colors.preto, backgroundColor: colors.branco, }}>

                <View style={{ flexDirection: 'row', }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ color: colors.default, fontSize: 20, fontWeight: 'bold', }}>
                            {props.txtDescricao}
                        </Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                        {listaOpcionais?.map((item, index) => (
                            <>
                                <Text
                                    key={index}
                                    numberOfLines={1}
                                    style={{ fontSize: 14, color: colors.preto_claro, textAlign: 'left', }}
                                >
                                    {item.observacao}
                                </Text>
                            </>
                        ))}
                    </View>
                </View>

                <PagerView
                    style={{ flex: 1, marginTop: 10, padding: 100, backgroundColor: colors.branco, }}
                    initialPage={0}
                    scrollEnabled={false}
                    keyboardDismissMode={'on-drag'}
                    ref={refPagerView}
                >
                    {listaNomes?.map((nome, index) => (
                        <HomeModalProdutoOpcionaisItem
                            index={index}
                            codigo={props.txtCodigo}
                            nome={nome}
                            lista={props.txtLista}
                            _onPressVoltar={_onPressVoltar}
                            _onPressConfirmar={_onPressConfirmar}
                        />
                    ))}
                </PagerView>

            </View>

        </Modal >
    )
}

const HomeModalProdutoOpcionaisItem = (props) => {
    const index = props.index
    const codigo = props.codigo
    const nome = props.nome
    const opcionais = props.lista.filter(opc => opc.nome.toString().trim() == nome)[0]

    return (
        <View style={{ flex: 1, }} key={codigo}>

            <View style={{ marginTop: 20, marginBottom: 30, }}>
                <Text style={{ color: colors.default, fontSize: 20, fontWeight: 'bold', }}>
                    {opcionais.nome}
                </Text>
            </View>

            <View style={{ flex: 1, alignItems: 'center', }}>

                {opcionais.obrigatorio.toUpperCase() != 'S' &&
                    <TouchableOpacity
                        style={{ height: 50, width: '95%', backgroundColor: colors.branco, shadowColor: colors.preto, shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.32, shadowRadius: 5.46, elevation: 10, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 15, }}
                        onPress={() => props._onPressConfirmar(index, '', 0, 'NENHUM', 'O', 'NENHUM')}
                    >
                        <Text style={{ color: colors.default, fontSize: 16, fontWeight: 'bold', }}>NENHUM</Text>
                    </TouchableOpacity>
                }

                {/* 
                    {opcionais.items?.map(item => (
                        <>
                            <TouchableOpacity
                                style={{ height: 50, width: '95%', backgroundColor: colors.branco, shadowColor: colors.preto, shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.32, shadowRadius: 5.46, elevation: 10, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 15, }}
                                onPress={() => props._onPressConfirmar(index, item?.produto, item.quantidade, item.observacao, item.tipo, item.nome)}
                            >
                                <Text style={{ color: colors.default, fontSize: 16, fontWeight: 'bold', }}>{item.observacao}</Text>
                            </TouchableOpacity>
                        </>
                    ))} 
                */}

                <FlatList
                    style={{ width: '100%', }}
                    data={opcionais.items}
                    scrollEnabled={true}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <>
                            <TouchableOpacity
                                style={{ height: 50, width: '95%', backgroundColor: colors.branco, shadowColor: colors.preto, shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.32, shadowRadius: 5.46, elevation: 10, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 15, marginLeft: 10, marginRight: 10, }}
                                onPress={() => props._onPressConfirmar(index, item?.produto, item.quantidade, item.observacao, item.tipo, item.nome)}
                            >
                                <Text style={{ color: colors.default, fontSize: 16, fontWeight: 'bold', }}>{item.observacao}</Text>
                            </TouchableOpacity>
                        </>
                    )}
                    initialNumToRender={30}
                    maxToRenderPerBatch={30}
                    windowSize={31}
                    removeClippedSubviews={true}
                    updateCellsBatchingPeriod={50}
                    showsVerticalScrollIndicator={false}
                    viewabilityConfig={{ minimumViewTime: 300, viewAreaCoveragePercentThreshold: 100, }}
                />

                <View style={{ padding: 10, justifyContent: 'flex-end', flexDirection: 'row', height: 70, marginTop: 20, marginBottom: 15, }}>
                    <View style={{ flex: 1, alignItems: 'flex-start', }}>
                        <TouchableOpacity onPress={() => props._onPressVoltar(index)} style={{ height: 70, width: 70, shadowColor: colors.preto, shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.32, shadowRadius: 5.46, elevation: 10, backgroundColor: colors.branco, borderRadius: 50, justifyContent: 'center', alignItems: 'center', }}>
                            <FontAwesome name="reply-all" size={35} color={colors.preto_claro} />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

        </View>
    )
}

const mapStateToProps = state => ({

    // pedido
    listaPedidoProduto: state.pedido.listaPedidoProduto,

})

const mapDispatchToProps = {

    // pedido
    modificaListaPedidoProduto,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeModalProdutoOpcionais)