import React from 'react';
import { ScrollView, View, FlatList, RefreshControl, Text, } from 'react-native';
import { Container,  Content, List, ListItem, Card, CardItem,  Button, Icon, Left, Body, Right, } from 'native-base';
import { connect } from 'react-redux';

import styles from './styles';
import * as HelperLog from '../../util/HelperLog';
import * as HelperNumero from '../../util/HelperNumero';
import { buscaPortfolio, buscaPortfolioAtivos, } from '../../actions/PortfolioActions';

class Portfolio extends React.Component {
  
    constructor(props){
        super(props);  
        //this.state = {};

        // HelperLog.entrada('Portfolio.constructor');
        try {            
            this._goToPortfolioDetalhe = this._goToPortfolioDetalhe.bind(this);  
        }catch(err) {
            // HelperLog.erro('Portfolio.constructor', err.message);
        }finally {
            // HelperLog.saida('Portfolio.constructor');
        }
    }

    componentWillMount() {  
        // HelperLog.entrada('Portfolio.componentWillMount');
        try {
            this._buscaDados();
        }catch(err) {
            // HelperLog.erro('Portfolio.componentWillMount', err.message);
        }finally {
            // HelperLog.saida('Portfolio.componentWillMount');
        }
    }

    componentDidMount() {
        // HelperLog.entrada('Portfolio.componentDidMount');
        try {
           // this._buscaDados();
        }catch(err) {
            // HelperLog.erro('Portfolio.componentDidMount', err.message);
        }finally {
            // HelperLog.saida('Portfolio.componentDidMount');
        }
    }

    componentWillUnmount() {
        // HelperLog.entrada('Portfolio.componentWillUnmount');
        try {
        }catch(err) {
            // HelperLog.erro('Portfolio.componentWillUnmount', err.message);
        }finally {
            // HelperLog.saida('Portfolio.componentWillUnmount');
        }
    }

    _buscaDados = () => {
        // HelperLog.entrada('Portfolio._buscaDados');
        try {
            
            const txtEmail   = this.props.txtEmail;
            const txtSenha   = this.props.txtSenha; 
            const txtIdPortf = null; //this.props.navigation.state.params.portfolio.id;
            
            this.props.buscaPortfolio(txtEmail, txtSenha);
            this.props.buscaPortfolioAtivos(txtEmail, txtSenha, txtIdPortf);

        }catch(err) {
            // HelperLog.erro('Portfolio._buscaDados', err.message);
        }finally {
            // HelperLog.saida('Portfolio._buscaDados');
        }
    } 

    _goToPortfolioDetalhe = ( AtivoId, AtivoCod ) => {
        this.props.navigation.navigate('PortfolioDetalhe', { AtivoId: AtivoId, AtivoCod: AtivoCod });
    }    

    render() {

        // HelperLog.entrada('Portfolio.render');

        return (
            <Container style={{backgroundColor: 'transparent'}}> 
                <Content 
                    padder 
                    style={{backgroundColor: 'transparent'}} 
                    refreshControl={ 
                        <RefreshControl 
                            refreshing={false} 
                            onRefresh={ ()=>{ this._buscaDados(); } } 
                            title="Carregando..." 
                        /> 
                    }
                > 
                
                    <PortfolioCard 
                        lista={this.props.listPortfolio} 
                    />

                    <PortfolioLista 
                        lista={this.props.lstPortfolioAtivos} 
                        isLoading={this.props.isLoadingPortfolioAtivos} 
                        msgErro={this.props.txtErroPortfolioAtivos} 
                        _goToPortfolioDetalhe={this._goToPortfolioDetalhe}
                    />
            
                </Content>
            </Container>
        );

    }

}

