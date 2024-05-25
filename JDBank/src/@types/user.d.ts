import React, { useState } from 'react'

export interface UserContextType {
    url: string
    setUrl: React.Dispatch<React.SetStateAction<string>>

    username: string
    setUsername: React.Dispatch<React.SetStateAction<string>>

    name: string
    setName: React.Dispatch<React.SetStateAction<string>>

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

    bank: string
    setBank: React.Dispatch<React.SetStateAction<string>>

    balance: number
    setBalance: React.Dispatch<React.SetStateAction<number>>
}

export interface UserProviderProps {
    children: React.ReactNode
}
