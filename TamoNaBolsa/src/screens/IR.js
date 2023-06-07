
import React from 'react';
import { SafeAreaView, Image, } from 'react-native'

export default function IR() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', }}>
      <Image source={require('../assets/unnamed.png')} style={{ width: 280, height: 250, }}/> 
    </SafeAreaView>
  )
}