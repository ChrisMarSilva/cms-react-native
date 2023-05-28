import React from 'react';
import { View, Text,  FlatList, TouchableOpacity, Picker, } from 'react-native';
import { Container, Content, DatePicker, } from "native-base";
import { connect } from 'react-redux';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";
import moment from 'moment';

import styles from './styles';
import * as HelperLog from '../../util/HelperLog';
import * as HelperDate from '../../util/HelperDate';
import * as HelperNumero from '../../util/HelperNumero';
import {  modificaFiltroDtIni,modificaFiltroDtFim, modificaFiltroTipo, modificaFiltroAtivo, buscaListaFiltroAtivos, buscaListaProventos, } from '../../actions/ProventosActions';

class Proventos extends React.Component {
  
    constructor(props){
        super(props);  

        // HelperLog.entrada('Proventos.constructor');
        try {
        
            this.state = { isModalVisible: false, };

            this.setModalVisible       = this.setModalVisible.bind(this);
            this.setFiltroDtIni        = this.setFiltroDtIni.bind(this);
            this.setFiltroDtFim        = this.setFiltroDtFim.bind(this);
            this.setFiltroTipo         = this.setFiltroTipo.bind(this);
            this.setFiltroAtivo        = this.setFiltroAtivo.bind(this);
            this._buscarListaProventos = this._buscarListaProventos.bind(this);  

        }catch(err) {
            // HelperLog.erro('Proventos.constructor', err.message);
        }finally {
            // HelperLog.saida('Proventos.constructor');
        }
    }

    componentWillMount() {  
        // HelperLog.entrada('Proventos.componentWillMount');
        try {
            

            const ativo = '';
            const tipo  = '';
            const dtIni = HelperDate.getPrimeiraDataMes();
            const dtFim = HelperDate.getUltimaDataAno();    
            
            this.setModalVisible(false); 
            this.setFiltroAtivo(ativo); 
            this.setFiltroTipo(tipo); 
            this.setFiltroDtIni( new Date(dtIni+'T23:59:59') ); 
            this.setFiltroDtFim( new Date(dtFim+'T23:59:59') ); 
            
            const txtEmail = this.props.txtEmail;
            const txtSenha = this.props.txtSenha;
            this.props.buscaListaFiltroAtivos(txtEmail, txtSenha);

            this._buscarListaProventos( ativo, tipo, dtIni, dtFim );

        }catch(err) {
            // HelperLog.erro('Proventos.componentWillMount', err.message);
        }finally {
            // HelperLog.saida('Proventos.componentWillMount');
        }
    }

    componentDidMount() {
        // HelperLog.entrada('Proventos.componentDidMount');
        try {

            this.props.navigation.setParams({ setModalVisible: this.setModalVisible });

        }catch(err) {
            // HelperLog.erro('Proventos.componentDidMount', err.message);
        }finally {
            // HelperLog.saida('Proventos.componentDidMount');
        }
    }

    componentWillUnmount() {
        // HelperLog.entrada('Proventos.componentWillUnmount');
        try {

        }catch(err) {
            // HelperLog.erro('Proventos.componentWillUnmount', err.message);
        }finally {
            // HelperLog.saida('Proventos.componentWillUnmount');
        }
    }

    _buscarListaProventos = (ativo, tipo, dtIni, dtFim ) => {
         //HelperLog.entrada('Proventos._buscarListaProventos');
        try {
           
        // HelperLog.texto('Proventos._buscarListaProventos.ativo: '+ ativo);
        // HelperLog.texto('Proventos._buscarListaProventos.tipo: '+ tipo);

            const txtEmail    = this.props.txtEmail;
            const txtSenha    = this.props.txtSenha; 
            this.props.buscaListaProventos(txtEmail, txtSenha, ativo, tipo, moment(dtIni).format("YYYYMMDD"), moment(dtFim).format("YYYYMMDD") ); 

        }catch(err) {
             //HelperLog.erro('Proventos._buscarListaProventos', err.message);
        }finally {
            // HelperLog.saida('Proventos._buscarListaProventos');
        }
    }
    
    setModalVisible = (visible) => {
        this.setState({isModalVisible: visible});
    }

    setFiltroAtivo = (value) => {
        this.props.modificaFiltroAtivo(value);
    }
    
    setFiltroTipo = (value) => {
        this.props.modificaFiltroTipo(value);
    }
    
    setFiltroDtIni = (value) => {
        // HelperLog.texto('Proventos.setFiltroDtIni', value);
        this.props.modificaFiltroDtIni(value);
    }
    
