import axios from 'axios'
import { setLoading, setError, userLogin, userLogout, updateUserProfil, resetUpdate, setUserOrders } from '../slices/user';

//actiunea login
export const login = (email, password) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json', 
            },
        } 
     
        const {data} = await axios.post('/api/users/login', {email, password}, config);
        dispatch(userLogin(data))
        localStorage.setItem('userInfo', JSON.stringify(data));

     } catch (error) {
        dispatch(
            setError(
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message 
                ? error.message 
                : "Eroare neasteptata incearca mai tarziu."
            )
        );
     }
};

//actiunea logout
export const logout = () => (dispatch) => {
    
    localStorage.removeItem('userInfo');
    dispatch(userLogout());
}
//actiune inregistrare
export const inregistrare = (nume, email, password) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json', 
            },
        } 
     
        const {data} = await axios.post('/api/users/inregistrare', {nume, email, password}, config);
        dispatch(userLogin(data))
        localStorage.setItem('userInfo', JSON.stringify(data));

     } catch (error) {
        dispatch(
            setError(
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message 
                ? error.message 
                : "Eroare neasteptata incearca mai tarziu."
            )
        );
     }
}
//actiunea de actializare profil
export const updateProfil = (id, nume, email, password) => async (dispatch, getState) => {
    const {
        user: {userInfo}, 
    } = getState();

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
                'Content-Type': 'application/json', 
            },
        };
        const {data} = await axios.put(`/api/users/profil/${id}`, {_id: id, nume, email, password}, config);
        localStorage.setItem('userInfo', JSON.stringify(data));
        dispatch(updateUserProfil(data))
    } catch (error) {
        dispatch(
            setError(
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message 
                ? error.message 
                : "Eroare neasteptata incearca mai tarziu."
            )
        );
    }
}

export const resetUpdateSuccess = () => async(dispatch) => {
    dispatch(resetUpdate());
}
// actiunea pentru afisare a comenzilor uilizatorului
export const getUserOrders = () => async(dispatch, getState) => {
    dispatch(setLoading(true))
    const {
        user: {userInfo}, 
    } = getState();

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
                'Content-Type': 'application/json', 
            },
        };
        const {data} = await axios.get(`/api/users/${userInfo._id}`, config)
        dispatch(setUserOrders(data));
    } catch (error) {
        dispatch(
            setError(
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message 
                ? error.message 
                : "Eroare neasteptata incearca mai tarziu."
            )
        );
    }
}