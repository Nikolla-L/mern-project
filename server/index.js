import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30bm", extended: true}));
app.use(cors());
app.use('/user', userRoutes);
app.use('/posts', postRoutes);

const connection_url = process.env.CONNECTION_URl;
const port = process.env.PORT || 3001;


mongoose.connect(connection_url)
    .then(() => app.listen(port, () => console.log(`Server is running on ${port}`)))
    .catch((err) => console.log(err.message));