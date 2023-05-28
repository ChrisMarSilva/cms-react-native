import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  MainContainer :{ flex:1, paddingTop: 20, backgroundColor: '#fff', alignItems: 'center',  },
  
  TextoContainer: { flex: 2, alignItems: 'center', justifyContent: 'center', },
  TextoLogoPrinc: { textAlign: 'center', color: 'gray',  fontWeight: 'bold',  fontSize: 25, fontStyle: 'italic', backgroundColor: 'transparent', marginTop: 20,  },
  TextoLogoPreto: { color: 'black', },
  TextoLogoVerde: { color: 'green', },
  TextoLogoImg: { width: 80, height: 80, },
  
  InputContainer: { flex: 2,  width: '100%',  alignItems: 'center', },
  Input: { textAlign: 'center', width: '95%', marginBottom: 10, height: 40, borderWidth: 1, borderColor: '#2196F3', borderRadius: 7,  backgroundColor : "#fff", },
  InputBtnLogin: { paddingTop:10, paddingBottom:10, borderRadius:5, marginBottom:7, width: '95%',backgroundColor: '#2196F3' },
  InputBtnLoginTexto: { color:'#fff', textAlign:'center', },

  ActivityIndicatorStyle:{  },

  TxtTitulo    : { width: '95%', paddingTop:10, marginBottom: 10, fontSize: 15, color:'#2196F3', textAlign: "center", alignItems: 'center', fontWeight: 'bold', },
  TxtSubTitulo : { width: '95%', paddingTop:10, marginBottom: 10, fontSize: 12, color:'#6E7B8B', textAlign: "justify", alignItems: 'center', },

  ContainerBtn       : { flex: 1, flexDirection: 'row', width: '95%', justifyContent: 'space-between', },
  TxtBtnNovaConta    : { fontWeight: 'bold',  fontSize: 15, color:'#6C7B8B', textAlign: "left", },
  TxtBtnEsqueceuSenha: { fontWeight: 'bold',  fontSize: 15, color:'#6E7B8B', textAlign: "right", },
  
});

export default styles;