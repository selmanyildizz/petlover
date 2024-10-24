const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // React uygulamanın çalıştığı adres
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('Yeni bir kullanıcı bağlandı:', socket.id);   

  // Kullanıcıdan gelen mesajı al ve herkese gönder
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // Mesajı herkese gönder
  });

  socket.on('disconnect', () => {
    console.log('Kullanıcı ayrıldı:', socket.id);
  });
});

server.listen(4000, () => {
  console.log('Sunucu 4000 portunda çalışıyor');
});
