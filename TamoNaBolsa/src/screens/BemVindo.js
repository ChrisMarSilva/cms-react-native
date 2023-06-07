
import React from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, Image, Dimensions, } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'

import * as CONSTANTE from '../util/Constante'

const { height } = Dimensions.get('screen')
const heightlogo = height * 0.25
const imgDefault = require('../assets/iconeB.png')

export default function BemVindo() {

  const navigation = useNavigation()

  const _onPressCriarConta = async () => {
    await AsyncStorage.setItem(CONSTANTE.SESSAO_USER, 'S')
    navigation.navigate('UserCad')
  }

  const _onPressJaTenhoConta = async () => {
    await AsyncStorage.setItem(CONSTANTE.SESSAO_USER, 'S')
    navigation.navigate('Auth');
  }

  return (
    <SafeAreaView style={{ flex: 1, }}>
      <LinearGradient colors={['#152d44', '#1f3b5a', '#2c4970', '#3b5887', '#4c669f']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1, }} >
        
        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', }}>
          <Image source={imgDefault} style={{ width: heightlogo, height: heightlogo, }}/> 
        </View>

        <View style={{ flex: 1, backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingHorizontal: 20, paddingVertical: 30 }}>
          <Text style={{ fontSize: 15, color: 'gray', fontWeight: 'bold', }}>Seja Bem Vindo ao</Text>
          <Text style={{ fontSize: 30, color: '#000', fontWeight: 'bold', fontStyle: 'italic', }}>TamoNaBolsa</Text>
          <Text style={{ fontSize: 14, color: 'gray', fontWeight: 'bold', marginBottom: 20, }}>Acompanhe seus investimentos de forma SIMPLES!!!</Text>
          
          <View style={{ alignItems: 'flex-end', flexDirection: 'row', }}>
            <TouchableOpacity style={{ flex: 1, marginRight: 5, }} onPress={() => { _onPressCriarConta() }} >
              <LinearGradient colors={['#152d44', '#1f3b5a', '#2c4970', '#3b5887', '#4c669f']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ height: 40, justifyContent: 'center', alignItems: 'center', padding: 15, borderRadius: 50, }} >
                <Text style={{ fontWeight: 'bold', fontSize: 13, color: '#fff', }}>CRIAR CONTA</Text>
              </LinearGradient>
            </TouchableOpacity> 
            <TouchableOpacity style={{ flex: 1, marginLeft: 5, }} onPress={() => { _onPressJaTenhoConta() }} >
              <LinearGradient colors={['#152d44', '#1f3b5a', '#2c4970', '#3b5887', '#4c669f']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ height: 40, justifyContent: 'center', alignItems: 'center', padding: 15, borderRadius: 50, }} >
                <Text style={{ fontWeight: 'bold', fontSize: 13, color: '#fff', }}>JÁ TENHO CONTA!</Text>
              </LinearGradient>
            </TouchableOpacity> 
          </View>

        </View>

        </LinearGradient>
    </SafeAreaView>
  )

}
