import dotenv from "dotenv"
import express from 'express';
import http from 'http'
import cookieParser from 'cookie-parser'
import connectDB from "./db/connectToMongoDB.js";
import authroutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import bodyParser from 'body-parser'
import cors from 'cors'
const app = express();

dotenv.config()
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.json({ limit: "16kb" }))
app.use(jsonParser)
app.use(urlencodedParser)
app.use(cors())
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser())
app.use('/api/auth', authroutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)
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
