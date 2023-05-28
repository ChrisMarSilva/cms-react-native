import React from 'react';
import { View, FlatList, Picker, TouchableOpacity, Text, } from 'react-native';
import { Container, Content, Tab, Tabs, } from "native-base";
import { connect } from 'react-redux';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";

import styles from './styles';
import { modificaFiltroAno, buscaListaFiltroAnos, buscaListaApuracao, } from '../../actions/ApuracaoActions';
import * as HelperLog from '../../util/HelperLog';
import * as HelperDate from '../../util/HelperDate';

class Apuracao extends React.Component {
  
    constructor(props){
        super(props);  

        // HelperLog.entrada('Apuracao.constructor');
        try {
        
            this.state = { isModalVisible: false, };

            this.setModalVisible     = this.setModalVisible.bind(this);
            this.setFiltroAno        = this.setFiltroAno.bind(this);
            this._buscaListaApuracao = this._buscaListaApuracao.bind(this);            

        }catch(err) {
            // HelperLog.erro('Apuracao.constructor', err.message);
        }finally {
            // HelperLog.saida('Apuracao.constructor');
        }
    }

    componentWillMount() {  
        // HelperLog.entrada('Apuracao.componentWillMount');
        try {
        
            this.setModalVisible(false); 

            const txtEmail = this.props.txtEmail;
            const txtSenha = this.props.txtSenha;
            this.props.buscaListaFiltroAnos( txtEmail, txtSenha );
            this._buscaListaApuracao( HelperDate.getAnoAtual() );

        }catch(err) {
            // HelperLog.erro('Apuracao.componentWillMount', err.message);
        }finally {
            // HelperLog.saida('Apuracao.componentWillMount');
        }
    }

    componentDidMount() {
        // HelperLog.entrada('Apuracao.componentDidMount');
        try {
        
            this.props.navigation.setParams({ setModalVisible: this.setModalVisible });

        }catch(err) {
            // HelperLog.erro('Apuracao.componentDidMount', err.message);
        }finally {
            // HelperLog.saida('Apuracao.componentDidMount');
        }
    }

    componentWillUnmount() {
        // HelperLog.entrada('Apuracao.componentWillUnmount');
        try {

        }catch(err) {
            // HelperLog.erro('Apuracao.componentWillUnmount', err.message);
        }finally {
            // HelperLog.saida('Apuracao.componentWillUnmount');
        }
    }

    _buscaListaApuracao = (ano) => {
        // HelperLog.entrada('Apuracao._buscaListaApuracao');
        try {
 
            const txtEmail = this.props.txtEmail;
            const txtSenha = this.props.txtSenha; 
            this.props.buscaListaApuracao(txtEmail, txtSenha, 'C', ano);
            this.props.buscaListaApuracao(txtEmail, txtSenha, 'D', ano);

        }catch(err) {
            // HelperLog.erro('Apuracao._buscaListaApuracao', err.message);
        }finally {
            // HelperLog.saida('Apuracao._buscaListaApuracao');
        }
    }
    
    setFiltroAno = (value) => {
        this.props.modificaFiltroAno(value);
    }
    
    setModalVisible = (value) => {
        this.setState({isModalVisible: value});
    }

    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state; //const params = navigation.state.params || {};
        return {
            headerRight: (
                <TouchableOpacity style={styles.iconeHeader} onPress={ ()=>{ params.setModalVisible(true); } } >  
                    <Ionicons name="md-options" size={25} color='#fff' /> 
                </TouchableOpacity> 
            )
        };
    };
    
    render() {

        // HelperLog.entrada('Apuracao.render');
            
        return (    
            <Container>    

                <ApuracaoModalFiltro 
                    isModalVisible={this.state.isModalVisible}
                    setModalVisible={this.setModalVisible} 
                    lstFiltroAnos={this.props.lstFiltroAnos} 
                    txtFiltroAno={this.props.txtFiltroAno} 
                    setFiltroAno={this.setFiltroAno} 
                    _buscaListaApuracao={this._buscaListaApuracao} 
                /> 

                <Tabs initialPage={0} onChangeTab={ ({i}) => {} }> 
                    <Tab 
                        heading="Comum" 
                        textStyle={{color: '#fff'}} 
                        tabStyle={{backgroundColor: '#353535'}} 
                        activeTabStyle={{backgroundColor: '#353535'}}
                    >
                        <ApuracaoLista 
                            nome="Comum" 
                            lista={this.props.lstApuracaoC} 
                            isLoading={this.props.isLoadingApuracaoC} 
                            msgErro={this.props.txtFiltroMsgErro} 
                        />    
                    </Tab>
                    <Tab 
                        heading="Day-Trade"  
                        textStyle={{color: '#fff'}} 
                        tabStyle={{backgroundColor: '#353535'}} 
                        activeTabStyle={{backgroundColor: '#353535'}}
                    >
                        <ApuracaoLista 
                            nome="Day-Trade" 
                            lista={this.props.lstApuracaoD} 
                            isLoading={this.props.isLoadingApuracaoD} 
                            msgErro={this.props.txtFiltroMsgErro} 
                        /> 
                    </Tab>
                </Tabs>

            </Container>
        );

    }

}

