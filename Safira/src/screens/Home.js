import React, { useState, useEffect, useRef, } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, Alert, FlatList, Keyboard, Platform, ActivityIndicator, } from 'react-native'
import { FontAwesome, Ionicons, } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'
import * as Device from 'expo-device'
import { connect } from 'react-redux'
import { colors } from '../styles'
import * as CONSTANTE from '../util/Constante'
import { modificaUrl, } from '../store/ducks/config'
import { modificaCodigo, modificaNome, } from '../store/ducks/login'
import { buscaListaProduto, } from '../store/ducks/produto'
import { modificaPedidoCartao, modificaListaPedidoCartao, modificaPedidoMoca, modificaPedidoProduto, modificaPedidoProdutoDescricao, modificaListaPedidoProduto, modificaPedidoVerificaAcessoHide, modificaMsgPedido, fecharVenda, LimpaPedido, } from '../store/ducks/pedido'
import HomeModalCartao from './HomeModalCartao'
import HomeModalMoca from './HomeModalMoca'
import HomeModalProduto from './HomeModalProduto'
import HomeModaAcessoELimite from './HomeModaAcessoELimite'
import HomeModalProdutoObservacao from './HomeModalProdutoObservacao'

const TituloPaddingTop = Platform.OS === 'ios' ? 0 : 20;

