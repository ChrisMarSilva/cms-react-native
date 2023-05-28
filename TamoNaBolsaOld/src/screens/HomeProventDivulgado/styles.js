import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  MainContainer: { flex:1, },  
  TxtErro: { color: '#ff0000', fontSize: 14, marginBottom: 5, },

  CardList: { flex: 1, },
  CardListItem: {flex: 1, },
  CardListItemBody: {flex: 8, },
  CardListItemIcon: {flex: 1, },
  CardListItemBodyLinha: {flex: 1, flexDirection: 'row', },

  TxtListItemAtivo: {fontSize: 12, color:'#666666',fontWeight: 'bold', width: 110, },
  TxtListItemTipo : {fontSize: 12, color:'#666666',},
  TxtListItemDtTit: {fontSize: 11, color:'#666666', width: 110,},
  TxtListItemDtVlr: {fontSize: 11, color:'#666666',fontWeight: 'bold',},
  TxtListItemPreco: {fontSize: 12, color:'#666666',fontWeight: 'bold',},

});

export default styles;