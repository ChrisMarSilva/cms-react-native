
import React from 'react';
import { Text, View, SafeAreaView, } from 'react-native'
import { useRoute } from '@react-navigation/native'

export default function OperacoesDetalhe() {

  const route = useRoute()
  const { data, tipo, codigo, qtd, vlrPreco, corretora, vlrCorregatem, vlrTaxas, vlrTotal } = route.params // this.props.route.params
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#152d44', }}>
      
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
        <Text style={{ fontSize: 30, color: "#fff", fontWeight: 'bold', marginBottom: 30, }}>{codigo}</Text>
      </View>
      
      <View style={{ flex: 4, padding: 10, backgroundColor: '#ECF0F1', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingHorizontal: 20, paddingVertical: 30 }}>

        <View style={{ alignItems: 'center', marginBottom: 20, }}>
          <Text style={{ fontSize: 25, color: 'gray', fontWeight: 'bold', }}>{tipo}</Text>
        </View>
        
        <View style={{ flexDirection: "row", justifyContent: 'space-around', marginBottom: 20, }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ fontSize: 12, color: 'gray', marginTop: 8, }}>Data</Text>
            <Text style={{ fontSize: 15, color: '#000', }}>{data}</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ fontSize: 12, color: 'gray', marginTop: 8, }}>Qtd.</Text>
            <Text style={{ fontSize: 15, color: '#000', }}>{qtd}</Text>
          </View>
        </View>
        
        <View style={{ flexDirection: "row", justifyContent: 'space-around', marginBottom: 20, }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ fontSize: 12, color: 'gray', marginTop: 8, }}>Preço</Text>
            <Text style={{ fontSize: 15, color: '#000', }}>R$ {vlrPreco}</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ fontSize: 12, color: 'gray', marginTop: 8, }}>Taxas</Text>
            <Text style={{ fontSize: 15, color: '#000', }}>R$ {vlrTaxas}</Text>
          </View>
        </View>
        
        <View style={{ flexDirection: "row", justifyContent: 'space-around', marginBottom: 20, }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ fontSize: 12, color: 'gray', marginTop: 8, }}>Corretora</Text>
            <Text style={{ fontSize: 15, color: '#000', }}>{corretora}</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ fontSize: 12, color: 'gray', marginTop: 8, }}>Corretagem</Text>
            <Text style={{ fontSize: 15, color: '#000', }}>R$ {vlrCorregatem}</Text>
          </View>
        </View>
    
        <View style={{ alignItems: 'center', }}>
            <Text style={{ fontSize: 12, color: 'gray', }}>Total</Text>
            <Text style={[{ fontSize: 25, fontWeight: 'bold',  color: 'gray' }, ( tipo.substring(0,1) == 'C') && {color:'green'}, ( tipo.substring(0,1) == 'V') && {color:'red'}]}>R$ {vlrTotal}</Text>
        </View>
      
      </View>

    </SafeAreaView>
  )

}
