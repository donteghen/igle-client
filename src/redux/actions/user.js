/* eslint-disable object-shorthand */
import axios from 'axios'
import {FETCH_USER, LOG_IN_USER, LOG_OUT_USER, SIGN_UP_USER, UPDATE_USER_PROFILE, UPLOAD_USER_AVATAR, CHANGE_USER_PASSWORD} from '../types'


import { setBaseUrl } from '../../utils/setBaseUrl'

const apiUrl = setBaseUrl()

export const fetchUser = () => async (dispatch) => {

    try { 
        const token = localStorage.getItem('iUserToken')
        const res = await axios.get(`${apiUrl}user/profile`, {
            headers:{
                'Authorization': `Bearer ${token}`
            },
        });
        dispatch({type : FETCH_USER, payload : res.data.data})
        return {ok:true}
    } catch (error) {
        return {ok:false}
        
    }
}

export const signupUser = (userDetails) => async (dispatch) => {
    try {
        const res = await axios.post(`${apiUrl}users/signup`, userDetails)
        localStorage.setItem('iUserToken', res.data.data.generatedToken) 
        dispatch({type:SIGN_UP_USER, payload:res.data.data.user})
        return {ok:true}
    } catch (error) {
        return {ok:false}
    }
}

export const loginUser = (loginDetails) => async (dispatch) => {
    try {
        const res = await axios.post(`${apiUrl}users/login`, loginDetails)
        localStorage.setItem('iUserToken', res.data.data.token) 
        dispatch({type:LOG_IN_USER, payload: res.data.data.user})
        return {ok: true}
    } catch (error) {
        return {ok:false}
    }
}

export const changeUserPassword = ({oldPasword, newPassword}) => async (dispatch) => {
    try {
        const res = await axios.post(`${apiUrl}user/profile/change-password`, {oldPasword, newPassword})
        localStorage.setItem('iUserToken', res.data.data.token) 
        dispatch({type:CHANGE_USER_PASSWORD, payload: res.data.data})
        return {ok: true}
    } catch (error) {
        return {ok:false}
    }
}

export const logoutUser = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('iUserToken')
        await axios.post(`${apiUrl}users/profile/logout`,{}, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });
        dispatch({type:LOG_OUT_USER, payload: null})
        localStorage.removeItem('iUserToken')
        return {ok:true}
    } catch (error) {
        return {ok:false}
    }
}
export const uploadAvatar = (formData) => async (dispatch) => {
    const token  = localStorage.getItem('iUserToken')

    try {
        const res = await axios.post(`${apiUrl}user/profile/avatar`, formData, {
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
                'Accept' : 'multipart/form-data'
            }
        });
        dispatch({type : UPLOAD_USER_AVATAR, payload : res.data.data});
        return {ok:true}
    } catch (error) {
        return {ok:false}
    }
}

export const updateUser = (userDetails) => async (dispatch) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await axios.patch(`${apiUrl}user/profile/update`, userDetails, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });
        dispatch({type : UPDATE_USER_PROFILE, payload : res.data.data})
        return {ok:true}
    } catch (error) {
        return {ok:false}
    }
}