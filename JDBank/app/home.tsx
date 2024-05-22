import { Text, View, TouchableOpacity, Image } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'

import useHome from '@/src/hooks/useHome'
import * as HelperNumero from '@/src/util/HelperNumero'
import * as CONSTANTE from '@/src/util/Constante'

import imgBluePerson from '@/src/assets/imgs/person-blue.jpg'
import imgRedPerson from '@/src/assets/imgs/person-red.jpg'

export default function HomeScreen() {
    const { currentUser, _onPressPerfil, _onPressPagarTransferir, _onPressCobrarAlguem, _onPressColocarDinheiro, _onPressMovimentacao } = useHome()

    return (
        <View style={{ flex: 1, backgroundColor: currentUser.bgColorScreen }}>
            <View style={{ flex: 6, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'blue' }}>
                <TouchableOpacity onPress={_onPressPerfil}>
                    <Image style={{ width: 80, height: 80, borderRadius: 60, borderWidth: 2, borderColor: '#fff', marginTop: 20, marginBottom: 10 }} source={currentUser.bgColor == CONSTANTE.BG_VERMELHO ? imgRedPerson : imgBluePerson} />
                </TouchableOpacity>

                <Text style={{ color: '#fff', fontSize: 15, marginBottom: 10 }}>
                    Olá, <Text style={{ fontWeight: 'bold' }}>{currentUser.nome}</Text>!
                </Text>

                <Text style={{ color: '#fff', fontSize: 12 }}>Saldo Atual:</Text>
                <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold' }}> R$ {HelperNumero.GetMascaraValorDecimal(currentUser.saldo)}</Text>
            </View>

            <View style={{ flex: 6, flexDirection: 'row', alignItems: 'center', borderWidth: 0, borderColor: 'red' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'blue', marginTop: 2, marginLeft: 10, marginRight: 5 }}>
                    <TouchableOpacity style={{ justifyContent: 'space-between', flexDirection: 'column', width: '95%', height: 140, padding: 10, borderRadius: 15, borderWidth: 1, borderColor: currentUser.bgColor, backgroundColor: '#fff', shadowOffset: { width: 10, height: 10 }, shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 6, elevation: 15 }} activeOpacity={0.7} onPress={_onPressPagarTransferir}>
                        <View style={{ alignItems: 'flex-end', borderWidth: 0, borderColor: 'red' }}>
                            <FontAwesome style={{ color: '#dcdcdc', fontSize: 50 }} name="credit-card" />
                        </View>
                        <Text style={{ paddingLeft: 5, textAlign: 'left', color: '#555', fontWeight: 'bold', fontSize: 18 }}>
                            pagar{'\n'}
                            <Text style={{ fontSize: 14 }}>transferir</Text>
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'blue', marginLeft: 5, marginRight: 10 }}>
                    <TouchableOpacity style={{ justifyContent: 'space-between', flexDirection: 'column', width: '95%', height: 140, padding: 10, borderRadius: 15, borderWidth: 1, borderColor: currentUser.bgColor, backgroundColor: '#fff', shadowOffset: { width: 10, height: 10 }, shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 6, elevation: 15 }} activeOpacity={0.7} onPress={_onPressCobrarAlguem}>
                        <View style={{ alignItems: 'flex-end', borderWidth: 0, borderColor: 'red' }}>
                            <FontAwesome style={{ color: '#dcdcdc', fontSize: 50 }} name="user-o" />
                        </View>
                        <Text style={{ paddingLeft: 5, textAlign: 'left', color: '#555', fontWeight: 'bold', fontSize: 18 }}>
                            cobrar{'\n'}
                            <Text style={{ fontSize: 14 }}>alguém</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ flex: 6, flexDirection: 'row', alignItems: 'center', borderWidth: 0, borderColor: 'red' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'blue', marginLeft: 10, marginRight: 5 }}>
                    <TouchableOpacity style={{ justifyContent: 'space-between', flexDirection: 'column', width: '95%', height: 140, padding: 10, borderRadius: 15, borderWidth: 1, borderColor: currentUser.bgColor, backgroundColor: '#fff', shadowOffset: { width: 10, height: 10 }, shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 6, elevation: 15 }} activeOpacity={0.7} onPress={_onPressColocarDinheiro}>
                        <View style={{ alignItems: 'flex-end', borderWidth: 0, borderColor: 'red' }}>
                            <FontAwesome style={{ color: '#dcdcdc', fontSize: 50 }} name="dollar" />
                        </View>
                        <Text style={{ paddingLeft: 5, textAlign: 'left', color: '#555', fontWeight: 'bold', fontSize: 18 }}>
                            colocar{'\n'}
                            <Text style={{ fontSize: 14 }}>dinheiro</Text>
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'blue', marginLeft: 5, marginRight: 10 }}>
                    <TouchableOpacity style={{ justifyContent: 'space-between', flexDirection: 'column', width: '95%', height: 140, padding: 10, borderRadius: 15, borderWidth: 1, borderColor: currentUser.bgColor, backgroundColor: '#fff', shadowOffset: { width: 10, height: 10 }, shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 6, elevation: 15 }} activeOpacity={0.7} onPress={_onPressMovimentacao}>
                        <View style={{ alignItems: 'flex-end', borderWidth: 0, borderColor: 'red' }}>
                            <FontAwesome style={{ color: '#dcdcdc', fontSize: 50 }} name="book" />
                        </View>
                        <Text style={{ paddingLeft: 5, textAlign: 'left', color: '#555', fontWeight: 'bold', fontSize: 18 }}>movimentação</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
