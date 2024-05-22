import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, Keyboard, KeyboardAvoidingView } from 'react-native'
import { router } from 'expo-router'
import { TextInputMask } from 'react-native-masked-text'

import useLoginCadastro from '@/src/hooks/useLoginCadastro'
import * as CONSTANTE from '@/src/util/Constante'

import imglogoJD from '@/src/assets/imgs/logo-red.png'
import imglogoJ3 from '@/src/assets/imgs/logo-blue.png'

export default function LoginCadastroScreen() {
    const { currentUser, txtNome, setTxtNome, txtDocumento, setTxtDocumento, txtChave, setTxtChave, txtAgencia, setTxtAgencia, txtConta, setTxtConta, isLoadingCadastro, _onPressCriaConta } = useLoginCadastro()

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', borderWidth: 0, borderColor: 'blue' }}>
                <Image source={currentUser.bgColor == CONSTANTE.BG_VERMELHO ? imglogoJD : imglogoJ3} style={{ width: 190, height: 90, borderWidth: 0, borderColor: 'red' }} />
            </View>

            <KeyboardAvoidingView style={{ flex: 4, width: '100%', justifyContent: 'flex-start', alignItems: 'center', borderWidth: 0, borderColor: 'red' }} behavior="padding" enabled>
                <Text style={{ width: '95%', paddingTop: 5, fontSize: 18, color: currentUser.bgColor, textAlign: 'center', fontWeight: 'bold' }}>Cadastro</Text>

                <TextInput editable={true} placeholder="Nome" autoCapitalize={'none'} maxLength={100} underlineColorAndroid="transparent" returnKeyType={'next'} value={txtNome} onChangeText={(value) => setTxtNome(value)} onEndEditing={() => Keyboard.dismiss} style={{ fontSize: 16, color: '#000', borderBottomWidth: 1, borderBottomColor: '#555', marginTop: 5, marginBottom: 5, width: '88%', height: 30 }} />

                <TextInputMask type={'cpf'} editable={true} autoFocus={false} placeholder="CPF" maxLength={14} autoCapitalize={'none'} underlineColorAndroid="transparent" returnKeyType={'next'} value={txtDocumento} onChangeText={(value) => setTxtDocumento(value)} onEndEditing={() => Keyboard.dismiss} style={{ fontSize: 16, color: '#000', borderBottomWidth: 1, borderBottomColor: '#555', marginTop: 5, marginBottom: 5, width: '88%', height: 30 }} />

                <TextInputMask type={'cel-phone'} options={{ maskType: 'BRL', withDDD: true, dddMask: '(99) ' }} autoFocus={false} editable={true} placeholder="Telefone" autoCorrect={false} autoCapitalize={'none'} returnKeyType={'next'} underlineColorAndroid="transparent" value={txtChave} onChangeText={(value) => setTxtChave(value)} onEndEditing={() => Keyboard.dismiss} style={{ fontSize: 16, color: '#000', borderBottomWidth: 1, borderBottomColor: '#555', marginTop: 5, marginBottom: 5, width: '88%', height: 30 }} />

                <View style={{ flexDirection: 'row', width: '88%', marginBottom: 10 }}>
                    <TextInput
                        autoFocus={false}
                        editable={true}
                        placeholder="Agência"
                        maxLength={4}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        returnKeyType={'next'}
                        keyboardType={'numeric'}
                        underlineColorAndroid="transparent"
                        value={txtAgencia}
                        onChangeText={(value) => {
                            setTxtAgencia(value)
                        }}
                        onEndEditing={() => {
                            Keyboard.dismiss
                        }}
                        style={{
                            fontSize: 16,
                            color: '#000',
                            borderBottomWidth: 1,
                            borderBottomColor: '#555',
                            marginRight: 20,
                            marginTop: 5,
                            marginBottom: 5,
                            width: '35%',
                            height: 30,
                        }}
                    />

                    <TextInput
                        autoFocus={false}
                        editable={true}
                        placeholder="Conta"
                        maxLength={20}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        returnKeyType={'done'}
                        keyboardType={'number-pad'}
                        underlineColorAndroid="transparent"
                        value={txtConta}
                        onChangeText={(value) => {
                            setTxtConta(value)
                        }}
                        onEndEditing={() => {
                            Keyboard.dismiss
                        }}
                        style={{
                            fontSize: 16,
                            color: '#000',
                            borderBottomWidth: 1,
                            borderBottomColor: '#555',
                            marginTop: 5,
                            marginBottom: 6,
                            width: '60%',
                            height: 30,
                        }}
                    />
                </View>

                {isLoadingCadastro ? (
                    <ActivityIndicator color="#009688" size="large" />
                ) : (
                    <TouchableOpacity style={{ paddingTop: 10, paddingBottom: 10, borderRadius: 10, marginTop: 10, marginBottom: 7, width: '95%', backgroundColor: currentUser.bgColor }} activeOpacity={0.7} onPress={_onPressCriaConta}>
                        <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>CADASTRAR</Text>
                    </TouchableOpacity>
                )}

                <Text style={{ marginTop: 10, textDecorationLine: 'underline', fontWeight: 'bold', fontSize: 16, color: '#6E7B8B', textAlign: 'right' }} onPress={() => router.replace('/login')}>
                    Voltar para Login
                </Text>
            </KeyboardAvoidingView>
        </View>
    )
}
