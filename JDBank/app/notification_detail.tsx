import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'

import * as HelperNumero from '@/src/util/HelperNumero'
import useNotificationDetail from '@/src/hooks/useNotificationDetail'

export default function NotificationDetailScreen() {
    const { params, handleSeeReceipt } = useNotificationDetail()

    return (
        <View style={styles.container}>
            <AntDesign style={styles.icon} name="checkcircleo" size={110} color="green" />

            <Text style={styles.datetimeText}>{params.datetime}</Text>
            <Text style={styles.sentAmount}>Received {HelperNumero.FormatCurrency(parseFloat(params.value?.toString() || '0'))}</Text>
            <Text style={styles.toText}>from</Text>
            <Text style={styles.recipient}>{params.name}</Text>

            <View style={styles.containerButton}>
                <TouchableOpacity style={styles.doneButton} onPress={handleSeeReceipt}>
                    <Text style={styles.doneButtonText}>SEE RECEIPT</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', backgroundColor: '#fff' },

    icon: { marginTop: 130 },
    animation: { marginTop: 50, height: 200, width: 500, borderWidth: 0 },

    datetimeText: { fontSize: 14, color: '#888', marginTop: 50 },
    sentAmount: { fontSize: 24, fontWeight: 'bold', marginTop: 10 },
    toText: { fontSize: 18, color: '#888', marginTop: 10 },
    recipient: { fontSize: 24, fontWeight: 'bold', marginTop: 10 },

    containerButton: { width: '100%', backgroundColor: '#f7f7f7', position: 'absolute', bottom: 0, alignItems: 'center' },
    doneButton: { backgroundColor: '#003366', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 30, marginVertical: 30 },
    doneButtonText: { color: '#fff', fontSize: 18 },
})
