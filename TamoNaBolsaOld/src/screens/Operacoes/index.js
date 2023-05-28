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
import { modificaFiltroDtIni, modificaFiltroDtFim, modificaFiltroAtivo, buscaListaFiltroAtivos, buscaListaOperacoes, } from '../../actions/OperacoesActions';

class Operacoes extends React.Component {
  
    constructor(props){
        super(props);  

        // HelperLog.entrada('Operacoes.constructor');
        try {
        
            this.state = { isModalVisible: false, };

            this.setModalVisible       = this.setModalVisible.bind(this);
            this.setFiltroDtIni        = this.setFiltroDtIni.bind(this);
            this.setFiltroDtFim        = this.setFiltroDtFim.bind(this);
            this.setFiltroAtivo        = this.setFiltroAtivo.bind(this);
            this._buscarListaOperacoes = this._buscarListaOperacoes.bind(this);  

        }catch(err) {
            // HelperLog.erro('Operacoes.constructor', err.message);
        }finally {
            // HelperLog.saida('Operacoes.constructor');
        }
    }

    componentWillMount() {  
        // HelperLog.entrada('Operacoes.componentWillMount');
        try {
            
            const ativo = '';
            const dtIni = HelperDate.getPrimeiraDataMes();
            const dtFim = HelperDate.getUltimaDataAno();    
            
            this.setModalVisible(false); 
            this.setFiltroAtivo(ativo); 
            this.setFiltroDtIni( new Date(dtIni+'T23:59:59') ); 
            this.setFiltroDtFim( new Date(dtFim+'T23:59:59') );  

            const txtEmail = this.props.txtEmail;
            const txtSenha = this.props.txtSenha;
            this.props.buscaListaFiltroAtivos(txtEmail, txtSenha);

            this._buscarListaOperacoes( ativo, dtIni, dtFim );

        }catch(err) {
            // HelperLog.erro('Operacoes.componentWillMount', err.message);
        }finally {
            // HelperLog.saida('Operacoes.componentWillMount');
        }
    }

    componentDidMount() {
        // HelperLog.entrada('Operacoes.componentDidMount');
        try {

            this.props.navigation.setParams({ setModalVisible: this.setModalVisible });

        }catch(err) {
            // HelperLog.erro('Operacoes.componentDidMount', err.message);
        }finally {
            // HelperLog.saida('Operacoes.componentDidMount');
        }
    }

    componentWillUnmount() {
        // HelperLog.entrada('Operacoes.componentWillUnmount');
        try {

        }catch(err) {
            // HelperLog.erro('Operacoes.componentWillUnmount', err.message);
        }finally {
            // HelperLog.saida('Operacoes.componentWillUnmount');
        }
    }

    _buscarListaOperacoes = (ativo, dtIni, dtFim ) => {
        // HelperLog.entrada('Operacoes._buscarListaOperacoes');
        try {
           
            const txtEmail    = this.props.txtEmail;
            const txtSenha    = this.props.txtSenha; 
            this.props.buscaListaOperacoes(txtEmail, txtSenha, ativo, moment(dtIni).format("YYYYMMDD"), moment(dtFim).format("YYYYMMDD") ); 

        }catch(err) {
            // HelperLog.erro('Operacoes._buscarListaOperacoes', err.message);
        }finally {
            // HelperLog.saida('Operacoes._buscarListaOperacoes');
        }
    }

    setModalVisible = (visible) => {
        this.setState({isModalVisible: visible});
    }

    setFiltroAtivo = (value) => {
        this.props.modificaFiltroAtivo(value);
    }
    
    setFiltroDtIni = (value) => {
        // HelperLog.texto('Operacoes.setFiltroDtIni', value);
        this.props.modificaFiltroDtIni(value);
    }
    
    setFiltroDtFim = (value) => {
        // HelperLog.texto('Operacoes.setFiltroDtFim', value);
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

        // HelperLog.entrada('Operacoes.render');

        return (
            <Container> 

                <OperacoesModalFiltro 
                    isModalVisible={this.state.isModalVisible}
                    setModalVisible={this.setModalVisible} 
                    lstFiltroAtivos={this.props.lstFiltroAtivos} 
                    txtFiltroDtIni={this.props.txtFiltroDtIni} 
                    txtFiltroDtFim={this.props.txtFiltroDtFim} 
                    txtFiltroAtivo={this.props.txtFiltroAtivo} 
                    setFiltroDtIni={this.setFiltroDtIni} 
                    setFiltroDtFim={this.setFiltroDtFim} 
                    setFiltroAtivo={this.setFiltroAtivo} 
                    _buscarListaOperacoes={this._buscarListaOperacoes} 
                /> 

                <OperacoesLista 
                    lista={this.props.lstOperacoes} 
                    isLoading={this.props.isLoadingOperacoes} 
                    msgErro={this.props.txtFiltroMsgErro} 
                />  

            </Container>
        );

    }

}

