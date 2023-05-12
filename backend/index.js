import dotenv from 'dotenv'
import connectToDatabase from './database.js'
import express from 'express';

//Rute
import produsRoutes from './routes/produsRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
connectToDatabase();
const app = express();

app.use(express.json());

const port = process.env.PORT || 5000

app.use('/api/produse', produsRoutes)
app.use('/api/users', userRoutes);

app.listen(port, () => {
    console.log(`Port ${port}`);
});