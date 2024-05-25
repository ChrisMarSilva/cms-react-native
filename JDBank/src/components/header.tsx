import { Text, View, TouchableOpacity, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from '@expo/vector-icons/FontAwesome'

// import useCurrentUser from '@/src/hooks/useCurrentUser'
// import * as CONSTANTE from '@/src/util/Constante'

// import imglogoJD from '@/src/assets/imgs/logo-red.png'
// import imglogoJ3 from '@/src/assets/imgs/logo-blue.png'

export const HeaderBackground = () => {
    return <LinearGradient colors={['#fff', '#fff', '#fff']} style={{ flex: 1 }} />
}

export const HeaderLeft = () => {
    //const currentUser = useCurrentUser()

    return <View>{/* <Image style={{ resizeMode: 'contain', backgroundColor: '#fff', width: 35, height: 35, borderRadius: 63, borderWidth: 2, borderColor: '#fff', marginLeft: 10 }} source={currentUser.bgColor == CONSTANTE.BG_VERMELHO ? imglogoJD : imglogoJ3} /> */}</View>
}

export interface HeaderTitleProps {
    titulo: string
}

export const HeaderTitle: React.FC<HeaderTitleProps> = (props) => {
    return (
        <View style={{ marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ marginLeft: 5, color: '#888', fontSize: 16, fontWeight: 'bold' }}>{props.titulo}</Text>
        </View>
    )
}

export interface HeaderRightProps {
    isVisible?: boolean
    onPress?: () => void
    icone?: string
}

export const HeaderRight: React.FC<HeaderRightProps> = (props) => {
    if (!props?.isVisible) return null

    return (
        <View>
            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={props.onPress}>
                <FontAwesome style={{ marginRight: 10, color: '#fff', fontSize: 25, fontWeight: 'bold' }} name={props.icone} />
            </TouchableOpacity>
        </View>
    )
}
