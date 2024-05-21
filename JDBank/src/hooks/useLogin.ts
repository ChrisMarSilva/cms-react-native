import { useEffect, useState, useContext } from 'react'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { UserContext } from '@/src/contexts/userContext'
import * as HelperSessao from '@/src/util/HelperSessao'
import * as CONSTANTE from '@/src/util/Constante'
import { getChave } from '@/src/services/chaveService'

const useLogin = () => {
    const currentUser = useContext(UserContext)

    const [txtChave, setTxtChave] = useState('')
    const [isLoadingLogin, setIsLoadingLogin] = useState(false)

    useEffect(() => {
        setTxtChave('+5511911111111')
        setIsLoadingLogin(false)

        _limparDadosUsuario()
        _verificarSessaoUsuario()
    }, [])


    const _limparDadosUsuario = async () => {
        currentUser.setChave('')
        currentUser.setTipoPessoa('')
        currentUser.setNome('')
        currentUser.setDocumento('')
        currentUser.setCidade('')
        currentUser.setAgencia('')
        currentUser.setTipoConta('')
        currentUser.setConta('')
        currentUser.setSaldo('0')
        currentUser.setIcon('')
    }

    const _verificarSessaoUsuario = () => {
        // 	AsyncStorage.getItem(CONSTANTE.SESSAO_USER_URL).then((value) => currentUser.setNomeBanco(value))
        // 	AsyncStorage.getItem(CONSTANTE.SESSAO_USER_ISPB_IF).then((value) => currentUser.setIspb(value))
        // 	AsyncStorage.getItem(CONSTANTE.SESSAO_USER_NOME_IF).then((value) => currentUser.setNomeBanco(value))
        // 	AsyncStorage.getItem(CONSTANTE.SESSAO_USER_CHAVE).then((value) => setTxtChave(value))
        // 	AsyncStorage.getItem(CONSTANTE.SESSAO_USER_BGCOLOR).then((value) => currentUser.setBgColor(value))
        // 	AsyncStorage.getItem(CONSTANTE.SESSAO_USER_BGCOLOR_SCREEN).then((value) => currentUser.setBgColorScreen(value))
        // 	AsyncStorage.getItem(CONSTANTE.SESSAO_USER_ICON).then((value) => currentUser.setIcon(value))
    }

    const _onPressLogin = async () => {
        try {
            Keyboard.dismiss()
            setIsLoadingLogin(true)

            if (txtChave == null || txtChave == '') {
                setIsLoadingLogin(false)
                Alert.alert('Informe o Telefone...')
                return
            }

            data = await getChave(currentUser.url, txtChave)

            if (data?.ispb == null || data?.ispb == '' || data?.ispb == 'undefined' || data?.ispb == undefined) {
                setIsLoadingLogin(false)
                Alert.alert('Telefone não cadastrado - ' + txtChave)
                return false
            }

            if (data?.ispb != currentUser.ispb) {
                setIsLoadingLogin(false)
                Alert.alert('Ispb não pertence ao Banco - ' + txtChave)
                return false
            }

            _realizarLogin(data?.chave, data?.ispb, data?.nomeBanco, data?.tipoPessoa, data?.documento, data?.agencia, data?.conta, data?.tipoConta, data?.nome)
        } catch (error) {
            setIsLoadingLogin(false)
            Alert.alert('Erro(Geral): ' + error.message)
        }
    }

    const _realizarLogin = async (chave, ispb, nomeBanco, tipoPessoa, documento, agencia, conta, tipoConta, nome) => {
        await HelperSessao.SetUserURL(currentUser.url)
        await HelperSessao.SetUserChave(chave)
        await HelperSessao.SetUserIspb(ispb)
        await HelperSessao.SetUserNomeBanco(nomeBanco)
        await HelperSessao.SetUserBGColor(currentUser.bgColor)
        await HelperSessao.SetUserBGColorScreen(currentUser.bgColorScreen)
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
        currentUser.setSaldo('0')
        currentUser.setBgColorScreen(currentUser.bgColor == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_VERMELHO_FORTE : CONSTANTE.BG_AZUL_FORTE)
        currentUser.setLogo(currentUser.bgColor == CONSTANTE.BG_VERMELHO ? imglogoJD : imglogoJ3)

        setIsLoadingLogin(false)
        router.replace('/home')
    }

    const _onPressCadastro = () => {
        Keyboard.dismiss()
        setTxtChave('')
        setIsLoadingLogin(false)
        router.navigate('/login_cadastro')
    }

    const _onPressAlterarCorApp = async () => {
        Keyboard.dismiss()

        let url = ''
        let ispb = ''
        let nomeBanco = ''
        let bgColor = ''
        let bgColorScreen = ''
        let icon = ''

        if (currentUser.bgColor == CONSTANTE.BG_VERMELHO) {
            url = CONSTANTE.URL_RECEBEDOR
            ispb = CONSTANTE.ISPB_RECEBEDOR
            nomeBanco = CONSTANTE.NOME_RECEBEDOR
            bgColor = CONSTANTE.BG_AZUL
            bgColorScreen = CONSTANTE.BG_AZUL_FORTE
            icon = CONSTANTE.ICON_RECEBEDOR
        } else {
            url = CONSTANTE.URL_PAGADOR
            ispb = CONSTANTE.ISPB_PAGADOR
            nomeBanco = CONSTANTE.NOME_PAGADOR
            bgColor = CONSTANTE.BG_VERMELHO
            bgColorScreen = CONSTANTE.BG_VERMELHO_FORTE
            icon = CONSTANTE.ICON_PAGADOR
        }

        await HelperSessao.SetUserURL(url)
        await HelperSessao.SetUserIspb(ispb)
        await HelperSessao.SetUserNomeBanco(nomeBanco)
        await HelperSessao.SetUserBGColor(bgColor)
        await HelperSessao.SetUserBGColorScreen(bgColorScreen)
        await HelperSessao.SetUserIcon(icon)

        currentUser.setUrl(url)
        currentUser.setIspb(ispb)
        currentUser.setNomeBanco(nomeBanco)
        currentUser.setBgColor(bgColor)
        currentUser.setBgColorScreen(bgColorScreen)
        currentUser.setIcon(icon)
    }


    return {
        currentUser,
        txtChave, setTxtChave,
        isLoadingLogin, setIsLoadingLogin,
        _limparDadosUsuario, _verificarSessaoUsuario, _onPressLogin, _onPressCadastro, _onPressAlterarCorApp
    };
};

export default useLogin;


const {
    currentUser,
    txtChave, setTxtChave
    isLoadingLogin, setIsLoadingLogin,
    _limparDadosUsuario, _verificarSessaoUsuario, _onPressLogin, _onPressCadastro, _onPressAlterarCorApp,
} = useLogin()
