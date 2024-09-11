import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'

import * as HelperNumero from '@/src/util/HelperNumero'
import * as HelperData from '@/src/util/HelperData'
import useTransactionHistory from '@/src/hooks/useTransactionHistory'

export default function TransactionHistoryScreen() {
    const { currentUser, data, handleBtnAll, handleBtnReceived, handleBtnSent } = useTransactionHistory()

    const renderDetail = ({ item }) => {
        const name =
            item.tipoOperacao == 0 // Received
                ? item.pagadorNome
                    ? item.pagadorNome
                    : item.pagadorISPB == currentUser.ispb
                      ? currentUser.bank
                      : item.pagadorISPB == 4358798
                        ? 'JJ4 Bank'
                        : 'J Bank'
                : item.recebedorNome // Sent
                  ? item.recebedorNome
                  : item.recebedorISPB == currentUser.ispb
                    ? currentUser.bank
                    : item.recebedorISPB == 4358798
                      ? 'JJ4 Bank'
                      : 'J Bank'

        const initials = name?.charAt(0).toUpperCase() // name.split(' ').map((n: any) => n[0]).join('').toUpperCase()
        const value = HelperNumero.FormatCurrency(item.valor)
        const datetime = HelperData.FormatDate(item.dtHrOperacao)

        return (
            <View style={styles.transactionItem}>
                <View style={styles.circle}>
                    <Text style={styles.initials}>{initials}</Text>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.date}>{datetime}</Text>
                </View>
                <Text style={[styles.amount, { color: item.tipoOperacao == 0 ? '#0d7027' : '#ab0606' }]}>{value}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonAll} activeOpacity={0.7} onPress={handleBtnAll}>
                    <Text style={styles.buttonText}> All </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonReceived} onPress={handleBtnReceived}>
                    <Text style={styles.buttonText}> Received </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSent} onPress={handleBtnSent}>
                    <Text style={styles.buttonText}> Sent </Text>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 12 }}>
                <FlatList data={data} renderItem={renderDetail} keyExtractor={(item) => item.paymentId} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },

    buttonContainer: { flex: 1, flexDirection: 'row', justifyContent: 'center', paddingTop: 20 },
    buttonAll: { marginRight: 10, justifyContent: 'center', alignItems: 'center', width: 80, height: 32, borderRadius: 15, borderWidth: 2, borderColor: '#fff', shadowOpacity: 0.8, shadowRadius: 6, elevation: 15 },
    buttonReceived: { marginRight: 10, justifyContent: 'center', alignItems: 'center', width: 130, height: 32, borderRadius: 15, borderWidth: 2, borderColor: '#fff', shadowOpacity: 0.8, shadowRadius: 6, elevation: 15 },
    buttonSent: { marginRight: 0, justifyContent: 'center', alignItems: 'center', width: 130, height: 32, borderRadius: 15, borderWidth: 2, borderColor: '#fff', shadowOpacity: 0.8, shadowRadius: 6, elevation: 15 },
    buttonText: { fontSize: 16, paddingLeft: 5, textAlign: 'left', fontWeight: 'bold' },

    transactionItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 6 },
    circle: { width: 50, height: 50, borderRadius: 50, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center', marginRight: 14 },
    initials: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
    detailsContainer: { flex: 1 },
    name: { fontSize: 18, color: '#555', fontWeight: 'bold' },
    date: { fontSize: 14, color: '#888' },
    amount: { fontSize: 18, fontWeight: 'bold' },
})
