import express from 'express';
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import cors from "cors";
const app = express()


app.use(cors());
app.use(express.json());

import bookRouter from "./routes/book.routes.js";
import userRouter from './routes/user.routes.js';

dotenv.config()

//defing the routes
app.use("/books", bookRouter);

app.use('/user', userRouter);



connectDB()
.then(() => {
    app.listen(process.env.PORT || 4001, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})