    setFiltroDtFim = (value) => {
        // HelperLog.texto('Proventos.setFiltroDtFim', value);
        this.props.modificaFiltroDtFim(value);
    }

    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state; 
        return {
            headerRight: (
                <TouchableOpacity style={styles.iconeHeader} onPress={ ()=>{ params.setModalVisible(true); } } >  
                    <Ionicons name="md-options" size={25} color='#fff' /> 
                </TouchableOpacity> 
            )
        };
    };

    render() {

        // HelperLog.entrada('Proventos.render');

        return (
            <Container> 

                <ProventosModalFiltro 
                    isModalVisible={this.state.isModalVisible}
                    setModalVisible={this.setModalVisible} 
                    lstFiltroAtivos={this.props.lstFiltroAtivos} 
                    txtFiltroDtIni={this.props.txtFiltroDtIni} 
                    txtFiltroDtFim={this.props.txtFiltroDtFim} 
                    txtFiltroTipo={this.props.txtFiltroTipo} 
                    txtFiltroAtivo={this.props.txtFiltroAtivo} 
                    setFiltroDtIni={this.setFiltroDtIni} 
                    setFiltroDtFim={this.setFiltroDtFim} 
                    setFiltroTipo={this.setFiltroTipo} 
                    setFiltroAtivo={this.setFiltroAtivo} 
                    _buscarListaProventos={this._buscarListaProventos} 
                /> 

                <ProventosLista 
                    lista={this.props.lstProventos} 
                    isLoading={this.props.isLoadingProventos} 
                    msgErro={this.props.txtFiltroMsgErro} 
                />  

            </Container>
        );

    }

}

const ProventosModalFiltro = (props) => (
    <Modal isVisible={props.isModalVisible} onSwipe={ () => { props.setModalVisible(!props.isModalVisible); } } onBackdropPress={ () => { props.setModalVisible(!props.isModalVisible); } } >    
        <View padder style={styles.ModalInsideView}>

            <Text style={styles.TextStyle}>Filtro</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 30, }}>

                <View style={{ flex: 1, }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color:'#666666', }}>Dt. Inicial: </Text>
                    <DatePicker
                            locale={"pt-BR"}
                            style={{width: 180}}        
                            modalTransparent={false}
                            animationType={"fade"}
                            androidMode={"default"}
                            placeHolderText={moment(props.txtFiltroDtIni).format("DD/MM/YYYY")} 
                            textStyle={{ color: "green" }}
                            placeHolderTextStyle={{ color: "#d3d3d3" }}
                            timeZoneOffsetInMinutes={undefined}
                            date={props.txtFiltroDtIni}   
                            defaultDate={props.txtFiltroDtIni}   
                            mode="date"
                            format="DD/MM/YYYY"
                            confirmBtnText="Confirmar"
                            cancelBtnText="Cancelar"
                            onDateChange={ (value) => props.setFiltroDtIni(value) }
                    />
                </View>
                
                <View style={{ flex: 1, }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color:'#666666', }}>Dt. Final: </Text>
                    <DatePicker
                            locale={"pt-BR"}
                            style={{width: 180}}
                            modalTransparent={false}
                            animationType={"fade"}
                            androidMode={"default"}
                            placeHolderText={moment(props.txtFiltroDtFim).format("DD/MM/YYYY")}  
                            textStyle={{ color: "green" }}
                            placeHolderTextStyle={{ color: "#d3d3d3" }}
                            timeZoneOffsetInMinutes={undefined}
                            date={props.txtFiltroDtFim}   
                            defaultDate={props.txtFiltroDtFim}   
                            mode="date"
                            format="DD/MM/YYYY"
                            confirmBtnText="Confirmar"
                            cancelBtnText="Cancelar"
                            onDateChange={ (value) => props.setFiltroDtFim(value) }
                    />
                </View>
               
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 30, }}>

                <View style={{ flex: 1, }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color:'#666666', }}>Ativo: </Text>
                    <Picker selectedValue={props.txtFiltroAtivo} onValueChange={(itemValue, itemIndex) => props.setFiltroAtivo(itemValue) }>
                        <Picker.Item label="Todos" value="" />
                        { props.lstFiltroAtivos.map( (item) => <Picker.Item label={item[0]} value={item[0]} key={item[0]} /> ) }
                    </Picker> 
                </View>
                
                <View style={{ flex: 1, }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color:'#666666', }}>Tipo: </Text>
                    <Picker selectedValue={props.txtFiltroTipo} onValueChange={(itemValue, itemIndex) => props.setFiltroTipo(itemValue) }>
                        <Picker.Item label="Todos"            value="" />
                        <Picker.Item label="Dividendos"       value="D" />
                        <Picker.Item label="Juros s/ Capital" value="J" />
                    </Picker>
                </View>
               
            </View>

            <TouchableOpacity style={styles.BtnFiltrar} onPress={() => { props.setModalVisible(!props.isModalVisible); props._buscarListaProventos(props.txtFiltroAtivo, props.txtFiltroTipo, props.txtFiltroDtIni, props.txtFiltroDtFim); }} >
                <Text style={styles.BtnFiltrarText}>Filtrar</Text>
            </TouchableOpacity>

        </View>
    </Modal> 
);

