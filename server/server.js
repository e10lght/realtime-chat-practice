"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// app.get('/api/', (req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
// });
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});
io.on('connection', (socket) => {
    console.log('User connected');
    socket.on('message', (messageText) => {
        const message = {
            senderName: socket.id,
            senderAvatar: getAvatarUrlBySocketId(socket.id),
            text: messageText,
            timestamp: new Date().toLocaleTimeString(),
        };
        io.emit('message', message);
    });
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
server.listen(3100, () => {
    console.log('サーバ開始');
});
function hashSocketIdToNumber(socketId) {
    let hash = 0;
    for (let i = 0; i < socketId.length; i++) {
        hash = (hash + socketId.charCodeAt(i)) % 10; // 0 から 9 の数字を返す
    }
    return hash;
}
function getAvatarUrlBySocketId(socketId) {
    const number = hashSocketIdToNumber(socketId);
    return `https://cdn-icons-png.flaticon.com/512/147/14714${number}.png`;
}
