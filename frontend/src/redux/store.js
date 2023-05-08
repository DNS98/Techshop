import {combineReducers, configureStore} from '@reduxjs/toolkit'

import produse from './slices/produse';
import cos from './slices/cos'

const reducer = combineReducers({   
    produse,
    cos
});

export default configureStore({
    reducer,
});