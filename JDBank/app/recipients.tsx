import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Dimensions, Keyboard } from 'react-native'
import Modal from 'react-native-modal'
//import FontAwesome from '@expo/vector-icons/FontAwesome'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import useRecipients from '@/src/hooks/useRecipients'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

export default function RecipientsScreen() {
    const { search, setSearch, filteredRecipients, refTxtName, refTxtEmail, currentRecipient, setCurrentRecipient, isModalVisible, setModalVisible, handleAdd, handleEdit, handleSave, handleDelete, closeModal } = useRecipients()

    return (
        <View style={styles.container}>
            <TextInput style={styles.searchInput} placeholder="Search by name" value={search} onChangeText={setSearch} />

            <FlatList
                data={filteredRecipients}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.recipient} onPress={() => handleEdit(item.id, item.name, item.email)}>
                        <View style={styles.recipientDetails}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
                            </View>
                            <View style={styles.recipientInfo}>
                                <Text style={styles.recipientName}>{item.name}</Text>
                                <Text style={styles.recipientEmail}>{item.email}</Text>
                            </View>
                        </View>
                        {/* <View style={styles.recipientActions}>
                        <TouchableOpacity onPress={() => handleEdit(item.id, item.name, item.email)}>
                            <FontAwesome name="edit" size={20} color="blue" style={styles.actionIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDelete(item.id)}>
                            <FontAwesome name="trash" size={20} color="red" style={styles.actionIcon} />
                        </TouchableOpacity>
                    </View> */}
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
                <Text style={styles.addButtonText}>Add Recipient</Text>
            </TouchableOpacity>

            <Modal style={styles.modal} isVisible={isModalVisible} onBackdropPress={closeModal} onSwipeComplete={() => setModalVisible(false)} swipeDirection="left" useNativeDriver avoidKeyboard={true} deviceWidth={deviceWidth} deviceHeight={deviceHeight} animationInTiming={200} animationOutTiming={200} backdropTransitionInTiming={200} backdropTransitionOutTiming={200} onBackButtonPress={closeModal}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Edit Recipient</Text>
                        <TouchableOpacity onPress={closeModal}>
                            <MaterialIcons name="close" color="#000" size={24} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.modalBody}>
                        <TextInput style={styles.input} ref={refTxtName} onSubmitEditing={() => refTxtEmail.current.focus()} onEndEditing={() => Keyboard.dismiss} blurOnSubmit={false} returnKeyType={'next'} autoFocus={true} autoCorrect={false} placeholder="Name" value={currentRecipient ? currentRecipient.name : ''} onChangeText={(name) => setCurrentRecipient({ ...currentRecipient, name })} />
                        <TextInput style={styles.input} ref={refTxtEmail} onSubmitEditing={handleSave} returnKeyType={'done'} onEndEditing={() => Keyboard.dismiss} blurOnSubmit={false} autoFocus={false} autoCapitalize="none" autoCorrect={false} inputMode={'email'} placeholder="Email" value={currentRecipient ? currentRecipient.email : ''} onChangeText={(email) => setCurrentRecipient({ ...currentRecipient, email })} />
                    </View>

                    <View style={styles.modalFooter}>
                        {currentRecipient && currentRecipient.id && (
                            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(currentRecipient.id)}>
                                <Text style={styles.deleteButtonText}>Delete</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },

    searchInput: { marginHorizontal: 16, height: 40, borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 16, paddingHorizontal: 10 },

    recipient: { marginHorizontal: 16, flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
    recipientDetails: { flexDirection: 'row', alignItems: 'center' },
    avatar: { backgroundColor: '#ddd', borderRadius: 24, width: 48, height: 48, justifyContent: 'center', alignItems: 'center' },
    avatarText: { fontSize: 24, color: '#fff' },
    recipientInfo: { marginLeft: 16 },
    recipientName: { fontSize: 18, fontWeight: 'bold' },
    recipientEmail: { fontSize: 14, color: '#808080' },
    //recipientActions: { flexDirection: 'row' },
    //actionIcon: { marginLeft: 16 },

    addButton: { margin: 16, backgroundColor: '#007bff', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 16 },
    addButtonText: { color: '#fff', fontSize: 16 },

    modal: { justifyContent: 'flex-end', margin: 0 },
    modalContent: { backgroundColor: '#FFF', padding: 22, borderTopLeftRadius: 20, borderTopRightRadius: 20, height: '50%' },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    // modalTitleContainer: { height: '16%', backgroundColor: '#007bff', borderTopRightRadius: 10, borderTopLeftRadius: 10, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    modalTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', flex: 1 },
    modalBody: { flex: 1 },
    input: { height: 40, borderColor: '#808080', borderWidth: 1, marginBottom: 16, paddingHorizontal: 8 },
    modalFooter: { flexDirection: 'row', marginBottom: 16, justifyContent: 'space-between' },
    deleteButton: { flex: 1, backgroundColor: '#dc3912', padding: 16, borderRadius: 8, alignItems: 'center', marginRight: 8 },
    deleteButtonText: { color: 'white', fontSize: 16 },
    saveButton: { flex: 3, backgroundColor: '#007bff', padding: 16, borderRadius: 8, alignItems: 'center' },
    saveButtonText: { color: '#FFF', fontSize: 16 },
})

/* 

export default function AddScreen() {
    const { recipient } = params || { name: '', email: '' }
    const [name, setName] = useState(recipient ? recipient.name : '')
    const [email, setEmail] = useState(recipient ? recipient.email : '')

    const saveRecipient = () => {  navigation.goBack()  }

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
            <Button title="Save" onPress={saveRecipient} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {        flex: 1,        padding: 16,    },
    input: {        height: 40,        borderColor: 'gray',        borderWidth: 1,        marginBottom: 16,        paddingHorizontal: 8,    },
})

*/
