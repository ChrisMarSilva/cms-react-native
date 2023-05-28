import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  MainContainer :{ flex:1, backgroundColor: '#fff', },
  
  TextoContainer: { flex: 2, width: '100%', alignItems: 'center', flexDirection: 'column', justifyContent: 'flex-end', },
  TextoLogoImg: {  width: 80, height: 80, },
  TextoLogoPrinc: { color: 'gray', fontWeight: 'bold', fontSize: 25, fontStyle: 'italic', marginTop: 10, marginBottom: 20, },
  TextoLogoPreto: { color: 'black', },
  TextoLogoVerde: { color: 'green', },
  
  InputContainer: { flex: 3, width: '100%', alignItems: 'center',  },
  Input: { textAlign: 'center', width: '90%', marginTop: 10, height: 40, borderWidth: 1, borderColor: '#2196F3', borderRadius: 7, backgroundColor : "#fff", },
  InputBtnLogin: { paddingTop:10, paddingBottom:10, borderRadius:5, marginBottom:10, width: '95%',backgroundColor: '#2196F3' },
  InputBtnLoginTexto: { color:'#fff', textAlign:'center', },
  MsgErro:{ color: '#ff0000', fontSize: 14, marginTop: 10, marginBottom: 10, },
  LembrarContainer:{ width: '90%', flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 10, },
  MsgLembrar:{ marginLeft: 5, fontSize: 14, color:'#6C7B8B', textAlign: "left", },

  ActivityIndicatorStyle:{ },

  ContainerBtn       : { width: '90%', flexDirection: 'row', justifyContent: 'space-between', },
  TxtBtnNovaConta    : { fontWeight: 'bold', fontSize: 15, color:'#6C7B8B', textAlign: "left", },
  TxtBtnEsqueceuSenha: { fontWeight: 'bold', fontSize: 15, color:'#6E7B8B', textAlign: "right", },

});

export default styles;