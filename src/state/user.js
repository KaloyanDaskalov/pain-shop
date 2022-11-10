import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, updateEmail, updatePassword } from 'firebase/auth'
import { useNotification } from "./notifications"

export const AuthContext = React.createContext()

export function useAuth() {
	return useContext(AuthContext)
}

export default function AuthProvider({ children }) {
	const [user, setUser] = useState(null)

	const { setMessage, setStatus } = useNotification()

	const register = useCallback((email, password) => {
		return createUserWithEmailAndPassword(auth, email, password)
	}, [])

	const login = useCallback((email, password) => {
		return signInWithEmailAndPassword(auth, email, password)
	}, [])

	const logout = useCallback(() => {
		return auth.signOut()
	}, [])

	const resetPassword = useCallback((email) => {
		return sendPasswordResetEmail(auth, email)
	}, [])

	const changeEmail = useCallback((email) => {
		return updateEmail(auth.currentUser, email)
	}, [])

	const changePassword = useCallback((password) => {
		return updatePassword(auth.currentUser, password)
	}, [])

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setUser(user)
			setMessage(`Welcome ${user.email}`)
			setStatus('success')
		})
		return unsubscribe
	}, [setMessage, setStatus])

	const context = useMemo(() => ({
		user,
		register,
		login,
		logout,
		resetPassword,
		changeEmail,
		changePassword
	}), [user, register, login, logout, resetPassword, changeEmail, changePassword])

	return (
		<AuthContext.Provider value={context} >
			{children}
		</AuthContext.Provider>
	)
}