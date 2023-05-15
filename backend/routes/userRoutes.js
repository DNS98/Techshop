import express from 'express';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import securitateRoute from '../Middleware/authMiddleware.js';

const userRoutes = express.Router();

// expiersIn trebuie modificat dupa terminarea proiectului.
const genToken = (id) => {
    return jwt.sign( { id }, process.env.TOKEN_SECRET, { expiresIn: '60d' })
}

//Post Login User
const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if(user && (await user.matchPasswords(password))) {
        res.json({
            _id: user._id,
            nume: user.nume,
            email: user.email,
            isAdmin: user.isAdmin,
            token: genToken(user._id),
            createdAt: user.createdAt,
        })
    } else { 
        res.status(401);
        throw new Error('Email sau parola gresita!')
    }
});
// Post Inregistrare User
const inregistrareUser = asyncHandler(async(req, res) => {
    const { nume, email, password} = req.body;

    const userExist = await User.findOne({ email });
    if(userExist) {
        res.status(400);
        throw new Error('Adresa de email a fost deja utilizata.');
    }

    const user = await User.create({
        nume, 
        email,
        password,
    });

    if(user) {
        res.status(201).json({
            _id: user._id,
            nume: user.nume,
            email: user.email,
            isAdmin: user.isAdmin,
            token: genToken(user._id),
        });
    } else {
        res.json(400)
        throw new Error('Date de autentificare gresite');
    }
});

const updateUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);

    if(user) {
        user.nume = req.body.nume || user.nume;
        user.email = req.body.email || user.email;
        if(req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            nume: updatedUser.nume,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: genToken(updatedUser._id),
            createdAt: updatedUser.createdAt,
        })
    } else {
        res.status(404) 
        throw new Error('User-ul nu exista.')
    }
}) 

userRoutes.route('/login').post(loginUser);
userRoutes.route('/inregistrare').post(inregistrareUser);
userRoutes.route('/profil/:id').put(securitateRoute, updateUserProfile);

export default userRoutes