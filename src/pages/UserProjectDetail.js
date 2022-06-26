/* eslint-disable no-useless-return */
/* eslint-disable no-alert */
import {  useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// material
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// functions
import { getSingleUserProject } from '../services/api/project';
import { fDateTime } from '../utils/formatTime';
import ReportList from '../sections/@dashboard/reports/ReportList';
import { getAllProjectReports } from '../services/api/report';
import { RequestTable } from '../sections/@dashboard/requests';
import RequestForm from '../sections/feedback/requestForm';

// ----------------------------------------------------------------------

export default function UserProjectDetail() {
    const {id} = useParams()

    const [project, setProject] = useState({})
    const [projectReports, setProjectReports] = useState([])

    const [loading, setLoading] = useState(false)

    const [openForm, setOpenForm] = useState(false)

  const handleFormOpen = () => {
    setOpenForm(true)
  }
  const handleFormClose = () => {
    setOpenForm(false)
  }

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            getProjectDetail()
            fetchProjectReports()
        }, 2500);
    }, [id])

    const getProjectDetail = () => {
        getSingleUserProject(id).then(result => {
            setLoading(false)
            if (!result.ok) {
                window.alert('error fetching project detail in user project detail component')
                return
            }
            setProject(result.data)            
        })
    }
    const fetchProjectReports = () => {
        getAllProjectReports(id).then(result => {
            if (!result.ok) {
                window.alert('error fetching project reports in user project detail component')
                return
            }
            setProjectReports(result.data)
        })
    }

    
  return (
    <Page title="User Project Detail">
      
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} >
              <CircularProgress size={40} thickness={4} color="primary" />
            </Backdrop>
        <Box sx={{background:'linear-gradient(to right, #0f3996, #0f3996)', backgroundSize:'cover', width:'100%', height:'400px'}}>
            <Typography component='div' sx={{position:'absolute', paddingLeft:'24px', top:{xs:'35%', md:'40%', lg:'50%', color:'white'}}}>

                <h1>{project?.name}</h1>
                <p >{fDateTime(project?.createdAt)}</p> 
            </Typography>
        </Box>
        <Divider />
        <Container>
            <Box sx={{my:{xs:3, md:4}}}>
                <h4 style={{marginLeft:'10px'}}>Description</h4>
                <Paper sx={{py:3, px:2}} elevation={4}>
                    <Typography>{project?.description}</Typography>
                </Paper>
            </Box>
            <Box sx={{my:{xs:3, md:4}}}>
                <h4 style={{marginLeft:'10px'}}>Detail</h4>
                <Paper sx={{py:3, px:2}} elevation={4}>
                    <Typography>{project?.detail}</Typography>
                </Paper>
            </Box>
            <Divider sx={{my:2}}/>
            <Box>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <h4>Project's Reports</h4>
                    <Button variant="contained" onClick={handleFormOpen}  startIcon={<Iconify icon="eva:plus-fill" />}>
                        Request a Report
                    </Button>
                    </Stack>
                    <ReportList reports={projectReports} />
            </Box>
            <Divider sx={{my:4}}/>
            <Box>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <h4>Project's Request List</h4>
                    <Button variant="contained" onClick={handleFormOpen} startIcon={<Iconify icon="eva:plus-fill" />}>
                        Make a request
                    </Button>
                </Stack>
            </Box>
            </Container>
            <RequestTable queryString={`project=${id}`} userComp projectId={id} />
            {<RequestForm openForm={openForm} onCloseForm={handleFormClose} />}
    </Page>
  );
}