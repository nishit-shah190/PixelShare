import * as api from '../api';
import { AUTH } from '../constants/actionType';

export const signIn = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData)
        console.log(data);
        dispatch({type: AUTH, data})
        history.push('/')
    } catch (error) {
        console.log(error);
    }
};


export const signUp = (formData, history) => async (dispatch) => {
    try {
        console.log(formData);
        const { data } = await api.signUp(formData)
        console.log(data);
        dispatch({type: AUTH, data})
        history.push('/')
    } catch (error) {
        console.log(error);
    }
};

