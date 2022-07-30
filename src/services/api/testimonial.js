import axios from 'axios'
import { setBaseUrl } from "../../utils/setBaseUrl";

const baseUrl = setBaseUrl()

const customAxios = axios.create({
    timeout:5000
})

// add new testimonial
const postNewTestimonial = async (details) => {
    try {
        const token = localStorage.getItem('iUserToken')
        await customAxios.post(`${baseUrl}testimonials`, details, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}


// update show property of a testimonial
const updateTestimonialShow = async (testimonialId) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await customAxios.patch(`${baseUrl}testimonials/${testimonialId}/show`, {}, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data:res.data.data}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}


// get all testimonials
const getTestimonials = async (queryString) => {
    try {
        // const token = localStorage.getItem('iUserToken')
        const res = await customAxios.get(`${baseUrl}testimonials?${queryString}`)
        return {ok: true, data:res.data.data}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}

// get single testimonial 
const getSingleTestimonial = async (testimonialId) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await customAxios.get(`${baseUrl}testimonials/${testimonialId}`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data:res.data.data}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}

// delete a testimonial by id
const deleteTestimonial = async (testimonialId) => {
    try {
        const token = localStorage.getItem('iUserToken')
        await customAxios.delete(`${baseUrl}testimonials/${testimonialId}`, {
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
    postNewTestimonial, updateTestimonialShow, getTestimonials, getSingleTestimonial, deleteTestimonial

}