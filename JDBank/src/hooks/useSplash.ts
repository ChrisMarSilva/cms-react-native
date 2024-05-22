import { useEffect } from 'react'
import { router } from 'expo-router'

import useCurrentUser from '@/src/hooks/useCurrentUser'
import * as HelperSessao from '@/src/util/HelperSessao'
import * as CONSTANTE from '@/src/util/Constante'

const useSplash = () => {
    const currentUser = useCurrentUser()

    useEffect(() => {
        _limparDadosUsuario()
        //_inicarSessaoUsuarioPagador()
        //_inicarSessaoUsuarioRecebedor()

        //setTimeout(() => {
        _verificarSessaoUsuario()
        //}, 3000)
    }, [])

    const _limparDadosUsuario = async () => {
        currentUser.setUrl('')
        currentUser.setChave('')
        currentUser.setTipoPessoa('')
        currentUser.setNome('')
        currentUser.setDocumento('')
        currentUser.setCidade('')
        currentUser.setIspb('')
        currentUser.setNomeBanco('')
        currentUser.setAgencia('')
        currentUser.setTipoConta('')
        currentUser.setConta('')
        currentUser.setSaldo(0)
        currentUser.setIcon('')
        currentUser.setLogo('')
        currentUser.setBgColor('')
        currentUser.setBgColorScreen('')
    }

    const _inicarSessaoUsuarioPagador = async () => {
        //const userURL = await HelperSessao.GetUserURL()
        //if (userURL == null || userURL == '' || userURL == 'undefined') {
        await HelperSessao.ClearAllSessao()
        await HelperSessao.SetUserURL(CONSTANTE.URL_PAGADOR)
        await HelperSessao.SetUserIspb(CONSTANTE.ISPB_PAGADOR)
        await HelperSessao.SetUserNomeBanco(CONSTANTE.NOME_PAGADOR)
        await HelperSessao.SetUserBGColor(CONSTANTE.BG_VERMELHO)
        await HelperSessao.SetUserBGColorScreen(CONSTANTE.BG_VERMELHO_FORTE)
        await HelperSessao.SetUserIcon(CONSTANTE.ICON_PAGADOR)

        currentUser.setUrl(CONSTANTE.URL_PAGADOR)
        currentUser.setIspb(CONSTANTE.ISPB_PAGADOR)
        currentUser.setNomeBanco(CONSTANTE.NOME_PAGADOR)
        currentUser.setBgColor(CONSTANTE.BG_VERMELHO)
        currentUser.setBgColorScreen(CONSTANTE.BG_VERMELHO_FORTE)
        currentUser.setLogo(CONSTANTE.ICON_PAGADOR)
        //}
    }

    const _inicarSessaoUsuarioRecebedor = async () => {
        //const userURL = await HelperSessao.GetUserURL()
        //if (userURL == null || userURL == '' || userURL == 'undefined') {
        await HelperSessao.ClearAllSessao()
        await HelperSessao.SetUserURL(CONSTANTE.URL_RECEBEDOR)
        await HelperSessao.SetUserIspb(CONSTANTE.ISPB_RECEBEDOR)
        await HelperSessao.SetUserNomeBanco(CONSTANTE.NOME_RECEBEDOR)
        await HelperSessao.SetUserBGColor(CONSTANTE.BG_AZUL)
        await HelperSessao.SetUserBGColorScreen(CONSTANTE.BG_AZUL_FORTE)
        await HelperSessao.SetUserIcon(CONSTANTE.ICON_RECEBEDOR)

        currentUser.setUrl(CONSTANTE.URL_RECEBEDOR)
        currentUser.setIspb(CONSTANTE.ISPB_RECEBEDOR)
        currentUser.setNomeBanco(CONSTANTE.NOME_RECEBEDOR)
        currentUser.setBgColor(CONSTANTE.BG_AZUL)
        currentUser.setBgColorScreen(CONSTANTE.BG_AZUL_FORTE)
        currentUser.setLogo(CONSTANTE.ICON_RECEBEDOR)
        //}
    }

    const _verificarSessaoUsuario = async () => {
        currentUser.setUrl(await HelperSessao.GetUserURL())
        currentUser.setChave(await HelperSessao.GetUserChave())
        currentUser.setIspb(await HelperSessao.GetUserIspb())
        currentUser.setNomeBanco(await HelperSessao.GetUserNomeBanco())
        currentUser.setBgColor(await HelperSessao.GetUserBGColor())
        currentUser.setBgColorScreen(await HelperSessao.GetUserBGColorScreen())
        currentUser.setIcon(await HelperSessao.GetUserIcon())

        router.replace('/login')
        // router.replace('/page1') // para testes
    }

    return {
        currentUser,
    }
}

export default useSplash
