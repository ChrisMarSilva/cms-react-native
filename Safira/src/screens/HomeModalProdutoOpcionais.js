import React, { useEffect, useState, useRef, } from 'react'
import { View, Text, TouchableOpacity, Dimensions, Keyboard, } from 'react-native'
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
    }

    const _CarregarDados = async () => {
        const nomes = [... new Set(props.txtLista.map(x => x.nome))]
        if (nomes) setListaNomes(nomes)
    }

    const _onPressConfirmar = async (index, produto, quantidade, observacao, tipo, nome) => {
        //console.log(`\n index: ${index} \n produto: ${produto} \n quantidade: ${quantidade} \n observacao: ${observacao} \n tipo: ${tipo} \n nome: ${nome}`)

        produto = produto === null || produto.trim() === '' ? '' : produto

        if (observacao != 'NENHUM') {
            const item = { 'grupo': nome, 'tipo': tipo, 'produto': produto, 'quant': quantidade, 'observacao': observacao, }
            listaOpcionais.push(item)
            // setListaOpcionais(prevState => [...prevState, item])
        }

        const ultIndex = listaNomes?.length ? listaNomes.length - 1 : 0

        if (index == ultIndex) {

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

        if (refPagerView) refPagerView.current?.setPage(index + 1)
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
            style={{
                justifyContent: 'flex-start',
                paddingTop: 10,
            }}
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
                        <Text style={{ color: colors.default, fontSize: 20, fontWeight: 'bold', }}>{props.txtDescricao}</Text>
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
                            _onPressConfirmar={_onPressConfirmar}
                        />
                    ))}
                </PagerView>

            </View>

        </Modal>
    )
}

const HomeModalProdutoOpcionaisItem = (props) => {
    const index = props.index
    const codigo = props.codigo
    const nome = props.nome
    const opcionais = props.lista.filter(opc => opc.nome.toString().trim() == nome)[0]

    return (
        <View style={{}} key={codigo}>

            <View style={{ marginTop: 20, marginBottom: 30, }}>
                <Text style={{ color: colors.default, fontSize: 20, fontWeight: 'bold', }}>
                    {opcionais.nome}
                </Text>
            </View>

            <View style={{ flexDirection: 'row', }}>
                <View style={{ flex: 1, alignItems: 'center', }}>

                    {opcionais.obrigatorio.toUpperCase() != 'S' &&
                        <TouchableOpacity
                            style={{
                                height: 50,
                                width: '95%',
                                backgroundColor: colors.branco,
                                shadowColor: colors.preto,
                                shadowOffset: { width: 0, height: 4, },
                                shadowOpacity: 0.32,
                                shadowRadius: 5.46,
                                elevation: 10,
                                borderRadius: 15,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 15,
                            }}
                            onPress={() => props._onPressConfirmar(index, '', 0, 'NENHUM', 'O', 'NENHUM')}
                        >
                            <Text style={{ color: colors.default, fontSize: 16, fontWeight: 'bold', }}>NENHUM</Text>
                        </TouchableOpacity>
                    }

                    {opcionais.items?.map(item => (
                        <>
                            <TouchableOpacity
                                style={{
                                    height: 50,
                                    width: '95%',
                                    backgroundColor: colors.branco,
                                    shadowColor: colors.preto,
                                    shadowOffset: { width: 0, height: 4, },
                                    shadowOpacity: 0.32,
                                    shadowRadius: 5.46,
                                    elevation: 10,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom: 15,
                                }}
                                onPress={() => props._onPressConfirmar(index, item?.produto, item.quantidade, item.observacao, item.tipo, item.nome)}
                            >
                                <Text style={{ color: colors.default, fontSize: 16, fontWeight: 'bold', }}>{item.observacao}</Text>
                            </TouchableOpacity>
                        </>
                    ))}

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