import { useEffect, useState } from 'react'
import { Keyboard, Alert } from 'react-native'
import { router } from 'expo-router'

import useCurrentUser from '@/src/hooks/useCurrentUser'
import * as HelperSessao from '@/src/util/HelperSessao'
import * as CONSTANTE from '@/src/util/Constante'
import { createChave } from '@/src/services/chaveService'

import imglogoJD from '@/src/assets/imgs/logo-red.png'
import imglogoJ3 from '@/src/assets/imgs/logo-blue.png'

const useLoginCadastro = () => {
    const currentUser = useCurrentUser()

    const [txtIspb, setTxtIspb] = useState(CONSTANTE.ISPB_RECEBEDOR)
    const [txtIspbNm, setTxtIspbNm] = useState(CONSTANTE.NOME_RECEBEDOR)
    const [txtTipoPessoa, setTxtTipoPessoa] = useState('0')
    const [txtDocumento, setTxtDocumento] = useState('')
    const [txtAgencia, setTxtAgencia] = useState('')
    const [txtConta, setTxtConta] = useState('')
    const [txtTipoConta, setTxtTipoConta] = useState('0')
    const [txtNome, setTxtNome] = useState('')
    const [txtTipoChave, setTxtTipoChave] = useState('0')
    const [txtChave, setTxtChave] = useState('')
    const [isLoadingCadastro, setIsLoadingCadastro] = useState(false)

    useEffect(() => {
        //setTxtIspb(CONSTANTE.ISPB_RECEBEDOR)
        //setTxtIspbNm(CONSTANTE.NOME_RECEBEDOR)
        //txtTipoPessoa('0')
        setTxtDocumento('')
        setTxtAgencia('')
        setTxtConta('')
        // setTxtTipoConta('0')
        setTxtNome('')
        // setTxtTipoChave('0')
        setTxtChave('')
        setIsLoadingCadastro(false)
    }, [])

    const _onPressCriaConta = async () => {
        try {
            Keyboard.dismiss

            setIsLoadingCadastro(true)

            if (txtNome == null || txtNome == '') {
                Alert.alert('Informe o Nome...')
                setIsLoadingCadastro(false)
                return
            }

            if (txtDocumento == null || txtDocumento == '') {
                Alert.alert('Informe o CPF...')
                setIsLoadingCadastro(false)
                return
            }

            if (txtChave == null || txtChave == '') {
                Alert.alert('Informe o Telefone...')
                setIsLoadingCadastro(false)
                return
            }

            if (txtAgencia == null || txtAgencia == '') {
                Alert.alert('Informe a Agência...')
                setIsLoadingCadastro(false)
                return
            }

            if (txtConta == null || txtConta == '') {
                Alert.alert('Informe a Conta...')
                setIsLoadingCadastro(false)
                return
            }

            const nome = txtNome
            const documento = txtDocumento.replace('.', '').replace('.', '').replace('-', '').replace(' ', '')
            const chave = txtChave.replace('(', '').replace(')', '').replace('-', '').replace(' ', '').replace(' ', '')
            const agencia = txtAgencia
            const conta = txtConta
            const ispb = txtIspb
            const nomeBanco = txtIspbNm
            const tipoPessoa = txtTipoPessoa
            const tipoConta = txtTipoConta
            const tipoChave = txtTipoChave

            const data = await createChave(currentUser.url, ispb, tipoPessoa, documento, agencia, conta, tipoConta, nome, tipoChave, chave)

            if (data.statusCode != '200') {
                Alert.alert('Erro(Cadastro): ' + data.statusCode + ' - ' + data.message.descricao)
                return
            }

            await HelperSessao.ClearAllSessao()
            await HelperSessao.SetUserChave(chave)
            await HelperSessao.SetUserIspb(ispb)
            await HelperSessao.SetUserNomeBanco(nomeBanco)
            await HelperSessao.SetUserTipoPessoa(tipoPessoa)
            await HelperSessao.SetUserDocumento(documento)
            await HelperSessao.SetUserAgencia(agencia)
            await HelperSessao.SetUserConta(conta)
            await HelperSessao.SetUserTipoConta(tipoConta)
            await HelperSessao.SetUserNome(nome)
            await HelperSessao.SetUserCidade('São Paulo')
            await HelperSessao.SetUserBGColor(currentUser.bgColor)
            await HelperSessao.SetUserIcon(currentUser.icon)

            currentUser.setChave(chave)
            currentUser.setTipoPessoa(tipoPessoa)
            currentUser.setNome(nome)
            currentUser.setDocumento(documento)
            currentUser.setCidade('São Paulo')
            currentUser.setIspb(ispb)
            currentUser.setNomeBanco(nomeBanco)
            currentUser.setAgencia(agencia)
            currentUser.setTipoConta(tipoConta)
            currentUser.setConta(conta)
            currentUser.setSaldo(0)
            currentUser.setLogo(currentUser.bgColor == CONSTANTE.BG_VERMELHO ? imglogoJD : imglogoJ3)

            setIsLoadingCadastro(false)
            // Alert.alert('Cadastro ralizado com Sucesso')

            router.replace('/home')
        } catch (error: any) {
            console.error(error)
            setIsLoadingCadastro(false)
            Alert.alert('Erro(Geral): ' + error.messag)
        } finally {
        }
    }

    return {
        currentUser,
        txtNome,
        setTxtNome,
        txtDocumento,
        setTxtDocumento,
        txtChave,
        setTxtChave,
        txtAgencia,
        setTxtAgencia,
        txtConta,
        setTxtConta,
        isLoadingCadastro,
        _onPressCriaConta,
    }
}

export default useLoginCadastro
