import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    loading: false,
    error: null,
    produse: [],
    produs: null,
    reviewSend: false,
}

export const produseSlice = createSlice({
    name: 'produse',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true;
        },
        setProduse: (state, {payload}) => {
            state.loading = false;
            state.error = null;
            state.produse = payload
        },
        setProdus: (state, {payload}) => {
            state.produs = payload;
            state.loading = false;
            state.error = null;
        },
        setError: (state, {payload}) => {
        state.error = payload;
        state.loading = false;
       },
       produsReviewed: (state) => {
        state.loading = false;
        state.error = null;
        state.reviewSend = true;
       },
       resetError: (state) => {
        state.error = null;
        state.reviewSend = false;
       }
    },
});

export const {setLoading, setError, setProduse, setProdus, produsReviewed, resetError} = produseSlice.actions;
export default produseSlice.reducer;

export const produseSelector = (state) => state.produse;