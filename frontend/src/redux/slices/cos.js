import { createSlice } from '@reduxjs/toolkit';

//calculare subtoatal
const calculareSubtotal = (cosState) => {
  let result = 0;
  cosState.map((item) => (result += item.cant * item.pret));
  return Number(result).toFixed(2);
};
// starea initiala a cosului
export const initialState = {
  loading: false,
  error: null,
  cos: JSON.parse(localStorage.getItem('cosItems')) ?? [], //converteste JSON cosItems din local storage intrun obiect JS cos
  expressShipping: JSON.parse(localStorage.getItem('expressShipping')) ?? false,
  subtotal: localStorage.getItem('cosItems') ? calculareSubtotal(JSON.parse(localStorage.getItem('cosItems'))) : 0, //verifica daca este ceva in cos daca da calculeaza subtotalul daca nu 0
};
// update local storage si converteste prin metoda JSON.stringify intrun format JSON
const updateLocalStorage = (cos) => {
  localStorage.setItem('cosItems', JSON.stringify(cos));
  localStorage.setItem('subtotal', JSON.stringify(calculareSubtotal(cos)));
};

export const cosSlice = createSlice({
  name: 'cos',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    // metoda pentru a adauga in cos
    cosItemAdd: (state, { payload }) => {
      const itemExist = state.cos.find((item) => item.id === payload.id);

      if (itemExist) {
        state.cos = state.cos.map((item) => (item.id === itemExist.id ? payload : item));
      } else {
        //payload este adăugat în cos folosind operatorul spread fara a modifica starea initiala
        state.cos = [...state.cos, payload];
      }
      state.loading = false;
      state.error = null;
      updateLocalStorage(state.cos);
      state.subtotal = calculareSubtotal(state.cos);
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    cosItemRemoval: (state, { payload }) => {
      state.cos = [...state.cos].filter((item) => item.id !== payload);
      updateLocalStorage(state.cos);
      state.subtotal = calculareSubtotal(state.cos);
      state.loading = false;
      state.error = null;
    },
    setExpressShipping: (state, { payload }) => {
      state.expressShipping = payload;
      localStorage.setItem('expressShipping', payload);
    },
    clearCos: (state) => {
      localStorage.removeItem('cosItems');
      state.cos = [];
    },
  },
});

export const { setLoading, setError, cosItemAdd, cosItemRemoval, clearCos, setExpressShipping } = cosSlice.actions;
export default cosSlice.reducer;

export const cosSelector = (state) => state.cos;
