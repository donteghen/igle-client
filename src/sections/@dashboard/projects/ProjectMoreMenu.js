/* eslint-disable no-useless-return */
import { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
// material
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
// component
import Iconify from '../../../components/Iconify';
// api service
import {activateProject, deactivateProject} from '../../../services/api/project'
import ProjectDetail from '../../../components/ProjectDetail';

// ----------------------------------------------------------------------

ProjectMoreMenu.propTypes = {
  project: PropTypes.string.isRequired,
  user: PropTypes.object,
  active:PropTypes.bool,
  onFetchProjects: PropTypes.func.isRequired
}
function ProjectMoreMenu({project, user, active, onFetchProjects}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false)
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
  
  const handleOpenDetail = () => {
      setIsOpen(false)
      setOpenDetail(true)
  }
  const handleCloseDetail = () => {
    setOpenDetail(false)
  }

  const handleCloseSuccess = () => {
    setSuccess(false)
    onFetchProjects()
  }
  const handleCloseError = () => {
    setError(false)
  }
  const handleActiveState = () => {
    setIsOpen(false)
    setLoading(true)
    setTimeout(() => {
      if (active) {
        deactivateProject(project?.id).then(result => {
          setLoading(false)
          if (!result.ok) {
            setErrorMess(result.errorMessage)
            return
          }
          setSuccess(true)
        }).catch(() => setLoading(false))
      }
      else {
        activateProject(project?.id).then(result => {
          setLoading(false)
          if (!result.ok) {
            setErrorMess(result.errorMessage)
            return
          }
          setSuccess(true)
        }).catch(() => setLoading(false))
      }
    }, 2000);
  }
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} >
              <CircularProgress size={40} thickness={4} color="primary" />
        </Backdrop>
      {error && 
        <Alert severity="error" onClose={handleCloseError}>
        <AlertTitle>Error</AlertTitle>
        {errorMess}
      </Alert>}
      {success && 
        <Alert severity="success" onClose={handleCloseSuccess}>
        <AlertTitle>Operation Successful</AlertTitle>
         You request was successful!<strong>Close to continue</strong>
      </Alert>}
      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
      {user?.isAdmin && <MenuItem sx={{ color: 'text.secondary' }} onClick={handleActiveState}>
          <ListItemIcon>
            <Iconify icon={`${active ? 'gridicons:cross-circle' : 'teenyicons:tick-circle-solid'}`}  width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary={`${active ? 'Deactivate' : 'Activate'}`} primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>}
        {/* <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline"  width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem> */}

        <MenuItem onClick={handleOpenDetail} sx={{ color: 'text.secondary' }} >
          <ListItemIcon>
            <Iconify icon="eva:eye-fill"  width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="View" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
      <ProjectDetail onCloseDetail={handleCloseDetail} openDetail={openDetail} project={project} onFetchProjects={onFetchProjects}  />
    </>
  );
}

const mapStateToProps = ({user}) => ({user})
export default connect(mapStateToProps, null)(ProjectMoreMenu)