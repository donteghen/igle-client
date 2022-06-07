import axios from 'axios'
import { setBaseUrl } from "../../utils/setBaseUrl";

const baseUrl = setBaseUrl()

// add new report for a project
const addNewProjectReport = async (projectId, details) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await axios.post(`${baseUrl}projects/${projectId}/reports`, details, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data: res.data.data}
    } catch (error) {
        return {ok: false}
    }
}


// get all projects with or without query string
const getAllReportsByAdmin = async (queryString) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await axios.get(`${baseUrl}reports?${queryString}`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data: res.data.data}
    } catch (error) {
        return {ok: false}
    }
}

// get all project's reports by admin
const getAllProjectsReportsByAdmin = async (projectId) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await axios.get(`${baseUrl}projects/${projectId}/reports`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data: res.data.data}
    } catch (error) {
        return {ok: false}
    }
}

// get all project's reports by admin
const previewReportByAdmin = async (reportId) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await axios.get(`${baseUrl}reports/${reportId}`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data: res.data.data}
    } catch (error) {
        return {ok: false}
    }
}

// get a single report by admin
const getSingleReportByAdmin = async (reportId) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await axios.get(`${baseUrl}reports/${reportId}`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data: res.data.data}
    } catch (error) {
        return {ok: false}
    }
}

// get all projects reports by user
const getAllProjectReports = async (projectId) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await axios.get(`${baseUrl}projects/${projectId}/reports`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        console.log(res)
        return {ok: true, data: res.data.data}
    } catch (error) {
        return {ok: false}
    }
}

// get a single project's report by user
const getSingleProjectReport = async (projectId, reportId) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await axios.get(`${baseUrl}user/projects/${projectId}/reports/${reportId}`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data: res.data.data}
    } catch (error) {
        return {ok: false}
    }
}

// dispatch report update alert to user
const dispatchReportUpdateAlert = async (reportId) => {
    try {
        const token = localStorage.getItem('iUserToken')
        await axios.post(`${baseUrl}reports/${reportId}`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true}
    } catch (error) {
        return {ok: false}
    }
}

// delete project's report by admin
const deleteReport = async ( reportId ) => {
    try {
      const token = localStorage.getItem('iUserToken');
      await axios.delete(`${baseUrl}report/${reportId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { ok: true };
    } catch (error) {
      return { ok: false };
    }
  };

export  {
    getAllReportsByAdmin, addNewProjectReport, getAllProjectReports, getSingleReportByAdmin,
    getSingleProjectReport, dispatchReportUpdateAlert, deleteReport, getAllProjectsReportsByAdmin,
    previewReportByAdmin
}