import axios from 'axios'
import { setBaseUrl } from "../../utils/setBaseUrl";

const baseUrl = setBaseUrl()

const customAxios = axios.create({
  timeout:5000
})

// get all projects with or without query string
const getAllProjects = async (queryString) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await customAxios.get(`${baseUrl}projects?${queryString}`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data: res.data.data}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}


// get single project by project Id
const getSingleProject = async (projectId) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await customAxios.get(`${baseUrl}projects/${projectId}`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data: res.data.data}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}

// get all user's projects
const getUserProjects = async (queryString) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await customAxios.get(`${baseUrl}user/profile/projects?${queryString}`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data: res.data.data}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}


// get single user project by project Id
const getSingleUserProject = async (projectId) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await customAxios.get(`${baseUrl}user/profile/projects/${projectId}`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data: res.data.data}
    } catch (error) {
        return {ok: false, errorMessage:error.response.data.error}
    }
}

// create new project by user
const createNewProject = async (projectDetails) => {

    try {
      const token = localStorage.getItem('iUserToken');
      const res = await customAxios.post(`${baseUrl}projects`, projectDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { ok: true, data: res.data.data };
    } catch (error) {
      return { ok: false, errorMessage:error.response.data.error };
    }
  };

// update project by id
const updateProject = async (projectDetails, projectId) => {
    try {
      const token = localStorage.getItem('iUserToken');
      const res = await customAxios.patch(`${baseUrl}user/profile/projects/${projectId}/update`, projectDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { ok: true, data: res.data.data };
    } catch (error) {
      return { ok: false, errorMessage:error.response.data.error };
    }
  };

  // upgrade project plan
const upgradeProject = async (planDetail, projectId) => {
    try {
      const token = localStorage.getItem('iUserToken');
      const res = await customAxios.patch(`${baseUrl}projects/${projectId}/upgrade-plan`, planDetail,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { ok: true, data: res.data.data };
    } catch (error) {
      return { ok: false, errorMessage:error.response.data.error };
    }
  };

  // change project status
const changeProjectStatus = async (statusDetail, projectId) => {
    try {
        const token = localStorage.getItem('iUserToken');
        const res = await customAxios.patch(`${baseUrl}projects/${projectId}/status-change`, statusDetail,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return { ok: true, data: res.data.data };
      } catch (error) {
        return { ok: false, errorMessage:error.response.data.error };
      }
}

// activate Project
const activateProject = async (projectId) => {
    try {
        const token = localStorage.getItem('iUserToken');
        const res = await customAxios.patch(`${baseUrl}projects/${projectId}/activate`, {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return { ok: true, data: res.data.data };
      } catch (error) {
        return { ok: false, errorMessage:error.response.data.error };
      }
}
// activate Project
const deactivateProject = async (projectId) => {
    try {
        const token = localStorage.getItem('iUserToken');
        const res = await customAxios.patch(`${baseUrl}projects/${projectId}/deactivate`, {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return { ok: true, data: res.data.data };
      } catch (error) {
        return { ok: false, errorMessage:error.response.data.error };
      }
}


// delete project by user 
const deleteProject = async ( projectId ) => {
    try {
      const token = localStorage.getItem('iUserToken');
      await customAxios.delete(`${baseUrl}projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { ok: true };
    } catch (error) {
      return { ok: false, errorMessage:error.response.data.error };
    }
  };

  
export {getAllProjects, getSingleProject, createNewProject, updateProject, 
    changeProjectStatus, deactivateProject, activateProject, upgradeProject,
    getSingleUserProject, getUserProjects, deleteProject}