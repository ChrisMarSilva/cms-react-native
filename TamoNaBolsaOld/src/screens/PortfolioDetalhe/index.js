import React from 'react';
import { View, ScrollView, FlatList, RefreshControl, } from 'react-native';
import { Container, Content, Tab, Tabs, List, ListItem, Text, Body, Right, Icon } from 'native-base';
import { connect } from 'react-redux';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

import styles from './styles';
import { buscaListaAnaliseOperacoes, buscaListaAnaliseProventos, } from '../../actions/AnaliseActions';
import * as HelperLog from '../../util/HelperLog';
import * as HelperDate from '../../util/HelperDate';
import * as HelperNumero from '../../util/HelperNumero';

class PortfolioDetalhe extends React.Component {
  
    constructor(props){
        super(props);  

        // HelperLog.entrada('PortfolioDetalhe.constructor');
        try {        
            this._buscaDados = this._buscaListaAnaliseOperacoes.bind(this); 
            this._buscaDados = this._buscaListaAnaliseProventos.bind(this); 
        }catch(err) {
            // HelperLog.erro('PortfolioDetalhe.constructor', err.message);
        }finally {
            // HelperLog.saida('PortfolioDetalhe.constructor');
        }
    }

    componentWillMount() {  
        // HelperLog.entrada('PortfolioDetalhe.componentWillMount');
        try {
            this._buscaListaAnaliseOperacoes();
            this._buscaListaAnaliseProventos();
        }catch(err) {
            // HelperLog.erro('PortfolioDetalhe.componentWillMount', err.message);
        }finally {
            // HelperLog.saida('PortfolioDetalhe.componentWillMount');
        }
    }

    componentDidMount() {
        // HelperLog.entrada('PortfolioDetalhe.componentDidMount');
        try {
        }catch(err) {
            // HelperLog.erro('PortfolioDetalhe.componentDidMount', err.message);
        }finally {
            // HelperLog.saida('PortfolioDetalhe.componentDidMount');
        }
    }

    componentWillUnmount() {
        // HelperLog.entrada('PortfolioDetalhe.componentWillUnmount');
        try {

        }catch(err) {
            // HelperLog.erro('PortfolioDetalhe.componentWillUnmount', err.message);
        }finally {
            // HelperLog.saida('PortfolioDetalhe.componentWillUnmount');
        }
    }

    _buscaListaAnaliseOperacoes = () => {
        // HelperLog.entrada('PortfolioDetalhe._buscaListaAnaliseOperacoes');
        try {

            const txtEmail    = this.props.txtEmail;
            const txtSenha    = this.props.txtSenha; 
            const txtCodAtivo = this.props.navigation.state.params.AtivoCod;
            this.props.buscaListaAnaliseOperacoes( txtEmail, txtSenha, txtCodAtivo );

        }catch(err) {
            // HelperLog.erro('PortfolioDetalhe._buscaListaAnaliseOperacoes', err.message);
        }finally {
            // HelperLog.saida('PortfolioDetalhe._buscaListaAnaliseOperacoes');
        }
    }

    _buscaListaAnaliseProventos = () => {
        // HelperLog.entrada('PortfolioDetalhe._buscaListaAnaliseProventos');
        try {
 
            const txtEmail    = this.props.txtEmail;
            const txtSenha    = this.props.txtSenha; 
            const txtCodAtivo = this.props.navigation.state.params.AtivoCod;
            const txtTipoRend = "";
            const txtDataIni  = "";
            const txtDataFim  = "";
            this.props.buscaListaAnaliseProventos( txtEmail, txtSenha, txtCodAtivo, txtTipoRend, txtDataIni, txtDataFim );

        }catch(err) {
            // HelperLog.erro('PortfolioDetalhe._buscaListaAnaliseProventos', err.message);
        }finally {
            // HelperLog.saida('PortfolioDetalhe._buscaListaAnaliseProventos');
        }
    }

