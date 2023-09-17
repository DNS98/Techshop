import axios from 'axios';
import {setError, shippingAddressAdd, clearOrder} from '../slices/order'

export const setShippingAddress = (data) => (dispatch) => {
    dispatch(shippingAddressAdd(data));
}

export const setShippingAddressError = (value) => (dispatch) => {
    dispatch(setError(value));
}
// actiunea pentru creare a comenzii
export const createOrder = (order) => async (dispatch, getState) => {
    const {
        order: {shippingAddress},
        user: {userInfo},      
    } = getState()

    const preparedOrder = {...order, shippingAddress}
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`, 
                'Content-Type': 'application/json', 
            },
        }; 
        const {data} = await axios.post('/api/orders', preparedOrder, config)
    } catch (error) {
        dispatch(
            setError(
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message 
                ? error.message 
                : "Eroare neasteptata incearca mai tarziu."
            )
        );   
    }
}
// resetare comanda
export const resetOrder = () => async(dispatch) => {
    dispatch(clearOrder())
}