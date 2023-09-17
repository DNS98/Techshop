import axios from 'axios';
import { setLoading, setError, cosItemAdd, cosItemRemoval, setExpressShipping, clearCos } from '../slices/cos';

// Actiunea de adaugare in cos
export const addCosItem = (id, cant) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(`/api/produse/${id}`);
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
          : 'Eroare neasteptata incearca mai tarziu.'
      )
    );
  }
};
// actiunea de a sterge produsu din cos
export const removeCosItem = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(cosItemRemoval(id));
};

// actiune de a seta livrare express
export const setExpress = (value) => async (dispatch) => {
  dispatch(setExpressShipping(value));
};
// resetare cos
export const resetCos = () => (dispatch) => {
  dispatch(clearCos());
};
