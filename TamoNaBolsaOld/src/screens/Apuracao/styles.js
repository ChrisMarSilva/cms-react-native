import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    MainContainer: { flex:1, },  
    
    FiltroContainer: { height: 180, marginLeft: 5, marginRight: 5, marginBottom: 10, marginTop: 10, paddingRight: 5, paddingLeft: 5, paddingBottom: 15, paddingTop: 15, backgroundColor: '#FFF', borderColor: '#808080', borderRadius: 5, borderWidth: 0.6, shadowOffset:{ width: 10, height: 10 }, shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 6, elevation: 6, },  
    Linhas: { flexDirection: 'row', marginLeft: 5, marginRight: 5, marginBottom: 5, marginTop: 10,  },
    ColData: { width: '50%', },
    ColDataText: { fontWeight: 'bold', fontSize: 14, color:'#666666', },
    ItemSeparador: { height: 1, backgroundColor: "#CFCFCF", marginRight: 10, marginLeft: 10, marginBottom: 5, marginTop: 5, },
  
    TxtErro: { color: '#ff0000', fontSize: 14, marginBottom: 5, },
  
    Card: {marginLeft: 4, marginRight: 4, marginBottom: 5, marginTop: 5, paddingRight: 5, paddingLeft: 10, paddingBottom: 10, paddingTop: 10, backgroundColor: '#FFF', borderColor: '#808080', borderRadius: 5, borderWidth: 0.6, elevation: 6, },
    TxtData: { fontSize: 12, color:'black', fontWeight: 'bold', marginBottom: 5, },
    TxtValores: {flexDirection: 'row', justifyContent: 'space-between', },
    TxtGrupo: {flex: 1, borderColor: 'red', borderWidth: 0, },
    TxtDescrVal: { color:'#666666', fontWeight: 'bold', fontSize: 9,},
    TxtVal: { color:'#666666', fontSize: 10, },
    TxtValNeg: { color:'#8B0000'},
    TxtValPos: {color:'green'},
    TxtRS: { fontSize: 9 },

    iconeHeader: {flex: 1, alignItems: 'center', justifyContent: 'center', marginRight: 5, width: 50, borderColor: 'red', borderWidth: 0, },

    ModalInsideView:{ backgroundColor : "white", height: 170, width: '100%', borderRadius:10, borderWidth: 1, borderColor: '#fff', padding: 10,  },
    TextStyle:{ alignItems: 'flex-start', fontSize: 20, fontWeight: 'bold', marginBottom: 10, color:'#666666', },
    BtnFiltrar: { alignItems: 'center', width: '100%', borderRadius: 5, paddingTop:5, paddingBottom:5, marginTop: 10, marginBottom: 10, backgroundColor: '#2196F3', height: 35, },
    BtnFiltrarText: { fontSize: 16, textAlign: "center", fontWeight: 'bold', color:'#fff' },
  
  });

export default styles;