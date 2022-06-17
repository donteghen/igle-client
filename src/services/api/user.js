import axios from 'axios'
import { setBaseUrl } from "../../utils/setBaseUrl";

const baseUrl = setBaseUrl()

const getAllUsers = async () => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await axios.get(`${baseUrl}users`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data: res.data.data}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}

// get user by Id 
const getSingleUser = async (userId) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await axios.get(`${baseUrl}users/${userId}`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data: res.data.data}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}


// get delete user by id
const deleteUser = async (userId) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await axios.delete(`${baseUrl}users/${userId}`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data: res.data.data}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}

// user pasword reset initiator function
const userPasswordReset = async(email) => {
    try {
        await axios.post(`${baseUrl}users/reset-password`, {email})
        return {ok: true}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}

// user pasword reset confirmation function
const userPasswordResetComfrimation = async(email, token, password) => {
    try {
        await axios.post(`${baseUrl}users/confirm-reset-password`, {email, token, password})
        return {ok: true}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}

// verify newly registered account
const verifyNewUserAccount = async (userId) => {
    try {
        await axios.patch(`${baseUrl}users/${userId}/verify`)
        return {ok:true}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}
export {
    getAllUsers, getSingleUser, deleteUser, userPasswordResetComfrimation, userPasswordReset, verifyNewUserAccount
}