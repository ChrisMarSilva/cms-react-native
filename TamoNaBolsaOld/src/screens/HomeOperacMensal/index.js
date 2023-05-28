import React from 'react';
import { View, ScrollView, FlatList, RefreshControl, Text, } from 'react-native';
import { Container, Content, Tab, Tabs, } from "native-base";
import { connect } from 'react-redux';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

import styles from './styles';
import { buscaListaOperacao } from '../../actions/HomeActions';
import * as HelperLog from '../../util/HelperLog';
import * as HelperDate from '../../util/HelperDate';
import * as HelperNumero from '../../util/HelperNumero';

class HomeOperacMensal extends React.Component {
  
    constructor(props){
        super(props);  

        // HelperLog.entrada('HomeOperacMensal.constructor');
        try {        

            this._buscaDados = this._buscaDados.bind(this); 

        }catch(err) {
            // HelperLog.erro('HomeOperacMensal.constructor', err.message);
        }finally {
            // HelperLog.saida('HomeOperacMensal.constructor');
        }
    }

    componentWillMount() {  
        // HelperLog.entrada('HomeOperacMensal.componentWillMount');
        try {
        
            //this._buscaDados();

        }catch(err) {
            // HelperLog.erro('HomeOperacMensal.componentWillMount', err.message);
        }finally {
            // HelperLog.saida('HomeOperacMensal.componentWillMount');
        }
    }

    componentDidMount() {
        // HelperLog.entrada('HomeOperacMensal.componentDidMount');
        try {
        }catch(err) {
            // HelperLog.erro('HomeOperacMensal.componentDidMount', err.message);
        }finally {
            // HelperLog.saida('HomeOperacMensal.componentDidMount');
        }
    }

    componentWillUnmount() {
        // HelperLog.entrada('HomeOperacMensal.componentWillUnmount');
        try {

        }catch(err) {
            // HelperLog.erro('HomeOperacMensal.componentWillUnmount', err.message);
        }finally {
            // HelperLog.saida('HomeOperacMensal.componentWillUnmount');
        }
    }

    _buscaDados = () => {
        // HelperLog.entrada('HomeOperacMensal._buscaDados');
        try {
 
            const txtEmail = this.props.txtEmail;
            const txtSenha = this.props.txtSenha; 
            this.props.buscaListaOperacao(txtEmail, txtSenha);

        }catch(err) {
            // HelperLog.erro('HomeOperacMensal._buscaDados', err.message);
        }finally {
            // HelperLog.saida('HomeOperacMensal._buscaDados');
        }
    }
   
    render() {

        // HelperLog.entrada('HomeOperacMensal.render');
            
        return (    
            <Container>  

                <Tabs initialPage={0} onChangeTab={ ({i}) => {} }> 
                    <Tab heading="Compras" textStyle={{color: '#fff'}} tabStyle={{backgroundColor: '#353535'}} activeTabStyle={{backgroundColor: '#353535'}} >
                        <HomeOperacMensalLista 
                            nome="Compras" 
                            tipo='C'
                            descricao='TOTAL DE COMPRAS'
                            lista={this.props.listOperacoesC} 
                            total={this.props.totalOperacoesC} 
                            isLoading={this.props.isLoadingOperacoes} 
                            msgErro={this.props.txtErroOperacoes} 
                            _buscaDados={this._buscaDados}
                        />    
                    </Tab>
                    <Tab heading="Vendas" textStyle={{color: '#fff'}} tabStyle={{backgroundColor: '#353535'}} activeTabStyle={{backgroundColor: '#353535'}}>
                        <HomeOperacMensalLista 
                            nome="Vendas" 
                            tipo='V'
                            descricao='TOTAL DE VENDAS'
                            lista={this.props.listOperacoesV} 
                            total={this.props.totalOperacoesV} 
                            isLoading={this.props.isLoadingOperacoes} 
                            msgErro={this.props.txtErroOperacoes}
                            _buscaDados={this._buscaDados} 
                        /> 
                    </Tab>
                    <Tab heading="Bônus" textStyle={{color: '#fff'}} tabStyle={{backgroundColor: '#353535'}} activeTabStyle={{backgroundColor: '#353535'}}>
                        <HomeOperacMensalLista 
                            nome="Bônus" 
                            tipo='B'
                            descricao='TOTAL DE BÔNUS'
                            lista={this.props.listOperacoesB} 
                            total={this.props.totalOperacoesB} 
                            isLoading={this.props.isLoadingOperacoes} 
                            msgErro={this.props.txtErroOperacoes} 
                            _buscaDados={this._buscaDados}
                        /> 
                    </Tab>
                </Tabs>

            </Container>
        );

    }

}

