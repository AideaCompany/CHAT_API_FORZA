"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
let io;
exports.default = {
    init: (httpServer) => {
        return (io = new socket_io_1.Server(httpServer));
    },
    getIO: () => {
        if (!io) {
            throw new Error('Socket.io is not initialized');
        }
        return io;
    }
};
//# sourceMappingURL=socket.js.map