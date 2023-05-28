import React from 'react';
import { View, RefreshControl, } from 'react-native';
import { Container,  Content, Card, CardItem, Text, Button, Icon, Left, Body, Right, } from 'native-base';
import { connect } from 'react-redux';

import styles from './styles';
import * as HelperLog from '../../util/HelperLog';
import * as HelperNumero from '../../util/HelperNumero';
import { buscaListaApuracaoC, buscaListaApuracaoD, buscaListaOperacao, buscaListaProvento, buscaListaCalendario, buscaListaFatos, } from '../../actions/HomeActions';
import { buscaPortfolio, } from '../../actions/PortfolioActions';

class Home extends React.Component {
  
    constructor(props){
        super(props);  
        // HelperLog.entrada('Home.constructor');
        try {
            
            this._goToHomePortfolio        = this._goToHomePortfolio.bind(this); 
            this._goToHomeValorizDia       = this._goToHomeValorizDia.bind(this); 
            this._goToHomeOperacMensal     = this._goToHomeOperacMensal.bind(this); 
            this._goToHomeProventDivulgado = this._goToHomeProventDivulgado.bind(this); 
            this._goToHomeProventReceber   = this._goToHomeProventReceber.bind(this); 
            this._goToHomeFatosMensal      = this._goToHomeFatosMensal.bind(this); 

        }catch(err) {
            // HelperLog.erro('Home.constructor', err.message);
        }finally {
            // HelperLog.saida('Home.constructor');
        }
    }

    componentWillMount() {  
        // HelperLog.entrada('Home.componentWillMount');
        try {
            this._buscaDados();
        }catch(err) {
            // HelperLog.erro('Home.componentWillMount', err.message);
        }finally {
            // HelperLog.saida('Home.componentWillMount');
        }
    }

    componentDidMount() {
        // HelperLog.entrada('Home.componentDidMount');
        try {
        }catch(err) {
            // HelperLog.erro('Home.componentDidMount', err.message);
        }finally {
            // HelperLog.saida('Home.componentDidMount');
        }
    }

    componentWillUnmount() {
        // HelperLog.entrada('Home.componentWillUnmount');
        try {
        }catch(err) {
            // HelperLog.erro('Home.componentWillUnmount', err.message);
        }finally {
            // HelperLog.saida('Home.componentWillUnmount');
        }
    }   

    _buscaDados = () => {
        // HelperLog.entrada('Home._buscaDados');
        try {
            this._buscaListaPortfolio();
            this._buscaListaApuracao();
            this._buscaListaOperacao();
            this._buscaListaCalendario();
            this._buscaListaProvento();
            this._buscaListaFatos();
        }catch(err) {
            // HelperLog.erro('Home._buscaDados', err.message);
        }finally {
            // HelperLog.saida('Home._buscaDados');
        }
    } 

    _buscaListaPortfolio = () => {
        // HelperLog.entrada('Home._buscaListaPortfolio');
        try {
            const txtEmail = this.props.txtEmail;
            const txtSenha = this.props.txtSenha; 
            this.props.buscaPortfolio(txtEmail, txtSenha);
        }catch(err) {
            // HelperLog.erro('Home._buscaListaPortfolio', err.message);
        }finally {
            // HelperLog.saida('Home._buscaListaPortfolio');
        }
    }

    _buscaListaOperacao = (ano) => {
        // HelperLog.entrada('Home._buscaListaOperacao');
        try {
            const txtEmail = this.props.txtEmail;
            const txtSenha = this.props.txtSenha; 
            this.props.buscaListaOperacao(txtEmail, txtSenha);
        }catch(err) {
            // HelperLog.erro('Home._buscaListaOperacao', err.message);
        }finally {
            // HelperLog.saida('Home._buscaListaOperacao');
        }
    }

    _buscaListaFatos = () => {
        // HelperLog.entrada('Home._buscaListaFatos');
        try {
            const txtEmail    = this.props.txtEmail;
            const txtSenha    = this.props.txtSenha; 
            this.props.buscaListaFatos(txtEmail, txtSenha); 
        }catch(err) {
            // HelperLog.erro('Home._buscarListaProventos', err.message);
        }finally {
            // HelperLog.saida('Home._buscarListaProventos');
        }
    }
    
    _buscaListaCalendario = () => {
        // HelperLog.entrada('Home._buscarListaProventos');
        try {
            const txtEmail    = this.props.txtEmail;
            const txtSenha    = this.props.txtSenha; 
            this.props.buscaListaCalendario(txtEmail, txtSenha); 
        }catch(err) {
            // HelperLog.erro('Home._buscarListaProventos', err.message);
        }finally {
            // HelperLog.saida('Home._buscarListaProventos');
        }
    }

