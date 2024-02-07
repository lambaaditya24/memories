import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import postRoutes from './routes/posts.js';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));
app.use(cors());


app.use('/posts',postRoutes);
app.use('/user', userRoutes);


// connceting to mongodb cloud database, returning a promise
mongoose.connect(process.env.CONNECTION_URL)
    .then(()=>{
        app.listen(PORT,()=>{
            console.log(`Server running on port: ${PORT}`);
        })
    })
    .catch((error)=>{
        console.log(error.message);
    });

