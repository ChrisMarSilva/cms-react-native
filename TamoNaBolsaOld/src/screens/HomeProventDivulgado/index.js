import React from 'react';
import { View,  RefreshControl, } from 'react-native';
import { Container, Content,  List, ListItem, Text, Icon, Body , Left, Right, } from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

import styles from './styles';
import * as HelperLog from '../../util/HelperLog';
import * as HelperDate from '../../util/HelperDate';
import {  buscaListaCalendario, } from '../../actions/HomeActions';

class HomeProventDivulgado extends React.Component {
  
    constructor(props){
        super(props);  

        // HelperLog.entrada('HomeProventDivulgado.constructor');
        try {
            
            this._buscaDados = this._buscaDados.bind(this); 

        }catch(err) {
            // HelperLog.erro('HomeProventDivulgado.constructor', err.message);
        }finally {
            // HelperLog.saida('HomeProventDivulgado.constructor');
        }
    }

    componentWillMount() {  
        // HelperLog.entrada('HomeProventDivulgado.componentWillMount');
        try {

            //this._buscaDados();

        }catch(err) {
            // HelperLog.erro('HomeProventDivulgado.componentWillMount', err.message);
        }finally {
            // HelperLog.saida('HomeProventDivulgado.componentWillMount');
        }
    }

    componentDidMount() {
        // HelperLog.entrada('HomeProventDivulgado.componentDidMount');
        try {

        }catch(err) {
            // HelperLog.erro('HomeProventDivulgado.componentDidMount', err.message);
        }finally {
            // HelperLog.saida('HomeProventDivulgado.componentDidMount');
        }
    }

    componentWillUnmount() {
        // HelperLog.entrada('HomeProventDivulgado.componentWillUnmount');
        try {

        }catch(err) {
            // HelperLog.erro('HomeProventDivulgado.componentWillUnmount', err.message);
        }finally {
            // HelperLog.saida('HomeProventDivulgado.componentWillUnmount');
        }
    }

    _buscaDados = () => {
        // HelperLog.entrada('HomeProventDivulgado._buscaDados');
        try {
           
            const txtEmail    = this.props.txtEmail;
            const txtSenha    = this.props.txtSenha; 
            this.props.buscaListaCalendario(txtEmail, txtSenha); 

        }catch(err) {
            // HelperLog.erro('HomeProventDivulgado._buscaDados', err.message);
        }finally {
            // HelperLog.saida('HomeProventDivulgado._buscaDados');
        }
    }

    render() {

        // HelperLog.entrada('HomeProventDivulgado.render');

        return (
            <Container> 

                <HomeProventDivulgadoLista 
                    lista={this.props.listCalendario} 
                    isLoading={this.props.isLoadingCalendario} 
                    msgErro={this.props.txtErroCalendario} 
                    _buscaDados={this._buscaDados}
                />  

            </Container>
        );

    }

}

const HomeProventDivulgadoLista = (props) => (
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
            <HomeProventDivulgadoListaItemShimmer />  
            : 
                ( !props.lista || props.lista.length <= 0 )
                ? 
                <Text style={{textAlign: 'center'}}>{ !props.isLoading ? 'Nenhum provento divulgado...' : null}</Text>
                : 
                <List 
                    style={{ marginBottom: 20, }} 
                    dataArray={props.lista}
                    renderRow={ item => <HomeProventDivulgadoListaItem item={item} /> }
                />
        }

    </Content>
);

const HomeProventDivulgadoListaItem = (props) => {

    //const calId      = props.item[0];
    const calAtivo   = props.item[1];   
    const calTipo    = props.item[2]; 
    const calDtEx    = HelperDate.colcarFormacataoData( props.item[3] );
    const calDtPagto = HelperDate.colcarFormacataoData( props.item[4] ); 
    const calPreco   = props.item[5].replace('.', ','); 

    let calDescrTipo = "";
    if ( calTipo == 'D') calDescrTipo = 'DIVIDENDO';
    if ( calTipo == 'J') calDescrTipo = 'JRS CAP PRÓPRIO';
    if ( calTipo == 'R') calDescrTipo = 'REST CAP DIN';
    if ( calTipo == 'B') calDescrTipo = 'BONIFICAÇÃO';

    if  ( calTipo != 'D' && calTipo != 'J' && calTipo != 'R' && calTipo != 'B' ) 
        return null;

    return (
        <ListItem style={styles.CardListItem} onPress={ () => {  } }>
            <Body style={styles.CardListItemBody} >
                <View style={styles.CardListItemBodyLinha}>
                    <Text style={styles.TxtListItemAtivo}>{calAtivo}</Text>
                    <Text style={styles.TxtListItemTipo}>{calDescrTipo}</Text>
                </View>
                <View style={styles.CardListItemBodyLinha}>
                    <Text style={styles.TxtListItemDtTit}><Text style={styles.TxtListItemDtVlr}>Dt. Ex: </Text>{calDtEx}</Text>
                    <Text style={styles.TxtListItemDtTit}><Text style={styles.TxtListItemDtVlr}>Dt. Pagto: </Text>{calDtPagto}</Text>
                </View>
                <View style={styles.CardListItemBodyLinha}>
                    <Text style={styles.TxtListItemPreco}>R$ {calPreco}</Text>
                </View>
            </Body>
            <Right style={styles.CardListItemIcon}>
                {/* <Icon type="FontAwesome" name="plus-circle" style={{color: 'green'}}/> */}
            </Right>
        </ListItem>
    )
};

const HomeProventDivulgadoListaItemShimmer = (props) => (
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
    txtEmail            : state.AuthReducer.txtEmail,
    txtSenha            : state.AuthReducer.txtSenha,
    
    isLoadingCalendario : state.HomeReducer.isLoadingCalendario,
    txtErroCalendario   : state.HomeReducer.txtErroCalendario,
    listCalendario      : state.HomeReducer.listCalendario,
});

const mapDispatchToProps = { buscaListaCalendario };

export default connect(mapStateToProps, mapDispatchToProps)(HomeProventDivulgado);
