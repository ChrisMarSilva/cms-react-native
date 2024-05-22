import { useContext} from 'react'
import { UserContext } from '@/src/contexts/userContext'
import { UserContextType } from '@/src/@types/user'

const useCurrentUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context)  throw new Error('useUsers deve ser usado dentro de um UserProvider');

    return context
}

export default useCurrentUser;
//const currentUser = useContext(UserContext) as UserContextType