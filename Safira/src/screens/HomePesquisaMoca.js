import React, { useState, useEffect, useRef, } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, Keyboard, Alert, Dimensions, Platform, } from 'react-native'
import { RecyclerListView, LayoutProvider, } from 'recyclerlistview'
import { FontAwesome, } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { connect } from 'react-redux'
import { colors } from '../styles'
import { modificaPedidoMoca, } from '../store/ducks/pedido'
import { modificaListaMoca, } from '../store/ducks/moca'

const deviceWidth  = Dimensions.get('window').width
// const deviceHeight = Dimensions.get('window').height
const ViewTypes = { HEADER: 0, LISTITEM: 1, }
const layoutProvider = new LayoutProvider((index) => { return ViewTypes.LISTITEM; }, (type, dim) => { dim.width = deviceWidth; dim.height = 50; })
const TituloPaddingTop = Platform.OS === 'ios' ? 0 : 20;

const HomePesquisaMoca = (props) => {
    
    const refInputMoca = useRef(null)
    const [txtCodigo, setTxtCodigo]  = useState('')

    useEffect(() => {
        // console.log('HomePesquisaMoca.Entrar')
        _LimparDados()
        refInputMoca.current.focus()
        return () => {
            // console.log('HomePesquisaMoca.Sair') 
            _LimparDados()
            props.modificaListaMoca([], '')
        }
    }, [])

    const _LimparDados = async () => {
        setTxtCodigo('')
        props.modificaListaMoca(props.listaMocaFull, '')
    }

    const _OnPressPesquisar = async (value) => {
        setTxtCodigo(value.toString())
        props.modificaListaMoca(props.listaMocaFull, value.toString())
    }

    const _onPressConfirmar = async (codigo) => {
        Keyboard.dismiss()
        // props.modificaPedidoMoca('...')
        if (codigo != '') {
            const mocas = props.listaMocaFull.filter((item) => item.codigo.toString().trim() == codigo)
            if (mocas == null || mocas.length <= 0) {
                Alert.alert("", 'Moça não localizada!')
                return false
            }
            const moca = mocas[0]
            if (moca.situacao != 'A') {
                Alert.alert("", 'Moça inativa!')
                return false
            }
            props.modificaPedidoMoca(moca.codigo)
            props.navigation.goBack()
        }
        _LimparDados()
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.branco, }}>

            <View style={{ justifyContent: 'center', alignItems: "center", backgroundColor: colors.default, height: 120, borderBottomEndRadius: 70, paddingTop: TituloPaddingTop, }}>
        
                <Text style={{ color: colors.branco, fontSize: 14, fontWeight: 'bold', alignSelf: "flex-end", marginRight: 15, }}>CONSULTA DE MOÇA</Text>
        
                <Text style={{ color: colors.branco, fontSize: 30, fontWeight: 'bold', marginBottom: 10, }}>Safira Mobile</Text>
        
                <Text style={{ position: 'absolute', left: 0, bottom: 0, marginBottom: 10, marginLeft: 10, color: colors.branco, fontSize: 12, }}>Garçom: <Text style={{ fontWeight: 'bold', }}>{props.txtNome}</Text></Text>
        
            </View>

            <View style={{ marginHorizontal: 20, marginTop: 20, alignItems: 'center',  }}>
                <TextInput 
                    ref={refInputMoca}  
                    placeholder='Pesquisar Moça...' 
                    placeholderTextColor={colors.cinza_escuro} 
                    style={{ width: '100%', color: colors.default, borderWidth: 1, borderColor: colors.cinza_escuro, borderRadius: 15, height: 50, fontSize: 20, fontWeight: 'bold', paddingLeft: 15, }} 
                    autoCapitalize="none" 
                    autoFocus={true} 
                    autoCorrect={false} 
                    underlineColorAndroid='transparent' 
                    returnKeyType={'done'} 
                    value={txtCodigo} 
                    onChangeText={value => _OnPressPesquisar(value)} 
                    onEndEditing={props.clearFocus} 
                />
            </View>

            <View style={{ marginHorizontal: 20, marginTop: 15, }}>
                { props.dataProviderMoca._data.length <= 0 && <Text style={{ alignItems: 'center', fontSize: 20, fontWeight: 'bold', color: colors.cinza_escuro, }}>Nenhum Moça encontrada...</Text>} 
                { props.dataProviderMoca._data.length > 0 && <RecyclerListView keyboardShouldPersistTaps={'handled'} style={{ height: '75%', }} contentContainerStyle={{ margin: 3 }} showsVerticalScrollIndicator={false} forceNonDeterministicRendering={false} canChangeSize={true} rowRenderer={(type, item, index) => <HomePesquisaMocaItem type={type} index={index} item={item} _onPressConfirmar={_onPressConfirmar} />} dataProvider={props.dataProviderMoca} layoutProvider={layoutProvider} /> } 
            </View>
            
            <View style={{ position: 'absolute', bottom: 0, padding: 10, width: '100%', }}>
                <TouchableOpacity onPress={() => props.navigation.goBack()} >
                    <LinearGradient colors={['#152d44', '#1f3b5a', '#2c4970', '#3b5887', '#4c669f']} style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }} >
                        <Text style={{ color: colors.branco, fontSize: 18, fontWeight: 'bold' }}>VOLTAR</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )

}

const HomePesquisaMocaItem = (props) => {
    const id         = props.index
    const codigo     = props.item.codigo.toString().padStart(6, '0')
    const nome       = props.item.guerra
    const situacao   = props.item.situacao
    const isDisabled = situacao != 'A'
    return(
        <View key={id} style={{ flex: 1, backgroundColor: colors.branco, borderBottomColor: colors.cinza, borderBottomWidth: 1, minHeight: 40, }}>
            <TouchableOpacity onPress={() => props._onPressConfirmar(codigo)} style={{ flex: 1, flexDirection: "row", }}>
                <Text numberOfLines={1} style={[{ flex: 1, color: colors.preto, fontSize: 20, fontWeight: 'bold', alignSelf: 'center', }, (isDisabled) && {color: colors.error,}]}>{codigo}   {nome}</Text>
                <FontAwesome name="chevron-right" size={25} color={isDisabled ? colors.error : colors.cinza_escuro} style={{ marginRight: 10, alignSelf: 'center', }}/>
            </TouchableOpacity>
        </View>
    )
}

const mapStateToProps = state => ({

    // login
    txtCodigo: state.login.txtCodigo,
    txtNome: state.login.txtNome,
    
    // moça
    listaMoca: state.moca.listaMoca,
    listaMocaFull: state.moca.listaMocaFull,
    dataProviderMoca: state.moca.dataProviderMoca,
})

const mapDispatchToProps = {
    modificaPedidoMoca,
    modificaListaMoca,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePesquisaMoca)
