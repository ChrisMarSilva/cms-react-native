import React, { useState } from 'react'

export interface UserContextType {
    ispbReceiveBank: number
    setIspbReceiveBank: React.Dispatch<React.SetStateAction<number>>

    nameReceiveBank: string
    setNameReceiveBank: React.Dispatch<React.SetStateAction<string>>

    urlReceiveBank: string
    setUrlReceiveBank: React.Dispatch<React.SetStateAction<string>>

    ispbPaymentBank: number
    setIspbPaymentBank: React.Dispatch<React.SetStateAction<number>>

    namePaymentBank: string
    setNamePaymentBank: React.Dispatch<React.SetStateAction<string>>

    urlPaymentBank: string
    setUrlPaymentBank: React.Dispatch<React.SetStateAction<string>>

    url: string
    setUrl: React.Dispatch<React.SetStateAction<string>>

    username: string
    setUsername: React.Dispatch<React.SetStateAction<string>>

    name: string
    setName: React.Dispatch<React.SetStateAction<string>>

    tipoPessoa: number
    setTipoPessoa: React.Dispatch<React.SetStateAction<number>>

    documento: number
    setDocumento: React.Dispatch<React.SetStateAction<number>>

    email: string
    setEmail: React.Dispatch<React.SetStateAction<string>>

    phone: string
    setPhone: React.Dispatch<React.SetStateAction<string>>

    socialSecurity: string
    setSocialSecurity: React.Dispatch<React.SetStateAction<string>>

    birth: string
    setBirth: React.Dispatch<React.SetStateAction<string>>

    country: string
    setCountry: React.Dispatch<React.SetStateAction<string>>

    citizen: string
    setCitizen: React.Dispatch<React.SetStateAction<string>>

    address: string
    setAddress: React.Dispatch<React.SetStateAction<string>>

    ispb: number
    setIspb: React.Dispatch<React.SetStateAction<number>>

    bank: string
    setBank: React.Dispatch<React.SetStateAction<string>>

    agencia: string
    setAgencia: React.Dispatch<React.SetStateAction<string>>

    conta: string
    setConta: React.Dispatch<React.SetStateAction<string>>

    balance: number
    setBalance: React.Dispatch<React.SetStateAction<number>>
}

export interface UserProviderProps {
    children: React.ReactNode
}
