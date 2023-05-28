import React from 'react';
import { View, ScrollView, FlatList, RefreshControl, } from 'react-native';
import { Container, Content, Badge, Text, Tab, Tabs, Left,  } from 'native-base';
import { connect } from 'react-redux';

import styles from './styles';
import * as HelperLog from '../../util/HelperLog';
import * as HelperNumero from '../../util/HelperNumero';
import { buscaPortfolioValorizDia, buscaPortfolioRadar } from '../../actions/PortfolioActions';

class HomeValorizDia extends React.Component {
  
    constructor(props){
        super(props);  
        this.state = { intervalId: null };

        // HelperLog.entrada('HomeValorizDia.constructor');
        try {
            
            this._buscaDados = this._buscaDados.bind(this); 
            
        }catch(err) {
            // HelperLog.erro('HomeValorizDia.constructor', err.message);
        }finally {
            // HelperLog.saida('HomeValorizDia.constructor');
        }
    }

    componentWillMount() {  
        // HelperLog.entrada('HomeValorizDia.componentWillMount');
        try {
            this._buscaDados();
        }catch(err) {
            // HelperLog.erro('HomeValorizDia.componentWillMount', err.message);
        }finally {
            // HelperLog.saida('HomeValorizDia.componentWillMount');
        }
    }

    componentDidMount() {
        // HelperLog.entrada('HomeValorizDia.componentDidMount');
        try {
        }catch(err) {
            // HelperLog.erro('HomeValorizDia.componentDidMount', err.message);
        }finally {
            // HelperLog.saida('HomeValorizDia.componentDidMount');
        }
    }

    componentWillUnmount() {
        // HelperLog.entrada('HomeValorizDia.componentWillUnmount');
        try {

            if ( this.state.intervalId ){
                //console.log(this.state.intervalId+ ' - clearInterval' );
                clearInterval( this.state.intervalId );
                this.setState({ intervalId: null });
            }

        }catch(err) {
            // HelperLog.erro('HomeValorizDia.componentWillUnmount', err.message);
        }finally {
            // HelperLog.saida('HomeValorizDia.componentWillUnmount');
        }
    }

    _buscaDados = () => {
        // HelperLog.entrada('HomeValorizDia._buscaDados');
        try {
           
            const txtEmail   = this.props.txtEmail;
            const txtSenha   = this.props.txtSenha;
            const txtIdPortf = null;
            
            this.props.buscaPortfolioValorizDia(txtEmail, txtSenha, txtIdPortf);
            this.props.buscaPortfolioRadar(txtEmail, txtSenha);

            //console.log( this.state.intervalId+ ' - Antes - setInterval' );
            if ( this.state.intervalId  ){
                //console.log(this.state.intervalId+ ' - clearInterval' );
                clearInterval( this.state.intervalId );
                this.setState({ intervalId: null });
            }
           const id = setInterval( ()=>{ this._buscaDados(); }, 1000 * 60); //60Seg 
           this.setState({ intervalId: id });
           //console.log(this.state.intervalId+ ' - Depois - setInterval');
            
        }catch(err) {
            // HelperLog.erro('HomeValorizDia._buscaDados', err.message);
        }finally {
            // HelperLog.saida('HomeValorizDia._buscaDados');
        }
    }

    render() {

        // HelperLog.entrada('HomeValorizDia.render');

        return (
            <Container> 

                <Tabs initialPage={0} onChangeTab={ ({i}) => {} }> 
                    <Tab heading="Carteira" textStyle={{color: '#fff'}} tabStyle={{backgroundColor: '#353535'}} activeTabStyle={{backgroundColor: '#353535'}} >
                        <HomeValorizDiaLista 
                            lista={this.props.lstPortfolioValorizDia} 
                            isLoading={this.props.isLoadingPortfolioValorizDia} 
                            msgErro={this.props.txtErroPortfolioValorizDia} 
                            total={this.props.vlrPortfolioValorizDiaTotal} 
                            datahora={this.props.txtDthrPortfolioValorizDia} 
                            _buscaDados={this._buscaDados}
                        />  
                    </Tab>
                    <Tab heading="Radar" textStyle={{color: '#fff'}} tabStyle={{backgroundColor: '#353535'}} activeTabStyle={{backgroundColor: '#353535'}}>
                        <HomeRadarLista 
                            lista={this.props.lstPortfolioRadar} 
                            isLoading={this.props.isLoadingPortfolioRadar} 
                            msgErro={this.props.txtErroPortfolioRadar} 
                            datahora={this.props.txtDthrPortfolioRadar} 
                            _buscaDados={this._buscaDados}
                        />  
                    </Tab>
                </Tabs>

            </Container>
        );

    }

}

