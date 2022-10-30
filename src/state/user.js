import React, { useState, useContext, useEffect } from 'react'
import { auth } from '../firebase'

import Loader from '../components/ui/spinner'
import Wrapper from '../components/util/wrapper'

export const AuthContext = React.createContext()

export function useAuth() {
	return useContext(AuthContext)
}

export default function AuthProvider({ children }) {
	const [loading, setLoading] = useState(true)
	const [user, setUser] = useState(null)

	function signup(email, password) {
		// return promise 
		return auth.createUserWithEmailAndPassword(email, password)
	}

	function login(email, password) {
		return auth.signInWithEmailAndPassword(email, password)
	}

	function logout() {
		return auth.signOut()
	}

	function resetPassword(email) {
		return auth.sendPasswordResetEmail(email)
	}

	function updateEmail(email) {
		user.updateEmail(email)
	}

	function updatePassword(password) {
		user.updatePassword(password)
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setUser(user)
			setLoading(false)
		})
		return unsubscribe
	}, [])

	const context = {
		user,
		signup,
		login,
		logout,
		resetPassword,
		updateEmail,
		updatePassword
	}

	// render children after user Authorization check

	return (
		<AuthContext.Provider value={context} >
			{loading ? <Wrapper addClass='flex height'><Loader /></Wrapper> : children}
		</AuthContext.Provider>
	)
}