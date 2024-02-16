import  mongoose  from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import authUserRouter from './Routes/auth.router.js'
import userRouter from './Routes/user.router.js'
import albumRouter from './Routes/albums.routes.js'
import photoRouter from './Routes/photos.router.js'

dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());



mongoose.connect(process.env.MONGO_URI)
mongoose.connection
.once("open",() => console.log("Connected to database"))
.on("error",(e) => console.log(`Error :${e} `))

app.use("/api/auth",authUserRouter)

app.use("/api/users",userRouter)

app.use("/api/albums",albumRouter)

app.use("/api/photos", photoRouter)
app.use("/", (req,res) => {
    return res.json({
        message:"Welcome to the Node.js REST API"
    })
})

app.use((obj,req,res,next) => {
    const statusCode = obj.status || 500;
    const message = obj.message || 'Something went wrong!';
    return res.status(statusCode).json({
        success:[200,201,204].some(a => a === obj.status )? true : false,
        status:statusCode,
        message:message,
        data:obj.data
    })
})

const server= app.listen(process.env.PORT,() => {
    console.log(`App is running on port ${process.env.PORT}`)
})

process.on("unhandledRejection", (error,promise) => {
    console.log(`Logged Error ${error}`);
    server.close(() => process.exit(1))
    s
})