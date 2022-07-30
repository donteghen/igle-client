import axios from 'axios'
import { setBaseUrl } from "../../utils/setBaseUrl";

const baseUrl = setBaseUrl()

const customAxios = axios.create({
    timeout:5000
})

// resgister a new payment (admin)
const postNewPayment = async (details) => {
    try {
        const token = localStorage.getItem('iUserToken')
        await customAxios.post(`${baseUrl}payments`, details, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}


// update refunded state for a payment (admin)
const markAsRefunded = async (paymentId) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await customAxios.patch(`${baseUrl}payments/${paymentId}/refunded`, {}, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data:res.data.data}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}


// get all payments (admin)
const getAllPayments = async (queryString) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await customAxios.get(`${baseUrl}payments?${queryString}`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data:res.data.data}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}

// get single payment  (admin) 
const getSinglePayment = async (paymentId) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await customAxios.get(`${baseUrl}payments/${paymentId}`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data:res.data.data}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}

// delete a payment by id (admin)
const deletePayment = async (paymentId) => {
    try {
        const token = localStorage.getItem('iUserToken')
        await customAxios.delete(`${baseUrl}payments/${paymentId}`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}
// //////////////////////////////////////// user /////////////////////////////

// get user's project payment
const getUserProjectPayments = async (projectId) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await customAxios.get(`${baseUrl}user/profile/projects/${projectId}/payments`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data:res.data.data}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}

// get user's payment history
const getUserPayments = async () => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await customAxios.get(`${baseUrl}user/profile/payments`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data:res.data.data}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}

// get user's payment detail
const getUserPaymentDetail = async (paymentId) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await customAxios.get(`${baseUrl}user/profile/payments/${paymentId}`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data:res.data.data}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}

export {
    postNewPayment, markAsRefunded, getAllPayments, getSinglePayment, deletePayment, getUserProjectPayments, getUserPayments, getUserPaymentDetail
}