const HomeValorizDiaLista = (props) => (
    <Content 
        padder 
        style={styles.CardLista}
        refreshControl={ 
            <RefreshControl 
                refreshing={false} 
                onRefresh={ ()=>{ props._buscaDados(); } } 
                title="Carregando..." 
            /> 
        }
    > 
        <View style={styles.CardTotal}>
            <Text style={styles.TxtTotalTitulo}>TOTAL</Text>
            <Text style={styles.TxtTotalValor}>R$ {HelperNumero.GetMascaraValorDecimal(parseFloat(props.total))}</Text>
        </View>

        { props.msgErro != '' ? <Text style={styles.TxtErro}> {props.msgErro}</Text> : null }

        <View style={styles.CardDataHora}>
            <Text style={styles.TxtDataHoraTitulo}>Última Atualização: <Text style={styles.TxtDataHoraValor}>{props.datahora}</Text></Text>
        </View>
    
        <ScrollView style={styles.CardSubLista}>
        
            <FlatList 
                    style={{ marginBottom: 10, marginTop: 5, }}
                    data={props.lista}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={ () => <Text style={{textAlign: 'center'}}>{ !props.isLoading ? 'Nenhum registro encontrado...' : null}</Text> }
                    renderItem={ ({item}) => ( <HomeValorizDiaListaItem item={item} />  )}
            /> 
            
        </ScrollView>

    </Content>
);

const HomeValorizDiaListaItem = (props) => {

    const valorizAtivo   = props.item[0];
    const valorizQuant   = parseInt(   HelperNumero.GetValorInteiro(props.item[1]) );
    const valorizPreco   = parseFloat( HelperNumero.GetValorDecimal(props.item[2]) );
    const valorizValoriz = parseFloat( HelperNumero.GetValorDecimal(props.item[3]) );
    const valorizPercen  = parseFloat( HelperNumero.GetValorDecimal(props.item[4]) );   
    const valorizTotal   = parseFloat( valorizQuant * valorizValoriz );  

    return (
         <View style={styles.CardItemLista}>

            <View style={styles.CardItemListaAtivo}>
                <Text style={[styles.TxtItemListaAtivo, ( parseFloat(valorizValoriz) < 0) && {color:'#b22222'}, ( parseFloat(valorizValoriz) > 0) && {color:'green'}]}>{valorizAtivo}</Text>
            </View>          

            <View style={styles.CardItemListaPreco}>
                <Text style={styles.TxtItemListaPreco}>R$ {HelperNumero.GetMascaraValorDecimal(valorizPreco)}</Text>
            </View>           

            <View style={styles.CardItemListaValoriz}>
                <Text style={{ textAlign: "center",}}>
                    <Text style={[styles.TxtItemListaValoriz, ( parseFloat(valorizValoriz) < 0) && {color:'#b22222'}, ( parseFloat(valorizValoriz) > 0) && {color:'green'}]}>{HelperNumero.GetMascaraValorDecimal(valorizValoriz)} </Text> 
                    <Text style={[styles.TxtItemListaValoriz, ( parseFloat(valorizValoriz) < 0) && {color:'#b22222'}, ( parseFloat(valorizValoriz) > 0) && {color:'green'}]}> ({HelperNumero.GetMascaraValorDecimal(valorizPercen)}%) </Text> 
                </Text>
            </View>   

            <View style={styles.CardItemListaTotal}>
                <Badge style={[styles.BadgeItemListaTotal, ( parseFloat(valorizValoriz) < 0) && {backgroundColor:'#b22222'}, ( parseFloat(valorizValoriz) > 0) && {backgroundColor:'green'}]}>
                    <Text style={styles.TxtItemListaTotal}>R$ {HelperNumero.GetMascaraValorDecimal(valorizTotal)}</Text>
                </Badge>
            </View>  

        </View>
    )
};



