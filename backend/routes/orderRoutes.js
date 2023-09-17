import express, { json } from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import {securitateRoute, admin} from '../Middleware/authMiddleware.js';


const orderRoutes = express.Router();
// POST creare comanda
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
// GET afisare comenzi
const getOrders = async(req, res) => {
    const orders = await Order.find({})
    res.json(orders)
};
//DELETE sterge comenzi
const deleteOrder = asyncHandler(async(req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id)

    if(order) {
        res.json(order)
    } else { 
        res.status(404)
        throw new Error('Comanda nu a fost gasita')
    }
})
//PUT livrare comanda
const setDelivered = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id)

    if(order) {
        order.isDelivered = true;
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Comanda nu a putut fi actualizata')
    }
})

orderRoutes.route('/').post(securitateRoute, createOrder)
orderRoutes.route('/:id').delete(securitateRoute, admin, deleteOrder)
orderRoutes.route('/:id').put(securitateRoute, admin, setDelivered)
orderRoutes.route('/').get(securitateRoute, admin, getOrders)


export default orderRoutes;


