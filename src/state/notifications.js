import React, { useState, useContext, useEffect, useMemo } from 'react'

import Notification from '../components/ui/notification'

export const NotificationContext = React.createContext()

export function useNotification() {
    return useContext(NotificationContext)
}

export default function NotificationProvider({ children }) {
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (message) {
            const identifier = setTimeout(() => {
                setMessage('')
                // setStatus('')
            }, 3000)
            return () => {
                clearTimeout(identifier)
            }
        }
    }, [message])

    const context = useMemo(() => ({
        setMessage,
        setStatus,
        setLoading,
        loading
    }), [setMessage, setStatus, setLoading, loading])

    return (
        <NotificationContext.Provider value={context} >
            {children}
            <Notification message={message} status={status} />
        </NotificationContext.Provider>
    )
}