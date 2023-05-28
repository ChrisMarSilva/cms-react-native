import React, {Component} from 'react';
import { Text, View,  } from 'react-native';
import { connect } from 'react-redux';
//import styles from './styles';

class PerfilScreen extends Component { 

  constructor(props){
    super(props); 
    this.state = { };
  }

  componentDidMount() {
    //this.setState({ });
  }
   
  componentWillUnmount() {
    
  }
  
  render() {
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <Text style={{ fontSize: 25, fontWeight: 'bold', }}>Perfil #1</Text>
          <Text style={{ fontSize: 15, }}>Nome: {this.props.txtLoginNome}</Text>
      </View>
    );
  }

}

const mapStateToProps = (state) => ({
  txtLoginNome: state.AuthReducer.loginNome,
});

const mapDispatchToProps = { 
};

export default connect(mapStateToProps, mapDispatchToProps)(PerfilScreen);