const HomeOperacMensalLista = (props) => (
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
            <HomeOperacMensalListaItemShimmer />  
            : 
            <View style={{flex: 1, }}>

                <View style={{backgroundColor: '#FFF', margin: 6, marginBottom: 10, padding: 5, borderWidth: 1, borderColor: '#fff', borderRadius: 5, elevation: 5, shadowOffset:{ width: 10, height: 10 }, shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 5,}}>
                    <Text style={{ fontSize: 14, textAlign: "center", fontWeight: 'bold', color:'#666666',}}>TOTAL: <Text style={{fontSize: 14, textAlign: "center", fontWeight: 'bold', color:'#666666',}}>R$ {HelperNumero.GetMascaraValorDecimal(parseFloat(props.total))}</Text></Text>
                </View>

                <ScrollView style={{ backgroundColor: '#FFF', margin: 6, marginBottom: 20, padding: 5, borderWidth: 1, borderColor: '#fff', borderRadius: 5, elevation: 5, shadowOffset:{ width: 10, height: 10 }, shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 5, }}>
                
                    <FlatList 
                        style={{marginBottom: 10, }}
                        data={props.lista}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={ ({item}) => <HomeOperacMensalListaItem item={item} /> }
                        ListHeaderComponent={ () => {
                            return (
                                <View style={{ flexDirection: 'row', padding: 2, marginBottom: 5, }}>

                                    <View style={{ flex: 3,}}>
                                        <Text style={{ fontSize: 12, textAlign: "center", fontWeight: 'bold', color:'#666666', }}>DATA</Text>
                                    </View>

                                    <View style={{ flex: 2,}}>
                                        <Text style={{ fontSize: 12, textAlign: "center", fontWeight: 'bold', color:'#666666', }}>ATIVO</Text>
                                    </View>

                                    <View style={{ flex: 2,}}>
                                        <Text style={{ fontSize: 12, textAlign: "center", fontWeight: 'bold', color:'#666666', }}>QUANT.</Text>
                                    </View>

                                    <View style={{ flex: 2,}}>
                                        <Text style={{ fontSize: 12, textAlign: "center", fontWeight: 'bold', color:'#666666', }}>PREÇO</Text>
                                    </View>

                                    <View style={{ flex: 4,}}>
                                        <Text style={{ fontSize: 12, textAlign: "center", fontWeight: 'bold', color:'#666666', }}>TOTAL</Text>
                                    </View>

                                </View>
                            );
                        }}
                        ListEmptyComponent={ () => {
                            return (
                                <View style={{}}>
                                    { props.tipo === 'C' ? <Text style={{textAlign: 'center'}}>{ !props.isLoading ? 'Nenhuma Compra realizada...' : null}</Text> : null }
                                    { props.tipo === 'V' ? <Text style={{textAlign: 'center'}}>{ !props.isLoading ? 'Nenhuma Venda realizada...'  : null}</Text>  : null }
                                    { props.tipo === 'B' ? <Text style={{textAlign: 'center'}}>{ !props.isLoading ? 'Nenhum Bônus recebido...'    : null}</Text>    : null }
                                </View>
                            );
                        }}
                    /> 

                </ScrollView>
               
            </View>
        }  

    </Content>
);

const HomeOperacMensalListaItem = (props) => {

    const operData  = HelperDate.colcarFormacataoData(props.item[0]);
    const operTipo  = props.item[1];
    const operAtivo = props.item[2];
    const operQtde  = HelperNumero.colcarFormacataoInteiro( parseInt( HelperNumero.GetValorInteiro(props.item[3]) ) );
    const operPreco = props.item[4];
    const operTotal = props.item[5];

    return(
        <View style={{ flex: 1, flexDirection: 'row', padding: 2, }}>

            <View style={{ flex: 3,}}>
                <Text style={{ fontSize: 11, textAlign: "center", color:'#666666', }}>{operData}</Text>
            </View>

            <View style={{ flex: 2,}}>
                <Text style={{ fontSize: 11, textAlign: "center", fontWeight: 'bold', color:'#666666', }}>{operAtivo}</Text>
            </View>

            <View style={{ flex: 2,}}>
                <Text style={{ fontSize: 11, textAlign: "center", color:'#666666', }}>{operQtde}</Text>
            </View>

            <View style={{ flex: 2,}}>
                <Text style={{ fontSize: 11, textAlign: "center", color:'#666666', }}>R$ {operPreco}</Text>
            </View>

            <View style={{ flex: 4,}}>
                <Text style={{ fontSize: 11, textAlign: "center", fontWeight: 'bold', color:'#666666', }}>R$ {operTotal}</Text>
            </View>

        </View>
    )
}

const HomeOperacMensalListaItemShimmer = (props) => (
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
    txtEmail           : state.AuthReducer.txtEmail,
    txtSenha           : state.AuthReducer.txtSenha,    
      
    isLoadingOperacoes : state.HomeReducer.isLoadingOperacoes,
    txtErroOperacoes   : state.HomeReducer.txtErroOperacoes,
    listOperacoesC     : state.HomeReducer.listOperacoesC,
    listOperacoesV     : state.HomeReducer.listOperacoesV,
    listOperacoesB     : state.HomeReducer.listOperacoesB,
    totalOperacoesC    : state.HomeReducer.totalOperacoesC,
    totalOperacoesV    : state.HomeReducer.totalOperacoesV,
    totalOperacoesB    : state.HomeReducer.totalOperacoesB,

});

const mapDispatchToProps = { buscaListaOperacao, };

export default connect(mapStateToProps, mapDispatchToProps)(HomeOperacMensal);
