import { View, Image } from 'react-native'

import useSplash from '@/src/hooks/useSplash'
import imglogoJD from '@/src/assets/imgs/splash.png'

export default function IndexScreen() {
    const {} = useSplash()

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
            <Image source={imglogoJD} style={{ width: '100%', height: '100%', borderWidth: 0, borderColor: 'red' }} />
        </View>
    )
}
