import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  MainContainer: { flex:1, },  
  TxtErro: { color: '#ff0000', fontSize: 14, marginBottom: 5, },
  
  CardTitulo: {flex: 1, marginTop: 10, marginBottom: 5, marginLeft: 5, },  
  TxtTitulo: { fontSize: 13, fontWeight: 'bold', textAlign: "left", color:'green'},
  
  CardLista:  { marginBottom: 20, backgroundColor: '#FFF', margin: 6, padding: 5, borderWidth: 1, borderColor: '#fff', borderRadius: 5, elevation: 5, shadowOffset:{ width: 10, height: 10 }, shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 5, },
  CardItem: {flex: 1, padding: 2, },
  TxtItemData: {textAlign: "left", fontSize: 10, color:'#666666', },
  TxtItemEmpresa: {textAlign: "left", fontSize: 12, color:'black', fontWeight: 'bold', },
  TxtItemAssunto: {textAlign: "left", fontSize: 10, color:'#666666',},
  TxtItemLink: {textAlign: "left", fontSize: 12, color: '#2196F3',},

});

export default styles;