import React from 'react'
import io from 'Socket.IO-client'

fetch('/api/notifications/ws-notifications')
export const socket = io()
export const SocketContext = React.createContext(socket)