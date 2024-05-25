import { Text, View, TouchableOpacity } from 'react-native'
import LottieView from 'lottie-react-native'

import usePagarTransferirRecibo from '@/src/hooks/usePagarTransferirRecibo'
import * as HelperNumero from '@/src/util/HelperNumero'

export default function PagarTransferirReciboScreen() {
    const { currentUser, animation, nome, chave, banco, agencia, conta, valor, _OnPressVerComprovante } = usePagarTransferirRecibo()

    return (
        <View style={{ flex: 1, backgroundColor: currentUser.bgColorScreen }}>
            <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'blue' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', width: '85%', height: '80%', borderRadius: 25, backgroundColor: '#fff', borderWidth: 0, borderColor: 'blue' }}>
                    <LottieView style={{ height: 200, width: 500, marginBottom: 5, borderWidth: 0 }} ref={animation} source={require('@/src/assets/lottie/1127-success.json')} autoPlay loop />

                    <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 30, marginBottom: 10 }}> R$ {HelperNumero.FormatCurrency(parseFloat(valor))} </Text>

                    <Text style={{ color: '#555', fontSize: 18, marginBottom: 5 }}>
                        para <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 20 }}>{nome}</Text>
                    </Text>

                    <Text style={{ color: '#555', fontSize: 15, marginBottom: 10 }}>
                        x Celular: <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{HelperNumero.GetMascaraTelefone(chave)}</Text>
                    </Text>

                    <Text style={{ color: '#000', fontSize: 18, marginBottom: 5 }}>
                        <Text style={{ fontWeight: 'bold' }}>{banco}</Text>
                    </Text>

                    <Text style={{ color: '#555', fontSize: 15 }}>
                        Agência: <Text style={{ fontWeight: 'bold' }}>{agencia}</Text> || Conta: <Text style={{ fontWeight: 'bold' }}>{conta}</Text>
                    </Text>
                </View>
            </View>

            <View style={{ flex: 1, justifyContent: 'flex-end', marginLeft: 25, marginRight: 25, marginBottom: 30, borderWidth: 0, borderColor: 'blue' }}>
                <TouchableOpacity style={{ borderRadius: 10, height: 50, padding: 12, backgroundColor: '#fff' }} onPress={_OnPressVerComprovante}>
                    <Text style={{ paddingLeft: 5, textAlign: 'center', color: '#555', fontWeight: 'bold', fontSize: 20 }}> ver comprovante </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
