import React, { useState, useContext, useEffect, useMemo } from 'react'

import Notification from '../components/ui/notification'
import Modal from '../components/util/modal'

export const NotificationContext = React.createContext()

export function useNotification() {
    return useContext(NotificationContext)
}

export default function NotificationProvider({ children }) {
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState('')
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(null)

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
        loading,
        setModal
    }), [setMessage, setStatus, setLoading, loading, setModal])

    return (
        <NotificationContext.Provider value={context} >
            {children}
            <Notification message={message} status={status} />
            <Modal open={modal} close={() => setModal(null)}>{modal}</Modal>
        </NotificationContext.Provider>
    )
}