    static navigationOptions = ({ navigation }) => ({ 
        title: `${navigation.state.params.AtivoCod}`
    });
   
    render() {

        // HelperLog.entrada('PortfolioDetalhe.render');
            
        return (    
            <Container>  

                <Tabs initialPage={0} onChangeTab={ ({i}) => {} }> 
                    <Tab heading="Operações" textStyle={{color: '#fff'}} tabStyle={{backgroundColor: '#353535'}} activeTabStyle={{backgroundColor: '#353535'}} >
                        <PortfolioDetalheListaOper 
                            lista={this.props.lstAnaliseOper} 
                            isLoading={this.props.isLoadingAnaliseOper} 
                            msgErro={this.props.msgErroAnaliseOper} 
                            totalInvest={this.props.vlrTotalInvestAnaliseOper} 
                            totalAtual={this.props.vlrTotalAtualAnaliseOper} 
                            totalValoriz={this.props.vlrTotalValorizAnaliseOper} 
                            percValoriz={this.props.vlrPercValorizAnaliseOper} 
                            _buscaDados={this._buscaListaAnaliseOperacoes}
                        />    
                    </Tab>
                    <Tab heading="Proventos" textStyle={{color: '#fff'}} tabStyle={{backgroundColor: '#353535'}} activeTabStyle={{backgroundColor: '#353535'}}>
                        <PortfolioDetalheListaProv
                            lista={this.props.lstAnaliseProv} 
                            isLoading={this.props.isLoadingAnaliseProv} 
                            msgErro={this.props.msgErroAnaliseProv}
                            total={this.props.vlrTotalAnaliseProv} 
                            _buscaDados={this._buscaListaAnaliseProventos}
                        /> 
                    </Tab>
                </Tabs>

            </Container>
        );

    }

}

const PortfolioDetalheListaOper = (props) => (
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
            <PortfolioDetalheListaItemShimmer />  
            : 
                ( !props.lista || props.lista.length <= 0 )
                ? 
                <Text style={{ textAlign: 'center', }}>{ !props.isLoading ? 'Nenhuma Operação encontrada...' : null}</Text>
                :             
                <View style={{ flex: 1, }}>

                    <View style={styles.OperListItemCardTotal}>
                        
                        <View style={{ flex: 2,  }}>
                            <Text style={styles.OperListItemTxtTotalTitulo}>Tot. Invest.</Text>
                            <Text style={styles.OperListItemTxtTotalValor}>R$ {HelperNumero.GetMascaraValorDecimal(parseFloat(props.totalInvest))}</Text>
                        </View>
                        
                        <View style={{flex: 2, }}>
                            <Text style={styles.OperListItemTxtTotalTitulo}>Tot. Atual</Text>
                            <Text style={styles.OperListItemTxtTotalValor}>R$ {HelperNumero.GetMascaraValorDecimal(parseFloat(props.totalAtual))}</Text>
                        </View>
                        
                        <View style={{flex: 3, }}>
                            <Text style={styles.OperListItemTxtTotalTitulo}>Valorização</Text>
                            <Text style={styles.OperListItemTxtTotalValor}>R$ {HelperNumero.GetMascaraValorDecimal(parseFloat(props.totalValoriz))} <Text style={styles.OperListItemTxtTotalPerc}>({HelperNumero.GetMascaraValorDecimal(parseFloat(props.percValoriz))}%)</Text> </Text>
                        </View>
                        
                    </View>
                    
                    <List 
                        style={{ marginBottom: 20, }} 
                        dataArray={props.lista}
                        renderRow={ item => <PortfolioDetalheListaOperItem item={item} /> }
                    />

                </View>
        }

    </Content>
);

