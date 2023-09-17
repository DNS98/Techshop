import axios from 'axios';

import { setProduse, setLoading, setError, setProdus, produsReviewed, resetError } from '../slices/produse';
//actiunea de afisare a produselor
export const getProduse = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get('/api/produse');
    dispatch(setProduse(data));
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
//actiunea de afsare a produsului
export const getProdus = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(`/api/produse/${id}`);
    dispatch(setProdus(data));
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
// actiunea de creare a reviewului
export const createProdusReview = (produsId, userId, comentariu, rating, titlu) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const {
    user: { userInfo },
  } = getState();

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      `/api/produse/reviews/${produsId}`,
      { comentariu, userId, rating, titlu },
      config
    );
    localStorage.setItem('userInfo', JSON.stringify(data));
    dispatch(produsReviewed(data));
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
// actiunea de resetare eroare
export const resetProdusError = () => async (dispatch) => {
  dispatch(resetError());
};
