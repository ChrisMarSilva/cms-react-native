import React from 'react';
import { View, Text,  SectionList, RefreshControl, } from 'react-native';
import { Container, Content, } from "native-base";
import { connect } from 'react-redux';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

import styles from './styles';
import * as HelperLog from '../../util/HelperLog';
import * as HelperDate from '../../util/HelperDate';
import * as HelperNumero from '../../util/HelperNumero';
import {  buscaListaProvento, } from '../../actions/HomeActions';

class HomeProventReceber extends React.Component {
  
    constructor(props){
        super(props);  

        // HelperLog.entrada('HomeProventReceber.constructor');
        try {
            
            this._buscaDados = this._buscaDados.bind(this); 

        }catch(err) {
            // HelperLog.erro('HomeProventReceber.constructor', err.message);
        }finally {
            // HelperLog.saida('HomeProventReceber.constructor');
        }
    }

    componentWillMount() {  
        // HelperLog.entrada('HomeProventReceber.componentWillMount');
        try {

            // this._buscaDados();

        }catch(err) {
            // HelperLog.erro('HomeProventReceber.componentWillMount', err.message);
        }finally {
            // HelperLog.saida('HomeProventReceber.componentWillMount');
        }
    }

    componentDidMount() {
        // HelperLog.entrada('HomeProventReceber.componentDidMount');
        try {

        }catch(err) {
            // HelperLog.erro('HomeProventReceber.componentDidMount', err.message);
        }finally {
            // HelperLog.saida('HomeProventReceber.componentDidMount');
        }
    }

    componentWillUnmount() {
        // HelperLog.entrada('HomeProventReceber.componentWillUnmount');
        try {

        }catch(err) {
            // HelperLog.erro('HomeProventReceber.componentWillUnmount', err.message);
        }finally {
            // HelperLog.saida('HomeProventReceber.componentWillUnmount');
        }
    }

    _buscaDados = () => {
        // HelperLog.entrada('HomeProventReceber._buscaDados');
        try {
           
            const txtEmail = this.props.txtEmail;
            const txtSenha = this.props.txtSenha; 
            this.props.buscaListaProvento(txtEmail, txtSenha); 

        }catch(err) {
            // HelperLog.erro('HomeProventReceber._buscaDados', err.message);
        }finally {
            // HelperLog.saida('HomeProventReceber._buscaDados');
        }
    }

    render() {

        // HelperLog.entrada('HomeProventReceber.render');

        return (
            <Container> 

                <ProventosRecLista 
                    lista={this.props.listProventos} 
                    isLoading={this.props.isLoadingProventos} 
                    msgErro={this.props.txtErroProventos} 
                    _buscaDados={this._buscaDados}
                />  

            </Container>
        );

    }

}

const ProventosRecLista = (props) => (
    <Content 
        padder 
        style={{backgroundColor: 'transparent'}} 
        refreshControl={ 
            <RefreshControl 
                refreshing={false} 
                onRefresh={ ()=>{ props._buscaDados(); } } 
                title="Carregando..." 
            /> 
        }
    >

        { props.msgErro != '' ? <Text style={styles.TxtErro}> {props.msgErro}</Text> : null }

        { 
            props.isLoading 
            ? 
            <ProventosRecListaItemShimmer />  
            : 
            <View style={styles.CardLista}>
                <SectionList
                    style={{}}
                    sections={props.lista}
                    keyExtractor={(item, index) => item + index}
                    ListEmptyComponent={ () => <Text style={{textAlign: 'center'}}>{ !props.isLoading ? 'Nenhum provento a receber...' : null}</Text> }
                    renderSectionHeader={ ({section: {title}}) =>  <ProventosRecListaTitulo title={title} />  }
                    renderSectionFooter={ () =>  <View style={{ marginBottom: 20, }} />  }
                    renderItem={ ({item, index, section}) => <ProventosRecListaItem item={item} /> }
                />
            </View>  
        }

    </Content>
);

const ProventosRecListaTitulo = (props) => {
    return (
         <View style={styles.CardTitulo}>
            <Text style={styles.TxtTitulo}>{props.title}</Text>
        </View>
    )
};

const ProventosRecListaItem = (props) => {

    const provDtPagto  = props.item[0];
    const provTipo     = props.item[1];  
    const provAtivo    = props.item[2];  
    //const provQuant    = parseInt(   HelperNumero.GetValorInteiro(props.item[3]) );
    //const provPreco    = parseFloat( HelperNumero.GetValorDecimal(props.item[4]) );
    const provTotal    = parseFloat( HelperNumero.GetValorDecimal(props.item[5]) );
    //const provSit      = props.item[6];
    //const provId       = props.item[7];
    
    const provDtAtual = HelperDate.tirarFormacataoData( HelperDate.getDataAtual() );

    return (
         <View style={styles.CardItem}>

            <View style={styles.CardItemData}>
                <Text style={styles.TxtItemData}>{HelperDate.colcarFormacataoData(provDtPagto)}</Text>
            </View>          
            
            <View style={styles.CardItemAtivo}>
                <Text style={styles.TxtItemAtivo}>{provAtivo}</Text>
            </View>  

            <View style={styles.CardItemTipo}>
                <Text style={styles.TxtItemTipo}>{provTipo}</Text>
            </View>          

            <View style={styles.CardItemTotal}>
                <Text style={[styles.TxtItemTotal, ( provDtPagto <= provDtAtual ) && {color:'green'}]}>R$ {HelperNumero.GetMascaraValorDecimal(provTotal)}</Text>
            </View>  

        </View>
    )
};

const ProventosRecListaItemShimmer = (props) => (
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

    isLoadingProventos : state.HomeReducer.isLoadingProventos,
    txtErroProventos   : state.HomeReducer.txtErroProventos,
    listProventos      : state.HomeReducer.listProventos,
});

const mapDispatchToProps = { buscaListaProvento };

export default connect(mapStateToProps, mapDispatchToProps)(HomeProventReceber);