const ApuracaoModalFiltro = (props) => (
    <Modal isVisible={props.isModalVisible} onSwipe={ () => { props.setModalVisible(!props.isModalVisible); } } onBackdropPress={ () => { props.setModalVisible(!props.isModalVisible); } } >    
        <View padder style={styles.ModalInsideView}>

            <Text style={styles.TextStyle}>Filtro</Text>
            
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 30, }}>
                <Text style={{ paddingLeft: 10, marginRight: 10, fontSize: 16, fontWeight: 'bold', color:'#666666', }}>Ano: </Text>
                <Picker
                    note
                    mode="dropdown"
                    style={{ width: 150, alignSelf: 'center' }}
                    selectedValue={props.txtFiltroAno}
                    //onValueChange={ ()=>{ props.setFiltroAno.bind(this); } }
                    onValueChange={ (itemValue, itemIndex) => props.setFiltroAno(itemValue) } 
                >
                    <Picker.Item label="Todos" value="" />
                    { props.lstFiltroAnos.map( (item) => <Picker.Item label={item} value={item} key={item} /> ) }
                </Picker>
            </View>

            <TouchableOpacity style={styles.BtnFiltrar} onPress={() => {  props.setModalVisible(!props.isModalVisible); props._buscaListaApuracao(props.txtFiltroAno); }} >
                <Text style={styles.BtnFiltrarText}>Filtrar</Text>
            </TouchableOpacity>

        </View>
    </Modal> 
);

const ApuracaoLista = (props) => (
    <Content padder style={{backgroundColor: 'transparent'}}> 

        { props.msgErro != '' ? <Text style={styles.TxtErro}> {props.msgErro}</Text> : null }

        { 
            props.isLoading 
            ? 
            <ApuracaoListaItemShimmer />  
            : 
           <FlatList 
                style={{ marginBottom: 20, }}
                data={props.lista}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={ () => <Text style={{textAlign: 'center'}}>{ !props.isLoading ? 'Nenhum registro encontrado...' : null}</Text> }
                renderItem={ ({item}) => ( <ApuracaoListaItem item={item} />  )}
            /> 
        }  

    </Content>
);

