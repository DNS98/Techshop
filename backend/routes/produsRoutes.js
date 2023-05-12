import express from 'express'
import Produs from '../models/Produs.js';

const produsRoutes = express.Router();


const getProduse = async (req, res) => {
    const produse = await Produs.find({});
    res.json(produse)
}

const getProdus = async(req, res) => {
    const produs = await Produs.findById(req.params.id);

    if(produs) {
        res.json(produs);
    } else {
        res.status(404);
        throw new Error('Produsul nu a fost gasit')
    }
};


produsRoutes.route('/').get(getProduse);
produsRoutes.route('/:id').get(getProdus);

export default produsRoutes