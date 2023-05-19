import express from 'express'
import Produs from '../models/Produs.js';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js'
import {securitateRoute} from '../Middleware/authMiddleware.js';

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

const createProdusReview = asyncHandler(async(req, res) => {
    const {rating, comentariu, userId, titlu} = req.body

    const produs = await Produs.findById(req.params.id)

    const user = await User.findById(userId)

    if(produs) {
        const alreadyReviewed = produs.reviews.find((rev) => rev.user.toString() === user._id.toString())

        if(alreadyReviewed) {
           res.status(400);
           throw new Error('Ati postat deja un review la acest produs.') 
        }

        const review = {
            nume: user.nume,
            rating: Number(rating),
            comentariu,
            titlu,
            user: user._id,
        }

        produs.reviews.push(review);

        produs.numReviews = produs.reviews.length;
        
        produs.rating = produs.reviews.reduce((acc, item) => item.rating + acc, 0) / produs.reviews.length
        await produs.save()
        res.status(201).json({message: 'Review-ul a fost salvat'})
    } else {
        res.status(404)
        throw new Error('Produsul nu exista')
    }

})


produsRoutes.route('/').get(getProduse);
produsRoutes.route('/:id').get(getProdus);
produsRoutes.route('/reviews/:id').post(securitateRoute, createProdusReview)

export default produsRoutes