const ApuracaoListaItem = (props) => {

    const apurData         = props.item[0];
    const apurVlrVenda     = props.item[1];
    const apurVlrApurado   = props.item[2];
    const apurVlrCompensar = props.item[3];
    const apurVlrResultado = props.item[4];
    const apurVlrImposto   = props.item[5];

    return(
    <View style={styles.Card}>
         <Text style={styles.TxtData}>{apurData}</Text>
         <View style={styles.TxtValores}>
            <View style={styles.TxtGrupo}>
                <Text style={styles.TxtDescrVal}>Venda</Text>
                <Text style={styles.TxtVal}><Text style={styles.TxtRS}>R$ </Text>{apurVlrVenda}</Text>
            </View>
            <View style={styles.TxtGrupo}>
                <Text style={styles.TxtDescrVal}>Apurado</Text>
                <Text style={[styles.TxtVal, ( parseFloat(apurVlrApurado) < 0) && styles.TxtValNeg, ( parseFloat(apurVlrApurado) > 0) && styles.TxtValPos]}><Text style={[styles.TxtRS, ( parseFloat(apurVlrApurado) < 0) && styles.TxtValNeg, ( parseFloat(apurVlrApurado) > 0) && styles.TxtValPos]}>R$ </Text>{apurVlrApurado}</Text>
            </View>
            <View style={styles.TxtGrupo}>
                <Text style={styles.TxtDescrVal}>A Compensar</Text>
                <Text style={[styles.TxtVal, ( parseFloat(apurVlrCompensar) < 0) && styles.TxtValNeg, ( parseFloat(apurVlrCompensar) > 0) && styles.TxtValPos]}><Text style={[styles.TxtRS, ( parseFloat(apurVlrCompensar) < 0) && styles.TxtValNeg, ( parseFloat(apurVlrCompensar) > 0) && styles.TxtValPos]}>R$ </Text>{apurVlrCompensar}</Text>
            </View>
            <View style={styles.TxtGrupo}>
                <Text style={styles.TxtDescrVal}>Resultado</Text>
                <Text style={[styles.TxtVal, ( parseFloat(apurVlrResultado) < 0) && styles.TxtValNeg, ( parseFloat(apurVlrResultado) > 0) && styles.TxtValPos]}><Text style={[styles.TxtRS, ( parseFloat(apurVlrResultado) < 0) && styles.TxtValNeg, ( parseFloat(apurVlrResultado) > 0) && styles.TxtValPos]}>R$ </Text>{apurVlrResultado}</Text>
            </View>
            <View style={styles.TxtGrupo}>
                <Text style={styles.TxtDescrVal}>Imposto</Text>
                <Text style={styles.TxtVal}><Text style={styles.TxtRS}>R$ </Text>{apurVlrImposto}</Text>
            </View>
        </View>  
    </View>
    )
}

const ApuracaoListaItemShimmer = (props) => (
    <View style={styles.Card}>
        <ShimmerPlaceHolder autoRun={true} visible={false} style={{ marginBottom: 5 }} width={100} />
        <View style={styles.TxtValores}>
            <View style={styles.TxtGrupo}>
                <ShimmerPlaceHolder autoRun={true} visible={false} style={{ marginBottom: 5 }} width={200} />
                <ShimmerPlaceHolder autoRun={true} visible={false} style={{ marginBottom: 5 }} width={300} />
            </View>
        </View>         
    {/* 
        <ShimmerPlaceHolder autoRun={true} visible={false} style={{ marginBottom: 5 }} width={25} />
        <View style={styles.TxtValores}>
            <View style={styles.TxtGrupo}>
                <ShimmerPlaceHolder autoRun={true} visible={false} style={{ marginBottom: 5 }} width={50} />
                <ShimmerPlaceHolder autoRun={true} visible={false} style={{ marginBottom: 5 }} width={90} />
            </View>
            <View style={styles.TxtGrupo}>
                <ShimmerPlaceHolder autoRun={true} visible={false} style={{ marginBottom: 5 }} width={50} />
                <ShimmerPlaceHolder autoRun={true} visible={false} style={{ marginBottom: 5 }} width={90} />
            </View>
            <View style={styles.TxtGrupo}>
                <ShimmerPlaceHolder autoRun={true} visible={false} style={{ marginBottom: 5 }} width={50} />
                <ShimmerPlaceHolder autoRun={true} visible={false} style={{ marginBottom: 5 }} width={90} />
            </View>
            <View style={styles.TxtGrupo}>
                <ShimmerPlaceHolder autoRun={true} visible={false} style={{ marginBottom: 5 }} width={50} />
                <ShimmerPlaceHolder autoRun={true} visible={false} style={{ marginBottom: 5 }} width={90} />
            </View>
        </View> 
   */}
    </View>
);

const mapStateToProps = state => ({
    txtEmail           : state.AuthReducer.txtEmail,
    txtSenha           : state.AuthReducer.txtSenha,    
      
    lstFiltroAnos      : state.ApuracaoReducer.lstFiltroAnos,
    txtFiltroAno       : state.ApuracaoReducer.txtFiltroAno,  
    txtFiltroMsgErro   : state.ApuracaoReducer.txtFiltroMsgErro,

    lstApuracaoC       : state.ApuracaoReducer.lstApuracaoC,  
    isLoadingApuracaoC : state.ApuracaoReducer.isLoadingApuracaoC,  

    lstApuracaoD       : state.ApuracaoReducer.lstApuracaoD,  
    isLoadingApuracaoD : state.ApuracaoReducer.isLoadingApuracaoD, 

});

const mapDispatchToProps = { modificaFiltroAno, buscaListaFiltroAnos, buscaListaApuracao, };

export default connect(mapStateToProps, mapDispatchToProps)(Apuracao);
