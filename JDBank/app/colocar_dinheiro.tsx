import { Text, TouchableOpacity, Keyboard, KeyboardAvoidingView } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'

import useColocarDinheiro from '@/src/hooks/useColocarDinheiro'

export default function ColarDinheiroScreen() {
    const { currentUser, valor, setValor, _goToOpenScreenCobrarAlguemQrCode } = useColocarDinheiro()

    return (
        <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: currentUser.bgColorScreen }}>
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>digite o valor</Text>

            <TextInputMask type={'money'} options={{ precision: 2, separator: ',', delimiter: '.', unit: 'R$ ', suffixUnit: '' }} value={valor} onChangeText={(value) => setValor(value)} onSubmitEditing={Keyboard.dismiss} style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold', width: '90%', height: 40, borderRadius: 10, borderBottomWidth: 1, borderBottomColor: '#fff', color: '#fff', backgroundColor: currentUser.bgColorScreen, marginHorizontal: 10, marginBottom: 10 }} />

            <TouchableOpacity style={{ borderRadius: 10, marginLeft: 15, marginRight: 15, marginTop: 20, marginBottom: 15, width: '90%', height: 50, padding: 10, backgroundColor: '#fff' }} onPress={_goToOpenScreenCobrarAlguemQrCode}>
                <Text style={{ paddingLeft: 5, textAlign: 'center', color: '#555', fontWeight: 'bold', fontSize: 20 }}> continuar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}
