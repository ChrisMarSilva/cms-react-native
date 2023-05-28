import React from 'react';
import { View, RefreshControl, Linking , } from 'react-native';
import { Container, Content, List, ListItem, Text, Body, Right, Icon } from 'native-base';
import { connect } from 'react-redux';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

import styles from './styles';
import * as HelperLog from '../../util/HelperLog';
import * as HelperDate from '../../util/HelperDate';
import {  buscaListaFatos, } from '../../actions/HomeActions';

class HomeFatosMensal extends React.Component {
  
    constructor(props){
        super(props);  

        //HelperLog.entrada('HomeFatosMensal.constructor');
        try {
           
            this._navigate   = this._navigate.bind(this);  
            this._buscaDados = this._buscaDados.bind(this); 

        }catch(err) {
            //HelperLog.erro('HomeFatosMensal.constructor', err.message);
        }finally {
            //HelperLog.saida('HomeFatosMensal.constructor');
        }
    }

    componentWillMount() {  
        //HelperLog.entrada('HomeFatosMensal.componentWillMount');
        try {

            // this._buscaDados();

        }catch(err) {
             //HelperLog.erro('HomeFatosMensal.componentWillMount', err.message);
        }finally {
            // HelperLog.saida('HomeFatosMensal.componentWillMount');
        }
    }

    componentDidMount() {
        // HelperLog.entrada('HomeFatosMensal.componentDidMount');
        try {

        }catch(err) {
            // HelperLog.erro('HomeFatosMensal.componentDidMount', err.message);
        }finally {
            // HelperLog.saida('HomeFatosMensal.componentDidMount');
        }
    }

    componentWillUnmount() {
        // HelperLog.entrada('HomeFatosMensal.componentWillUnmount');
        try {

        }catch(err) {
            // HelperLog.erro('HomeFatosMensal.componentWillUnmount', err.message);
        }finally {
            // HelperLog.saida('HomeFatosMensal.componentWillUnmount');
        }
    }

    _buscaDados = () => {
        // HelperLog.entrada('HomeFatosMensal._buscaDados');
        try {
           
            const txtEmail    = this.props.txtEmail;
            const txtSenha    = this.props.txtSenha; 
            this.props.buscaListaFatos(txtEmail, txtSenha); 

        }catch(err) {
            // HelperLog.erro('HomeFatosMensal._buscaDados', err.message);
        }finally {
            // HelperLog.saida('HomeFatosMensal._buscaDados');
        }
    }
    
    _navigate( url ){
        // HelperLog.entrada('HomeFatosMensal._navigate');
        try {

            //this.props.navigation.navigate('HomePDF', { url: url });
            Linking.openURL(url);

        }catch(err) {
            // HelperLog.erro('HomeFatosMensal._navigate', err.message);
        }finally {
            // HelperLog.saida('HomeFatosMensal._navigate');
        }
      }

    render() {

        // HelperLog.entrada('HomeFatosMensal.render');

        return (
            <Container> 

                <FatosMesLista 
                    lista={this.props.listFatos} 
                    isLoading={this.props.isLoadingFatos} 
                    msgErro={this.props.txtErroFatos} 
                    _navigate={this._navigate}
                    _buscaDados={this._buscaDados}
                />  

            </Container>
        );

    }

}

const FatosMesLista = (props) => (
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
            <FatosMesListaItemShimmer />  
            : 
                ( !props.lista || props.lista.length <= 0 )
                ? 
                <Text style={{textAlign: 'center'}}>{ !props.isLoading ? 'Nenhum Fato Relevante comunicado...' : null}</Text>
                : 
                <List 
                    style={{ marginBottom: 20, }} 
                    dataArray={props.lista}
                    renderRow={ item => <FatosMesListaItem item={item}  _navigate={props._navigate} /> }
                />
        }

    </Content>
);

const FatosMesListaItem = (props) => {

    //const fatoId       = props.item[0];
    const fatoEmpresa  = props.item[1];
    const fatoData     = HelperDate.colcarFormacataoDataHora( props.item[2] ).substring(0,16); 
    const provLink     = props.item[3];    
    const provAssunto  = props.item[4];

    return (
        <ListItem onPress={ () => { props._navigate(provLink); } }>
            <Body>
                <Text style={styles.TxtItemData}>{fatoData}</Text> 
                <Text style={styles.TxtItemEmpresa}>{fatoEmpresa}</Text>  
                <Text style={styles.TxtItemAssunto}>{provAssunto}</Text> 
            </Body>
            <Right><Icon name="arrow-forward" /></Right>
        </ListItem>
    )
};

{/* 
<View style={styles.CardItem}>  
    <Text style={styles.TxtItemData}>{fatoData}</Text> 
    <Text style={styles.TxtItemEmpresa}>{fatoEmpresa}</Text>  
    <Text style={styles.TxtItemAssunto}>{provAssunto}</Text>      
    <Text style={styles.TxtItemLink} onPress={ ()=>{ props._navigate(provLink); }} >Abri PDF..</Text>
</View> 
*/}

const FatosMesListaItemShimmer = (props) => (
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
    
    isLoadingFatos     : state.HomeReducer.isLoadingFatos,
    txtErroFatos       : state.HomeReducer.txtErroFatos,
    listFatos          : state.HomeReducer.listFatos,
});

const mapDispatchToProps = { buscaListaFatos };

export default connect(mapStateToProps, mapDispatchToProps)(HomeFatosMensal);
