/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response } from 'express';
import path from 'path';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';

const app = express();

app.use(cors());

// app.get('/api/', (req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
// });

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // クライアントのオリジン
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('message', (messageText: string) => {
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

function hashSocketIdToNumber(socketId: string) {
  let hash = 0;
  for (let i = 0; i < socketId.length; i++) {
    hash = (hash + socketId.charCodeAt(i)) % 10; // 0 から 9 の数字を返す
  }
  return hash;
}

function getAvatarUrlBySocketId(socketId: string) {
  const number = hashSocketIdToNumber(socketId);
  return `https://cdn-icons-png.flaticon.com/512/147/14714${number}.png`;
}
