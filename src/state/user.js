import React, { useState, useContext, useEffect } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

import Loader from '../components/ui/spinner'
import Wrapper from '../components/util/wrapper'

export const AuthContext = React.createContext()

export function useAuth() {
	return useContext(AuthContext)
}

export default function AuthProvider({ children }) {
	const [loading, setLoading] = useState(true)
	const [user, setUser] = useState(null)

	function register(email, password) {
		return createUserWithEmailAndPassword(auth, email, password)
	}

	function login(email, password) {
		return signInWithEmailAndPassword(auth, email, password)
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
			console.log('user', user)
		})
		return unsubscribe
	}, [])

	const context = {
		user,
		register,
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