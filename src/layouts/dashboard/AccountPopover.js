import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton } from '@mui/material';

// redux actions
import * as actions from '../../redux/actions'
// components
import MenuPopover from '../../components/MenuPopover';
import Iconify from '../../components/Iconify';

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
    linkTo: '/dashboard/login',
  },
  
  {
    label: 'register',
    icon: 'eva:person-add-fill',
    linkTo: '/dashboard/register',
  },

];

// ----------------------------------------------------------------------

AccountPopover.propTypes = {
  user: PropTypes.object
}

function AccountPopover({user}) {
  const anchorRef = useRef(null);

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const renderAuthOptions = () => (
     <>
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
        <Avatar src={user?.avatar} alt="avatar" />
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

        {user && <MenuItem onClick={handleClose} sx={{ m: 1 }}>
          <Iconify icon='heroicons-outline:logout' sx={{mr:1}} /> Logout
        </MenuItem>}
      </MenuPopover>
    </>
  );
}
const mapStateToProps = ({user}) => ({user})
export default connect(mapStateToProps, actions)(AccountPopover)
