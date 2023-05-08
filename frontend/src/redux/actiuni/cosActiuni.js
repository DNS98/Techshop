import axios from 'axios'
import { setLoading, setError, cosItemAdd, cosItemRemoval} from '../slices/cos'

export const addCosItem = (id, cant) => async (dispatch) => {
    dispatch(setLoading(true));
    try{
        const {data} = await axios.get(`/api/produse/${id}`)
        const itemToAdd = {
            id: data._id,
            nume: data.nume,
            image: data.image,
            pret: data.pret,
            stoc: data.stoc,
            cant,
        };
        dispatch(cosItemAdd(itemToAdd));
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
    };
};

export const removeCosItem = (id) => async (dispatch) => {
    dispatch(setLoading(true))
    dispatch(cosItemRemoval(id));
}