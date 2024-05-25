import { Text, View, TouchableOpacity, ActivityIndicator, Keyboard, KeyboardAvoidingView } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import LottieView from 'lottie-react-native'
import { TextInputMask } from 'react-native-masked-text'

import usePagarTransferirConfirma from '@/src/hooks/usePagarTransferirConfirma'
import * as HelperNumero from '@/src/util/HelperNumero'

export default function PagarTransferirConfirmaScreen() {
    const { currentUser, animation, isLoadingRecebedor, isLoadingPagamento, chave, nome, banco, agencia, conta, valor, setValor, _onPressEfetuarPagtoQRCode, _onPressAgendarPagtoQRCode } = usePagarTransferirConfirma()

    return (
        <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, backgroundColor: currentUser.bgColorScreen }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'blue' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', width: '85%', height: '70%', borderRadius: 25, backgroundColor: '#fff', borderWidth: 0, borderColor: 'blue' }}>
                    {isLoadingRecebedor ? (
                        <LottieView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 200 }} ref={animation} source={require('@/src/assets/lottie/201-simple-loader.json')} autoPlay loop />
                    ) : (
                        <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'blue' }}>
                            <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}>{parseFloat(valor) <= 0 && 'Informe o'} Valor do Pagamento</Text>

                            {parseFloat(valor) > 0 ? <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 30, marginBottom: 20 }}> R$ {HelperNumero.FormatCurrency(parseFloat(valor))} </Text> : <TextInputMask type={'money'} options={{ precision: 2, separator: ',', delimiter: '.', unit: 'R$ ', suffixUnit: '' }} value={valor} onChangeText={(value) => setValor(value)} onSubmitEditing={Keyboard.dismiss} style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold', height: 40, borderBottomWidth: 1, borderBottomColor: '#555', color: '#000', backgroundColor: '#fff', marginBottom: 30, width: '80%' }} />}

                            <Text style={{ color: '#555', fontSize: 18, marginBottom: 10 }}>
                                para <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 20 }}>{nome}</Text>
                            </Text>

                            <Text style={{ color: '#555', fontSize: 15, marginBottom: 10 }}>
                                Celular: <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{HelperNumero.GetMascaraTelefone(chave)}</Text>
                            </Text>

                            <Text style={{ color: '#000', fontSize: 18, marginBottom: 5 }}>
                                <Text style={{ fontWeight: 'bold' }}>{banco}</Text>
                            </Text>

                            <Text style={{ color: '#555', fontSize: 15 }}>
                                Agência: <Text style={{ fontWeight: 'bold' }}>{agencia}</Text> || Conta: <Text style={{ fontWeight: 'bold' }}>{conta}</Text>
                            </Text>
                        </View>
                    )}
                </View>
            </View>

            <View style={{ marginLeft: 25, marginRight: 25, marginBottom: 10, borderWidth: 0, borderColor: 'red' }}>
                {isLoadingRecebedor ? null : (
                    <View>
                        <TouchableOpacity style={{ borderRadius: 10, marginBottom: 10, height: 50, padding: 12, backgroundColor: '#fff' }} onPress={_onPressEfetuarPagtoQRCode}>
                            {isLoadingPagamento ? (
                                <ActivityIndicator color="#000" size="small" />
                            ) : (
                                <Text style={{ paddingLeft: 5, textAlign: 'center', color: '#555', fontWeight: 'bold', fontSize: 20 }}>
                                    <FontAwesome style={{ color: '#555', fontSize: 20 }} name="dollar" />
                                    <Text> Pagar</Text>
                                </Text>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity style={{ borderRadius: 10, height: 50, padding: 12, backgroundColor: '#fff' }} onPress={_onPressAgendarPagtoQRCode}>
                            <Text style={{ paddingLeft: 5, textAlign: 'center', color: '#555', fontWeight: 'bold', fontSize: 20 }}>
                                <FontAwesome style={{ color: '#555', fontSize: 20 }} name="calendar" />
                                <Text> Agendar </Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </KeyboardAvoidingView>
    )
}
