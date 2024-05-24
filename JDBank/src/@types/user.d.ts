import React, { useState } from 'react'

export interface UserContextType {
    url: string
    setUrl: React.Dispatch<React.SetStateAction<string>>
    username: string
    setUsername: React.Dispatch<React.SetStateAction<string>>
    name: string
    setName: React.Dispatch<React.SetStateAction<string>>
    bank: string
    setBank: React.Dispatch<React.SetStateAction<string>>
    balance: number
    setBalance: React.Dispatch<React.SetStateAction<number>>
    // chave: string;
    // setChave: React.Dispatch<React.SetStateAction<string>>;
    // tipoPessoa: string;
    // setTipoPessoa: React.Dispatch<React.SetStateAction<string>>;
    // nome: string;
    // setNome: React.Dispatch<React.SetStateAction<string>>;
    // documento: string;
    // setDocumento: React.Dispatch<React.SetStateAction<string>>;
    // cidade: string;
    // setCidade: React.Dispatch<React.SetStateAction<string>>;
    // ispb: string;
    // setIspb: React.Dispatch<React.SetStateAction<string>>;
    // nomeBanco: string;
    // setNomeBanco: React.Dispatch<React.SetStateAction<string>>;
    // agencia: string;
    // setAgencia: React.Dispatch<React.SetStateAction<string>>;
    // tipoConta: string;
    // setTipoConta: React.Dispatch<React.SetStateAction<string>>;
    // conta: string;
    // setConta: React.Dispatch<React.SetStateAction<string>>;
    // saldo: number;
    // setSaldo: React.Dispatch<React.SetStateAction<number>>;
    // icon: string;
    // setIcon: React.Dispatch<React.SetStateAction<string>>;
    // logo: string;
    // setLogo: React.Dispatch<React.SetStateAction<string>>;
    // bgColor: string;
    // setBgColor: React.Dispatch<React.SetStateAction<string>>;
    // bgColorScreen: string;
    // setBgColorScreen: React.Dispatch<React.SetStateAction<string>>;
}

export interface UserProviderProps {
    children: React.ReactNode
}
