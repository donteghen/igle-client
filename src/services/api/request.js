import axios from 'axios'
import { setBaseUrl } from "../../utils/setBaseUrl";

const baseUrl = setBaseUrl()

// add new project request
const addNewProjectRequest = async (projectId, details) => {
    console.log('posting request')
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await axios.post(`${baseUrl}projects/${projectId}/requests`, details, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data: res.data.data}
    } catch (error) {
        console.log(error)
        return {ok: false, errorMessage:error.response.data.error}
    }
}

// get all user's specific project request list
const getAllUserProjectRequests = async (projectId) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await axios.get(`${baseUrl}user/profile/projects/${projectId}/requests`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data: res.data.data}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}

// get all  current user's request list
const getUserRequests = async (queryString) => {
    console.log(queryString, 'in user request service')
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await axios.get(`${baseUrl}user/profile/requests?${queryString}`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data: res.data.data}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}

// get single user's specific project request detail
const getSingleUserProjectRequest = async (projectId, requestId) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await axios.get(`${baseUrl}user/profile/projects/${projectId}/requests/${requestId}`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data: res.data.data}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}

// get all  project's request list
const getAllRequests = async (queryString) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await axios.get(`${baseUrl}requests?${queryString}`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data: res.data.data}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}

// get a single  project's request details
const getSingleRequest = async (requestId) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await axios.get(`${baseUrl}requests/${requestId}`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data: res.data.data}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}

// update request status by admin
const updateRequestStatus = async (requestId, newStatus) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await axios.patch(`${baseUrl}requests/${requestId}/update-status`, {newStatus}, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data: res.data.data}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}

// delete request by admin
const deleteRequest = async (requestId) => {
    try {
        const token = localStorage.getItem('iUserToken')
        await axios.delete(`${baseUrl}requests/${requestId}/delete`, {
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
    addNewProjectRequest, getAllUserProjectRequests, getSingleUserProjectRequest, getAllRequests,
    getSingleRequest, updateRequestStatus, deleteRequest, getUserRequests
}