const PortfolioDetalheListaOperItem = (props) => {

    const operTipo        = props.item[0];
    const operCategoria   = props.item[1]; //( props.item[1] == '' ? '' : 'Oper. ' +  props.item[1]);
    //const operCorretora   = props.item[2];
    const operData        = props.item[3];
    const operQuant       = props.item[4];
    const operPrecoCusto  = props.item[5];
    const operPrecoMedio  = props.item[6];
    const operTotal       = props.item[7];
    const operValoriz     = props.item[8];
    const operValorizVlr  = parseFloat( HelperNumero.GetValorDecimal(operValoriz));

    return(
        <ListItem style={styles.OperListItemContainer}>
            <Body style={styles.OperListItemBodyContainer}>
               
                <View style={styles.OperListItemDataTipoContainer}>
                    <Text style={[styles.OperListItemTxtData, { flex: 1, }]}>{operData}</Text>
                    <Text style={[styles.OperListItemTxtTipo, { flex: 1, }]}>{operTipo}</Text>
                    <Text style={[styles.OperListItemTxtCateg, { flex: 2, }]}>{operCategoria}</Text>
                </View>     

                <View style={styles.OperListItemValoresContainer}>

                    <View style={[styles.OperListItemValoresSubContainer, { flex: 2,}]}>
                        <Text style={styles.OperListItemTxtDescrValor}>Quant.</Text>
                        <Text style={styles.OperListItemTxtQuant}>{operQuant}</Text>
                    </View>
                    
                    <View style={[styles.OperListItemValoresSubContainer, { flex: 2,}]}>
                        <Text style={styles.OperListItemTxtDescrValor}>Custo/Ação</Text>
                        <Text style={styles.OperListItemTxtPrecoCusto}>R$ {operPrecoCusto}</Text>
                    </View>
                    
                    <View style={[styles.OperListItemValoresSubContainer, { flex: 2,}]}>
                        <Text style={styles.OperListItemTxtDescrValor}>Preço Médio</Text>
                        <Text style={styles.OperListItemTxtPrecoMedio}>R$ {operPrecoMedio}</Text>
                    </View>
                    
                    <View style={[styles.OperListItemValoresSubContainer, { flex: 3,}]}>
                        <Text style={styles.OperListItemTxtDescrValor}>Total</Text>
                        <Text style={styles.OperListItemTxtTotal}>R$ {operTotal}</Text>
                    </View> 

                </View>  

                {
                    ( operTipo == 'Venda' || operTipo == 'Projetado')
                    ?
                    <View style={styles.OperListItemValorizContainer}>
                        <View style={[styles.OperListItemValorizSubContainer, { flex: 1,}]}>
                            <Text style={styles.OperListItemValorizTxtDescrValor}>Valorização</Text>
                            <Text style={[styles.OperListItemValorizTxtTotal, ( parseFloat(operValorizVlr) < 0) && {color:'red'}, ( parseFloat(operValorizVlr) > 0) && {color:'green'}]}>{'R$ '+operValoriz}</Text>
                        </View>   
                    </View>  
                    :
                    null
                }

            </Body>
        </ListItem>
    )
}

const PortfolioDetalheListaProv = (props) => (
    <Content 
        style={{backgroundColor: 'transparent', }} 
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
            <PortfolioDetalheListaItemShimmer />  
            : 
                ( !props.lista || props.lista.length <= 0 )
                ? 
                <Text style={{textAlign: 'center'}}>{ !props.isLoading ? 'Nenhum Provento encontrado...' : null}</Text>
                :                 
                <View style={{flex: 1}}>

                    <View style={styles.ProvListItemCardTotal}>
                        <Text style={styles.ProvListItemTxtTotalTitulo}>TOTAL</Text>
                        <Text style={styles.ProvListItemTxtTotalValor}>R$ {HelperNumero.GetMascaraValorDecimal(parseFloat(props.total))}</Text>
                    </View>
                    
                    <List 
                        style={{ flex: 1, marginBottom: 20, }} 
                        dataArray={props.lista}
                        renderRow={ item => <PortfolioDetalheListaProvItem item={item} /> }
                    /> 

                </View>
        }

    </Content>
);

