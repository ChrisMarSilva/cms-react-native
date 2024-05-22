import { View, Text, Image, TouchableOpacity } from 'react-native'
import Constants from 'expo-constants'

import usePerfil from '@/src/hooks/usePerfil'
import * as HelperNumero from '@/src/util/HelperNumero'
import * as CONSTANTE from '@/src/util/Constante'

import imgBluePerson from '@/src/assets/imgs/person-blue.jpg'
import imgRedPerson from '@/src/assets/imgs/person-red.jpg'

export default function PerfilScreen() {
    const { currentUser, _onPressLogout, _onPressHome } = usePerfil()

    return (
        <View style={{ flex: 1, backgroundColor: currentUser.bgColorScreen }}>
            <View style={{ flex: 1, justifyContent: 'center', borderWidth: 0, borderColor: 'blue', alignItems: 'center' }}>
                <Image style={{ opacity: 0.7, width: 100, height: 100, borderRadius: 63, borderWidth: 1, borderColor: '#fff', marginTop: 0, marginBottom: 20 }} source={currentUser.bgColor == CONSTANTE.BG_VERMELHO ? imgRedPerson : imgBluePerson} />
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>{currentUser.nome}</Text>
                <Text style={{ color: '#fff', fontSize: 14 }}>
                    CPF: <Text style={{ fontWeight: 'bold' }}>{HelperNumero.GetMascaraCPF(currentUser.documento)}</Text>
                </Text>
                <Text style={{ color: '#fff', fontSize: 14, marginBottom: 20 }}>
                    Celular: <Text style={{ fontWeight: 'bold' }}>{HelperNumero.GetMascaraTelefone(currentUser.chave)}</Text>
                </Text>
                <Text style={{ color: '#fff', fontSize: 18 }}>
                    <Text style={{ fontWeight: 'bold' }}>{currentUser.nomeBanco}</Text>
                </Text>
                <Text style={{ color: '#fff', fontSize: 14 }}>
                    Agência: <Text style={{ fontWeight: 'bold' }}>{currentUser.agencia}</Text> || Conta: <Text style={{ fontWeight: 'bold' }}>{currentUser.conta}</Text>
                </Text>
            </View>
            <View style={{ justifyContent: 'flex-end', marginLeft: 15, marginRight: 15, marginBottom: 15, borderWidth: 0, borderColor: 'blue' }}>
                <TouchableOpacity style={{ height: 50, justifyContent: 'center', alignItems: 'center', paddingTop: 10, paddingBottom: 5, borderRadius: 10, marginBottom: 10, width: '100%', backgroundColor: '#fff' }} activeOpacity={0.7} onPress={_onPressLogout}>
                    <Text style={{ color: currentUser.bgColor == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_VERMELHO_FORTE : CONSTANTE.BG_AZUL_FORTE, fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>TROCA DE CONTA</Text>
                </TouchableOpacity>
                <View style={{ alignItems: 'center', borderWidth: 0, borderColor: 'red' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 10, color: '#fff' }}>Versão: {Constants.expoConfig?.version}</Text>
                </View>
            </View>
        </View>
    )
}