const PortfolioCard = (props) => {
    
    let PortfTotInvest      = 0.00;
    let PortfTotAtual       = 0.00;
    let PortfTotValoriz     = 0.00;
    let PortfPercValoriz    = 0.00;    
    let PortfTotProvent     = 0.00;
    let PortfTotAlug        = 0.00;
    let PortfTotGanhoPerda  = 0.00;
    let PortfPercGanhoPerda = 0.00;

    if ( props.lista.length > 0 ){
        PortfTotInvest      = parseFloat( HelperNumero.GetValorDecimal( props.lista[0].totInvest  ));
        PortfTotAtual       = parseFloat( HelperNumero.GetValorDecimal( props.lista[0].totAtual   ));
        PortfTotValoriz     = parseFloat( HelperNumero.GetValorDecimal( props.lista[0].totValorz  ));
        PortfPercValoriz    = parseFloat( HelperNumero.GetValorDecimal( props.lista[0].percValorz ));
        PortfTotProvent     = parseFloat( HelperNumero.GetValorDecimal( props.lista[0].totProv    ));
        PortfTotAlug        = parseFloat( HelperNumero.GetValorDecimal( props.lista[0].totAlug    ));
        PortfTotGanhoPerda  = parseFloat( HelperNumero.GetValorDecimal( props.lista[0].totGanho   ));
        PortfPercGanhoPerda = parseFloat( HelperNumero.GetValorDecimal( props.lista[0].percGanho  ));
    }

    return (
        <Card>
            <CardItem>
                <Body style={{ flex: 1, alignItems: 'center', justifyContent: "center", }} >
                    
                    <Text style={{ color:'#666666', fontSize: 14, fontWeight: 'bold', textAlign: "center", marginBottom: 10, }}>Meu Portfólio</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginLeft: 3, }}>
                        <Text style={{ color:'#666666', fontSize: 14, textAlign: "left",  fontWeight: 'normal',}}>Total Investido:</Text>
                        <Text style={{ color:'#666666', fontSize: 14, textAlign: "left",  }}>R$ {HelperNumero.GetMascaraValorDecimal(PortfTotInvest)}</Text>
                    </View>

                    <View style={{ flexDirection: 'row',  justifyContent: 'space-between', width: '100%', marginLeft: 3, }}>
                        <Text style={{ color:'#666666', fontSize: 14, textAlign: "left", fontWeight: 'normal', }}>Total Atual:</Text>
                        <Text style={{ color:'#666666', fontSize: 14, textAlign: "left", }}>R$ {HelperNumero.GetMascaraValorDecimal(PortfTotAtual)}</Text>
                    </View>

                    <View style={{ flexDirection: 'row',  justifyContent: 'space-between', width: '100%', marginLeft: 3, }}>
                        <Text style={{ color:'#666666', fontSize: 14, textAlign: "left",fontWeight: 'normal', }}>Total Valorização:</Text>
                        <Text style={[{ color:'#666666', fontSize: 16, textAlign: "left", }, ( parseFloat(PortfTotValoriz) < 0) && { color:'red'}, ( parseFloat(PortfTotValoriz) > 0) && { color:'green'}]}>R$ {HelperNumero.GetMascaraValorDecimal(PortfTotValoriz)} <Text style={[{ color:'#666666', fontSize: 12, textAlign: "left", }, ( parseFloat(PortfTotValoriz) < 0) && { color:'red'}, ( parseFloat(PortfTotValoriz) > 0) && { color:'green'}]}> ( {HelperNumero.GetMascaraValorDecimal(PortfPercValoriz)}% )</Text></Text>
                    </View>
                    
                    <View style={{ flexDirection: 'row',  justifyContent: 'space-between', width: '100%', marginLeft: 3, }}>
                        <Text style={{ color:'#666666', fontSize: 14, textAlign: "left",fontWeight: 'normal', }}>Total Proventos:</Text>
                        <Text style={{ color:'#666666', fontSize: 14, textAlign: "left", }}>R$ {HelperNumero.GetMascaraValorDecimal(PortfTotProvent)}</Text>
                    </View>

                    <View style={{ flexDirection: 'row',  justifyContent: 'space-between', width: '100%', marginLeft: 3, }}>
                        <Text style={{ color:'#666666', fontSize: 14, textAlign: "left",fontWeight: 'normal', }}>Total Aluguel:</Text>
                        <Text style={{ color:'#666666', fontSize: 14, textAlign: "left", }}>R$ {HelperNumero.GetMascaraValorDecimal(PortfTotAlug)}</Text>
                    </View>

                    <View style={{ flexDirection: 'row',  justifyContent: 'space-between', width: '100%', marginLeft: 3, marginBottom: 10, }}>
                        <Text style={{ color:'#666666', fontSize: 14, textAlign: "left",fontWeight: 'normal', }}>Total Ganho/Perda:</Text>
                        <Text style={[{ color:'#666666', fontSize: 16, textAlign: "left", }, ( parseFloat(PortfTotGanhoPerda) < 0) && { color:'red'}, ( parseFloat(PortfTotGanhoPerda) > 0) && { color:'green'}]}>R$ {HelperNumero.GetMascaraValorDecimal(PortfTotGanhoPerda)} <Text style={[{ color:'#666666', fontSize: 12, textAlign: "left", }, ( parseFloat(PortfTotGanhoPerda) < 0) && { color:'red'}, ( parseFloat(PortfTotGanhoPerda) > 0) && { color:'green'}]}> ( {HelperNumero.GetMascaraValorDecimal(PortfPercGanhoPerda)}% )</Text></Text>
                    </View>

                </Body>
            </CardItem>
        </Card>
    )
};

