/* eslint-disable object-shorthand */
import axios from 'axios'
import {FETCH_USER, LOG_IN_USER, LOG_OUT_USER, SIGN_UP_USER, UPDATE_USER_PROFILE, UPLOAD_USER_AVATAR, CHANGE_USER_PASSWORD} from '../types'


import { setBaseUrl } from '../../utils/setBaseUrl'


const apiUrl = setBaseUrl()

const customAxios = axios.create({
    timeout:3000
})

export const fetchUser = () => async (dispatch) => {

    try { 
        const token = localStorage.getItem('iUserToken')
        const res = await customAxios.get(`${apiUrl}user/profile`, {
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
        const res = await customAxios.post(`${apiUrl}users/signup`, userDetails)
        localStorage.setItem('iUserToken', res.data.data.generatedToken) 
        dispatch({type:SIGN_UP_USER, payload:res.data.data.user})
        return {ok:true}
    } catch (error) {
        return {ok:false, errorMessage:error.response.data.error}
    }
}

export const loginUser = (loginDetails) => async (dispatch) => {
    try {
        const res = await customAxios.post(`${apiUrl}users/login`, loginDetails)
        localStorage.setItem('iUserToken', res.data.data.token) 
        dispatch({type:LOG_IN_USER, payload: res.data.data.user})
        return {ok: true}
    } catch (error) {
        return {ok:false, errorMessage:error.response.data.error}
    }
}

export const changeUserPassword = (details) => async (dispatch) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await customAxios.post(`${apiUrl}user/profile/change-password`, details, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        localStorage.setItem('iUserToken', res.data.data.token) 
        dispatch({type:CHANGE_USER_PASSWORD, payload: res.data.data})
        return {ok: true}
    } catch (error) {
        return {ok:false, errorMessage:error.response.data.error}
    }
}

export const logoutUser = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('iUserToken')
        await customAxios.post(`${apiUrl}user/profile/logout`,{}, {
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
        const res = await customAxios.post(`${apiUrl}user/profile/avatar`, formData, {
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
                'Accept' : 'multipart/form-data'
            }
        });
        
        dispatch({type : UPLOAD_USER_AVATAR, payload : res.data.data});
        return {ok:true}
    } catch (error) {
        return {ok:false, errorMessage:error.response.data.error}
    }
}

export const updateUser = (userDetails) => async (dispatch) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await customAxios.patch(`${apiUrl}user/profile/update`, userDetails, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });
        dispatch({type : UPDATE_USER_PROFILE, payload : res.data.data})
        return {ok:true}
    } catch (error) {
        return {ok:false, errorMessage:error.response.data.error}
    }
}