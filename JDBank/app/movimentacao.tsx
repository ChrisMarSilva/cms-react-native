import { Text, View, TouchableOpacity } from 'react-native'
import Timeline from 'react-native-timeline-flatlist'

import useMovimentacao from '@/src/hooks/useMovimentacao'

export default function MovimentacaoScreen() {
    const { currentUser, isBtnTodosSelected, isBtnRectoSelected, isBtnPagtoSelected, data, _renderDetail, _onButtonTodas, _onButtonRecebimentos, _onButtonPagamentos } = useMovimentacao()

    return (
        <View style={{ flex: 1, backgroundColor: currentUser.bgColorScreen }}>
            <View style={{ flex: 1, backgroundColor: currentUser.bgColor, flexDirection: 'row', justifyContent: 'center', paddingTop: 20, borderWidth: 0, borderColor: 'blue' }}>
                <TouchableOpacity style={{ marginRight: 10, justifyContent: 'center', alignItems: 'center', width: 80, height: 32, borderRadius: 15, borderWidth: 2, borderColor: '#fff', backgroundColor: isBtnTodosSelected ? '#fff' : currentUser.bgColor, shadowOpacity: 0.8, shadowRadius: 6, elevation: 15 }} activeOpacity={0.7} onPress={_onButtonTodas}>
                    <Text style={{ fontSize: 16, paddingLeft: 5, textAlign: 'left', color: isBtnTodosSelected ? currentUser.bgColor : '#fff', fontWeight: 'bold' }}> todas </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginRight: 10, justifyContent: 'center', alignItems: 'center', width: 130, height: 32, borderRadius: 15, borderWidth: 2, borderColor: '#fff', backgroundColor: isBtnRectoSelected ? '#fff' : currentUser.bgColor, shadowOpacity: 0.8, shadowRadius: 6, elevation: 15 }} onPress={_onButtonRecebimentos}>
                    <Text style={{ fontSize: 16, paddingLeft: 5, textAlign: 'left', color: isBtnRectoSelected ? currentUser.bgColor : '#fff', fontWeight: 'bold' }}> recebimentos </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginRight: 0, justifyContent: 'center', alignItems: 'center', width: 130, height: 32, borderRadius: 15, borderWidth: 2, borderColor: '#fff', backgroundColor: isBtnPagtoSelected ? '#fff' : currentUser.bgColor, shadowOpacity: 0.8, shadowRadius: 6, elevation: 15 }} onPress={_onButtonPagamentos}>
                    <Text style={{ fontSize: 16, paddingLeft: 5, textAlign: 'left', color: isBtnPagtoSelected ? currentUser.bgColor : '#fff', fontWeight: 'bold' }}> pagamentos </Text>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 12, borderWidth: 0, borderColor: 'blue' }}>
                <Timeline data={data} circleColor={'transparent'} columnFormat={'single-column-right'} showTime={true} timeStyle={{ backgroundColor: 'transparent', color: '#fff', fontSize: 12, paddingRight: 10, paddingTop: 10, borderWidth: 0, borderColor: 'blue' }} options={{ style: { paddingTop: 10, paddingLeft: 10, borderWidth: 0, borderColor: 'blue' } }} renderDetail={_renderDetail} />
            </View>
        </View>
    )
}
