import express from 'express';
import Produs from '../models/Produs.js';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import { securitateRoute, admin } from '../Middleware/authMiddleware.js';

const produsRoutes = express.Router();
//GET produse
const getProduse = async (req, res) => {
  const produse = await Produs.find({});
  res.json(produse);
};
//GET Produs
const getProdus = async (req, res) => {
  const produs = await Produs.findById(req.params.id);

  if (produs) {
    res.json(produs);
  } else {
    res.status(404);
    throw new Error('Produsul nu a fost gasit');
  }
};
//POST Creare review 
const createProdusReview = asyncHandler(async (req, res) => {
  const { rating, comentariu, userId, titlu } = req.body;

  const produs = await Produs.findById(req.params.id);

  const user = await User.findById(userId);

  if (produs) {
    const alreadyReviewed = produs.reviews.find((rev) => rev.user.toString() === user._id.toString());

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Ati postat deja un review la acest produs.');
    }

    const review = {
      nume: user.nume,
      rating: Number(rating),
      comentariu,
      titlu,
      user: user._id,
    };

    produs.reviews.push(review);

    produs.numReviews = produs.reviews.length;

    produs.rating = produs.reviews.reduce((acc, item) => item.rating + acc, 0) / produs.reviews.length;
    await produs.save();
    res.status(201).json({ message: 'Review-ul a fost salvat' });
  } else {
    res.status(404);
    throw new Error('Produsul nu exista');
  }
});

// POST creare produs
const createNewProdus = asyncHandler(async (req, res) => {
  const { brand, nume, categorie, stoc, pret, image, produsIsNew, descriere } = req.body;
  const newProdus = await Produs.create({
    brand,
    nume,
    categorie,
    stoc,
    pret,
    image: 'image/' + image,
    produsIsNew,
    descriere,
  });
  await newProdus.save();

  const produse = await Produs.find({});

  if (newProdus) {
    res.json(produse);
  } else {
    res.status(404);
    throw new Error('Produsul nu a putut fi uploadat.');
  }
});

//DELETE sterge produs
const deleteProdus = asyncHandler(async (req, res) => {
  const produs = await Produs.findByIdAndDelete(req.params.id);

  if (produs) {
    res.json(produs);
  } else {
    res.status(404);
    throw new Error('Produsul nu exista');
  }
});

//PUT actualizare produs
const updateProdus = asyncHandler(async (req, res) => {
  const { brand, nume, image, categorie, stoc, pret, id, produsIsNew, descriere } = req.body;

  const produs = await Produs.findById(id);

  if (produs) {
    produs.nume = nume;
    produs.pret = pret;
    produs.descriere = descriere;
    produs.brand = brand;
    produs.image = '/images/' + image;
    produs.categorie = categorie;
    produs.stoc = stoc;
    produs.produsIsNew = produsIsNew;

    const updatedProdus = await produs.save();
    res.json(updatedProdus);
  } else {
    res.status(404);
    throw new Error('Produsul nu exista');
  }
});
//PUT sterge user review
const removeProdusReview = asyncHandler(async(req, res) => {
  const produs = await Produs.findById(req.params.produsId)

  const updatedReviews = produs.reviews.filter((rev) => rev._id.valueOf() !== req.params.reviewId)

  if (produs) {
    produs.reviews = updatedReviews;

    produs.numReviews = produs.reviews.length

    if(produs.numReviews > 0) {
      produs.rating = produs.reviews.reduce((acc, item) => item.rating + acc, 0) / produs.reviews.length;
    } else {
      produs.rating = 1;
    }

    await produs.save(); 
    res.status(201).json({message: "Review sters"})
  } else {
    res.status(404)
    throw new Error('Produsul nu exista')
  }
})

produsRoutes.route('/').get(getProduse);
produsRoutes.route('/:id').get(getProdus);
produsRoutes.route('/reviews/:id').post(securitateRoute, createProdusReview);
produsRoutes.route('/').put(securitateRoute, admin, updateProdus);
produsRoutes.route('/:id').delete(securitateRoute, admin, deleteProdus);
produsRoutes.route('/').post(securitateRoute, admin, createNewProdus);
produsRoutes.route('/:produsId/:reviewId').put(securitateRoute, admin, removeProdusReview)

export default produsRoutes;
