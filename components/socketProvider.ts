import React from 'react'
import io from 'socket.io-client'

fetch('/api/notifications/ws-notifications')
export const socket = io()
export const SocketContext = React.createContext(socket)