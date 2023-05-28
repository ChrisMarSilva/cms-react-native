import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    MainContainer: { flex:1, },  
    TxtErro: { color: '#ff0000', fontSize: 14, marginBottom: 5, },

    ProvListItemCardTotal:  { height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#353535', margin: 6, padding: 5, borderWidth: 1, borderColor: '#353535', borderRadius: 5, elevation: 5, shadowOffset:{ width: 10, height: 10 }, shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 5, },
    ProvListItemTxtTotalTitulo: { fontSize: 12, color:'#C1C1C1', marginTop: 5,  },
    ProvListItemTxtTotalValor: { fontSize: 22, color:'white', fontWeight: 'bold',  marginBottom: 5, },

    ProvListItemContainer: { marginLeft: 0, marginRight: 0, marginTop: 5, marginBottom: 5, paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0, },
    ProvListItemBodyContainer: { flex: 1, marginLeft: 0, marginRight: 0, marginTop:0, marginBottom: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0, },
    ProvListItemDataTipoContainer: { flex: 1, flexDirection: 'row', marginBottom: 3, },
    ProvListItemTxtData: { color:'#666666', fontSize: 13, textAlign: "left", fontWeight: 'bold', },
    ProvListItemTxtTipo: { color:'#666666', fontSize: 13, textAlign: "left", fontWeight: 'bold', },

    ProvListItemValoresContainer:{ flex: 2, flexDirection: 'row', marginBottom: 3, },
    ProvListItemValoresSubContainer:{ justifyContent: 'flex-end', },
    ProvListItemTxtDescrValor: { color:'#666666', fontSize: 10, textAlign: "left", },
    ProvListItemTxtQuant: { color:'#666666', fontWeight: 'bold', fontSize: 12,  textAlign: "left", },
    ProvListItemTxtPreco: { color:'#666666', fontWeight: 'bold', fontSize: 12, textAlign: "left", },
    ProvListItemTxtTotal: { color:'green',   fontWeight: 'bold', fontSize: 14, textAlign: "left", },


    OperListItemCardTotal: {flexDirection: 'row', height: 50, backgroundColor: '#353535', margin: 6, padding: 5, borderWidth: 1, borderColor: '#353535', borderRadius: 5, elevation: 5, shadowOffset:{ width: 10, height: 10 }, shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 5,},
    OperListItemTxtTotalTitulo: { textAlign: "center", fontSize: 10, color:'#C1C1C1', marginTop: 5, },
    OperListItemTxtTotalValor: { textAlign: "center", fontSize: 12, color:'white', fontWeight: 'bold',  marginBottom: 5, },
    OperListItemTxtTotalPerc: { fontSize: 10, color:'white', fontWeight: 'bold',  marginBottom: 5, },

    OperListItemContainer: { marginLeft: 0, marginRight: 0, marginTop: 5, marginBottom: 5, paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0, },
    OperListItemBodyContainer: { flex: 1, marginLeft: 0, marginRight: 0, marginTop:0, marginBottom: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0, },
    OperListItemDataTipoContainer: { flex: 1, flexDirection: 'row', marginBottom: 3, },
    OperListItemTxtData: { color:'#666666', fontSize: 12, textAlign: "left", fontWeight: 'bold', },
    OperListItemTxtTipo: { color:'#666666', fontSize: 12, textAlign: "left", fontWeight: 'bold', },
    OperListItemTxtCateg: { color:'#666666', fontSize: 12, textAlign: "left", fontWeight: 'bold', },

    OperListItemValoresContainer: { flex: 2, flexDirection: 'row', marginBottom: 3, },
    OperListItemValoresSubContainer: { justifyContent: 'flex-end', },
    OperListItemTxtDescrValor: { color:'#666666', fontSize: 10, textAlign: "left", },
    OperListItemTxtQuant: { color:'#666666', fontWeight: 'bold', fontSize: 11,  textAlign: "left", },
    OperListItemTxtPrecoCusto: { color:'#666666', fontWeight: 'bold', fontSize: 11, textAlign: "left", },
    OperListItemTxtPrecoMedio: { color:'#666666', fontWeight: 'bold', fontSize: 11, textAlign: "left", },
    OperListItemTxtTotal: { color:'#666666', fontWeight: 'bold', fontSize: 11, textAlign: "left", },

    OperListItemValorizContainer: { flex: 3, flexDirection: 'row', marginBottom: 5, },
    OperListItemValorizSubContainer:{ justifyContent: 'flex-end', },
    OperListItemValorizTxtDescrValor: { color:'#666666', fontSize: 10, textAlign: "center", },
    OperListItemValorizTxtTotal: { color:'#666666', fontWeight: 'bold', fontSize: 14, textAlign: "center", },
 
  });

export default styles;