    _buscaListaProvento = () => {
        // HelperLog.entrada('Home._buscaListaProvento');
        try {
            const txtEmail = this.props.txtEmail;
            const txtSenha = this.props.txtSenha; 
            this.props.buscaListaProvento(txtEmail, txtSenha); 
        }catch(err) {
            // HelperLog.erro('Home._buscaListaProvento', err.message);
        }finally {
            // HelperLog.saida('Home._buscaListaProvento');
        }
    }

    _buscaListaApuracao = () => {
        // HelperLog.entrada('Home._buscaListaApuracao');
        try {
            const txtEmail = this.props.txtEmail;
            const txtSenha = this.props.txtSenha; 
            this.props.buscaListaApuracaoC( txtEmail, txtSenha );
            this.props.buscaListaApuracaoD( txtEmail, txtSenha );
        }catch(err) {
            // HelperLog.erro('Home._buscaListaApuracao', err.message);
        }finally {
            // HelperLog.saida('Home._buscaListaApuracao');
        }
    }

    _goToHomePortfolio = () => {
        this.props.navigation.navigate('Portfolio');
    }
    
    _goToHomeValorizDia = () => {
        this.props.navigation.navigate('HomeValorizDia');
    }
    
    _goToHomeOperacMensal = () => {
        this.props.navigation.navigate('HomeOperacMensal');
    }
    
    _goToHomeProventDivulgado = () => {
        this.props.navigation.navigate('HomeProventDivulgado');
    }
    
    _goToHomeProventReceber = () => {
        this.props.navigation.navigate('HomeProventReceber');
    }
    
    _goToHomeFatosMensal = () => {
        this.props.navigation.navigate('HomeFatosMensal');
    }

    render() {

        // HelperLog.entrada('Home.render');

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
                   
                    <HomePortfolio 
                        lista={this.props.listPortfolio} 
                        _goToHomePortfolio={this._goToHomePortfolio}
                    />

                    <HomeValorizDia 
                        _goToHomeValorizDia={this._goToHomeValorizDia}
                    />

                    <HomeApurac 
                        listApuracaoC={this.props.listApuracaoC} 
                        listApuracaoD={this.props.listApuracaoD} 
                        _goToHomeOperacMensal={this._goToHomeOperacMensal}
                    />

                    <HomeOperac 
                        totalC={this.props.totalOperacoesC} 
                        totalV={this.props.totalOperacoesV} 
                        totalB={this.props.totalOperacoesB} 
                        _goToHomeOperacMensal={this._goToHomeOperacMensal}
                    />

                    <HomeProvent 
                        listaProvDiv={this.props.listCalendario} 
                        listaProvRec={this.props.listProventos} 
                        totalProvRec={this.props.totalProventosRec} 
                        _goToHomeProventReceber={this._goToHomeProventReceber}
                        _goToHomeProventDivulgado={this._goToHomeProventDivulgado}
                    />

                    <HomeFatos 
                        lista={this.props.listFatos} 
                        _goToHomeFatosMensal={this._goToHomeFatosMensal}
                    />
            
                </Content>
            </Container>
        );

    }

}

