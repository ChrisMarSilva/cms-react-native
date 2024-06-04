import { useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useNavigation, router } from 'expo-router'

import { HeaderBackground, HeaderLeft, HeaderTitle, HeaderRight } from '@/src/components/header'

const notifications = [
    { id: '1', amount: '50.00', sender: 'João Silva', date: '01/06/2024 14:30' },
    { id: '2', amount: '100.00', sender: 'Maria Souza', date: '02/06/2024 16:45' },
    { id: '3', amount: '200.00', sender: 'Carlos Lima', date: '03/06/2024 18:00' },
]

export default function NotificationScreen() {
    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <HeaderBackground />,
            headerTitle: () => <HeaderTitle titulo={'Notifications'} />,
        })
    }, [navigation])

    const renderItem = ({ item }: { item: { id: string; amount: string; sender: string; date: string } }) => (
        <TouchableOpacity style={styles.notificationContainer} onPress={handleDetail}>
            <View style={styles.textContainer}>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.amount}>
                    You received ${item.amount} from {item.sender}
                </Text>
            </View>
            <MaterialIcons name="arrow-forward" size={24} color="#000" style={styles.icon} />
        </TouchableOpacity>
    )

    const handleDetail = () => router.navigate('/notification_detail')

    return (
        <View style={styles.container}>
            <FlatList data={notifications} renderItem={renderItem} keyExtractor={(item) => item.id} ItemSeparatorComponent={() => <View style={styles.separator} />} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        paddingTop: 0,
    },
    notificationContainer: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 0,
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    textContainer: {
        flex: 1,
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 5,
    },
    date: {
        fontSize: 14,
        color: '#aaa',
    },
    icon: {
        marginLeft: 15,
    },
    separator: {
        height: 1,
        backgroundColor: '#e0e0e0',
    },
})