const ProventosLista = (props) => (
    <Content padder style={{backgroundColor: 'transparent'}}> 

        { props.msgErro != '' ? <Text style={styles.TxtErro}> {props.msgErro}</Text> : null }

        { 
            props.isLoading 
            ? 
            <ProventosListaItemShimmer />  
            : 
           <FlatList 
                style={{ marginBottom: 20, }}
                data={props.lista}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={ () => <Text style={{textAlign: 'center'}}>{ !props.isLoading ? 'Nenhum registro encontrado...' : null}</Text> }
                renderItem={ ({item}) => ( <ProventosListaItem item={item} />  )}
            /> 

        }

    </Content>
);

const ProventosListaItem = (props) => {

    const provDtPagto  = HelperDate.colcarFormacataoData(props.item[1]);
    const provAtivo    = props.item[2];
    const provTipo     = props.item[3];    
    const provQuant    = HelperNumero.colcarFormacataoInteiro(props.item[5]);
    const provPreco    = props.item[6];
    const provTotal    = props.item[7];

    return (
        <View style={styles.LstContainer}>

            <View style={styles.LstContainerTit}>
                <Text style={[styles.LstTxtTit, { flex: 1, fontWeight: 'bold', }]}>{provAtivo}</Text>
                <Text style={[styles.LstTxtTit, { flex: 2, }]}>{provTipo}</Text>
                <Text style={[styles.LstTxtTit, { flex: 2, }]}>{provDtPagto}</Text>
            </View>            

            <View style={styles.LstContainerVal}>

                <View style={[styles.LstContainerValSub, { flex: 1,}]}>
                    <Text style={[styles.LstTxtValTitulo]}>Quant.</Text>
                    <Text style={[styles.LstTxtValValor]}>{provQuant}</Text>
                </View>
                
                <View style={[styles.LstContainerValSub, { flex: 2,}]}>
                    <Text style={[styles.LstTxtValTitulo]}>Preço</Text>
                    <Text style={[styles.LstTxtValValor]}>R$ {provPreco}</Text>
                </View>
                
                <View style={[styles.LstContainerValSub, { flex: 2,}]}>
                    <Text style={[styles.LstTxtValTitulo]}>Total</Text>
                    <Text style={[styles.LstTxtValTotal]}>R$ {provTotal}</Text>
                </View>

            </View>

        </View>
    )
};

const ProventosListaItemShimmer = (props) => (
    <View style={styles.LstContainer}>
         
        <View style={styles.LstContainerTit}>
            <View style={{ alignItems: "flex-start", flex: 1, marginBottom: 5 }}>
                <ShimmerPlaceHolder autoRun={true} visible={false} width={50} />
            </View>
            <View style={{ alignItems: "flex-start", flex: 2, marginBottom: 5 }}>
                <ShimmerPlaceHolder autoRun={true} visible={false} width={100} />
            </View>
            <View style={{ alignItems: "flex-start", flex: 2, marginBottom: 5 }}>
                <ShimmerPlaceHolder autoRun={true} visible={false} width={100} />
            </View>
        </View>
        
        <View style={styles.LstContainerVal}>

            <View style={[styles.LstContainerValSub, { alignItems: "flex-start", flex: 1,}]}>
                <ShimmerPlaceHolder autoRun={true} visible={false} style={{ marginBottom: 5 }} width={40} />
                <ShimmerPlaceHolder autoRun={true} visible={false} style={{ marginBottom: 5 }} width={70} />
            </View>
            
            <View style={[styles.LstContainerValSub, { alignItems: "flex-start", flex: 2,}]}>
                <ShimmerPlaceHolder autoRun={true} visible={false} style={{ marginBottom: 5 }} width={90} />
                <ShimmerPlaceHolder autoRun={true} visible={false} style={{ marginBottom: 5 }} width={140} />
            </View>
            
            <View style={[styles.LstContainerValSub, { alignItems: "flex-start", flex: 2,}]}>
                <ShimmerPlaceHolder autoRun={true} visible={false} style={{ marginBottom: 5 }} width={90} />
                <ShimmerPlaceHolder autoRun={true} visible={false} style={{ marginBottom: 5 }} width={140} />
            </View>

        </View>

    </View>
);

const mapStateToProps = state => ({
    txtEmail           : state.AuthReducer.txtEmail,
    txtSenha           : state.AuthReducer.txtSenha,
    
    lstFiltroAtivos    : state.ProventosReducer.lstFiltroAtivos,
    txtFiltroDtIni     : state.ProventosReducer.txtFiltroDtIni,
    txtFiltroDtFim     : state.ProventosReducer.txtFiltroDtFim,
    txtFiltroTipo      : state.ProventosReducer.txtFiltroTipo,
    txtFiltroAtivo     : state.ProventosReducer.txtFiltroAtivo,
    txtFiltroMsgErro   : state.ProventosReducer.txtFiltroMsgErro,

    lstProventos       : state.ProventosReducer.lstProventos,
    isLoadingProventos : state.ProventosReducer.isLoadingProventos,
});

const mapDispatchToProps = { modificaFiltroDtIni, modificaFiltroDtFim, modificaFiltroTipo, modificaFiltroAtivo, buscaListaFiltroAtivos, buscaListaProventos, };

export default connect(mapStateToProps, mapDispatchToProps)(Proventos);