const HomePortfolio = (props) => {
    
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
            <CardItem button onPress={ () => { props._goToHomePortfolio(); } }>
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

const HomeValorizDia = (props) => {
    return (
        <Card>
            <CardItem button onPress={ () => { props._goToHomeValorizDia(); } }>
                <Body style={{ flex: 10, alignItems: 'center', justifyContent: "center", }}>
                    <Text style={{ color:'green', fontSize: 14, fontWeight: 'bold',  }}>Acompanhar Valorização do Dia</Text>
                </Body>
                <Right style={{ flex: 1, }}> 
                    <Icon name="arrow-forward" /> 
                </Right>
            </CardItem>
        </Card> 
    )
};

const HomeApurac = (props) => {

    let ApurCData         = ""; 
    let ApurCVlrVenda     = 0.00;
    let ApurCVlrApurado   = 0.00;
    let ApurCVlrCompensar = 0.00;
    let ApurCVlrResultado = 0.00;
    let ApurCVlrImposto   = 0.00;
    if ( props.listApuracaoC.length > 0 ){
        ApurCData         = props.listApuracaoC[props.listApuracaoC.length- 1][0]; 
        ApurCVlrVenda     = parseFloat( HelperNumero.GetValorDecimal(props.listApuracaoC[props.listApuracaoC.length- 1][1] ));
        ApurCVlrApurado   = parseFloat( HelperNumero.GetValorDecimal(props.listApuracaoC[props.listApuracaoC.length- 1][2] ));
        ApurCVlrCompensar = parseFloat( HelperNumero.GetValorDecimal(props.listApuracaoC[props.listApuracaoC.length- 1][3] ));
        ApurCVlrResultado = parseFloat( HelperNumero.GetValorDecimal(props.listApuracaoC[props.listApuracaoC.length- 1][4] ));
        ApurCVlrImposto   = parseFloat( HelperNumero.GetValorDecimal(props.listApuracaoC[props.listApuracaoC.length- 1][5] ));
    }
    
    let ApurDData         = ""; 
    let ApurDVlrVenda     = 0.00;
    let ApurDVlrApurado   = 0.00;
    let ApurDVlrCompensar = 0.00;
    let ApurDVlrResultado = 0.00;
    let ApurDVlrImposto   = 0.00;
    if ( props.listApuracaoD.length > 0 ){
        ApurDData         = props.listApuracaoD[props.listApuracaoD.length- 1][0]; 
        ApurDVlrVenda     = parseFloat( HelperNumero.GetValorDecimal(props.listApuracaoD[props.listApuracaoD.length- 1][1] )); 
        ApurDVlrApurado   = parseFloat( HelperNumero.GetValorDecimal(props.listApuracaoD[props.listApuracaoD.length- 1][2] )); 
        ApurDVlrCompensar = parseFloat( HelperNumero.GetValorDecimal(props.listApuracaoD[props.listApuracaoD.length- 1][3] ));
        ApurDVlrResultado = parseFloat( HelperNumero.GetValorDecimal(props.listApuracaoD[props.listApuracaoD.length- 1][4] ));
        ApurDVlrImposto   = parseFloat( HelperNumero.GetValorDecimal(props.listApuracaoD[props.listApuracaoD.length- 1][5] ));
    }

    return (
        <Card style={{margin: 0, padding: 0, }}>
            <CardItem style={{  }}>
                <Left style={{ flex: 1, flexDirection: 'column', height: 110, marginRight: 10, marginBottom: 6, }}>
                    
                    <View style={{ width: '100%', alignItems: 'center', }}>
                         <Text style={{ color:'#666666', fontSize: 12, fontWeight: 'bold', textAlign: "center", marginBottom: 10, }}>Apuração Comum</Text>
                    </View>

                    <View style={{ flexDirection: 'row', width: '100%',}}>
                        <Text style={{ color:'#666666', fontSize: 9, textAlign: "left", width: 75, }}>Tot. Venda:</Text>
                        <Text style={{ color:'#666666', fontSize: 10, textAlign: "left", }}>R$ {HelperNumero.GetMascaraValorDecimal(ApurCVlrVenda)}</Text>
                    </View>                    

                    <View style={{ flexDirection: 'row', width: '100%',}}>
                        <Text style={{ color:'#666666', fontSize: 9, textAlign: "left", width: 75, }}>Apurado:</Text>
                        <Text style={[{ color:'#666666', fontSize: 10, textAlign: "left", }, ( parseFloat(ApurCVlrApurado) < 0) && { color:'red'}, ( parseFloat(ApurCVlrApurado) > 0) && { color:'green'}]}>R$ {HelperNumero.GetMascaraValorDecimal(ApurCVlrApurado)}</Text>
                    </View>

                    <View style={{  flexDirection: 'row', width: '100%', }}>
                        <Text style={{ color:'#666666', fontSize: 9, textAlign: "left", width: 75, }}>A Compensar:</Text>
                        <Text style={[{ color:'#666666', fontSize: 10, textAlign: "left", }, ( parseFloat(ApurCVlrCompensar) < 0) && { color:'red'}, ( parseFloat(ApurCVlrCompensar) > 0) && { color:'green'}]}>R$ {HelperNumero.GetMascaraValorDecimal(ApurCVlrCompensar)}</Text>
                    </View>
                    
                    <View style={{ flexDirection: 'row', width: '100%', }}>
                        <Text style={{ color:'#666666', fontSize: 9, textAlign: "left", width: 75, }}>Resultado:</Text>
                        <Text style={[{ color:'#666666', fontSize: 10, textAlign: "left", }, ( parseFloat(ApurCVlrResultado) < 0) && { color:'red'}, ( parseFloat(ApurCVlrResultado) > 0) && { color:'green'}]}>R$ {HelperNumero.GetMascaraValorDecimal(ApurCVlrResultado)}</Text>
                    </View>
                    
                    <View style={{ flexDirection: 'row', width: '100%', }}>
                        <Text style={{ color:'#666666', fontSize: 9, textAlign: "left", width: 75, }}>Imposto:</Text>
                        <Text style={[{ color:'#666666', fontSize: 10, textAlign: "left", }, ( parseFloat(ApurCVlrImposto) > 0) && { color:'red'}]}>R$ {HelperNumero.GetMascaraValorDecimal(ApurCVlrImposto)}</Text>
                    </View>

                </Left>
                <Right style={{ flex: 1, flexDirection: 'column', height: 110, marginLeft: 10, marginBottom: 6, }}>

                    <View style={{ width: '100%', alignItems: 'center', }}>
                         <Text style={{ color:'#666666', fontSize: 12, fontWeight: 'bold', textAlign: "center", marginBottom: 10, }}>Apuração  Day-Trade</Text>
                    </View>

                    <View style={{ flexDirection: 'row', width: '100%',}}>
                        <Text style={{ color:'#666666', fontSize: 9, textAlign: "left", width: 75, }}>Tot. Venda:</Text>
                        <Text style={{ color:'#666666', fontSize: 10, textAlign: "left", }}>R$ {HelperNumero.GetMascaraValorDecimal(ApurDVlrVenda)}</Text>
                    </View>
                    
                    <View style={{ flexDirection: 'row', width: '100%',}}>
                        <Text style={{ color:'#666666', fontSize: 9, textAlign: "left", width: 75, }}>Apurado:</Text>
                        <Text style={[{ color:'#666666', fontSize: 10, textAlign: "left", }, ( parseFloat(ApurDVlrApurado) < 0) && { color:'red'}, ( parseFloat(ApurDVlrApurado) > 0) && { color:'green'}]}>R$ {HelperNumero.GetMascaraValorDecimal(ApurDVlrApurado)}</Text>
                    </View>

                    <View style={{  flexDirection: 'row', width: '100%', }}>
                        <Text style={{ color:'#666666', fontSize: 9, textAlign: "left", width: 75, }}>A Compensar:</Text>
                        <Text style={[{ color:'#666666', fontSize: 10, textAlign: "left", }, ( parseFloat(ApurDVlrCompensar) < 0) && { color:'red'}, ( parseFloat(ApurDVlrCompensar) > 0) && { color:'green'}]}>R$ {HelperNumero.GetMascaraValorDecimal(ApurDVlrCompensar)}</Text>
                    </View>
                    
                    <View style={{ flexDirection: 'row', width: '100%', }}>
                        <Text style={{ color:'#666666', fontSize: 9, textAlign: "left", width: 75, }}>Resultado:</Text>
                        <Text style={[{ color:'#666666', fontSize: 10, textAlign: "left", }, ( parseFloat(ApurDVlrResultado) < 0) && { color:'red'}, ( parseFloat(ApurDVlrResultado) > 0) && { color:'green'}]}>R$ {HelperNumero.GetMascaraValorDecimal(ApurDVlrResultado)}</Text>
                    </View>
                     
                    <View style={{ flexDirection: 'row', width: '100%',  }}>
                        <Text style={{ color:'#666666', fontSize: 9, textAlign: "left", width: 75, }}>Imposto:</Text>
                        <Text style={[{ color:'#666666', fontSize: 10, textAlign: "left", }, ( parseFloat(ApurDVlrImposto) > 0) && { color:'red'}]}>R$ {HelperNumero.GetMascaraValorDecimal(ApurDVlrImposto)}</Text>
                    </View>

                </Right>
            </CardItem>
        </Card>
    )
};

const HomeOperac = (props) => {
    return (
        <Card>
            <CardItem button onPress={ () => { props._goToHomeOperacMensal(); } }>
                <Left style={{ flex: 1, flexDirection: 'column', alignItems: "center", borderRightWidth: 1, borderRightColor: '#666666', }}>
                    <Text style={{ color:'#666666', fontSize: 12, fontWeight: 'bold', }}>Tot. Compras</Text>
                    <Text style={{ color:'green', fontSize: 11, }}>R$ {HelperNumero.GetMascaraValorDecimal(parseFloat(props.totalC))}</Text>
                </Left>
                <Body style={{ flex: 1, flexDirection: 'column', alignItems: "center", }}>
                    <Text style={{ color:'#666666', fontSize: 12, fontWeight: 'bold', }}>Tot. Vendas</Text>
                    <Text style={{ color:'red', fontSize: 11, }}>R$ {HelperNumero.GetMascaraValorDecimal(parseFloat(props.totalV))}</Text>
                </Body>
                <Right style={{ flex: 1, flexDirection: 'column', alignItems: "center", borderLeftWidth: 1, borderLeftColor: '#666666', }}>
                    <Text style={{ color:'#666666', fontSize: 12, fontWeight: 'bold', }}>Tot. Bônus</Text>
                    <Text style={{ color:'blue', fontSize: 11, }}>R$ {HelperNumero.GetMascaraValorDecimal(parseFloat(props.totalB))}</Text>
                </Right>
            </CardItem>
        </Card>
    )
};

const HomeProvent = (props) => {
    return (
        <Card>
            <CardItem>
                <Left style={{ flexDirection: 'column', flex: 1, alignItems: "center", borderRightWidth: 1, borderRightColor: '#666666' }}>
                    <Text style={{ color:'#666666', fontSize: 12, fontWeight: 'bold', }} onPress={ () => { props._goToHomeProventDivulgado(); } }>Proventos Divulgados</Text>
                    <Text style={{ color:'green', fontSize: 11, }} onPress={ () => { props._goToHomeProventDivulgado(); } }>{props.listaProvDiv.length} Ativo(s)</Text>
                </Left>
                <Right  style={{ flexDirection: 'column', flex: 1, alignItems: 'center', }}>
                    <Text style={{ color:'#666666', fontSize: 12, fontWeight: 'bold', }}  onPress={ () => { props._goToHomeProventReceber(); } }>Proventos a Receber</Text>
                    <Text style={{ color:'green', fontSize: 11, }} onPress={ () => { props._goToHomeProventReceber(); } }>R$ {HelperNumero.GetMascaraValorDecimal(parseFloat(props.totalProvRec))}</Text>
                </Right>
            </CardItem>
        </Card>
    )
};

const HomeFatos = (props) => {
    return (
        <Card>
            <CardItem button onPress={ () => { props._goToHomeFatosMensal(); } }>
                <Body style={{ flex: 9, alignItems: 'center', justifyContent: "center", }}>
                    <Text style={{ color:'#666666', fontSize: 12, fontWeight: 'bold', }}>Fatos Relevantes no Mês ( {props.lista.length} ) </Text>
                </Body>
                <Right style={{ flex: 1, }}> 
                    <Icon name="arrow-forward" /> 
                </Right>
            </CardItem>
        </Card>
    )
};

const mapStateToProps = state => ({
    txtEmail            : state.AuthReducer.txtEmail,
    txtSenha            : state.AuthReducer.txtSenha,
    
    listPortfolio       : state.PortfolioReducer.listPortfolio,
    txtErroPortfolio    : state.PortfolioReducer.txtErroPortfolio,
    isLoadingPortfolio  : state.PortfolioReducer.isLoadingPortfolio,
    
    isLoadingApuracao   : state.HomeReducer.isLoadingApuracao,
    txtErroApuracao     : state.HomeReducer.txtErroApuracao,
    listApuracaoC       : state.HomeReducer.listApuracaoC,
    listApuracaoD       : state.HomeReducer.listApuracaoD,
    
    isLoadingOperacoes  : state.HomeReducer.isLoadingOperacoes,
    txtErroOperacoes    : state.HomeReducer.txtErroOperacoes,
    listOperacoesC      : state.HomeReducer.listOperacoesC,
    listOperacoesV      : state.HomeReducer.listOperacoesV,
    listOperacoesB      : state.HomeReducer.listOperacoesB,
    totalOperacoesC     : state.HomeReducer.totalOperacoesC,
    totalOperacoesV     : state.HomeReducer.totalOperacoesV,
    totalOperacoesB     : state.HomeReducer.totalOperacoesB,
                    
    isLoadingCalendario : state.HomeReducer.isLoadingCalendario,
    txtErroCalendario   : state.HomeReducer.txtErroCalendario,
    listCalendario      : state.HomeReducer.listCalendario,
            
    isLoadingProventos  : state.HomeReducer.isLoadingProventos,
    txtErroProventos    : state.HomeReducer.txtErroProventos,
    listProventos       : state.HomeReducer.listProventos,
    totalProventosRec   : state.HomeReducer.totalProventosRec,

    isLoadingFatos      : state.HomeReducer.isLoadingFatos,
    txtErroFatos        : state.HomeReducer.txtErroFatos,
    listFatos           : state.HomeReducer.listFatos,

});

const mapDispatchToProps = { 
    buscaPortfolio, 
    buscaListaApuracaoC, 
    buscaListaApuracaoD, 
    buscaListaOperacao, 
    buscaListaProvento, 
    buscaListaCalendario, 
    buscaListaFatos, 
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);