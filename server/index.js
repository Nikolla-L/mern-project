import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';

const app = express();


app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30bm", extended: true}));
app.use(cors());
app.use('/posts', postRoutes);

const connection_url = 'mongodb+srv://nikolla:12341234@nikoloza.84pn3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const port = process.env.PORT || 3001;


mongoose.connect(connection_url)
    .then(() => app.listen(port, () => console.log(`Server is running on ${port}`)))
    .catch((err) => console.log(err.message));