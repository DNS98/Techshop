import axios from 'axios';

import { setProduse, setLoading, setError } from '../slices/produse';


export const getProduse = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const {data} = await axios.get('/api/produse');
        dispatch(setProduse(data));
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
};