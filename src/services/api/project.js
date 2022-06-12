import axios from 'axios'
import { setBaseUrl } from "../../utils/setBaseUrl";

const baseUrl = setBaseUrl()

// get all projects with or without query string
const getAllProjects = async (queryString) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await axios.get(`${baseUrl}projects?${queryString}`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data: res.data.data}
    } catch (error) {
        return {ok: false}
    }
}


// get single project by project Id
const getSingleProject = async (projectId) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await axios.get(`${baseUrl}projects/${projectId}`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data: res.data.data}
    } catch (error) {
        return {ok: false}
    }
}

// get all user's projects
const getUserProjects = async (queryString) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await axios.get(`${baseUrl}user/profile/projects?${queryString}`, {
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
const getSingleUserProject = async (projectId) => {
    try {
        const token = localStorage.getItem('iUserToken')
        const res = await axios.get(`${baseUrl}user/profile/projects/${projectId}`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return {ok: true, data: res.data.data}
    } catch (error) {
        return {ok: false}
    }
}

// create new project by user
const createNewProject = async (projectDetails) => {

    try {
      const token = localStorage.getItem('iUserToken');
      const res = await axios.post(`${baseUrl}projects`, projectDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return { ok: true, data: res.data.data };
    } catch (error) {
      return { ok: false };
    }
  };

// update project by id
const updateProject = async (projectDetails, projectId) => {
    try {
      const token = localStorage.getItem('iUserToken');
      const res = await axios.patch(`${baseUrl}projects/${projectId}/update`, projectDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { ok: true, data: res.data.data };
    } catch (error) {
      return { ok: false };
    }
  };

  // upgrade project plan
const upgradeProject = async (planDetail, projectId) => {
    try {
      const token = localStorage.getItem('iUserToken');
      const res = await axios.patch(`${baseUrl}projects/${projectId}/upgrade-plan`, planDetail,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { ok: true, data: res.data.data };
    } catch (error) {
      return { ok: false };
    }
  };

  // change project status
const changeProjectStatus = async (statusDetail, projectId) => {
    try {
        const token = localStorage.getItem('iUserToken');
        const res = await axios.patch(`${baseUrl}projects/${projectId}/status-change`, statusDetail,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return { ok: true, data: res.data.data };
      } catch (error) {
        return { ok: false };
      }
}

// activate Project
const activateProject = async (projectId) => {
    try {
        const token = localStorage.getItem('iUserToken');
        const res = await axios.patch(`${baseUrl}projects/${projectId}/activate`, {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return { ok: true, data: res.data.data };
      } catch (error) {
        return { ok: false };
      }
}
// activate Project
const deactivateProject = async (projectId) => {
    try {
        const token = localStorage.getItem('iUserToken');
        const res = await axios.patch(`${baseUrl}projects/${projectId}/deactivate`, {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return { ok: true, data: res.data.data };
      } catch (error) {
        return { ok: false };
      }
}


// delete project by user 
const deleteProject = async ( projectId ) => {
    try {
      const token = localStorage.getItem('iUserToken');
      await axios.delete(`${baseUrl}projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { ok: true };
    } catch (error) {
      return { ok: false };
    }
  };

  
export {getAllProjects, getSingleProject, createNewProject, updateProject, 
    changeProjectStatus, deactivateProject, activateProject, upgradeProject,
    getSingleUserProject, getUserProjects, deleteProject}