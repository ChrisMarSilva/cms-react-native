
import React from 'react';
import { Text, View, SafeAreaView, Image, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator, TextInput, Dimensions, } from 'react-native'
import { RecyclerListView, LayoutProvider, } from 'recyclerlistview'
import DateTimePicker from '@react-native-community/datetimepicker'
import RNPicker from "rn-modal-picker"
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import { connect } from 'react-redux'

import * as CONSTANTE from '../util/Constante'
import * as HelperToast from '../util/HelperToast'
import * as HelperNumero from '../util/HelperNumero'
import { limpaProventos, modificaMsgProventos, buscaListaAtivosProventos, buscaListaProventos, } from '../store/ducks/proventos'

const dtAtual = moment(new Date()).format("YYYYMMDD") // .format("DD/MM/YYYY")
const imgDefault = require('../assets/SEMLOGO.gif')
const { height, width } = Dimensions.get('window')
const ViewTypes = { HEADER: 0, LISTITEM: 1, }
const layoutProvider = new LayoutProvider( index => { return ViewTypes.LISTITEM; }, (type, dim) => { dim.width = width; dim.height = 60; } )

class Proventos extends React.Component {
  
  constructor(props) {
    super(props)  
    this.state = {
      isModalVisible: false,
      isDtIniVisible: false,
      isDtFimVisible: false,
      txtFiltroDtIni: '',
      txtFiltroDtFim: '',
      txtFiltroAtivo: '',
      txtFiltroTipo: '',
      lstFiltroTipos: [{ id: 0, name: "Todos" }, { id: 1, name: "Dividendos" }, { id: 2, name: "Juros s/ Capital Próprio" }, { id: 3, name: "Rendimentos" }, { id: 4, name: "Restituição de Capital" }],
    }
    this.setModalVisible = this.setModalVisible.bind(this)
    this.setFiltroDtIni = this.setFiltroDtIni.bind(this)
    this.setFiltroDtFim = this.setFiltroDtFim.bind(this)
    this.setFiltroAtivo = this.setFiltroAtivo.bind(this)
    this.setFiltroTipo = this.setFiltroTipo.bind(this)
    this._HandleOnPressFiltro = this._HandleOnPressFiltro.bind(this)
    this._HandleOnPressItem = this._HandleOnPressItem.bind(this)
  }