const HomeRadarLista = (props) => (
    <Content 
        padder 
        style={styles.CardLista}
        refreshControl={ 
            <RefreshControl 
                refreshing={false} 
                onRefresh={ ()=>{ props._buscaDados(); } } 
                title="Carregando..." 
            /> 
        }
    > 

        { props.msgErro != '' ? <Text style={styles.TxtErro}> {props.msgErro}</Text> : null }

        <View style={styles.CardDataHora}>
            <Text style={styles.TxtDataHoraTitulo}>Última Atualização: <Text style={styles.TxtDataHoraValor}>{props.datahora}</Text></Text>
        </View>
    
        <ScrollView style={styles.CardSubLista}>
        
            <FlatList 
                    style={{ marginBottom: 10, marginTop: 5, }}
                    data={props.lista}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={ () => <Text style={{textAlign: 'center'}}>{ !props.isLoading ? 'Nenhum registro encontrado...' : null}</Text> }
                    renderItem={ ({item}) => ( <HomeRadarListaItem item={item} />  )}
            /> 
            
        </ScrollView>

    </Content>
);

const HomeRadarListaItem = (props) => {

    const radarAtivo   = props.item[0];
    const radarPreco   = parseFloat( HelperNumero.GetValorDecimal(props.item[1]) );
    const radarValoriz = parseFloat( HelperNumero.GetValorDecimal(props.item[2]) );
    const radarPercen  = parseFloat( HelperNumero.GetValorDecimal(props.item[3]) ); 

    if ( radarAtivo == 'IBOV') return null; 

    return (
         <View style={styles.CardItemLista}>

            <View style={styles.CardItemListaAtivo}>
                <Text style={[styles.TxtItemListaAtivo, ( parseFloat(radarValoriz) < 0) && {color:'#b22222'}, ( parseFloat(radarValoriz) > 0) && {color:'green'}]}>{radarAtivo}</Text>
            </View>          

            <View style={styles.CardItemListaPreco}>
                <Text style={styles.TxtItemListaPreco}>R$ {HelperNumero.GetMascaraValorDecimal(radarPreco)}</Text>
            </View>           

            <View style={styles.CardItemListaValoriz}>
                <Text style={{ textAlign: "center",}}>
                    <Text style={[styles.TxtItemListaValoriz, ( parseFloat(radarValoriz) < 0) && {color:'#b22222'}, ( parseFloat(radarValoriz) > 0) && {color:'green'}]}>{HelperNumero.GetMascaraValorDecimal(radarValoriz)} </Text> 
                    <Text style={[styles.TxtItemListaValoriz, ( parseFloat(radarValoriz) < 0) && {color:'#b22222'}, ( parseFloat(radarValoriz) > 0) && {color:'green'}]}> ({HelperNumero.GetMascaraValorDecimal(radarPercen)}%) </Text> 
                </Text>
            </View>   

        </View>
    )
};


const mapStateToProps = state => ({

    txtEmail                     : state.AuthReducer.txtEmail,
    txtSenha                     : state.AuthReducer.txtSenha,

    lstPortfolioValorizDia       : state.PortfolioReducer.lstPortfolioValorizDia,
    txtErroPortfolioValorizDia   : state.PortfolioReducer.txtErroPortfolioValorizDia,
    isLoadingPortfolioValorizDia : state.PortfolioReducer.isLoadingPortfolioValorizDia,
    vlrPortfolioValorizDiaTotal  : state.PortfolioReducer.vlrPortfolioValorizDiaTotal,
    txtDthrPortfolioValorizDia   : state.PortfolioReducer.txtDthrPortfolioValorizDia,
    
    lstPortfolioRadar            : state.PortfolioReducer.lstPortfolioRadar,
    txtErroPortfolioRadar        : state.PortfolioReducer.txtErroPortfolioRadar,
    isLoadingPortfolioRadar      : state.PortfolioReducer.isLoadingPortfolioRadar,
    txtDthrPortfolioRadar        : state.PortfolioReducer.txtDthrPortfolioRadar,

});

const mapDispatchToProps = {  buscaPortfolioValorizDia, buscaPortfolioRadar };

export default connect(mapStateToProps, mapDispatchToProps)(HomeValorizDia);