const Home = (props) => {
  const [isModalCartaoVisible, setModalCartaoVisible] = useState(false)
  const [isModalMocaVisible, setModalMocaVisible] = useState(false)
  const [isModalProdutoVisible, setModalProdutoVisible] = useState(false)
  const [isModalAcessoELimiteVisible, setModalAcessoELimiteVisible] = useState(false)
  const [isModalObservacaoVisible, setModalObservacaoVisible] = useState(false)
  const [txtObsId, setTxtObsId] = useState('')
  const [txtObsCod, setTxtObsCod] = useState('')
  const [txtObsDescr, setTxtObsDescr] = useState('')
  const [txtObsQtde, setTxtObsQtde] = useState(0)
  const [txtObsTexto, setTxtObsTexto] = useState('')
  const refFlatList = useRef(null)
  const shouldScrollToEndRef = useRef(false);

  useEffect(() => {
    // console.log('Home.Entrar')
    _LimparDados()
    _CarregarDados()

    return () => {
      //console.log('Home.Sair')
      _LimparDados()
    }
  }, [])

  useEffect(() => {
    if (props.txtErroPedido != '') {
      Alert.alert("", props.txtErroPedido, [{ text: "OK" }], { cancelable: true, onDismiss: () => props.modificaMsgPedido('') })
      props.modificaMsgPedido('')
    }
  }, [props.txtErroPedido])

  useEffect(() => {
    if (props.isPedidoOK) {
      //HelperToast.displayMsgSuccess('Pedido realizado com sucesso!')
      _LimparDados()
    }
  }, [props.isPedidoOK])

  useEffect(() => {
    if (props.isPedidoVerificaAcessoShow) {
      setModalAcessoELimiteVisible(true)
      props.modificaPedidoVerificaAcessoHide()
    }
  }, [props.isPedidoVerificaAcessoShow])

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

  const _GetCodigoGarcom = async () => {
    let codigo = props.txtCodigo
    if (codigo == '') {
      codigo = await AsyncStorage.getItem(CONSTANTE.SESSAO_USER_CODIGO) || ''
      props.modificaCodigo(codigo)
    }
    return codigo
  }

  const _GetNomeGarcom = async () => {
    let nome = props.txtNome
    if (nome == '') {
      nome = await AsyncStorage.getItem(CONSTANTE.SESSAO_USER_NOME) || 'NDA'
      props.modificaNome(nome)
    }
    return nome
  }

  const _LimparDados = async () => {
    setTxtObsId("")
    setTxtObsCod("")
    setTxtObsDescr("")
    setTxtObsQtde(1)
    setTxtObsTexto("")
    setModalCartaoVisible(false)
    setModalMocaVisible(false)
    setModalProdutoVisible(false)
    setModalAcessoELimiteVisible(false)
    setModalObservacaoVisible(false)
    props.LimpaPedido()
    const url = await _GetUrlPadrao()
    if (url) props.buscaListaProduto(url)
  }

  const _CarregarDados = async () => {
    _GetUrlPadrao()
    _GetCodigoGarcom()
    _GetNomeGarcom()
  }

  const _onPressExcluirProduto = async (id = '', codigo = '') => {

    id = id.toString().trim()
    if (id == '')
      return

    if (codigo.toString().trim() == '')
      return

    codigo = codigo.toString().trim().padStart(4, '0')

    Alert.alert("", "Excluir o Produto " + codigo,
      [
        {
          text: "SIM",
          onPress: () => {
            const lista = props.listaPedidoProduto.filter(item => item.id.toString().trim() != id) // && item.codigo.toString().trim().padStart(4, '0') != codigo
            props.modificaListaPedidoProduto(lista)
          }
        },
        { text: "NÃO", style: "cancel", },
      ],
      { cancelable: true, }
    )
  }

  const _onPressObservacaoProduto = async (id = '', codigo = '', descricao = '', quantidade = 0, observacao = '') => {
    setTxtObsId(id)
    setTxtObsCod(codigo)
    setTxtObsDescr(descricao)
    setTxtObsQtde(quantidade)
    setTxtObsTexto(observacao)
    setModalObservacaoVisible(true)
  }

  const _onPressCancelarPedido = async () => {
    const listaCartao = props.listaPedidoCartao
    const moca = props.txtPedidoMoca.toString().trim() == '...' ? '' : props.txtPedidoMoca.toString().trim()
    const listaProduto = props.listaPedidoProduto.length <= 0 ? [] : props.listaPedidoProduto

    if (listaCartao.length == 0 && moca == '' && listaProduto.length == 0) {
      _LimparDados()
      return
    }

    Alert.alert("", "Cancelar Pedido?", [{ text: "SIM", onPress: () => _LimparDados() }, { text: "NÃO", style: "cancel" }], { cancelable: true })
  }

  const _onPressShowModalProduto = async (codigo = '', descricao = '') => {
    codigo = codigo.toString().trim()
    descricao = descricao.toString().trim()

    if (codigo == '')
      return

    props.modificaPedidoProduto(codigo)
    props.modificaPedidoProdutoDescricao(descricao)
    setModalProdutoVisible(true)
  }

  const _onPressFecharPedido = async () => {
    Keyboard.dismiss()

    const url = await _GetUrlPadrao()
    const garcom = await _GetCodigoGarcom()
    const moca = props.txtPedidoMoca.toString().trim() == '...' ? '' : props.txtPedidoMoca.toString().trim()
    const autorizador = ""

    let celular = "SEM-APP"
    try {
      celular = Device.deviceName.toString().trim()
    } catch (error) {
      celular = "ERRO"
    }

    const cartoes = props.listaPedidoCartao.length <= 0 ? [] : props.listaPedidoCartao.map(item => parseInt(item.codigo))

    const produtos = props.listaPedidoProduto.length <= 0
      ? []
      : props.listaPedidoProduto.map(item => ({
        'codigo': item.codigo.toString(),
        'quantidade': parseInt(item.quant),
        'observacao': item.observacao.toString().trim().substring(0, 80),
        'opcionaisVendaItem': item.opcionais.length <= 0
          ? []
          : item.opcionais.map(opc => ({
            'nomeGrupo': opc.grupo.toString().trim(),
            'tipo': opc.tipo.toString().trim(),
            'produto': opc.produto.toString().trim(),
            'quantidade': parseInt(opc.quant),
            'observacao': opc.observacao.toString().trim(),
          })),
      }))

    if ((cartoes.length == 0) && ((moca == '') || (moca == '...')) && (produtos.length == 0)) {
      _LimparDados()
      return false // NAO FAZER NADA
    }

    props.fecharVenda(url, garcom, moca, autorizador, celular, cartoes, produtos)
  }

  const isDisabledButtonTop = props.listaPedidoCartao?.length > 0 || props.txtPedidoMoca != '...' || props.listaPedidoProduto?.length > 0

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.branco, }}>

      <View style={{ justifyContent: 'center', alignItems: "center", backgroundColor: colors.default, height: 120, borderBottomEndRadius: 70, paddingTop: TituloPaddingTop, }}>

        <Text style={{ color: colors.branco, fontSize: 14, fontWeight: 'bold', alignSelf: "flex-end", marginRight: 15, }}>
          PEDIDO
        </Text>

        <Text style={{ color: colors.branco, fontSize: 30, fontWeight: 'bold', marginBottom: 10, }}>
          Safira Mobile
        </Text>

        <Text style={{ position: 'absolute', left: 0, bottom: 0, marginBottom: 10, marginLeft: 10, color: colors.branco, fontSize: 12, }}>
          Garçom:
          <Text style={{ fontWeight: 'bold', }} >
            {props.txtNome}
          </Text>
        </Text>

        <TouchableOpacity
          onPress={() => props.navigation.openDrawer()}
          disabled={isDisabledButtonTop}
          style={[{ position: 'absolute', left: 0, top: 30, height: 50, width: 50, shadowColor: colors.default, shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.32, shadowRadius: 5.46, elevation: 10, backgroundColor: colors.default, borderRadius: 50, justifyContent: 'center', alignItems: 'center', }, (isDisabledButtonTop) && { opacity: 0.5, }]}
        >
          <Ionicons name="md-menu" size={32} color={colors.branco} />
        </TouchableOpacity>

      </View>

      {isModalCartaoVisible &&
        <HomeModalCartao
          isModalVisible={isModalCartaoVisible}
          setModalVisible={setModalCartaoVisible}
          navigation={props.navigation}
        />
      }

      {isModalMocaVisible &&
        <HomeModalMoca
          isModalVisible={isModalMocaVisible}
          setModalVisible={setModalMocaVisible}
          navigation={props.navigation}
          txtPedidoMoca={props.txtPedidoMoca}
        />
      }

      {isModalProdutoVisible &&
        <HomeModalProduto
          isModalVisible={isModalProdutoVisible}
          setModalVisible={setModalProdutoVisible}
          _onPressShowModalProduto={_onPressShowModalProduto}
          navigation={props.navigation}
        />
      }

      {isModalAcessoELimiteVisible &&
        <HomeModaAcessoELimite
          isModalVisible={isModalAcessoELimiteVisible}
          setModalVisible={setModalAcessoELimiteVisible}
          navigation={props.navigation}
        />
      }

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

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, marginHorizontal: 10, }}>

        <View style={{ flex: 1, paddingLeft: 10, borderColor: 'red', borderWidth: 0, }}>
          <Text style={{ color: colors.preto_claro, fontSize: 16, fontWeight: 'bold', marginBottom: 5, }}>
            Cartão
          </Text>
          <TouchableOpacity
            onPress={() => setModalCartaoVisible(true)}
            disabled={props.isLoadingPedido}
            style={{ height: 50, width: '90%', alignItems: "center", borderRadius: 15, borderWidth: 1, borderColor: colors.cinza_escuro, }}
          >
            <Text style={{ marginTop: 5, marginBottom: 5, color: colors.default, fontSize: 30, fontWeight: 'bold', }}>
              {props.txtPedidoCartao}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, paddingLeft: 10, borderColor: 'blue', borderWidth: 0, }}>
          <Text style={{ color: colors.preto_clarinho, fontSize: 16, fontWeight: 'bold', marginBottom: 5, }}>
            Moça
          </Text>
          <TouchableOpacity
            onPress={() => setModalMocaVisible(true)}
            disabled={props.isLoadingPedido}
            style={{ height: 50, width: '90%', alignItems: "center", borderRadius: 15, borderWidth: 1, borderColor: colors.cinza_escuro, }}
          >
            <Text style={{ marginTop: 5, marginBottom: 5, color: colors.default, fontSize: 30, fontWeight: 'bold', }}>
              {props.txtPedidoMoca}
            </Text>
          </TouchableOpacity>
        </View>

      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, marginHorizontal: 10, }}>
        <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center', }}>
          <View style={{ width: '100%', borderColor: colors.cinza_escuro, borderWidth: 1, }}>
          </View>
        </View>
        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', }}>
          <Text style={{ color: colors.preto_clarinho, fontSize: 16, fontWeight: 'bold', }}> Produtos </Text>
        </View>
        <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center', }}>
          <View style={{ width: '100%', borderColor: colors.cinza_escuro, borderWidth: 1, }}>
          </View>
        </View>
      </View>

      <View style={{ flex: 1, }}>

        <FlatList
          ref={refFlatList}
          //onContentSizeChange={() => refFlatList?.current?.scrollToEnd({ animated: false })}
          onContentSizeChange={() => shouldScrollToEndRef.current = props.listaPedidoProduto.length > 0}
          style={{ flexGrow: 0, minHeight: 20, marginTop: 5, marginHorizontal: 10, }}
          scrollEnabled={true}
          keyExtractor={item => item.id}
          //keyExtractor={(item, index) => index.toString()}
          initialNumToRender={30}
          maxToRenderPerBatch={30}
          windowSize={31}
          removeClippedSubviews={true}
          updateCellsBatchingPeriod={50}
          showsVerticalScrollIndicator={false}
          viewabilityConfig={{ minimumViewTime: 300, viewAreaCoveragePercentThreshold: 100, }}
          data={props.listaPedidoProduto}
          renderItem={({ item, index }) =>
            <HomeProduoItem
              item={item}
              _onPressExcluir={_onPressExcluirProduto}
              _onPressObservacao={_onPressObservacaoProduto}
            />
          }
        />

        <View style={{ alignItems: 'center', marginTop: 10, }}>
          <TouchableOpacity
            onPress={() => setModalProdutoVisible(true)}
            disabled={props.isLoadingPedido}
            style={{ height: 70, width: 70, paddingTop: 5, shadowColor: colors.preto, shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.32, shadowRadius: 5.46, elevation: 10, backgroundColor: colors.branco, borderRadius: 50, justifyContent: 'center', alignItems: 'center', }}
          >
            <FontAwesome name="plus" size={65} color={colors.successo} />
          </TouchableOpacity>
        </View>

      </View>
      <View style={{ flexDirection: 'row', marginHorizontal: 10, height: 70, marginBottom: 5, }}>
        <View style={{ flex: 1, alignItems: 'flex-start', }}>
          <TouchableOpacity
            onPress={() => _onPressCancelarPedido()}
            disabled={props.isLoadingPedido}
            style={{ height: 70, width: 70, shadowColor: colors.preto, shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.32, shadowRadius: 5.46, elevation: 10, backgroundColor: colors.branco, borderRadius: 50, justifyContent: 'center', alignItems: 'center', }}
          >
            <FontAwesome name="close" size={60} color={colors.error} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end', }}>
          <TouchableOpacity
            onPress={() => _onPressFecharPedido()}
            disabled={props.isLoadingPedido}
            style={{ height: 70, width: 70, shadowColor: colors.preto, shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.32, shadowRadius: 5.46, elevation: 10, backgroundColor: colors.branco, borderRadius: 50, justifyContent: 'center', alignItems: 'center', }}
          >
            {props.isLoadingPedido
              ? <ActivityIndicator color={colors.preto_claro} size='large' />
              : <FontAwesome name="check" size={60} color={colors.successo} />
            }
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ alignItems: 'center', }}>
        <Text style={{ color: colors.cinza_escuro, fontSize: 12, fontWeight: 'bold', }}>
          Versão: {Constants.manifest?.version}
        </Text>
      </View>

    </SafeAreaView>
  )
}

