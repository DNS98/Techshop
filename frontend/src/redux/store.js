import {combineReducers, configureStore} from '@reduxjs/toolkit'

import produse from './slices/produse';

const reducer = combineReducers({   
    produse,
});

export default configureStore({
    reducer,
});