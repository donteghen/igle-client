/* eslint-disable no-useless-return */
import { useRef, useState } from 'react';
import PropTypes from 'prop-types'
// material
import Menu from '@mui/material/Menu';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import MenuItem from '@mui/material/MenuItem';
import Backdrop from '@mui/material/Backdrop';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';
// component
import Iconify from '../../../components/Iconify';
import UserDetail from '../../../components/UserDetail'
// functions
import {deleteUser} from '../../../services/api/user'
// ----------------------------------------------------------------------

UserMoreMenu.propTypes = {
  user: PropTypes.object.isRequired,
  onFetchUsers: PropTypes.func.isRequired,
}

export default function UserMoreMenu({user, onFetchUsers}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false)
  const [loading, setLoading] = useState(false)

  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const handleOpenDetail = () => {
      setIsOpen(false)
      setOpenDetail(true)
  }
  const handleCloseDetail = () => {
    setOpenDetail(false)
  }

  const handleCloseSuccess = () => {
    setSuccess(false)
    onFetchUsers()
  }
  const handleCloseError = () => {
    setError(false)
  }
  const handleDeleteUser = () => {
    setIsOpen(false)
    setLoading(true)
    setTimeout(() => {
      deleteUser(user?.id).then(result => {
        setLoading(false)
        if (!result.ok) {
          setError(true)
          return
        }
        setSuccess(true)
      }).catch(() => setLoading(false))
    }, 2500);
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
        An error occured — <strong>Try again in a moment!</strong>
      </Alert>}

      {success && 
        <Alert severity="success" onClose={handleCloseSuccess}>
        <AlertTitle>Delete Successful</AlertTitle>
        Delete operation completed — <strong>Click to close!</strong>
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
        <MenuItem sx={{ color: 'text.secondary' }} onClick={handleDeleteUser}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem  sx={{ color: 'text.secondary' }} onClick={handleOpenDetail}>
          <ListItemIcon>
            <Iconify icon="eva:eye-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="View" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
      {<UserDetail open={openDetail} onCloseDetail={handleCloseDetail} user={user} />}
    </>
  );
}
