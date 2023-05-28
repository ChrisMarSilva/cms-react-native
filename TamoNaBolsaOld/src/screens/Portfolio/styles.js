import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  MainContainer: { flex:1, },  
  iconeHeader: {flex: 1, alignItems: 'center', justifyContent: 'center', marginRight: 5, width: 50,  },

  TxtErro: { color: '#ff0000', fontSize: 14, marginBottom: 5, },
  
  LstContainer: { flex: 1, marginLeft: 3, marginRight: 3, marginBottom: 5, marginTop: 5, borderWidth: 0.6, borderColor: '#808080', paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10,  backgroundColor: '#FFF', borderColor: '#808080', borderRadius: 5, borderWidth: 0.6, shadowOffset:{ width: 10, height: 10 }, shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 6, elevation: 6, },
  LstContainerTit: { flex: 1, flexDirection: 'row', marginBottom: 3, },
  LstTxtTit: { color:'#666666', fontSize: 12, textAlign: "center", },
  LstContainerVal: { flex: 2, flexDirection: 'row', marginBottom: 3,  },
  LstContainerValSub: { justifyContent: 'flex-end', alignItems: "center", },
  LstTxtValTitulo: { color:'#666666', fontWeight: 'bold', fontSize: 10, },
  LstTxtValValor: { color:'#666666', fontSize: 12, },
  LstTxtValTotal:{ color:'green',   fontWeight: 'bold', fontSize: 14, },

  BtnAdicionar:{ borderRadius: 50, backgroundColor: '#2196F3', position: 'absolute', width: 50, height: 50, alignItems: 'center', justifyContent: 'center', right: 30, bottom: 30, },
  BtnAdicionarText: { fontSize: 24, textAlign: "center", fontWeight: 'bold', color:'#fff' },

  ModalInsideView:{ backgroundColor : "white", height: 250, width: '100%', borderRadius:10, borderWidth: 1, borderColor: '#fff', padding: 10,  },
  TextStyle:{ alignItems: 'flex-start', fontSize: 20, fontWeight: 'bold', marginBottom: 10, color:'#666666', },

  BtnFiltrar: { alignItems: 'center', width: '100%', borderRadius: 5, paddingTop:5, paddingBottom:5, marginTop: 10, marginBottom: 10, backgroundColor: '#2196F3', height: 35, },
  BtnFiltrarText: { fontSize: 16, textAlign: "center", fontWeight: 'bold', color:'#fff' },

});

export default styles;