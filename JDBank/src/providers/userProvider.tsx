import React, { useState  } from 'react'
import { UserContext } from '@/src/contexts/userContext'
import { UserProviderProps } from '@/src/@types/user'

//export const UserProvider: React.FC<{children: UserProviderProps}> = ({ children }: UserProviderProps) => {
export const UserProvider = ({ children }: UserProviderProps) => {
	const [nameReceiveBank, setNameReceiveBank] = useState<string>('')
	const [urlReceiveBank, setUrlReceiveBank] = useState<string>('')
	const [namePaymentBank, setNamePaymentBank] = useState<string>('')
	const [urlPaymentBank, setUrlPaymentBank] = useState<string>('')
	const [url, setUrl] = useState<string>('')
	const [username, setUsername] = useState<string>('')
	const [name, setName] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [phone, setPhone] = useState<string>('')
	const [socialSecurity, setSocialSecurity] = useState<string>('')
	const [birth, setBirth] = useState<string>('')
	const [country, setCountry] = useState<string>('')
	const [citizen, setCitizen] = useState<string>('')
	const [address, setAddress] = useState<string>('')
	const [bank, setBank] = useState<string>('')
	const [balance, setBalance] = useState<number>(0)
	
	return (
		<UserContext.Provider
			value={{
				nameReceiveBank, setNameReceiveBank,
				urlReceiveBank, setUrlReceiveBank,
				namePaymentBank, setNamePaymentBank,
				urlPaymentBank, setUrlPaymentBank,
				url, setUrl,
				username, setUsername,
				name, setName,
				email, setEmail,
				phone, setPhone,
				socialSecurity, setSocialSecurity,
				birth, setBirth,
				country, setCountry,
				citizen, setCitizen,
				address, setAddress,				
				bank, setBank,
				balance, setBalance,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}
