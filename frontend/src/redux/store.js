import {combineReducers, configureStore} from '@reduxjs/toolkit'

import produse from './slices/produse';
import cos from './slices/cos'
import user from './slices/user';
import order from './slices/order';
import admin from './slices/admin';

const reducer = combineReducers({   
    produse,
    cos,
    user,
    order,
    admin,
});

export default configureStore({
    reducer,
});