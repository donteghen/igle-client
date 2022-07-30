/* eslint-disable no-useless-return */
import {useState} from 'react';
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';
// import mui base components
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import  Divider  from '@mui/material/Divider';
import  Backdrop  from '@mui/material/Backdrop';
import  CircularProgress  from '@mui/material/CircularProgress';

// other components
import Iconify from '../../../components/Iconify';
import ErrorAlert from '../../../components/alerts/ErrorAlert';
import SuccessAlert from '../../../components/alerts/SuccessAlert';
// import utils functions
import {getActiveColor, getPlanColor, getStatusColor} from '../../../utils/getColor'
import {capitalizeFirstLetter} from '../../../utils/formatString'
import { fDateTime } from '../../../utils/formatTime';
import ProjectForm from '../../feedback/projectForm';
import { deleteProject } from '../../../services/api/project';



ProjectCard.propTypes = {
    project: PropTypes.object.isRequired,
}

export default function ProjectCard ({project}) {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false)
    const [openErrorAlert, setOpenErrorAlert] = useState(false)

  const [openForm, setOpenForm] = useState(false)
    const handleFormOpen = () => {
      setOpenForm(true)
    }
    const handleFormClose = () => {
      setOpenForm(false)
    }

    const handleSuccessAlertClosed = () => {
      setOpenSuccessAlert(false)
      navigate('/dashboard/user-projects')
  }

    const handleErrorAlertClosed = () => {
      setOpenErrorAlert(false)
    }

    const handleDelete = () => {
      setLoading(true)
      setTimeout(() => {
        deleteProject(project?.id).then(result => {
          setLoading(false)
          if (!result.ok) {
            setOpenErrorAlert(true)
            return
          }
          setOpenSuccessAlert(true)
        })
      }, 2000);
    }
  return (
    <>
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} >
        <CircularProgress color="inherit" />
      </Backdrop>
    <SuccessAlert open={openSuccessAlert} onClosed={handleSuccessAlertClosed}
      title='Delete Operation successful' 
      message='The project has been successfully deleted, thanks.'  />
      <ErrorAlert open={openErrorAlert} onClosed={handleErrorAlertClosed}
      title='Operation Failed' message='An Error occured please check you connection and try again!'
      />
    <Card sx={{ maxWidth: 345, height:300, cursor:'pointer', transition:'transform 0.5s linear', '&:hover':{transform:'translateY(-2px)'}}}>
      <CardContent sx={{px:1, height:'80%'}}>
        <Box sx={{display:'flex', justifyContent:'space-between',}}>
            <Chip label={capitalizeFirstLetter(project?.plan)} sx={{bgcolor:`${getPlanColor(project?.plan)}`,  color:'white'}} size='small' /> 
            <Chip label={capitalizeFirstLetter(project?.status)} color={getStatusColor(project?.status)} sx={{color:'white'}} size='small' />
            <Chip label={`${project?.active ? 'Active' : 'Inactive'}`} color={getActiveColor(project?.active)} sx={{color:'white'}} size='small' />
        </Box>
        <Divider sx={{mt:1}} />
        <Box component='div' sx={{background:'#0f3996', width:'100%', height:'100%', pt:3, pl:1}}>
        <Typography variant="h4" color="white" sx={{}}>
          {project?.name.substr(0, 80)}
        </Typography>
        <Typography component='p' color="white" sx={{fontSize:'12px','& > span': {fontWeight:'bold'}}} >
            {fDateTime(project?.updatedAt)}
        </Typography>
        </Box>
      </CardContent>
      <Divider sx={{mt:1}} />
      <CardActions disableSpacing sx={{height:'15%'}}>
        <IconButton aria-label="Edit" sx={{color:'warning.main'}} onClick={handleFormOpen}>
          <Iconify icon='bxs:edit' />
        </IconButton>
        <IconButton aria-label="view" sx={{color:'info.main'}} onClick={() => navigate(`/dashboard/user-projects/${project?.id}`, {replace:true})}>
          <Iconify icon='carbon:view-filled' />
        </IconButton>
        <IconButton sx={{ml:'auto', color:'error.main'}} onClick={handleDelete}>
          <Iconify icon='fluent:delete-24-filled'  />
        </IconButton>
      </CardActions>
    </Card>
    {openForm && <ProjectForm openForm={openForm} onCloseForm={handleFormClose} project={project} />}
    </>
  );
}