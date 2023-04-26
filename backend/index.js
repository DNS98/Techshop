import dotenv from 'dotenv'
import connectToDatabase from './database.js'
import express from 'express';

//Rute
import produsRoutes from './routes/produsRoutes.js';


dotenv.config();
connectToDatabase();
const app = express();

app.use(express.json());

const port = process.env.PORT || 5000

app.use('/api/produse', produsRoutes)

app.listen(port, () => {
    console.log(`Port ${port}`);
});