  componentDidMount() {
    const txtCodAtivo = ''
    const txtTipoRend = ''
    const txtDataIni = moment().startOf('month')
    const txtDataFim = moment().endOf('year')
    this._CarregarDados(txtCodAtivo, txtTipoRend, moment(txtDataIni).format("YYYYMMDD"), moment(txtDataFim).format("YYYYMMDD")) 
    this._CarregarListas() 
    this.setFiltroDtIni(txtDataIni.toDate())
    this.setFiltroDtFim(txtDataFim.toDate())
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginLeft: 5, width: 50, borderColor: 'red', borderWidth: 0, }} onPress={() => this.setModalVisible(true) } >
          <Icon name="sliders" size={25} color="#fff" />
        </TouchableOpacity>
      ),
    })
  }

  componentWillUnmount() {
    this.props.limpaProventos()
  }

  componentDidUpdate(prevState, prevProps) {
    if (this.props.txtFiltroMsgErro != '') { 
      HelperToast.displayMsgError(this.props.txtFiltroMsgErro)
      this.props.modificaMsgProventos('')
    }
  }
  
  _HandleOnPressItem = (tipo, codigo, dtEx, dtPagto, qtd, vlrPreco, vlrPagto, corretora) => { 
    this.props.navigation.navigate('ProventosDetalhe', {tipo: tipo, codigo: codigo, dtEx: dtEx, dtPagto: dtPagto, qtd: qtd, vlrPreco: vlrPreco, vlrPagto: vlrPagto, corretora: corretora})
  }
  
  setModalVisible = (visible) => {
    this.setState({isModalVisible: visible})
  }  
  
  setModalDtIniVisible = (visible) => {
    this.setState({ isDtIniVisible: visible })
  }  
  
  setModalDtFimVisible = (visible) => {
    this.setState({ isDtFimVisible: visible })
  }  

  setFiltroDtIni = (date) => {
    this.setState({ isDtIniVisible: false, txtFiltroDtIni: date, })
  }

  setFiltroDtFim = (date) => {
    this.setState({ isDtFimVisible: false, txtFiltroDtFim: date, })
  }
  
  setFiltroAtivo(index, item) {
    this.setState({ txtFiltroAtivo: item.name })
  }
  
  setFiltroTipo(index, item) {
    this.setState({ txtFiltroTipo: item.name })
  }
  
  _HandleOnPressFiltro = () => {
    this.setState({ isModalVisible: false })
    const txtCodAtivo = this.state.txtFiltroAtivo.toString()
    const txtTipoRend = this.state.txtFiltroTipo.toString().substr(0, 1)
    const txtDataIni = typeof this.state.txtFiltroDtIni === 'string' ? moment(this.state.txtFiltroDtIni, 'DD/MM/YYYY').format("YYYYMMDD") : moment(this.state.txtFiltroDtIni).format("YYYYMMDD")  
    const txtDataFim = typeof this.state.txtFiltroDtFim === 'string' ? moment(this.state.txtFiltroDtFim, 'DD/MM/YYYY').format("YYYYMMDD") : moment(this.state.txtFiltroDtFim).format("YYYYMMDD")  
    this._CarregarDados(txtCodAtivo, txtTipoRend, txtDataIni, txtDataFim) 
  } 

  _CarregarDados = async (txtCodAtivo, txtTipoRend, txtDataIni, txtDataFim) => { 
    this.props.buscaListaProventos(txtCodAtivo, txtTipoRend, txtDataIni, txtDataFim) 
  }

  _DescarregarListas = async () => { 
    this.props.modificaLstProventos() 
  }

  _CarregarListas = async () => {
    this.props.buscaListaAtivosProventos() 
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ECF0F1', }}>
        
        <ProventosModalFiltro 
          isModalVisible={this.state.isModalVisible}
          isDtIniVisible={this.state.isDtIniVisible}
          isDtFimVisible={this.state.isDtFimVisible}
          txtFiltroDtIni={this.state.txtFiltroDtIni}
          txtFiltroDtFim={this.state.txtFiltroDtFim}
          txtFiltroAtivo={this.state.txtFiltroAtivo}
          lstFiltroAtivos={this.props.lstFiltroAtivos}
          txtFiltroTipo={this.state.txtFiltroTipo}
          lstFiltroTipos={this.state.lstFiltroTipos}
          setModalVisible={this.setModalVisible} 
          setModalDtIniVisible={this.setModalDtIniVisible} 
          setModalDtFimVisible={this.setModalDtFimVisible} 
          setFiltroDtIni={this.setFiltroDtIni} 
          setFiltroDtFim={this.setFiltroDtFim} 
          setFiltroAtivo={this.setFiltroAtivo} 
          setFiltroTipo={this.setFiltroTipo} 
          _HandleOnPressFiltro={this._HandleOnPressFiltro} 
        /> 

        {
          this.props.isLoadingProventos &&
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <ActivityIndicator color='#152d44' size='large' style={{ }} /> 
          </View>
        } 
         
        {
          !this.props.isLoadingProventos && this.props.dataProvider._data.length > 0 &&
          // <FlatList
          //     style={{ marginBottom: 0, }}
          //     data={this.props.lstProventos}
          //     scrollEnabled={true} 
          //     keyExtractor={(item, index) => index.toString()} // keyExtractor={(item, index) => item[8].toString()}
          //     ListEmptyComponent={() => <Text style={{ flex: 1, fontSize: 18, fontWeight: 'bold', marginTop: 20, textAlign: 'center', }}>{!this.props.isLoadingProventos && this.props.txtFiltroMsgErro == '' ? 'Nenhum registro encontrado...' : null}</Text>}
          //     renderItem={({item, index}) => <ProventosListaItem index={index} item={item} _HandleOnPressItem={this._HandleOnPressItem}/>} 
          //     initialNumToRender={30} // 10 = Quantos itens renderizar no lote inicial
          //     maxToRenderPerBatch={30} // 10 = quantidade de itens renderizados por lote
          //     windowSize={31} // 21 == 10 viewports acima, 10 abaixo e uma no meio)
          //     removeClippedSubviews={true} // Isso pode melhorar o desempenho de rolagem para listas grandes. // performance for large lists.
          //     updateCellsBatchingPeriod={50} // 50 = atraso em milissegundos entre as renderizações de lote
          //     showsVerticalScrollIndicator={false}
          //     viewabilityConfig={{ minimumViewTime: 300, viewAreaCoveragePercentThreshold: 100, }}
          //     refreshControl={<RefreshControl refreshing={false} onRefresh={() => { this._HandleOnPressFiltro() }} title="Carregando..." />}
          // /> 
          <RecyclerListView
            style={{ marginBottom: 0, }}
            contentContainerStyle={{ margin: 3 }}
            showsVerticalScrollIndicator={false}
            forceNonDeterministicRendering={false}
            canChangeSize={true}
            rowRenderer={(type, item, index) => <ProventosListaItem type={type} index={index} item={item} _HandleOnPressItem={this._HandleOnPressItem}/>}
            dataProvider={this.props.dataProvider}
            layoutProvider={layoutProvider}
            refreshControl={<RefreshControl refreshing={false} onRefresh={() => { this._HandleOnPressFiltro() }} title="Carregando..." />}
          />
        } 

      </SafeAreaView>
    )
  }

}

