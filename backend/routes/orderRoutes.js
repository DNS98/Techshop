import express from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import securitateRoute from '../Middleware/authMiddleware.js';


const orderRoutes = express.Router();

const createOrder = asyncHandler(async (req, res) => {
    const {orderItems, shippingAddress, paymentMethod, shippingPrice, paymentDetails, totalPrice, userInfo} = req.body;

    if(orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('Comanda goala')
    } else {
        const order = new Order({
            orderItems,
            user: userInfo._id,
            username: userInfo.nume,
            email: userInfo.email,
            shippingAddress,
            paymentMethod,
            paymentDetails,
            shippingPrice,
            totalPrice,
        });
        const createdOrder = await order.save();
        res.status(201).json(createdOrder)
    }
})

orderRoutes.route('/').post(securitateRoute, createOrder)

export default orderRoutes;


