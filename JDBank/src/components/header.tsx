import { Text, View, TouchableOpacity, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
//import FontAwesome from '@expo/vector-icons/FontAwesome'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import useCurrentUser from '@/src/hooks/useCurrentUser'
import * as CONSTANTE from '@/src/util/Constante'

import imglogoJD from '@/src/assets/imgs/logo-red.png'
import imglogoJ3 from '@/src/assets/imgs/logo-blue.png'

export const HeaderBackground = () => {
    return <LinearGradient colors={['#fff', '#fff']} style={{ flex: 1 }} />
}

export const HeaderBlackBackground = () => {
    return <LinearGradient colors={['#000', '#000']} style={{ flex: 1 }} />
}

export const HeaderLeft = () => {
    const currentUser = useCurrentUser()

    const imglogo = (currentUser as any).url == CONSTANTE.PAYMENT_BANK_URL ? imglogoJD : imglogoJ3

    return (
        <View>
            <Image style={{ resizeMode: 'contain', width: 45, height: 45, borderRadius: 63, marginHorizontal: 15 }} source={imglogo} />
        </View>
    )
}

export interface HeaderTitleProps {
    titulo: string
}

export const HeaderTitle: React.FC<HeaderTitleProps> = (props) => {
    return <Text style={{ marginLeft: 5, color: '#888', fontSize: 16, fontWeight: 'bold' }}>{props.titulo}</Text>
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
            <TouchableOpacity onPress={props.onPress}>
                {/* <FontAwesome style={{ marginRight: 10, color: '#fff', fontSize: 25, fontWeight: 'bold' }} /> */}
                <MaterialIcons name={props.icone} size={25} color={'#888'} style={{ fontSize: 25, fontWeight: 'bold' }} />
            </TouchableOpacity>
        </View>
    )
}
