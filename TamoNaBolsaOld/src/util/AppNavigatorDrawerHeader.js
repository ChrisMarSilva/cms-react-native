import React, { Component } from 'react'
import { StyleSheet, ImageBackground, Image, ScrollView, Text, View, TouchableOpacity, AsyncStorage, } from 'react-native';
import { DrawerActions, NavigationActions, DrawerNavigation } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Constants } from 'expo';

import * as CONSTANTE from './Constante';
import imgFundo  from '../imgs/fundo05.png';
import imgPerson from '../imgs/pessoa-icon.png';
//import imgLogo from '../imgs/logo.png';
import { modificaEmail, modificaSenha, modificaLembrar, } from '../actions/AuthActions';

class AppNavigatorDrawerHeader extends Component {

    constructor(props){
        super(props);
        //this.state = {};
    }

    _OnPressNavToScreen = (route) => {
        this.props.navigation.navigate(route);
        this.props.navigation.dispatch(DrawerActions.closeDrawer());
    }

    _onPressSair = async () => {

        this.props.modificaEmail("");
        this.props.modificaSenha(""); 
        this.props.modificaLembrar(false); 

        await AsyncStorage.removeItem(CONSTANTE.SESSAO_USER_ID);
        await AsyncStorage.removeItem(CONSTANTE.SESSAO_USER_NOME);
        await AsyncStorage.removeItem(CONSTANTE.SESSAO_USER_TIPO);
        await AsyncStorage.removeItem(CONSTANTE.SESSAO_USER_EMAIL);
        await AsyncStorage.removeItem(CONSTANTE.SESSAO_USER_SENHA);
        await AsyncStorage.removeItem(CONSTANTE.SESSAO_USER_LEMBRAR);

        this.props.navigation.navigate('UserLogin');
    } 

    render(){
        return (
            <View style={styles.container}>
                <ScrollView style={{flex: 1,}}>
                    <View style={styles.headerContainer}>
                        <ImageBackground source={imgFundo} style={{flex: 1, width: 300, justifyContent: 'center', alignItems: 'center', }} >
                            <Image style={{width: 100, height: 100, borderRadius: 63, borderWidth: 4, borderColor: "white", marginTop: 15,  marginBottom:20, }} source={imgPerson} />
                            <Text style={styles.headerText}>{this.props.txtNome}</Text>
                            <Text style={styles.headerSubText}>{this.props.txtEmail}</Text>
                            <Text style={styles.headerSvsText}>Versão: {Constants.manifest.version}</Text>
                        </ImageBackground>
                    </View>
                    <View style={styles.screenContainer}>
                        {/* 
                        <TouchableOpacity style={styles.screenStyle} onPress={ () => { this._OnPressNavToScreen('Perfil'); } }>
                            <Ionicons style={styles.screenImage} name="md-menu" size={30} color='#000' />
                            <Text>Minha Conta</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.screenStyle} onPress={ () => { this._OnPressNavToScreen('Apuracao'); } }>
                            <Ionicons style={styles.screenImage} name="md-menu" size={30} color='#000' />
                            <Text>Coretora</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.screenStyle} onPress={ () => { this._OnPressNavToScreen('Apuracao'); } }>
                            <Ionicons style={styles.screenImage} name="md-menu" size={30} color='#000'  />
                            <Text>Aluguel de Ativos</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.screenStyle} onPress={ () => { this._OnPressNavToScreen('Apuracao'); } }>
                            <Ionicons style={styles.screenImage} name="md-menu" size={30} color='#000' />
                            <Text>Radar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.screenStyle} onPress={ () => { this._OnPressNavToScreen('Apuracao'); } }>
                            <Ionicons style={styles.screenImage} name="md-menu" size={30} color='#000' />
                            <Text>Fatos Relevantes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.screenStyle} onPress={ () => { this._OnPressNavToScreen('Apuracao'); } }>
                            <Ionicons style={styles.screenImage} name="md-menu" size={30} color='#000' />
                            <Text>Calendário</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.screenStyle} onPress={ () => { this._OnPressNavToScreen('Apuracao'); } }>
                            <Ionicons style={styles.screenImage} name="md-menu" size={30} color='#000' />
                            <Text>Análise</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.screenStyle} onPress={ () => { this._OnPressNavToScreen('Apuracao'); } }>
                            <Ionicons style={styles.screenImage} name="md-menu" size={30} color='#000' />
                            <Text>IRPF</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.screenStyle} onPress={ () => { this._OnPressNavToScreen('Apuracao'); } }>
                            <Ionicons style={styles.screenImage} name="md-menu" size={30} color='#000' />
                            <Text>Comentários</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.screenStyle} onPress={ () => { this._OnPressNavToScreen('Apuracao'); } }>
                            <Ionicons style={styles.screenImage} name="md-menu" size={30} color='#000' />
                            <Text>Calc. Valor Intrínseco</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.screenStyle} onPress={ () => { this._OnPressNavToScreen('Apuracao'); } }>
                            <Ionicons style={styles.screenImage} name="md-menu" size={30} color='#000' />
                            <Text>Calc. Valuation Simples</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.screenStyle} onPress={ () => { this._OnPressNavToScreen('Apuracao'); } }>
                            <Ionicons style={styles.screenImage} name="md-menu" size={30} color='#000' />
                            <Text>Sobre</Text>
                        </TouchableOpacity> 
                        <View style={styles.ItemSeparador} />
                        */}
                        <TouchableOpacity style={styles.screenStyle} onPress={ () => { this._onPressSair(); } }>
                            <Ionicons style={styles.screenImage} name="md-power" size={30} color='#000' /> 
                            <Text>Sair</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', },
    headerContainer: { height: 230, },
    headerText: { fontWeight: 'bold', fontSize: 15, color: '#fff8f8', },
    headerSubText: { fontSize: 13, color: '#fff8f8', },
    headerSvsText: { textAlign: "left", fontSize: 11, color: '#fff8f8', marginTop: 10, },
    screenContainer: { flex: 1, paddingTop: 10 },
    screenStyle: { flex: 1, width: '100%', height: 40, marginTop: 2, marginLeft: 20, flexDirection: 'row', alignItems: 'center', borderColor: 'red', borderWidth: 0, },
    screenImage: {marginRight: 35},
    screenTextStyle:{ fontSize: 20, marginLeft: 20 },
    ItemSeparador: { height: 1, backgroundColor: "#CFCFCF", marginRight: 5, marginLeft: 10, marginBottom: 3, marginTop: 3, },
});

AppNavigatorDrawerHeader.propTypes = { navigation: PropTypes.object };

// export default AppNavigatorDrawerHeader;

const mapStateToProps = state => ({ 
    
    txtNome  : state.AuthReducer.txtNome,
    txtEmail : state.AuthReducer.txtEmail,

});

const mapDispatchToProps = { modificaEmail, modificaSenha, modificaLembrar, };

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigatorDrawerHeader);