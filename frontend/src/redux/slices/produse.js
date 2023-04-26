import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    loading: false,
    error: null,
    produse: [],

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
       setError: (state, {payload}) => {
        state.error = payload;
        state.loading = false;
       },
    },
});

export const {setLoading, setError, setProduse} = produseSlice.actions;
export default produseSlice.reducer;

export const produseSetlector = (state) => state.produse;