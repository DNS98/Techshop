import jwt from 'jsonwebtoken'
import asyncHandler  from 'express-async-handler';
import User from '../models/User.js';


const securitateRoute = asyncHandler(async(req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decodificat = jwt.verify(token, process.env.TOKEN_SECRET)

            req.user = User.findById(decodificat.id)
            next();
        } catch(error) {
            res.status(401)
            throw new Error('Neautorizat, token gresit.')
        }
    } 

    if(!token) {
        res.status(401)
        throw new Error('Neautorizat, nu este token.') 
    }
})

export default securitateRoute;