function ProventosListaItem (props) {
  
  const dtEx = moment(props.item[0]).format("DD/MM/YYYY")
  const dtPagto = moment(props.item[1]).format("DD/MM/YYYY")
  const codigo = props.item[2]
  const tipo = props.item[3]
  const corretora = props.item[4] || ''
  const qtd = HelperNumero.colcarFormacataoInteiro(props.item[5])
  const vlrPreco = props.item[6]
  const vlrPagto = props.item[7]
  // const id = props.item[8]
  // const situacao = props.item[9]
  // console.log('Key: ', props.item.Key)
    
  return(
    <View key={props.item[8]} style={{ flex: 1, backgroundColor: '#fff', borderRadius: 10, elevation: 1, height: 60, marginTop: 7, marginLeft: 7, marginRight: 7, }}>
      <TouchableOpacity style={{ flex: 1, flexDirection: "row", }} onPress={() => { props._HandleOnPressItem(tipo, codigo, dtEx, dtPagto, qtd, vlrPreco, vlrPagto, corretora) }} >
          <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', }}>
            <ImagemCustom src={{ uri: CONSTANTE.URL_IMG_ATIVO + codigo.substring(0,4) + '.gif', headers: {Pragma: 'force-cache'}, }}/>
          </View>
          <View style={{ flex: 2, justifyContent: 'center', }}>
            <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 5, }}>( {tipo.substring(0,1)} ) {codigo}</Text>
            <Text style={{ fontSize: 12, color: 'gray', }}>{dtPagto}</Text>
          </View>
          <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center', }}>
            <Text style={[{ fontSize: 16, fontWeight: 'bold',  color: 'green' }, ( props.item[1] >= dtAtual) && {color:'gray'}]}>R$ {vlrPagto}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <Icon name="chevron-right" size={12} color="gray" />
          </View>
      </TouchableOpacity>
    </View>
  )
    
}

class ImagemCustom extends React.PureComponent {
  constructor(props) {
    super(props)  
    this.state = { src: imgDefault, }
  }
  componentDidMount() {
    this.setState({ src: this.props.src, })
  }
  loadFallback(){ 
    this.setState({ src: imgDefault, })
  }
  render() {
    return <Image source={this.state.src} style={{ width: 40, height: 40, }} onError={ () => this.loadFallback() }/> 
  }
}

