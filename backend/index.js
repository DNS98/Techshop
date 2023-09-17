import dotenv from 'dotenv';
dotenv.config();
import connectToDatabase from './database.js';
import express from 'express';
import path from 'path';

//Rutele aplicatiei
import produsRoutes from './routes/produsRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();
connectToDatabase();
const app = express();

/*utilizarea rutelor*/
app.use(express.json());
app.use('/api/produse', produsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
//ruta paypal
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

const port = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV == 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')));
}

app.listen(port, () => {
  console.log(`Port ${port}`);
});
