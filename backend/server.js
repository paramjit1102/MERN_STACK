import dotenv from "dotenv"
import express from 'express';
import http from 'http'
import cookieParser from 'cookie-parser'
import connectDB from "./db/connectToMongoDB.js";
import authroutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
const app = express();

dotenv.config()

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser())

app.use('/api/auth', authroutes)
app.use('/api/messages', messageRoutes)
app.get('/', (req, res) => {
    res.send("hello 8000")
})

connectDB()
    .then(() => {
        app.server = http.createServer(app)
        app.server.listen(process.env.PORT || 5000, (res, err) => {
            console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    })
