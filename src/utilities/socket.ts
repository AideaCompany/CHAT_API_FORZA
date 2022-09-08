import { Server as WebSocketServer } from 'socket.io'
import http from 'http'

let io: WebSocketServer
export default {
  init: (httpServer: http.Server) => {
    return (io = new WebSocketServer(httpServer))
  },

  getIO: (): WebSocketServer => {
    if (!io) {
      throw new Error('Socket.io is not initialized')
    }
    return io
  }
}
