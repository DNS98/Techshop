import express from 'express'
import Produs from '../models/Produs.js';
const produsRoutes = express.Router();


const getProduse = async (req, res) => {
    const produse = await Produs.find({});
    res.json(produse)
}


produsRoutes.route('/').get(getProduse);

export default produsRoutes