const PortfolioLista = (props) => (
    <Content> 

        { props.msgErro != '' ? <Text style={styles.TxtErro}> {props.msgErro}</Text> : null }

        { 
            props.isLoading 
            ? 
            null  
            : 
                !props.lista 
                ? 
                <Text style={{textAlign: 'center'}}>{ !props.isLoading ? 'Nenhum registro encontrado...' : null}</Text>
                : 
                <FlatList 
                    style={{ margin: 0, padding: 0, marginBottom: 20, }}
                    data={props.lista}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={ () => <Text style={{textAlign: 'center'}}>{ !props.isLoading ? 'Nenhum registro encontrado...' : null}</Text> }
                    renderItem={ ({item}) => ( <PortfolioListaItem item={item} _goToPortfolioDetalhe={props._goToPortfolioDetalhe} />  )}
                /> 
        }

    </Content>
);

const PortfolioListaItem = (props) => {

    const atvCodigo      = props.item[0];
    const atvQuant       = parseInt(   HelperNumero.GetValorInteiro( props.item[1]  ));
    const atvPrecoMedio  = parseFloat( HelperNumero.GetValorDecimal( props.item[2]  ));
    const atvPrecoAtual  = parseFloat( HelperNumero.GetValorDecimal( props.item[3]  ));
    const atvPrecoTeto   = parseFloat( HelperNumero.GetValorDecimal( props.item[4]  ));
    const atvTotInvest   = parseFloat( HelperNumero.GetValorDecimal( props.item[5]  ));
    const atvTotAtual    = parseFloat( HelperNumero.GetValorDecimal( props.item[6]  ));
    const atvTotValoriz  = parseFloat( HelperNumero.GetValorDecimal( props.item[7]  ));
    const atvPercValoriz = parseFloat( HelperNumero.GetValorDecimal( props.item[8]  ));
    const atvTotProv     = parseFloat( HelperNumero.GetValorDecimal( props.item[9]  ));
    const atvYOC         = parseFloat( HelperNumero.GetValorDecimal( props.item[10] ));
    const atvTotAlug     = parseFloat( HelperNumero.GetValorDecimal( props.item[11] ));
    const atvId          = props.item[12]; 

    return (
        <Card style={{ margin: 0, padding: 0,  }}>
            <CardItem button onPress={ () => { props._goToPortfolioDetalhe(atvId,atvCodigo); } }>
                <Body style={{ flex: 10, }}>

                    <View style={{ flex: 1, flexDirection: 'row', borderWidth: 0, borderColor: 'blue', }}>
                        <View style={{ flex: 1, borderWidth: 0, borderColor: 'green', }}>
                            <Text style={[{fontSize: 13, fontWeight: 'bold', color:'#666666', textAlign: "center",}, ( parseFloat(atvTotValoriz) < 0) && {color:'#b22222'}, ( parseFloat(atvTotValoriz) > 0) && {color:'green'}]}>{atvCodigo}   
                                <Text style={{fontSize: 10, fontWeight: 'normal', color:'#666666', }}>  ( Quant.: {HelperNumero.colcarFormacataoInteiro(atvQuant)} )</Text> 
                            </Text>
                        </View>   
                        <View style={{ flex: 1, borderWidth: 0, borderColor: 'green', }}>
                            <Text style={[{fontSize: 13, fontWeight: 'bold', color:'#666666', textAlign: "center", }, ( parseFloat(atvTotValoriz) < 0) && {color:'#b22222'}, ( parseFloat(atvTotValoriz) > 0) && {color:'green'} ]}>R$ {HelperNumero.GetMascaraValorDecimal(atvTotValoriz)} 
                                <Text style={[{fontSize: 10, fontWeight: 'bold', color:'#666666', }, ( parseFloat(atvTotValoriz) < 0) && {color:'#b22222'}, ( parseFloat(atvTotValoriz) > 0) && {color:'green'} ]}> ({HelperNumero.GetMascaraValorDecimal(atvPercValoriz)}%)</Text> 
                            </Text>
                        </View>   
                    </View>   

                    <View style={{ height: 1, backgroundColor: "#CFCFCF", marginRight: 0, marginLeft: 0, marginBottom: 5, marginTop: 5, }} /> 

                    <View style={{ flex: 1, flexDirection: 'row', borderWidth: 0, borderColor: 'blue', }}>
                        <View style={{ flex: 1, borderWidth: 0, borderColor: 'green', }}>
                            <Text style={{fontSize: 9, fontWeight: 'normal', color:'#808080', textAlign: "center", }}>Preço Médio</Text>
                            <Text style={{fontSize: 11, fontWeight: 'normal', color:'#666666', textAlign: "center", }}>R$ {HelperNumero.GetMascaraValorDecimal(atvPrecoMedio)}</Text>
                        </View>   
                        <View style={{ flex: 1, borderWidth: 0, borderColor: 'green',  }}>
                            <Text style={{fontSize: 9, fontWeight: 'normal', color:'#808080', textAlign: "center", }}>Preço Atual</Text>
                            <Text style={{fontSize: 11, fontWeight: 'normal', color:'#666666', textAlign: "center", }}>R$ {HelperNumero.GetMascaraValorDecimal(atvPrecoAtual)}</Text>
                        </View>   
                    </View>    

                    <View style={{ flex: 1, flexDirection: 'row', borderWidth: 0, borderColor: 'blue', }}>
                        <View style={{ flex: 1, borderWidth: 0, borderColor: 'green', }}>
                            <Text style={{fontSize: 9, fontWeight: 'normal', color:'#808080', textAlign: "center", }}>Total Invest.</Text>
                            <Text style={{fontSize: 12, fontWeight: 'normal', color:'#666666', textAlign: "center", }}>R$ {HelperNumero.GetMascaraValorDecimal(atvTotInvest)}</Text>
                        </View>   
                        <View style={{ flex: 1, borderWidth: 0, borderColor: 'green',  }}>
                            <Text style={{fontSize: 9, fontWeight: 'normal', color:'#808080', textAlign: "center", }}>Total Atual</Text>
                            <Text style={{fontSize: 12, fontWeight: 'normal', color:'#666666', textAlign: "center", }}>R$ {HelperNumero.GetMascaraValorDecimal(atvTotAtual)}</Text>
                        </View>   
                    </View>   
                     
                </Body>
                <Right style={{ flex: 1, }}>
                    <Icon name="arrow-forward" />
                </Right>
            </CardItem>
        </Card>
    )
}

const mapStateToProps = state => ({

    txtEmail                 : state.AuthReducer.txtEmail,
    txtSenha                 : state.AuthReducer.txtSenha,
    
    listPortfolio            : state.PortfolioReducer.listPortfolio,
    txtErroPortfolio         : state.PortfolioReducer.txtErroPortfolio,
    isLoadingPortfolio       : state.PortfolioReducer.isLoadingPortfolio,

    lstPortfolioAtivos       : state.PortfolioReducer.lstPortfolioAtivos,
    txtErroPortfolioAtivos   : state.PortfolioReducer.txtErroPortfolioAtivos,
    isLoadingPortfolioAtivos : state.PortfolioReducer.isLoadingPortfolioAtivos,

});

const mapDispatchToProps = { buscaPortfolio, buscaPortfolioAtivos, };

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
