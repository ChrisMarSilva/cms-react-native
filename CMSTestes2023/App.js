import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert, } from 'react-native';

import SuperAlert from "react-native-super-alert";

export default function App() {

  const [txtObsId, setTxtObsId] = useState('')

  useEffect(() => {
    // console.log('App.Entrar')

    return () => {
      //console.log('App.Sair')
    }
  }, [])

  const _onPress = async () => {
    // Alert.alert("Aviso", "Mensagem")

    alert(
      'Aviso',
      "Mensagem",
      {
        type: 'bottomsheet', // alert, bottomsheet, flashmessage
        // bottomSheetHeight: 580, // 180
        // type: 'flashmessage',
        // option: 'success', // danger | warning | info | success
        // timeout: 3,
        position: 'bottom', // top, bottom, left or right,
        textConfirm: 'Confirma',
        textCancel: 'Cancela',
        onConfirm: () => _onPressConfirm(),
        // onCancel: () => _onPressCancel(),
      },
    );
  }

  const _onPressConfirm = () => Alert.alert("Aviso", "Confirm Action")
  const _onPressCancel = () => Alert.alert("Aviso", "Cancel Action")

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text>CMS Teste #2</Text>

      <TouchableOpacity onPress={_onPress}>
        <Text>Click</Text>
      </TouchableOpacity>

      {/* <SuperAlert /> */}
      <SuperAlert customStyle={styles.customStyle} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', },
  customStyle: {
    container: { backgroundColor: '#e8e8e8', borderRadius: 10, },
    title: { color: '#003d69', fontSize: 15, },
    message: { color: '#4f4f4f', fontSize: 12, },
    buttonCancel: { backgroundColor: '#b51919', borderRadius: 10, },
    buttonConfirm: { backgroundColor: '#4490c7', borderRadius: 10, },
    textButtonCancel: { color: '#fff', fontWeight: 'bold', fontSize: 20, },
    textButtonConfirm: { color: '#fff', fontWeight: 'bold', fontSize: 20, },
  },
});
