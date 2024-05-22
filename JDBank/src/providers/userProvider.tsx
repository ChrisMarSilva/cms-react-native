import React, { useState  } from 'react'
import { UserContext } from '@/src/contexts/userContext'
import { UserProviderProps } from '@/src/@types/user'

//export const UserProvider: React.FC<{children: UserProviderProps}> = ({ children }: UserProviderProps) => {
export const UserProvider = ({ children }: UserProviderProps) => {
	const [url, setUrl] = useState<string>('')
	const [chave, setChave] = useState<string>('')
	const [tipoPessoa, setTipoPessoa] = useState<string>('')
	const [nome, setNome] = useState<string>('')
	const [documento, setDocumento] = useState<string>('')
	const [cidade, setCidade] = useState<string>('')
	const [ispb, setIspb] = useState<string>('')
	const [nomeBanco, setNomeBanco] = useState<string>('')
	const [agencia, setAgencia] = useState<string>('')
	const [tipoConta, setTipoConta] = useState<string>('')
	const [conta, setConta] = useState<string>('')
	const [saldo, setSaldo] = useState<number>(0)
	const [icon, setIcon] = useState<string>('')
	const [logo, setLogo] = useState<string>('')
	const [bgColor, setBgColor] = useState<string>('')
	const [bgColorScreen, setBgColorScreen] = useState<string>('')
	
	return (
		<UserContext.Provider
			value={{
				url, setUrl,
				chave, setChave,
				tipoPessoa, setTipoPessoa,
				nome, setNome,
				documento, setDocumento,
				cidade, setCidade,
				ispb, setIspb,
				nomeBanco, setNomeBanco,
				agencia, setAgencia,
				tipoConta, setTipoConta,
				conta, setConta,
				saldo, setSaldo,
				icon, setIcon,
				logo, setLogo,
				bgColor, setBgColor,
				bgColorScreen, setBgColorScreen,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}
