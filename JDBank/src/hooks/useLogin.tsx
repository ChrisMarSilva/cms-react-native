import { useEffect, useState, useContext } from 'react'
import { Keyboard,  Alert } from 'react-native'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

import useCurrentUser from '@/src/hooks/useCurrentUser'
import * as HelperSessao from '@/src/util/HelperSessao'
import * as CONSTANTE from '@/src/util/Constante'
import { getChave } from '@/src/services/chaveService'

import imglogoJD from '@/src/assets/imgs/logo-red.png'
import imglogoJ3 from '@/src/assets/imgs/logo-blue.png'

const useLogin = () => {
    const currentUser = useCurrentUser()

    const [txtChave, setTxtChave] = useState<string>('')
    const [isLoadingLogin, setIsLoadingLogin] = useState<boolean>(false)

    useEffect(() => {
        setTxtChave('')
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
        currentUser.setSaldo(0)
        currentUser.setIcon('')
    }

    const _verificarSessaoUsuario = () => {
        AsyncStorage.getItem(CONSTANTE.SESSAO_USER_URL).then((value) => currentUser.setNomeBanco(value || ''))
        AsyncStorage.getItem(CONSTANTE.SESSAO_USER_ISPB_IF).then((value) => currentUser.setIspb(value || ''))
        AsyncStorage.getItem(CONSTANTE.SESSAO_USER_NOME_IF).then((value) => currentUser.setNomeBanco(value || ''))
        AsyncStorage.getItem(CONSTANTE.SESSAO_USER_CHAVE).then((value) => setTxtChave(value || ''))
        AsyncStorage.getItem(CONSTANTE.SESSAO_USER_BGCOLOR).then((value) => currentUser.setBgColor(value || ''))
        AsyncStorage.getItem(CONSTANTE.SESSAO_USER_BGCOLOR_SCREEN).then((value) => currentUser.setBgColorScreen(value || ''))
        AsyncStorage.getItem(CONSTANTE.SESSAO_USER_ICON).then((value) => currentUser.setIcon(value || ''))
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

            const data = await getChave(currentUser.url, txtChave)

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

            await HelperSessao.SetUserURL(currentUser.url)
            await HelperSessao.SetUserChave(data?.chave)
            await HelperSessao.SetUserIspb(data?.ispb)
            await HelperSessao.SetUserNomeBanco(data?.nomeBanco)
            await HelperSessao.SetUserBGColor(currentUser.bgColor)
            await HelperSessao.SetUserBGColorScreen(currentUser.bgColorScreen)
            await HelperSessao.SetUserIcon(currentUser.icon)
    
            currentUser.setChave(data?.chave)
            currentUser.setTipoPessoa(data?.tipoPessoa)
            currentUser.setNome(data?.nome)
            currentUser.setDocumento(data?.documento)
            currentUser.setCidade('São Paulo')
            currentUser.setIspb(data?.ispb)
            currentUser.setNomeBanco(data?.nomeBanco)
            currentUser.setAgencia(data?.agencia)
            currentUser.setTipoConta(data?.tipoConta)
            currentUser.setConta(data?.conta)
            currentUser.setSaldo(0)
            currentUser.setBgColorScreen(currentUser.bgColor == CONSTANTE.BG_VERMELHO ? CONSTANTE.BG_VERMELHO_FORTE : CONSTANTE.BG_AZUL_FORTE)
            currentUser.setLogo(currentUser.bgColor == CONSTANTE.BG_VERMELHO ? imglogoJD : imglogoJ3)
    
            setIsLoadingLogin(false)
            router.replace('/home')
        } catch (error: any) {
            setIsLoadingLogin(false)
            Alert.alert('Erro(Geral): ' + error?.message)
        }
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

        if ((currentUser as any).bgColor == CONSTANTE.BG_VERMELHO) {
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
