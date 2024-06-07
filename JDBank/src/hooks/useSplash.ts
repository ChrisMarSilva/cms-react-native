import { useEffect, useState } from 'react'
import { router } from 'expo-router'

import useCurrentUser from '@/src/hooks/useCurrentUser'
import * as HelperSessao from '@/src/util/HelperSessao'

const useSplash = () => {
    const currentUser = useCurrentUser()

    useEffect(() => {
        _clearCurrentUser()
        _loadSessionUser()

        // return () => {  _clearData() } //setTimeout(() => { //}, 3000)
    }, [])

    const _clearCurrentUser = async () => {
        currentUser.setUrl('')
        currentUser.setUsername('')
        currentUser.setName('')
        currentUser.setTipoPessoa(0)
        currentUser.setDocumento(0)
        currentUser.setEmail('')
        currentUser.setPhone('')
        currentUser.setSocialSecurity('')
        currentUser.setBirth('')
        currentUser.setCountry('')
        currentUser.setCitizen('')
        currentUser.setAddress('')

        currentUser.setIspb(0)
        currentUser.setBank('')
        currentUser.setAgencia('')
        currentUser.setConta('')
        currentUser.setBalance(0)
    }

    const _loadSessionUser = async () => {
        const url = await HelperSessao.GetUrl()
        const bank = await HelperSessao.GetBank()
        const ispb = await HelperSessao.GetIspb()
        const username = await HelperSessao.GetUsername()

        console.log('useSplash._loadSessionUser - ispb:', ispb, ', bank:', bank, ', username:', username, ', url:', url)

        currentUser.setUrl(url.toString().trim() || '')
        currentUser.setIspb(parseInt(ispb) || 0)
        currentUser.setBank(bank.toString().trim() || '')
        currentUser.setUsername(username || '')

        router.replace('/login') // login // page1
    }

    return {}
}

export default useSplash
