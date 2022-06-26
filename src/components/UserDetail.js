/* eslint-disable consistent-return */
/* eslint-disable no-useless-return */
import React  from 'react';
import PropTypes from 'prop-types'

// mui components
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { capitalizeFirstLetter } from '../utils/formatString';

// components
import Iconify from './Iconify';
import { ProjectTable } from '../sections/@dashboard/projects';
import { RequestTable } from '../sections/@dashboard/requests';





const Transition = React.forwardRef((props, ref) =>  <Slide direction="up" ref={ref} {...props} />);

UserDetail.propTypes = {
  open:PropTypes.bool,
  onCloseDetail: PropTypes.func,
  user: PropTypes.object, 
}

export default function UserDetail({onCloseDetail, open, user}) {

  const handleClose = () => {
    onCloseDetail();
  };
  
  return (
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-labelledby="report-preview"
      >
      <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {capitalizeFirstLetter(user?.name)} 
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
        <DialogContent sx={{backgroundColor:'#fbfbfb'}}>
         <Container >
         <h4 style={{paddingLeft:'24px'}}>User's Details</h4>
         <Paper elavation={4} sx={{px:1, py:3}}>
             <div style={{display:'flex', justifyContent:'center'}}>
             <Avatar
                alt="Avatar"
                src={user?.avatar ? user?.avatar : '/static/mock-images/avatars/avatar_1.jpg'}
                sx={{ width: 100, height: 100, my:2 }}
                />
             </div>
             <Typography component='div' sx={{display :'flex', justifyContent:'space-between', flexWrap:'wrap'}}>
                <Typography component='div' sx={{'& > p':{fontSize:'16px', fontWeight:'bold'}, '& > h6':{color:'primary.main'}, width:{xs:'100%', md:'50%'},  my:2}}>
                <h6>Name</h6>
                <p>{user?.name}</p>
                </Typography>
                <Typography component='div' sx={{'& > p':{fontSize:'16px', fontWeight:'bold'},'& > h6':{color:'primary.main'},width:{xs:'100%', md:'50%'}, my:2}}>
                <h6>Email</h6>
                <p>{user?.email}</p>
                </Typography>
                <Typography component='div' sx={{'& > p':{fontSize:'16px', fontWeight:'bold'},'& > h6':{color:'primary.main'},width:{xs:'100%', md:'50%'}, my:2}}>
                <h6>Phone Number</h6>
                <p>{user.phone_number}</p>
                </Typography>
                <Typography component='div' sx={{'& > p':{fontSize:'16px', fontWeight:'bold'},'& > h6':{color:'primary.main'},width:{xs:'100%', md:'50%'}, my:2}}>
                <h6>Verified</h6>
                <p>
                <Typography component='span' 
                sx={{padding: '2px 4px', backgroundColor:`${user?.isVerified ? 'success.main' : 'warning.main'}`, borderRadius:'4px'}}>
                {user?.isVerified ? 'Yes' : 'No'}
                </Typography>
                </p>
                </Typography>
                <Typography component='div' sx={{'& > p':{fontSize:'16px', fontWeight:'bold'},'& > h6':{color:'primary.main'},width:{xs:'100%', md:'50%'}, my:2}}>
                <h6>Admin</h6>
                <p>
                <Typography component='span' 
                sx={{padding: '2px 4px', backgroundColor:`${user?.isVerified ? 'success.main' : 'warning.main'}`, borderRadius:'4px'}}>
                {user?.isAdmin ? 'Yes' : 'No'}
                </Typography>
                </p>
                </Typography>
                <Typography component='div' sx={{'& > p':{fontSize:'18px', fontWeight:'bold'},'& > h6':{color:'primary.main'},width:{xs:'100%', md:'50%'}, my:2}}>
                <h6>Short Bio</h6>
                <p>{user?.bio}</p>
                </Typography>
            </Typography>
         </Paper>
         <Typography component='div' sx={{px:0, py:6, my:4}} >
            <h4 style={{paddingLeft:'24px'}}>User's Project List</h4>
            <ProjectTable queryString={`owner=${user?.id}`} />
         </Typography>
         <Typography component='div' sx={{px:0, py:6, my:4}}>
            <h4 style={{paddingLeft:'24px'}}>User's Request List</h4>
            <RequestTable queryString={`sender=${user?.id}`} />
         </Typography>
         </Container>
         
        </DialogContent>
      </Dialog>
  )
}
