import { createContext, useContext, useState } from 'react'

export const UserContext = createContext()

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
	const [login, setLogin] = useState(false)
	const [email, setEmail] = useState(false)

	return (
		<UserContext.Provider value={{ email, setEmail, login, setLogin }}>
			{children}
		</UserContext.Provider>
	)
}
