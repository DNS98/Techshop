import {combineReducers, configureStore} from '@reduxjs/toolkit'

import produse from './slices/produse';
import cos from './slices/cos'
import user from './slices/user';
import order from './slices/order';

const reducer = combineReducers({   
    produse,
    cos,
    user,
    order,
});

export default configureStore({
    reducer,
});