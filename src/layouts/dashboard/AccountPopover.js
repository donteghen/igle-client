/* eslint-disable no-useless-return */
import { useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
// @mui
import { alpha } from '@mui/material/styles';
import  Box from '@mui/material/Box';
import  Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import  Stack from '@mui/material/Stack';
import   MenuItem from '@mui/material/MenuItem';
import   Avatar from  '@mui/material/Avatar';
import  CircularProgress  from '@mui/material/CircularProgress';
import  Backdrop  from '@mui/material/Backdrop';
import  IconButton  from '@mui/material/IconButton';

// redux actions
import * as actions from '../../redux/actions'
// components
import MenuPopover from '../../components/MenuPopover';
import Iconify from '../../components/Iconify';
import ErrorAlert from '../../components/alerts/ErrorAlert';

// ----------------------------------------------------------------------

const AUTH_MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'ant-design:home-filled',
    linkTo: '/',
  },
  {
    label: 'Dashboard',
    icon: 'bxs:dashboard',
    linkTo: '/dashboard',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
    linkTo: '/dashboard/profile',
  },

];

const NON_AUTH_MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'ant-design:home-filled',
    linkTo: '/',
  },
  {
    label: 'login',
    icon: 'eva:log-in-outline',
    linkTo: '/login',
  },
  
  {
    label: 'register',
    icon: 'eva:person-add-fill',
    linkTo: '/register',
  },

];

// ----------------------------------------------------------------------

AccountPopover.propTypes = {
  user: PropTypes.object,
  logoutUser: PropTypes.func
}

function AccountPopover({user, logoutUser}) {
  const navigate = useNavigate()
  const anchorRef = useRef(null);

  const [open, setOpen] = useState(null);

  const [errorAlert, setErrorAlert] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    setLoading(true)
    setTimeout(() => {
      logoutUser().then(result => {
        setLoading(false)
        if (!result.ok) {
          setErrorAlert(true)
          return
        }
        navigate('/login')
      }).catch(() => setLoading(false))
    }, 2000);
  }
  const renderAuthOptions = () => (
     <>
     <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} >
          <CircularProgress color="inherit" />
      </Backdrop>
     <ErrorAlert open={errorAlert} onClosed={setErrorAlert}
            title='Operation Failed' message='Oops! something went wrong, try again!'
            />
      <Box sx={{ my: 1.5, px: 2.5 }}>
            <Typography variant="subtitle2" noWrap>
              {user?.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              {user?.email}
            </Typography>
          </Box>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Stack sx={{ p: 1 }}>
            {AUTH_MENU_OPTIONS.map((option) => (
              <MenuItem key={option.label} to={option.linkTo} component={RouterLink} onClick={handleClose}>
                <Iconify icon={option.icon} sx={{mr: 2}} /> {option.label}
              </MenuItem>
            ))}
          </Stack>
        </> 
    )

    const renderNonAuthOptions = () => (
      <>
           <Stack sx={{ p: 1 }}>
             {NON_AUTH_MENU_OPTIONS.map((option) => (
               <MenuItem key={option.label} to={option.linkTo} component={RouterLink} onClick={handleClose}>
                 <Iconify icon={option.icon} sx={{mr: 2}} /> {option.label}
               </MenuItem>
             ))}
           </Stack>
         </> 
     )
  
  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        {(user && user?.id) ? <Avatar src={user?.avatar??'/static/mock-images/avatars/avatar_default.jpg'} alt="avatar" /> :
        <Avatar  /> }
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        {(user && user?.id) ? renderAuthOptions() : renderNonAuthOptions() }

        <Divider sx={{ borderStyle: 'dashed' }} />

        {user && <MenuItem sx={{ m: 1 }} onClick={handleLogout}>
          <Iconify icon='heroicons-outline:logout' sx={{mr:1}} /> Logout
        </MenuItem>}
      </MenuPopover>
    </>
  );
}
const mapStateToProps = ({user}) => ({user})
export default connect(mapStateToProps, actions)(AccountPopover)
