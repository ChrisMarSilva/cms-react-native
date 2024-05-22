import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import LottieView from 'lottie-react-native'

import useCobrarAlguemRecibo from '@/src/hooks/useCobrarAlguemRecibo'
import * as HelperNumero from '@/src/util/HelperNumero'
import * as CONSTANTE from '@/src/util/Constante'

export default function CobrarAlguemReciboScreen() {
    const { currentUser, animation, isLoadingRecebimento, agencia, conta, valor, _OnPressVerComprovante } = useCobrarAlguemRecibo()

    return (
        <View style={{ flex: 1, backgroundColor: currentUser.bgColor == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_VERMELHO_FORTE : CONSTANTE.BG_AZUL_FORTE }}>
            <View style={{ flex: 8, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginLeft: 25, marginRight: 25, marginTop: 80, marginBottom: 80, borderRadius: 25 }}>
                {isLoadingRecebimento ? (
                    <ActivityIndicator color="#000" size="large" />
                ) : (
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <LottieView style={{ height: 250, width: 500, marginBottom: 20 }} ref={animation} source={require('@/src/assets/lottie/1309-smiley-stack-02.json')} autoPlay loop />
                        <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 25, marginBottom: 10 }}>R$ {HelperNumero.GetMascaraValorDecimal(valor)}</Text>
                        <Text style={{ color: '#555', fontSize: 16 }}>
                            Agência: <Text style={{ color: '#000', fontWeight: 'bold' }}>{agencia}</Text> || Conta: <Text style={{ color: '#000', fontWeight: 'bold' }}>{conta}</Text>
                        </Text>
                    </View>
                )}
            </View>

            {isLoadingRecebimento ? null : (
                <View style={{ flex: 1, justifyContent: 'flex-end', marginLeft: 25, marginRight: 25, marginBottom: 30, borderWidth: 0, borderColor: 'blue' }}>
                    <TouchableOpacity style={{ borderRadius: 10, height: 50, padding: 12, backgroundColor: '#fff' }} onPress={_OnPressVerComprovante}>
                        <Text style={{ paddingLeft: 5, textAlign: 'center', color: '#555', fontWeight: 'bold', fontSize: 20 }}>ver comprovante</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}