const OperacoesModalFiltro = (props) => (
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
               
            </View>

            <TouchableOpacity style={styles.BtnFiltrar} onPress={() => { props.setModalVisible(!props.isModalVisible); props._buscarListaOperacoes(props.txtFiltroAtivo, props.txtFiltroDtIni, props.txtFiltroDtFim); }} >
                <Text style={styles.BtnFiltrarText}>Filtrar</Text>
            </TouchableOpacity>

        </View>
    </Modal> 
);

const OperacoesLista = (props) => (
    <Content padder style={{backgroundColor: 'transparent'}}> 

        { props.msgErro != '' ? <Text style={styles.TxtErro}> {props.msgErro}</Text> : null }

        { 
            props.isLoading 
            ? 
            <OperacoesListaItemShimmer />  
            : 
           <FlatList 
                style={{ marginBottom: 20, }}
                data={props.lista}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={ () => <Text style={{textAlign: 'center'}}>{ !props.isLoading ? 'Nenhum registro encontrado...' : null}</Text> }
                renderItem={ ({item}) => ( <OperacoesListaItem item={item} />  )}
            /> 

        }

    </Content>
);

const OperacoesListaItem = (props) => {

    const operData         = HelperDate.colcarFormacataoData(props.item[0]);
    const operTipo         = props.item[1];  
    const operAtivo        = props.item[2];  
    const operQuant        = HelperNumero.colcarFormacataoInteiro(props.item[3]);
    const operPreco        = props.item[4];
    //const operCorretora    = props.item[5];
    // const operTxCorretagem = props.item[6];
    // const operTxTotal      = props.item[7];
    const operTotal        = props.item[8];
    //const operCusto        = props.item[9];
    //const operId           = props.item[10];

    return (
        <View style={styles.LstContainer}>

            <View style={styles.LstContainerTit}>
                <Text style={[styles.LstTxtTit, { flex: 1, }]}>{operData}</Text>
                <Text style={[styles.LstTxtTit, { flex: 1, fontWeight: 'bold', }, (operTipo=='Compra') && {color:'green', }, (operTipo=='Venda') && {color:'red', } ]}>{operTipo}</Text>
                <Text style={[styles.LstTxtTit, { flex: 2, fontWeight: 'bold', }]}>{operAtivo}</Text>
            </View>            

            <View style={styles.LstContainerVal}>

                <View style={[styles.LstContainerValSub, { flex: 1,}]}>
                    <Text style={[styles.LstTxtValTitulo]}>Quant.</Text>
                    <Text style={[styles.LstTxtValValor]}>{operQuant}</Text>
                </View>
                
                <View style={[styles.LstContainerValSub, { flex: 1,}]}>
                    <Text style={[styles.LstTxtValTitulo]}>Preço</Text>
                    <Text style={[styles.LstTxtValValor]}>R$ {operPreco}</Text>
                </View>
                
                <View style={[styles.LstContainerValSub, { flex: 2,}]}>
                    <Text style={[styles.LstTxtValTitulo]}>Total</Text>
                    <Text style={[styles.LstTxtValTotal]}>R$ {operTotal}</Text>
                </View>

            </View>

        </View>
    )
};

const OperacoesListaItemShimmer = (props) => (
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

    lstFiltroAtivos    : state.OperacoesReducer.lstFiltroAtivos,
    txtFiltroDtIni     : state.OperacoesReducer.txtFiltroDtIni,
    txtFiltroDtFim     : state.OperacoesReducer.txtFiltroDtFim,
    txtFiltroAtivo     : state.OperacoesReducer.txtFiltroAtivo,
    txtFiltroMsgErro   : state.OperacoesReducer.txtFiltroMsgErro,

    lstOperacoes       : state.OperacoesReducer.lstOperacoes,
    isLoadingOperacoes : state.OperacoesReducer.isLoadingOperacoes,
});

const mapDispatchToProps = { modificaFiltroDtIni, modificaFiltroDtFim, modificaFiltroAtivo, buscaListaFiltroAtivos, buscaListaOperacoes, };

export default connect(mapStateToProps, mapDispatchToProps)(Operacoes);