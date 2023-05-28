import React, {Component} from 'react';
import { Text, View, TouchableOpacity, } from 'react-native';
import { connect } from 'react-redux';
import { modificaNome, goToPerfil, } from '../../actions/AuthActions';
//import styles from './styles';

class HomeScreen extends Component { 

  constructor(props){
    super(props); 
    this.state = { };
  }

  componentDidMount() {
    //this.setState({ });
    this.props.modificaNome('Teste01111');
  }
   
  componentWillUnmount() {
    
  }

  _onPressPerfilNomal = () => {
    this.props.navigation.navigate('Perfil');
  }
  
  _onPressPerfilRedux = () => {
    this.props.goToPerfil();
  }
  
  render() {
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <Text style={{ fontSize: 25, fontWeight: 'bold', }}>Home #1</Text>
          <Text style={{ fontSize: 15, }}>Nome: {this.props.txtLoginNome}</Text>

          <TouchableOpacity onPress={this._onPressPerfilNomal}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', }}> Go To Perfil --> Normal</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={this._onPressPerfilRedux}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', }}> Go To Perfil --> Redux</Text>
          </TouchableOpacity>

      </View>
    );
  }

}

const mapStateToProps = (state) => ({
  txtLoginNome      : state.AuthReducer.loginNome,
  txtLoginMsgErro   : state.AuthReducer.loginMsgErro,
  txtLoginIsLoading : state.AuthReducer.loginIsLoading,
});

const mapDispatchToProps = { 
  modificaNome,
  goToPerfil,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);