const HomeProduoItem = (props) => {
  const id = props.item.id
  const codigo = props.item.codigo
  const descricao = props.item.descricao
  const quantidade = props.item.quant
  const observacao = props.item.observacao.toString().trim()
  const opcionais = props.item.opcionais
  const status = props.item.status.toString().trim() // 'inc-ok' ou 'inc-pend' // 'exc-ok' ou 'exc-pend' 
  const isDisabled = status == 'exc-ok' || status == 'exc-pend'

  if (isDisabled) return null

  return (
    <View
      key={id}
      style={{ flex: 1, paddingBottom: 10, backgroundColor: colors.branco, borderBottomColor: colors.cinza, borderBottomWidth: 1, alignItems: 'center', flexDirection: "row", justifyContent: 'space-around', }}
    >

      <Text
        numberOfLines={1}
        style={{ flex: 1, fontSize: 16, fontWeight: 'bold', color: colors.preto, textAlign: 'center', paddingTop: 4, height: 30, backgroundColor: colors.cinza, borderRadius: 5, }}
      >
        {quantidade}x
      </Text>

      <View
        style={{ flex: 7, marginLeft: 10, }}
      >

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
              <Text style={{ fontWeight: 'bold' }}>
                Obs:
              </Text>
              {observacao}
            </Text>
          }

        </TouchableOpacity>

      </View>

      <TouchableOpacity
        style={{ flex: 1, }}
        onPress={() => props._onPressExcluir(id, codigo)}
      >
        <FontAwesome name="trash-o" color={colors.cinza_escuro} size={35} />
      </TouchableOpacity>

    </View>
  )
}

const mapStateToProps = state => ({

  // config
  txtURL: state.config.txtURL,

  // login
  txtCodigo: state.login.txtCodigo,
  txtNome: state.login.txtNome,

  // Pedido
  isLoadingPedido: state.pedido.isLoadingPedido,
  txtPedidoMoca: state.pedido.txtPedidoMoca,
  txtPedidoCartao: state.pedido.txtPedidoCartao,
  listaPedidoCartao: state.pedido.listaPedidoCartao,
  listaPedidoProduto: state.pedido.listaPedidoProduto,
  txtErroPedido: state.pedido.txtErroPedido,
  isPedidoOK: state.pedido.isPedidoOK,
  isPedidoVerificaAcessoShow: state.pedido.isPedidoVerificaAcessoShow,

})

const mapDispatchToProps = {

  // Config
  modificaUrl,

  // Login
  modificaCodigo,
  modificaNome,

  // produto
  buscaListaProduto,

  // Pedido
  modificaPedidoCartao,
  modificaListaPedidoCartao,
  modificaPedidoMoca,
  modificaPedidoProduto,
  modificaPedidoProdutoDescricao,
  modificaListaPedidoProduto,
  modificaPedidoVerificaAcessoHide,
  modificaMsgPedido,
  fecharVenda,
  LimpaPedido,

}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
