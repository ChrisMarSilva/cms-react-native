import { useEffect, useState, useRef } from 'react'
import { Keyboard } from 'react-native'
import { router, useNavigation } from 'expo-router'

import useCurrentUser from '@/src/hooks/useCurrentUser'
import * as HelperSessao from '@/src/util/HelperSessao'
import { HeaderBackground, HeaderLeft, HeaderTitle, HeaderRight } from '@/src/components/header'

const useRecipients = () => {
    const currentUser = useCurrentUser()
    const navigation = useNavigation()

    const refTxtName = useRef(null)
    const refTxtEmail = useRef(null)

    const [isModalVisible, setModalVisible] = useState(false)
    const [search, setSearch] = useState<string>('')
    const [recipients, setRecipients] = useState<any[]>([])
    const [currentRecipient, setCurrentRecipient] = useState<any>(null)

    useEffect(() => {
        _clearData()
        _loadData()

        // return () => {
        //     _clearData()
        // }
    }, [])

    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <HeaderBackground />,
            headerTitle: () => <HeaderTitle titulo={'Recipients'} />,
        })
    }, [navigation])

    useEffect(() => {
        _saveData()
    }, [recipients])

    const _clearData = () => {
        //Keyboard.dismiss()
        setSearch('')
        setRecipients([])

        refTxtName?.current?.focus()
    }

    const _loadData = async () => {
        const existingRecipient = await HelperSessao.GetRecipients()
        const lista = existingRecipient != null ? JSON.parse(existingRecipient) : []

        // [
        //     { id: '1', name: 'Alice', email: 'alice@example.com' },
        //     { id: '2', name: 'Bob', email: 'bob@example.com' },
        //     { id: '3', name: 'Carol', email: 'carol@example.com' },
        // ]

        setRecipients(lista)
    }

    const _saveData = async () => {
        console.log('saveData:', recipients)
        // const lista = existingRecipient != null ? JSON.parse(existingRecipient) : []
        // const item     = {'datahora': datetime, 'tela': tela, 'url': url, 'params': JSON.stringify(params), 'statuscod': statuscod, 'message': JSON.stringify(message)}
        // lista.push(item) // push-ultimo // unshift-primeiro
        await HelperSessao.SetRecipients(JSON.stringify(recipients))

        //AsyncStorage.setItem(CONSTANTE.SESSAO_ERROR, JSON.stringify([]))
    }

    // const toggleModal = () => setModalVisible(!isModalVisible)

    const handleAdd = () => {
        setCurrentRecipient({ id: '', name: '', email: '' })
        setModalVisible(true) // router.push('/recipients/modal') toggleModal()
    }

    const handleEdit = (id: any, name: any, email: any) => {
        setCurrentRecipient({ id: id, name: name, email: email })
        setModalVisible(true)
    }

    const handleSave = () => {
        try {
            if (currentRecipient.name == '') {
                //  || currentRecipient.email == ''
                closeModal()
                return
            }

            if (currentRecipient.id != '') {
                const updatedRecipients = recipients.map((item) => (item.id === currentRecipient.id ? currentRecipient : item))
                setRecipients(updatedRecipients)
            } else {
                setRecipients([...recipients, { id: Math.random().toString(), name: currentRecipient.name, email: currentRecipient.email }])
                // setRecipients([...recipients, currentRecipient])
            }

            setCurrentRecipient({ id: '', name: '', email: '' })
            closeModal()
        } catch (error) {
            console.error(error)
        }
    }

    const handleDelete = (id: any) => {
        setRecipients(recipients.filter((recipient) => recipient.id !== id))
        closeModal()
    }

    const closeModal = () => {
        setModalVisible(false)
        setCurrentRecipient(null)
    }

    const filteredRecipients = recipients.filter((item) => item.name.toString().toLowerCase().includes(search.toString().toLowerCase()))
    //const filteredRecipients = recipients.filter((item) => item.name.toString().toLowerCase().indexOf(search.toString().toLowerCase()) > -1 || item.email.toString().toLowerCase().indexOf(search.toString().toLowerCase()) > -1 )

    return {
        search,
        setSearch,
        filteredRecipients,
        refTxtName,
        refTxtEmail,
        currentRecipient,
        setCurrentRecipient,
        isModalVisible,
        setModalVisible,
        handleAdd,
        handleEdit,
        handleSave,
        handleDelete,
        closeModal,
    }
}

export default useRecipients
