import axios from 'axios'
import { setBaseUrl } from "../../utils/setBaseUrl";

const baseUrl = setBaseUrl()

const customAxios = axios.create({
    timeout:5000
})

// add new report for a project
const addNewProjectReport = async (projectId, details) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await customAxios.post(`${baseUrl}projects/${projectId}/reports`, details, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data: res.data.data}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}


// get all projects with or without query string
const getAllReportsByAdmin = async (queryString) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await customAxios.get(`${baseUrl}reports?${queryString}`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data: res.data.data}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}

// get all project's reports by admin
const getAllProjectsReportsByAdmin = async (projectId) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await customAxios.get(`${baseUrl}projects/${projectId}/reports`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data: res.data.data}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}

// get all project's reports by admin
const previewReportByAdmin = async (reportId) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await customAxios.get(`${baseUrl}reports/${reportId}`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data: res.data.data}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}

// get a single report by admin
const getSingleReportByAdmin = async (reportId) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await customAxios.get(`${baseUrl}reports/${reportId}`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data: res.data.data}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}

// get all projects reports by user
const getAllProjectReports = async (projectId) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await customAxios.get(`${baseUrl}user/profile/projects/${projectId}/reports`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data: res.data.data}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}

// get a single project's report by user
const getSingleProjectReport = async (projectId, reportId) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await customAxios.get(`${baseUrl}user/profile/projects/${projectId}/reports/${reportId}`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data: res.data.data}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}

// dispatch report update alert to user
const dispatchReportUpdateAlert = async (reportId) => {
    try {
        const token = localStorage.getItem('iUserToken')
        await customAxios.post(`${baseUrl}reports/${reportId}`, {}, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}

// delete project's report by admin
const deleteReport = async ( reportId ) => {
    try {
      const token = localStorage.getItem('iUserToken');
      await customAxios.delete(`${baseUrl}reports/${reportId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { ok: true };
    } catch (error) {
      return { ok: false, errorMessage:error.response.data.error };
    }
  };

export  {
    getAllReportsByAdmin, addNewProjectReport, getAllProjectReports, getSingleReportByAdmin,
    getSingleProjectReport, dispatchReportUpdateAlert, deleteReport, getAllProjectsReportsByAdmin,
    previewReportByAdmin
}