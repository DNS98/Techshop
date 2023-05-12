import {combineReducers, configureStore} from '@reduxjs/toolkit'

import produse from './slices/produse';
import cos from './slices/cos'
import user from './slices/user';

const reducer = combineReducers({   
    produse,
    cos,
    user,
});

export default configureStore({
    reducer,
});