const PortfolioDetalheListaProvItem = (props) => {

    const provDtPagto   = props.item[0];
    //const provCodAtivo  = props.item[1];
    const provTipo      = props.item[2];
    //const provCorretora = props.item[3];
    const provQuant     = props.item[4];
    const provPreco     = props.item[5];
    const provTotal     = props.item[6];

    return(
        <ListItem style={styles.ProvListItemContainer}>
            <Body style={styles.ProvListItemBodyContainer}>     

                <View style={styles.ProvListItemDataTipoContainer}>
                    <Text style={[styles.ProvListItemTxtData, { flex: 3, }]}>{provDtPagto}</Text>
                    <Text style={[styles.ProvListItemTxtTipo, { flex: 2, }]}>{provTipo}</Text>
                </View>            

                <View style={styles.ProvListItemValoresContainer}>

                    <View style={[styles.ProvListItemValoresSubContainer, { flex: 1,}]}>
                        <Text style={styles.ProvListItemTxtDescrValor}>Quant.</Text>
                        <Text style={styles.ProvListItemTxtQuant}>{provQuant}</Text>
                    </View>
                    
                    <View style={[styles.ProvListItemValoresSubContainer, { flex: 2,}]}>
                        <Text style={styles.ProvListItemTxtDescrValor}>Preço</Text>
                        <Text style={styles.ProvListItemTxtPreco}>R$ {provPreco}</Text>
                    </View>
                    
                    <View style={[styles.ProvListItemValoresSubContainer, { flex: 2,}]}>
                        <Text style={styles.ProvListItemTxtDescrValor}>Total</Text>
                        <Text style={styles.ProvListItemTxtTotal}>R$ {provTotal}</Text>
                    </View>

                </View>

            </Body>
        </ListItem>
    )
}

const PortfolioDetalheListaItemShimmer = (props) => (
    <View style={styles.Card}>
        <ShimmerPlaceHolder autoRun={true} visible={false} style={{ marginBottom: 5 }} width={100} />
        <View style={styles.TxtValores}>
            <View style={styles.TxtGrupo}>
                <ShimmerPlaceHolder autoRun={true} visible={false} style={{ marginBottom: 5 }} width={200} />
                <ShimmerPlaceHolder autoRun={true} visible={false} style={{ marginBottom: 5 }} width={300} />
            </View>
        </View>   
    </View>
);

const mapStateToProps = state => ({

    txtEmail                   : state.AuthReducer.txtEmail,
    txtSenha                   : state.AuthReducer.txtSenha,    
    
    isLoadingAnaliseOper       : state.AnaliseReducer.isLoadingAnaliseOper,
    msgErroAnaliseOper         : state.AnaliseReducer.msgErroAnaliseOper,
    lstAnaliseOper             : state.AnaliseReducer.lstAnaliseOper,
    vlrTotalInvestAnaliseOper  : state.AnaliseReducer.vlrTotalInvestAnaliseOper,
    vlrTotalAtualAnaliseOper   : state.AnaliseReducer.vlrTotalAtualAnaliseOper,
    vlrTotalValorizAnaliseOper : state.AnaliseReducer.vlrTotalValorizAnaliseOper,
    vlrPercValorizAnaliseOper  : state.AnaliseReducer.vlrPercValorizAnaliseOper,
    
    isLoadingAnaliseProv       : state.AnaliseReducer.isLoadingAnaliseProv,
    msgErroAnaliseProv         : state.AnaliseReducer.msgErroAnaliseProv,
    lstAnaliseProv             : state.AnaliseReducer.lstAnaliseProv,
    vlrTotalAnaliseProv        : state.AnaliseReducer.vlrTotalAnaliseProv,

});


const mapDispatchToProps = { buscaListaAnaliseOperacoes, buscaListaAnaliseProventos, };

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioDetalhe);