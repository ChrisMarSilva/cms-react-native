
import React from 'react';
import { Text, View, SafeAreaView, } from 'react-native'
import { useRoute } from '@react-navigation/native'

export default function ProventosDetalhe() {

  const route = useRoute()
  const { tipo, codigo, dtEx, dtPagto, qtd, vlrPreco, vlrPagto, corretora } = route.params // this.props.route.params

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#152d44', }}>
      
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
        <Text style={{ fontSize: 30, color: "#fff", fontWeight: 'bold', marginBottom: 30, }}>{codigo}</Text>
      </View>
      
      <View style={{ flex: 4, padding: 10, backgroundColor: '#ECF0F1', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingHorizontal: 20, paddingVertical: 30 }}>

        <View style={{ alignItems: 'center', marginBottom: 20, }}>
          <Text style={{ fontSize: 25, color: 'gray', fontWeight: 'bold', }}>{tipo}</Text>
        </View>
        
        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20, marginHorizontal: 30, }}>
          <Text style={{ fontSize: 12, color: 'gray', marginTop: 8, }}>Corretora</Text>
          <Text style={{ fontSize: 15, color: '#000', }}>{corretora}</Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: 'space-between', marginBottom: 20, marginHorizontal: 30, }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ fontSize: 12, color: 'gray', marginTop: 8, }}>Dt. Ex</Text>
            <Text style={{ fontSize: 15, color: '#000', }}>{dtEx}</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ fontSize: 12, color: 'gray', marginTop: 8, }}>Dt. Pagto</Text>
            <Text style={{ fontSize: 15, color: '#000', }}>{dtPagto}</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", justifyContent: 'space-between', marginBottom: 20, marginHorizontal: 30, }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ fontSize: 12, color: 'gray', marginTop: 8, }}>Qtd.</Text>
            <Text style={{ fontSize: 15, color: '#000', }}>{qtd}</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ fontSize: 12, color: 'gray', marginTop: 8, }}>Preço</Text>
            <Text style={{ fontSize: 15, color: '#000', }}>R$ {vlrPreco}</Text>
          </View>
        </View>
    
        <View style={{ alignItems: 'center', }}>
            <Text style={{ fontSize: 12, color: 'gray', }}>Total</Text>
            <Text style={{ fontSize: 25, fontWeight: 'bold',  color: 'green' }}>R$ {vlrPagto}</Text>
        </View>
      
      </View>

    </SafeAreaView>
  )

}
