/* eslint-disable no-useless-return */
/* eslint-disable no-alert */
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// material
import { Button, Container, Stack, Typography, CircularProgress, Backdrop, Box, Divider , 
    Accordion, AccordionDetails, AccordionSummary} from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// functions
import { getSingleProject } from '../services/api/project';
import { fDateTime } from '../utils/formatTime';
import ReportList from '../sections/@dashboard/reports/ReportList';
import { getAllProjectReports } from '../services/api/report';
import { getAllRequests } from '../services/api/request';
import Requests from './Request';

// ----------------------------------------------------------------------

export default function ProjectDetail() {
    const {id} = useParams()

    const [project, setProject] = useState({})
    const [projectReports, setProjectReports] = useState([])
    

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            getProjectDetail()
            fetchProjectReports()
        }, 2500);
    }, [id])

    const getProjectDetail = () => {

        getSingleProject(id).then(result => {
            setLoading(false)
            if (!result.ok) {
                window.alert('error fetching project detail')
                return
            }
            setProject(result.data)            
        })
    }
    const fetchProjectReports = () => {
        getAllProjectReports(id).then(result => {
            if (!result.ok) {
                window.alert('error fetching project reports')
                return
            }
            setProjectReports(result.data)
        })
    }

    
  return (
    <Page title="Dashboard:Project Detail">
      
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} >
              <CircularProgress size={40} thickness={4} color="primary" />
            </Backdrop>
        <Box sx={{background:'linear-gradient(to right, hotpink, hotpink)', backgroundSize:'cover', width:'100%', height:'400px'}}>
            <Typography component='div' sx={{position:'absolute', left:'5%', bottom:'40%'}}>

                <h1>{project?.name}</h1>
                <p >{fDateTime(project?.createdAt)}</p> 
            </Typography>
        </Box>
        <Divider />
        <Container>
            <Box sx={{my:{xs:3, md:8}}}>
                <h4 style={{marginLeft:'10px'}}>Description</h4>
                <Accordion>
                    <AccordionSummary sx={{py:2, color:'text.secondary'}}
                    expandIcon={<Iconify icon='ic:baseline-expand-more' />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography>{project?.description}</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{py:2}}>
                        <h4>Detail</h4>
                        <Typography sx={{marginRight:'10px'}}>
                            {project?.detail}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>
            <Divider sx={{my:2}}/>
            <Box>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <h4>Report</h4>
                    <Button variant="contained" component={RouterLink} to="/dashboard/request-form" startIcon={<Iconify icon="eva:plus-fill" />}>
                        Request a Report
                    </Button>
                    </Stack>
                    <ReportList reports={projectReports} />
            </Box>
            </Container>
            <Divider sx={{my:4}}/>
            <Box>
                <Requests projectId={id} />
            </Box>
        
    </Page>
  );
}