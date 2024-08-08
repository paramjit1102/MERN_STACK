import { Server } from "socket.io"
import http from "http";
import express from 'express';
const app = express();
const url = process.env.BASE_URL
// const url = 'https://chat-app-5xd6.onrender.com'
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: [url],
        methods: ['get', 'post']
    }
})
export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

const userSocketMap = {}
io.on("connection", (socket) => {
    console.log("a user connected", socket.id)
    const userId = socket.handshake.query.userId;
    if (userId != "undefined") userSocketMap[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(userSocketMap))
    socket.on("disconnect", () => {
        console.log("user disconnected")
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

export { app, io, server }