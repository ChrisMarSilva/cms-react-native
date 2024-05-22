import { createContext, useContext} from 'react'
import { UserContextType } from '@/src/@types/user'

export const UserContext = createContext<UserContextType | null>({} as UserContextType) // null // {} as UserContextType // {} as IUserType
