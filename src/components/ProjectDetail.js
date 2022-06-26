/* eslint-disable no-alert */
/* eslint-disable consistent-return */
/* eslint-disable no-useless-return */
import {useState, forwardRef, useEffect}  from 'react';
import PropTypes from 'prop-types'

// mui components
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

// components
import Iconify from './Iconify';
import { RequestTable } from '../sections/@dashboard/requests';
import { ReportList } from '../sections/@dashboard/reports';
// functions 
import { fDateTime } from '../utils/formatTime';
import { getAllProjectsReportsByAdmin } from '../services/api/report';
import {changeProjectStatus, upgradeProject} from '../services/api/project'
import { capitalizeFirstLetter } from '../utils/formatString';
import { getStatusColor, getPlanColor, getActiveColor } from '../utils/getColor';


const Transition = forwardRef((props, ref) =>  <Slide direction="up" ref={ref} {...props} />);

ProjectDetail.propTypes = {
  openDetail:PropTypes.bool,
  onCloseDetail: PropTypes.func,
  project: PropTypes.object.isRequired, 
  onFetchProjects: PropTypes.func.isRequired
}

export default function ProjectDetail({onCloseDetail, openDetail, project, onFetchProjects}) {

    const [projectReports, setProjectReports] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
  const [errorMess, setErrorMess] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (errorMess && errorMess.length > 0) {
      setError(true)
    }
    return () => {
      setErrorMess('')
    }
  }, [errorMess])


  const handleCloseSuccess = () => {
    setSuccess(false)
    handleClose()
    onFetchProjects()
  }
  const handleCloseError = () => {
    setError(false)
  }
    useEffect(() => {
      getAllProjectsReportsByAdmin(project?.id).then(result => {
        if (!result.ok) {
            return
        }
        setProjectReports(result.data)
      })
      return () => {
        setProjectReports([])
      }
    }, [])
    
    const handleClose = () => {
        onCloseDetail();
    };

    const handleStatusChange = (status) => {
      setLoading(true)
      setTimeout(() => {
        changeProjectStatus({status}, project?.id).then(result => {
          setLoading(false)
          if (!result.ok) {
            setErrorMess(result.errorMessage)
            return
          }
          setSuccess(true)
        }).catch(() => setLoading(false))
      }, 2000);
    }
    const handlePlanUpgrade = (plan) => {
      setLoading(true)
      setTimeout(() => {
        upgradeProject({plan}, project?.id).then(result => {
          setLoading(false)
          if (!result.ok) {
            setErrorMess(result.errorMessage)
            return
          }
          setSuccess(true)
        }).catch(() => setLoading(false))
      }, 2000);
    }
  return (
      <Dialog
        fullScreen
        open={openDetail}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-labelledby="report-preview"
      >
      <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {project?.name}
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <Iconify icon='gridicons:cross-circle' />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent sx={{p:0}}>
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} >
              <CircularProgress size={40} thickness={4} color="primary" />
        </Backdrop>
      
        <Box sx={{background:'linear-gradient(to right, #0f3996, #0f3996)', backgroundSize:'cover', width:'100%', height:'400px', position:'relative'}}>
            <Typography component='div' sx={{position:'absolute', paddingLeft:'24px', top:{xs:'35%', md:'40%', lg:'50%', color:'white'}}}>

                <h1>{project?.name}</h1>
                <p >{fDateTime(project?.createdAt)}</p> 
                <Button disableElevation size='small' variant='contained' color={getActiveColor(project?.active)}  style={{textTransform:'none'}}>{project?.active ? ' Active' : 'Inactive'}</Button>                
            </Typography>
        </Box>
        <Divider />
        <Container>
            {error && 
            <Alert severity="error" onClose={handleCloseError}>
            <AlertTitle>Error</AlertTitle>
            {errorMess}
          </Alert>}

          {success && 
            <Alert severity="success" onClose={handleCloseSuccess}>
            <AlertTitle>Status Update Successful</AlertTitle>
            Update operation completed — <strong>Click to close!</strong>
          </Alert>}
            <Box sx={{my:{xs:3, md:4}}}>
              <h4 style={{marginBottom:'10px'}}>Status <Button disableElevation size='small' variant='contained' color={getStatusColor(project?.status)} sx={{textTransform:'none'}} >{capitalizeFirstLetter(project?.status)}</Button></h4>
              <Box>
              <span>Mark Status as </span>
              <ButtonGroup size="large" aria-label="large button group">
                <Button onClick={() => handleStatusChange('APPROVED')}>Approve</Button>
                <Button onClick={() => handleStatusChange('COMPLETED')}>Completed</Button>
                <Button onClick={() => handleStatusChange('CANCELED')}>Cancel</Button>
              </ButtonGroup>
              </Box>
            </Box>
            <Box sx={{my:{xs:3, md:4}}}>
              <h4 style={{marginBottom:'10px'}}>Plan <Button disableElevation size='small' variant='contained' color={getPlanColor(project?.plan)} sx={{textTransform:'none'}}>{capitalizeFirstLetter(project?.plan)}</Button></h4>
              <Box>
              <span>Upgrade Plan to</span>
              <ButtonGroup size="large" aria-label="large button group">
                <Button onClick={() => handlePlanUpgrade('STANDARD')}>Standard</Button>
                <Button onClick={() => handlePlanUpgrade('PRO')}>Pro</Button>
                <Button onClick={() => handlePlanUpgrade('ENTERPRISE')}>Enterprise</Button>
                <Button onClick={() => handlePlanUpgrade('OTHERS')}>Custom</Button>
              </ButtonGroup>
              </Box>
            </Box>
            <Box sx={{my:{xs:3, md:4}}}>
                <h4 style={{}}>Description</h4>
                <Paper sx={{py:3, px:2}} elevation={4}>
                    <Typography>{project?.description}</Typography>
                </Paper>
            </Box>
            <Box sx={{my:{xs:3, md:4}}}>
                <h4 style={{}}>Detail</h4>
                <Paper sx={{py:3, px:2}} elevation={4}>
                    <Typography>{project?.detail}</Typography>
                </Paper>
            </Box>
            <Divider sx={{my:2}}/>
            <Box>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <h4>Project's Reports</h4>
                    </Stack>
                    <ReportList reports={projectReports} />
            </Box>
            <Divider sx={{my:4}}/>
            <Box>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <h4>Project's Request List</h4>
                </Stack>
            </Box>
            </Container>
            <RequestTable queryString={`project=${project?.id}`} projectId={project?.id} />
        </DialogContent>
      </Dialog>
  )
}
