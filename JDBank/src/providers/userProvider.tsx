import { useState } from 'react'

import { UserContext } from '@/src/contexts/userContext'

export const UserProvider = ({ children }) => {
	const [url, setUrl] = useState(null)
	const [chave, setChave] = useState(null)
	const [tipoPessoa, setTipoPessoa] = useState(null)
	const [nome, setNome] = useState(null)
	const [documento, setDocumento] = useState(null)
	const [cidade, setCidade] = useState(null)
	const [ispb, setIspb] = useState(null)
	const [nomeBanco, setNomeBanco] = useState(null)
	const [agencia, setAgencia] = useState(null)
	const [tipoConta, setTipoConta] = useState(null)
	const [conta, setConta] = useState(null)
	const [saldo, setSaldo] = useState(null)
	const [icon, setIcon] = useState(null)
	const [logo, setLogo] = useState(null)
	const [bgColor, setBgColor] = useState(null)

	return (
		<UserContext.Provider
			value={{
				url,
				setUrl,
				chave,
				setChave,
				tipoPessoa,
				setTipoPessoa,
				nome,
				setNome,
				documento,
				setDocumento,
				cidade,
				setCidade,
				ispb,
				setIspb,
				nomeBanco,
				setNomeBanco,
				agencia,
				setAgencia,
				tipoConta,
				setTipoConta,
				conta,
				setConta,
				saldo,
				setSaldo,
				icon,
				setIcon,
				logo,
				setLogo,
				bgColor,
				setBgColor,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}
