import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  MainContainer: { flex: 1, },
  LogoContainer: { flex: 1, },
  
  TextoLogoContainer: { flex: 5, alignItems: 'center', justifyContent: 'center', },
  TextoLogoPrinc: { textAlign: 'center', color: 'gray',   fontWeight: 'bold',   fontSize: 35,  fontStyle: 'italic', },
  TextoLogoPreto: { color: 'black', },
  TextoLogoVerde: { color: 'green', },

  TextooDesenvContainer: { flex: 1,  },
  TextoDesenvTitulo: { color: '#FFF', fontSize: 15, textAlign: 'center', },
  TextoDesenvNome: {  fontWeight: 'bold', },

});

export default styles;