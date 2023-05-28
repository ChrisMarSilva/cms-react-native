import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  MainContainer: { flex:1, },  
  TxtErro: { color: '#ff0000', fontSize: 14, marginBottom: 5, },
  
  CardTitulo: {flex: 1, marginTop: 10, marginBottom: 5, marginLeft: 5, },  
  TxtTitulo: { fontSize: 13, fontWeight: 'bold', textAlign: "left", color:'green'},
  
  CardLista:  { marginBottom: 20, backgroundColor: '#FFF', margin: 6, padding: 5, borderWidth: 1, borderColor: '#fff', borderRadius: 5, elevation: 5, shadowOffset:{ width: 10, height: 10 }, shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 5, },
  CardItem: {flex: 1, flexDirection: 'row', padding: 2, },
  CardItemData: {flex: 1,},
  TxtItemData: {textAlign: "center", fontSize: 12, color:'#666666', },
  CardItemAtivo: {flex: 1,},
  TxtItemAtivo: {textAlign: "center", fontSize: 12, color:'#666666', fontWeight: 'bold', },
  CardItemTipo: {flex: 1,},
  TxtItemTipo: {textAlign: "center", fontSize: 12, color:'#666666',},
  CardItemTotal: {flex: 1,},
  TxtItemTotal: {textAlign: "center", fontSize: 12, color:'#666666', fontWeight: 'bold', },

});

export default styles;