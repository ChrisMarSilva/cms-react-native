import { View, Text, StyleSheet } from 'react-native'
import Timeline from 'react-native-timeline-flatlist'

import * as HelperNumero from '@/src/util/HelperNumero'
import useTransactionHistory from '@/src/hooks/useTransactionHistory'

export default function TransactionHistoryScreen() {
    const { data } = useTransactionHistory()

    const renderDetail = (rowData: any, sectionID: any, rowID: any) => {
        return (
            <View style={styles.detailContainer}>
                <Text style={styles.detailTitle}>{rowData.title}</Text>
                <Text style={styles.detailDescription}>{rowData.description}</Text>
                <Text style={[styles.detailValue, { color: rowData.value >= 0 ? '#0d7027' : '#ab0606' }]}>{HelperNumero.FormatCurrency(rowData.value)}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {/* <View style={styles.estilo2}>
                <TouchableOpacity style={styles.estilo3} activeOpacity={0.7} onPress={handleBtnAll}>
                    <Text style={styles.estilo4}> All </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.estilo5} onPress={handleBtnReceived}>
                    <Text style={styles.estilo4}> Received </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.estilo6} onPress={handleBtnSent}>
                    <Text style={styles.estilo4}> Sent </Text>
                </TouchableOpacity>
            </View> */}

            <View style={{ flex: 12 }}>
                <Timeline
                    data={data}
                    circleColor={'transparent'}
                    columnFormat={'single-column-right'}
                    showTime={true}
                    //listViewStyle={{ backgroundColor: 'green' }}
                    //listViewContainerStyle={{ backgroundColor: 'blue' }}
                    //timeStyle={{ backgroundColor: 'blue' }}
                    timeContainerStyle={{ marginRight: 10 }}
                    detailContainerStyle={{ marginLeft: 15 }}
                    //rowContainerStyle={{ backgroundColor: 'blue' }}
                    //titleStyle={{ backgroundColor: 'blue' }}
                    //descriptionStyle={{ backgroundColor: 'blue' }}
                    //renderTime={renderTime}
                    renderDetail={renderDetail}
                />
            </View>
        </View>
    )
}

// style={{ backgroundColor: isBtnTodosSelected ? '#fff' : currentUser.bgColor }},

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },

    // estilo2: { flex: 1, flexDirection: 'row', justifyContent: 'center', paddingTop: 20 },
    // estilo3: { marginRight: 10, justifyContent: 'center', alignItems: 'center', width: 80, height: 32, borderRadius: 15, borderWidth: 2, borderColor: '#fff', shadowOpacity: 0.8, shadowRadius: 6, elevation: 15 },
    // estilo4: { fontSize: 16, paddingLeft: 5, textAlign: 'left', fontWeight: 'bold' },
    // estilo5: { marginRight: 10, justifyContent: 'center', alignItems: 'center', width: 130, height: 32, borderRadius: 15, borderWidth: 2, borderColor: '#fff', shadowOpacity: 0.8, shadowRadius: 6, elevation: 15 },
    // estilo6: { marginRight: 0, justifyContent: 'center', alignItems: 'center', width: 130, height: 32, borderRadius: 15, borderWidth: 2, borderColor: '#fff', shadowOpacity: 0.8, shadowRadius: 6, elevation: 15 },

    detailContainer: { flex: 1 },
    //detailGrupContainer: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'green' },
    detailTitle: { fontSize: 14, color: '#555', fontWeight: 'bold' },
    //detailDate: { fontSize: 16, color: '#555', fontWeight: 'bold' },
    detailDescription: { fontSize: 14, color: '#555' },
    detailValue: { fontSize: 16, color: '#555', fontWeight: 'bold' },
})
