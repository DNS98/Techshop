import axios from 'axios';
import { getUsers, userDelete, resetError, setError, setLoading, orderDelete, setDeliveredFlag, getOrders } from '../slices/admin';

export const getAllUsers = () => async (dispatch, getState) => {
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
    const { data } = await axios.get('/api/users', config);
    dispatch(getUsers(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : 'Utilizatorii nu au fost gasiti'
      )
    );
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
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
    const { data } = await axios.delete(`/api/users/${id}`, config);
    dispatch(userDelete(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : 'Utilizatorul nu a putut fi sters'
      )
    );
  }
};

export const getAllOrders = () => async (dispatch, getState) => {
  dispatch(setLoading(true))
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
    const { data } = await axios.get('/api/orders', config);
    dispatch(getOrders(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : 'Comenzile nu au fost gasite'
      )
    );
  }
};

export const deleteOrder = (id) => async (dispatch, getState) => {
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
    const { data } = await axios.delete(`/api/orders/${id}`, config);
    dispatch(orderDelete(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : 'Comanda nu a putut fi stearsa'
      )
    );
  }
};

export const setDelivered = (id) => async (dispatch, getState) => {
  dispatch(setLoading(true))
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
    await axios.put(`/api/orders/${id}`, {}, config);
    dispatch(setDeliveredFlag());
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : 'Comanda nu a putut fi actualizata'
      )
    );
  }
};



export const resetErrorAndRemoval = () => async (dispatch) => {
  dispatch(resetError());
};