function ProventosModalFiltro (props) {
  return(
    <Modal
      style={{ justifyContent: 'flex-end', margin: 0, }}
      isVisible={props.isModalVisible}
      animationInTiming={1000}
      animationOutTiming={1000}
      backdropTransitionInTiming={800}
      backdropTransitionOutTiming={800}
      swipeDirection={['up', 'left', 'right', 'down']}
      onSwipeComplete={() => props.setModalVisible(!props.isModalVisible)}
      onBackdropPress={() => props.setModalVisible(!props.isModalVisible)}
    >  
      <View style={{ padding: 22, borderTopStartRadius: 20, borderTopEndRadius: 20, borderColor: 'rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', }} >

        {props.isDtIniVisible && (<DateTimePicker value={props.txtFiltroDtIni} display="calendar" onChange={(event, date) => props.setFiltroDtIni(date)} />)}

        {props.isDtFimVisible && (<DateTimePicker value={props.txtFiltroDtFim} display="calendar" onChange={(event, date) => props.setFiltroDtFim(date)} />)}
        
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#666666', marginBottom: 15, }}>Filtrar</Text>

        <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#666666', marginBottom: 4, }}>Período de Pagto:</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, }} >
          <TouchableOpacity onPress={() => props.setModalDtIniVisible(!props.isDtIniVisible) } style={{ }} >
            <TextInput editable={false} style={{ textAlign: 'center', width: 120, borderColor: "#000", borderWidth: 1, height: 35, shadowOpacity: 1.0, shadowRadius: 5, shadowOffset: { width: 1, height: 1 }, borderRadius: 5, }} value={moment(props.txtFiltroDtIni).format("DD/MM/YYYY")} />       
          </TouchableOpacity>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#666666', marginHorizontal: 5, }}> à </Text>
          <TouchableOpacity onPress={() => props.setModalDtFimVisible(!props.isDtFimVisible) } style={{ }} >
            <TextInput editable={false} style={{ textAlign: 'center', width: 120, borderColor: "#000", borderWidth: 1, height: 35, shadowOpacity: 1.0, shadowRadius: 5, shadowOffset: { width: 1, height: 1 }, borderRadius: 5, }} value={moment(props.txtFiltroDtFim).format("DD/MM/YYYY")} />       
          </TouchableOpacity>
        </View>
        
        <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#666666', }}>Ativo:</Text>
        
        <RNPicker
          dataSource={props.lstFiltroAtivos}
          dummyDataSource={props.lstFiltroAtivos}
          defaultValue={false}
          pickerTitle={"Selecione o Ativo..."}
          showSearchBar={true}
          disablePicker={false}
          changeAnimation={"none"}
          searchBarPlaceHolder={"Procurar....."}
          showPickerTitle={true}
          searchBarContainerStyle={{ marginBottom: 10, flexDirection: "row", height: 40, shadowOpacity: 1.0, shadowRadius: 5, shadowOffset: { width: 1, height: 1 }, backgroundColor: "rgba(255,255,255,1)", shadowColor: "#d3d3d3", borderRadius: 10, elevation: 3, marginLeft: 10, marginRight: 10 }}
          pickerStyle={{ marginTop: 5, marginLeft: 12, elevation: 3, paddingRight: 25, marginBottom: 10, shadowOpacity: 1.0, shadowOffset: { width: 1, height: 1 }, borderWidth:1, shadowRadius: 10, backgroundColor: "rgba(255,255,255,1)", shadowColor: "#d3d3d3", borderRadius: 5, flexDirection: "row" }}
          itemSeparatorStyle={{ height: 1, width: "90%", alignSelf: "center", backgroundColor: "#D3D3D3" }}
          pickerItemTextStyle={{ color: "#000", marginVertical: 10, flex: 0.9, marginLeft: 20, marginHorizontal: 10, textAlign: "left" }}
          selectedLabel={props.txtFiltroAtivo}
          placeHolderLabel={"Selecione..."}
          selectLabelTextStyle={{ color: "#000", textAlign: "left", width: "99%", padding: 10, flexDirection: "row" }}
          placeHolderTextStyle={{ color: "#d3d3d3", padding: 10, textAlign: "left", width: "99%", flexDirection: "row" }}
          selectedValue={(index, item) => props.setFiltroAtivo(index, item)}
        />
        
        <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#666666', }}>Tipo:</Text> 
        
        <RNPicker
          dataSource={props.lstFiltroTipos}
          dummyDataSource={props.lstFiltroTipos}
          defaultValue={false}
          pickerTitle={"Selecione o Tipo..."}
          showSearchBar={false}
          disablePicker={false}
          changeAnimation={"none"}
          searchBarPlaceHolder={"Procurar....."}
          showPickerTitle={true}
          searchBarContainerStyle={{ marginBottom: 10, flexDirection: "row", height: 40, shadowOpacity: 1.0, shadowRadius: 5, shadowOffset: { width: 1, height: 1 }, backgroundColor: "rgba(255,255,255,1)", shadowColor: "#d3d3d3", borderRadius: 10, elevation: 3, marginLeft: 10, marginRight: 10 }}
          pickerStyle={{ marginTop: 5, marginLeft: 12, elevation: 3, paddingRight: 25, marginBottom: 10, shadowOpacity: 1.0, shadowOffset: { width: 1, height: 1 }, borderWidth:1, shadowRadius: 10, backgroundColor: "rgba(255,255,255,1)", shadowColor: "#d3d3d3", borderRadius: 5, flexDirection: "row" }}
          itemSeparatorStyle={{ height: 1, width: "90%", alignSelf: "center", backgroundColor: "#D3D3D3" }}
          pickerItemTextStyle={{ color: "#000", marginVertical: 10, flex: 0.9, marginLeft: 20, marginHorizontal: 10, textAlign: "left" }}
          selectedLabel={props.txtFiltroTipo}
          placeHolderLabel={"Selecione..."}
          selectLabelTextStyle={{ color: "#000", textAlign: "left", width: "99%", padding: 10, flexDirection: "row" }}
          placeHolderTextStyle={{ color: "#D3D3D3", padding: 10, textAlign: "left", width: "99%", flexDirection: "row" }}
          selectedValue={(index, item) => props.setFiltroTipo(index, item)}
        />
        
        <TouchableOpacity style={{ marginTop: 15, marginBottom: 10, backgroundColor: '#152d44', width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }} onPress={() => props._HandleOnPressFiltro() } >
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>APLICAR FILTRO</Text>
        </TouchableOpacity>

      </View>
    </Modal> 
  )
    
}

const mapStateToProps = state => ({
  lstFiltroAtivos: state.proventos.lstFiltroAtivos,
  txtFiltroMsgErro: state.proventos.txtFiltroMsgErro,
  lstProventos: state.proventos.lstProventos,
  dataProvider: state.proventos.dataProvider,  
  isLoadingProventos: state.proventos.isLoadingProventos,
})

const mapDispatchToProps = { limpaProventos, modificaMsgProventos, buscaListaAtivosProventos, buscaListaProventos, }

export default connect(mapStateToProps, mapDispatchToProps)(Proventos)
