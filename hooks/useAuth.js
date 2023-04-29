import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'

const auth = getAuth()

export function useAuthentication() {
	const [user, setUser] = useState('')

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			user ? setUser(user) : setUser(undefined)

			return unsubscribe
		})
	}, [])

	return { user }
}
