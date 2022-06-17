import axios from 'axios'
import { setBaseUrl } from "../../utils/setBaseUrl";

const baseUrl = setBaseUrl()

// add new project request
const postNewContactMessage = async (details) => {
    try {
        const token = localStorage.getItem('iUserToken')
        await axios.post(`${baseUrl}contacts`, details, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}


// mark contact message as replied
const markContactMessageAsReplied = async (contactMessageId) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await axios.patch(`${baseUrl}contacts/${contactMessageId}/replied`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data:res.data.data}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}


// get all contact messages
const getAllContactMessage = async (queryString) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await axios.get(`${baseUrl}contacts?${queryString}`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data:res.data.data}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}

// get single contact message details
const getSingleContactMessage = async (contactMessageId) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await axios.get(`${baseUrl}contacts/${contactMessageId}`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data:res.data.data}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}

// delete contact message 
const deleteContactMessage = async (contactMessageId) => {
    try {
        const token = localStorage.getItem('iUserToken')
        await axios.delete(`${baseUrl}contacts/${contactMessageId}`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}
export {
    postNewContactMessage, markContactMessageAsReplied, getAllContactMessage, getSingleContactMessage, deleteContactMessage

}