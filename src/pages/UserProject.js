/* eslint-disable no-useless-return */
import { useEffect, useState } from 'react';
import { useLocation} from 'react-router-dom'
// material
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop  from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import ErrorAlert from '../components/alerts/ErrorAlert';
import { ProjectSort, ProjectList, ProjectFilterSidebar } from '../sections/@dashboard/user-projects';
// api functions
import {getUserProjects} from '../services/api/project'
import ProjectForm from '../sections/feedback/projectForm';



function UserProjects () {
  const location = useLocation()

    const [openFilter, setOpenFilter] = useState(false);
    const [projects, setProjects] = useState([])
    const [updatedProjects, setUpdatedProjects] = useState([])
    const [loading, setLoading] = useState(false)

    const [openErrorAlert, setOpenErrorAlert] = useState(false)
    const [errorMess, setErrorMess] = useState('')

    const [openForm, setOpenForm] = useState(false)
    const handleFormOpen = () => {
      setOpenForm(true)
    }
    const handleFormClose = () => {
      setOpenForm(false)
      fetchProjects()
    }

    useEffect(() => {
      if (location.search) {
        fetchProjects(location.search.substring(1))
      }
      else {
        fetchProjects()
      }
    }, [])

    useEffect(() => {
      setUpdatedProjects(projects)
    }, [projects])

    useEffect(() => {
      fetchProjects(location.search.substring(1))
    }, [location])
    
    useEffect(() => {
      if (errorMess && errorMess.length > 0) {
        setOpenErrorAlert(true)
      }
    }, [errorMess])

    const handleErrorClosed = () => {
      setErrorMess('')
      setOpenErrorAlert(false)
    }

    const sortList = (order) => {
      setLoading(true)
      setUpdatedProjects([])
      setTimeout(() => {
        setLoading(false)
        if (order === 'Descending') {
          setUpdatedProjects(projects.sort((projA, projB ) => Date.parse(projA.createdAt) - Date.parse(projB.createdAt)))
          return
        } 
        setUpdatedProjects(projects.sort((projA, projB ) => Date.parse(projB.createdAt) - Date.parse(projA.createdAt)))
      }, 500);
    }

    const fetchProjects = (queryString) => {
      setLoading(true)
      setTimeout(() => {
        getUserProjects(queryString).then(result => {
        setLoading(false)
        if (!result.ok) {
          setErrorMess(result.errorMessage)
          return
        }
        setProjects(result.data)
      }).catch(() => setLoading(false))
      }, 2000);
    }

    const handleOpenFilter = () => {
        setOpenFilter(true);
      };
    
      const handleCloseFilter = () => {
        setOpenFilter(false);
      };
    return (
        <Page title="User Projects">
          <Container>
          <ErrorAlert open={openErrorAlert} onClosed={handleErrorClosed}
          title='Registration Failed' message={errorMess}
        />
          <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} >
              <CircularProgress color="inherit" />
            </Backdrop>
            <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="space-between">
              <Typography variant="h4" sx={{ mb: 5 }}>
                My Projects 
              </Typography>
              <Button variant="contained" onClick={handleFormOpen}  startIcon={<Iconify icon="eva:plus-fill" />}>
              New Project
              </Button>
            </Stack>
            <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
              <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                <ProjectFilterSidebar
                  isOpenFilter={openFilter}
                  onOpenFilter={handleOpenFilter}
                  onCloseFilter={handleCloseFilter}
                  fetchProjectWithFilter={fetchProjects}
                />
                <ProjectSort onSortList={sortList} />
              </Stack>
            </Stack>
            {(!loading && (!projects || !projects?.length > 0)) ? 
            <Alert severity="info">Ops! Seems you haven't created a projects yet. <br/>Create one now</Alert> :
            <ProjectList projects={updatedProjects} /> 
            }
          </Container>
          {openForm && <ProjectForm openForm={openForm} onCloseForm={handleFormClose} /> }
        </Page>
    )
}

export default UserProjects