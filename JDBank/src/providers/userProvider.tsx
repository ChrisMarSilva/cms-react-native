import React, { useState  } from 'react'
import { UserContext } from '@/src/contexts/userContext'
import { UserProviderProps } from '@/src/@types/user'

//export const UserProvider: React.FC<{children: UserProviderProps}> = ({ children }: UserProviderProps) => {
export const UserProvider = ({ children }: UserProviderProps) => {
	const [ispbReceiveBank, setIspbReceiveBank] = useState<number>(0)
	const [nameReceiveBank, setNameReceiveBank] = useState<string>('')
	const [urlReceiveBank, setUrlReceiveBank] = useState<string>('')

	const [ispbPaymentBank, setIspbPaymentBank] = useState<number>(0)
	const [namePaymentBank, setNamePaymentBank] = useState<string>('')
	const [urlPaymentBank, setUrlPaymentBank] = useState<string>('')

	const [url, setUrl] = useState<string>('')
	const [username, setUsername] = useState<string>('')
	const [name, setName] = useState<string>('')
	const [tipoPessoa, setTipoPessoa] = useState<number>(0)
	const [documento, setDocumento] = useState<number>(0)
	const [email, setEmail] = useState<string>('')
	const [phone, setPhone] = useState<string>('')
	const [socialSecurity, setSocialSecurity] = useState<string>('')
	const [birth, setBirth] = useState<string>('')
	const [country, setCountry] = useState<string>('')
	const [citizen, setCitizen] = useState<string>('')
	const [address, setAddress] = useState<string>('')
	
	const [ispb, setIspb] = useState<number>(0)
	const [bank, setBank] = useState<string>('')
	const [agencia, setAgencia] = useState<string>('')
	const [conta, setConta] = useState<string>('')
	const [balance, setBalance] = useState<number>(0)
	
	return (
		<UserContext.Provider
			value={{
				ispbReceiveBank, setIspbReceiveBank,
				nameReceiveBank, setNameReceiveBank,
				urlReceiveBank, setUrlReceiveBank,
				
				ispbPaymentBank, setIspbPaymentBank,
				namePaymentBank, setNamePaymentBank,
				urlPaymentBank, setUrlPaymentBank,
				url, setUrl,
				username, setUsername,
				name, setName,
				tipoPessoa, setTipoPessoa,
				documento, setDocumento,
				email, setEmail,
				phone, setPhone,
				socialSecurity, setSocialSecurity,
				birth, setBirth,
				country, setCountry,
				citizen, setCitizen,
				address, setAddress,	
				
				ispb, setIspb,			
				bank, setBank,		
				agencia, setAgencia,		
				conta, setConta,
				balance, setBalance,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}
