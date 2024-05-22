import React, { useState } from 'react'

// export interface IUserType { //export type IUserType = {
// 	url: string,
//     setUrl: (string) => void,
//     chave: string,
//     setChave: (string) => void,
//     tipoPessoa: string,
//     setTipoPessoa: (string) => void,
//     nome: string,
//     setNome: (string) => void,
//     documento: string,
//     setDocumento: (string) => void,
//     cidade: string,
//     setCidade: (string) => void,
//     ispb: string,
//     setIspb: (string) => void,
//     nomeBanco: string,
//     setNomeBanco: (string) => void,
//     agencia: string,
//     setAgencia: (string) => void,
//     tipoConta: string,
//     setTipoConta: (string) => void,
//     conta: string,
//     setConta: (string) => void,
//     saldo: number,
//     setSaldo: (number) => void,
//     icon: string,
//     setIcon: (string) => void,
//     logo: string,
//     setLogo: (string) => void,
//     bgColor: string,
//     setBgColor: (string) => void,
//     bgColorScreen: string,
//     setBgColorScreen: (string) => void,
// }

export interface UserContextType { //export type UserContextType = {
	url: string 
	setUrl: React.Dispatch<React.SetStateAction<string>>;
    chave: string;
    setChave: React.Dispatch<React.SetStateAction<string>>;
    tipoPessoa: string;
    setTipoPessoa: React.Dispatch<React.SetStateAction<string>>;
    nome: string;
    setNome: React.Dispatch<React.SetStateAction<string>>;
    documento: string;
    setDocumento: React.Dispatch<React.SetStateAction<string>>;
    cidade: string;
    setCidade: React.Dispatch<React.SetStateAction<string>>;
    ispb: string;
    setIspb: React.Dispatch<React.SetStateAction<string>>;
    nomeBanco: string;
    setNomeBanco: React.Dispatch<React.SetStateAction<string>>;
    agencia: string;
    setAgencia: React.Dispatch<React.SetStateAction<string>>;
    tipoConta: string;
    setTipoConta: React.Dispatch<React.SetStateAction<string>>;
    conta: string;
    setConta: React.Dispatch<React.SetStateAction<string>>;
    saldo: number;
    setSaldo: React.Dispatch<React.SetStateAction<number>>;
    icon: string;
    setIcon: React.Dispatch<React.SetStateAction<string>>;
    logo: string;
    setLogo: React.Dispatch<React.SetStateAction<string>>;
    bgColor: string;
    setBgColor: React.Dispatch<React.SetStateAction<string>>;
    bgColorScreen: string;
    setBgColorScreen: React.Dispatch<React.SetStateAction<string>>;
}

export interface UserProviderProps {
    children: React.ReactNode;
}
