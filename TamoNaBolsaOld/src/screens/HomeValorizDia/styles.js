import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  MainContainer: { flex:1, },  

  CardTotal:  { height: 50, justifyContent: 'center',  alignItems: 'center', backgroundColor: '#353535', margin: 6, padding: 5, borderWidth: 1, borderColor: '#353535', borderRadius: 5, elevation: 5, shadowOffset:{ width: 10, height: 10 }, shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 5, },
  TxtTotalTitulo: { fontSize: 12, color:'#C1C1C1', marginTop: 5,  },
  TxtTotalValor: { fontSize: 22, color:'white', fontWeight: 'bold',  marginBottom: 5, },

  CardLista: {flex: 1, backgroundColor: 'transparent'},
  TxtErro: { color: '#ff0000', fontSize: 14, marginBottom: 5, },

  CardDataHora: { height: 30, backgroundColor: '#FFF', margin: 6, padding: 5, borderWidth: 1, borderColor: '#fff', borderRadius: 5, elevation: 5, shadowOffset:{ width: 10, height: 10 }, shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 5, },
  TxtDataHoraTitulo: { textAlign: "right", fontSize: 12, color:'black',},
  TxtDataHoraValor: { fontSize: 12, color:'#666666', },

  CardSubLista: { backgroundColor: '#FFF', margin: 6, padding: 5, borderWidth: 1, borderColor: '#fff', borderRadius: 5, elevation: 5, shadowOffset:{ width: 10, height: 10 }, shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 5, },
  CardItemLista: { flex: 1, flexDirection: 'row', padding: 2, },
  CardItemListaAtivo: { flex: 1, },
  TxtItemListaAtivo: {textAlign: "center", fontSize: 12, fontWeight: 'bold', color:'#6495ED', },
  CardItemListaPreco: { flex: 2, },
  TxtItemListaPreco: {textAlign: "center", fontSize: 12, color:'#666666', },
  CardItemListaValoriz: { flex: 2, },
  TxtItemListaValoriz: { fontSize: 12, color:'#6495ED', },
  CardItemListaTotal: { flex: 2, },
  BadgeItemListaTotal:{ alignSelf: 'center', backgroundColor:'#6495ED', },
  TxtItemListaTotal: { textAlign: "center", fontSize: 12, color:'white', },

});

export default styles;