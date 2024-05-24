import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Timeline from 'react-native-timeline-flatlist'
import { LinearGradient } from 'expo-linear-gradient'
import { router, useNavigation } from 'expo-router'

import { HeaderBackground, HeaderLeft, HeaderTitle, HeaderRight } from '@/src/components/header'

export default function Page1Screen() {
    const navigation = useNavigation()

    const [data, setData] = useState<any>(null)

    useEffect(() => {
        setTimeout(() => {
            const dt = new Date()
            const dataAtual = ('0' + (dt.getMonth() + 1)).substr(-2) + '/' + ('0' + dt.getDate()).substr(-2) + '/' + dt.getFullYear()

            const result = [
                { time: dataAtual, title: 'Received', description: 'Person 1', lineColor: 'transparent', type: 'R', value: 123456.99 },
                { time: dataAtual, title: 'Sent ', description: 'Person 2', lineColor: 'transparent', type: 'R', value: 200 },
                { time: dataAtual, title: 'Pending Request for Pay', description: 'Person 3', lineColor: 'transparent', type: 'R', value: 500 },
                { time: dataAtual, title: 'Received', description: 'Person 1', lineColor: 'transparent', type: 'R', value: 1000 },
                { time: dataAtual, title: 'Sent', description: 'Person 2', lineColor: 'transparent', type: 'R', value: 1500 },
                { time: dataAtual, title: 'Received Request for Pay', description: 'Person 3', lineColor: 'transparent', type: 'R', value: 2000 },
                { time: dataAtual, title: 'Received Request for Pay ', description: 'Person 4', lineColor: 'transparent', type: 'P', value: 3000 },
                { time: dataAtual, title: 'Sent', description: 'Person 5', lineColor: 'transparent', type: 'P', value: 4000 },
                { time: dataAtual, title: 'Received Request for Pay ', description: 'Person 4', lineColor: 'transparent', type: 'P', value: 5000 },
                { time: dataAtual, title: 'Sent', description: 'Person 5', lineColor: 'transparent', type: 'P', value: 6000.99 },
            ]

            setData(result)
        }, 200)
    }, [])

    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <LinearGradient colors={['#fff', '#fff', '#fff']} style={{ flex: 1 }} />,
            headerTitle: () => (
                <View style={{ marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ marginLeft: 5, color: '#888', fontSize: 16 }}>Transaction History</Text>
                </View>
            ),
        })
    }, [navigation])

    const handleHome = () => console.log('Home')
    const handleBtnAll = () => console.log('TodAllas')
    const handleBtnReceived = () => console.log('Received')
    const handleBtnSent = () => console.log('Sent')

    const renderDetail = (rowData: any, sectionID: any, rowID: any) => {
        return (
            <View style={styles.estilo8}>
                <Text style={styles.estilo9}>{rowData.title}</Text>
                <Text style={styles.estilo10}>{rowData.description}</Text>
                <Text style={styles.estilo11}>$ {parseFloat(rowData.value)}</Text>
            </View>
        )
    }

    return (
        <View style={styles.estilo1}>
            <View style={styles.estilo2}>
                <TouchableOpacity style={styles.estilo3} activeOpacity={0.7} onPress={handleBtnAll}>
                    <Text style={styles.estilo4}> All </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.estilo5} onPress={handleBtnReceived}>
                    <Text style={styles.estilo4}> Received </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.estilo6} onPress={handleBtnSent}>
                    <Text style={styles.estilo4}> Sent </Text>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 12 }}>
                <Timeline data={data} circleColor={'transparent'} columnFormat={'single-column-right'} showTime={true} timeStyle={styles.estilo7} renderDetail={renderDetail} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    estilo1: { flex: 1 },
    estilo2: { flex: 1, flexDirection: 'row', justifyContent: 'center', paddingTop: 20 },
    estilo3: { marginRight: 10, justifyContent: 'center', alignItems: 'center', width: 80, height: 32, borderRadius: 15, borderWidth: 2, borderColor: '#fff', shadowOpacity: 0.8, shadowRadius: 6, elevation: 15 },
    estilo4: { fontSize: 16, paddingLeft: 5, textAlign: 'left', fontWeight: 'bold' },
    estilo5: { marginRight: 10, justifyContent: 'center', alignItems: 'center', width: 130, height: 32, borderRadius: 15, borderWidth: 2, borderColor: '#fff', shadowOpacity: 0.8, shadowRadius: 6, elevation: 15 },
    estilo6: { marginRight: 0, justifyContent: 'center', alignItems: 'center', width: 130, height: 32, borderRadius: 15, borderWidth: 2, borderColor: '#fff', shadowOpacity: 0.8, shadowRadius: 6, elevation: 15 },
    estilo7: { backgroundColor: 'transparent', fontSize: 12, paddingRight: 10, paddingTop: 10 },
    estilo8: { flex: 1, borderWidth: 0 },
    estilo9: { fontSize: 13, fontWeight: 'bold' },
    estilo10: { fontSize: 15 },
    estilo11: { fontSize: 17 },
})
