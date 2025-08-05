import express from 'express'
import path from 'path'
import Static from './routes/static.js';
import cookieParser from 'cookie-parser';
import AuthenticateToken from "./middelware/auth.js"
import User from './routes/user.js';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { PORT } from './env.js';

const app = express();
const port = PORT;

mongoose.connect("mongodb://127.0.0.1:27017/fundraiser").then(() => console.log("mongodb is connected")).catch((error) => console.log(error))


app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(AuthenticateToken("token"));


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname,"public")));



app.use("/",Static);
app.use("/user",User);

app.listen(port,() => console.log(`Server is runing at the port: ${port}`))
