import { createSlice } from "@reduxjs/toolkit";

const calculareSubtotal = (cosState) => {
    let result = 0;
    cosState.map((item) => 
        result += item.cant * item.pret
    );
    return Number(result).toFixed(2);
}


export const initialState = {
    loading: false,
    error: null,
    cos: JSON.parse(localStorage.getItem('cosItems')) ?? [], 
    subtotal: localStorage.getItem('cosItems') ? calculareSubtotal(JSON.parse(localStorage.getItem('cosItems'))) : 0,
}

const updateLocalStorage = (cos) => {
    localStorage.setItem('cosItems', JSON.stringify(cos));
    localStorage.setItem('subtotal', JSON.stringify(calculareSubtotal(cos)));
}

export const cosSlice = createSlice({
    name: 'cos',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true;
        },
        cosItemAdd: (state, {payload}) => {
            const itemExist = state.cos.find((item) => item.id === payload.id);

            if(itemExist) {
                state.cos = state.cos.map((item) => item.id === itemExist.id ? payload : item);

            } else {
                state.cos = [...state.cos, payload];
            }
            state.loading = false;
            state.error = null;
            updateLocalStorage(state.cos);
            state.subtotal = calculareSubtotal(state.cos);
        },
       setError: (state, {payload}) => {
        state.error = payload;
        state.loading = false;
       },
       cosItemRemoval: (state, {payload}) => {
        state.cos = [...state.cos].filter((item) => item.id !== payload);
        updateLocalStorage(state.cos);
        state.subtotal = calculareSubtotal(state.cos)
        state.loading = false;
        state.error = null;
       },
    },
});

export const {setLoading, setError, cosItemAdd, cosItemRemoval} = cosSlice.actions;
export default cosSlice.reducer;

export const cosSetlector = (state) => state.cos;