/* eslint-disable no-useless-return */
import { useEffect, useState } from 'react';
import { useLocation} from 'react-router-dom'
// material
import { Container, Stack, Typography, CircularProgress, Backdrop } from '@mui/material';
// components
import Page from '../components/Page';
import { ProjectSort, ProjectList, ProjectFilterSidebar } from '../sections/@dashboard/user-projects';
import {getAllProjects} from '../services/api/project'


function UserProjects () {
    // const [openFilter, setOpenFilter] = useState(false);
    // const [projects, setProjects] = useState([])
    // const [updatedProjects, setUpdatedProjects] = useState([])
    // const [loading, setLoading] = useState(false)

    // const location = useLocation()
    // useEffect(() => {
    //   fetchProjects()
    // }, [])

    // useEffect(() => {
    //   setUpdatedProjects(projects)
    // }, [projects])

    // useEffect(() => {
    //   fetchProjects(location.search.substring(1))
    // }, [location])

    // const sortList = (order) => {
    //   setLoading(true)
    //   setUpdatedProjects([])
    //   setTimeout(() => {
    //           setLoading(false)
    //   if (order === 'Ascending') {
    //     setUpdatedProjects(projects.sort((projA, projB ) => Date.parse(projA.createdAt) - Date.parse(projB.createdAt)))
    //     return
    //   } 
    //   setUpdatedProjects(projects.sort((projA, projB ) => Date.parse(projB.createdAt) - Date.parse(projA.createdAt)))
    //   }, 500);
    // }

    // const fetchProjects = (queryString) => {
    //   setLoading(true)
    //   setTimeout(() => {
    //     getAllProjects(queryString).then(result => {
    //     setLoading(false)
    //     if (!result.ok) {
    //       // eslint-disable-next-line no-alert
    //       window.alert('error')
    //       return
    //     }
    //     setProjects(result.data)
    //   })
    //   }, 2000);
    // }

    // const handleOpenFilter = () => {
    //     setOpenFilter(true);
    //   };
    
    //   const handleCloseFilter = () => {
    //     setOpenFilter(false);
    //   };
    return (
        <Page title="User Projects"> comonig up
          {/* <Container>
          <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} >
              <CircularProgress color="inherit" />
            </Backdrop>
            <Typography variant="h4" sx={{ mb: 5 }}>
              Products 
            </Typography>

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

            <ProjectList projects={updatedProjects} />
          </Container> */}
        </Page>
    )
}

export default UserProjects