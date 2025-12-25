import {Server} from 'socket.io';
import {createServer} from 'http';
import express from 'express';

const app = express();

const httpServer = createServer(app);

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    "https://chatify-frontend.vercel.app",
    "https://chatify-backend-7ykk.onrender.com",
    process.env.FRONTEND_URL
].filter(Boolean);

const io = new Server(httpServer, {
    cors: {
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
            return callback(null, true); // permissive for dev/ws
        },
        methods: ["GET", "POST"],
        credentials: true
    },
    transports: ["websocket", "polling"]
});

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

// used to store online users
const userSocketMap = {}  // {userId: socketId}


io.on('connection', (socket) => {
    console.log('A user connected');

    const userId = socket.handshake.query.userId;
    if(userId) userSocketMap[userId] = socket.id;

    // io.emit is used to send events to all connected clients..(send online users to all clients)
    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect', () => {
        console.log('A user disconnected');
        delete userSocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    })
    
})

export {app, io, httpServer};