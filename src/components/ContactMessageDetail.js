import * as React from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

ContactMessageDetail.propTypes = {
  open:PropTypes.bool,
  onCloseDetail: PropTypes.func,
  contactMessage: PropTypes.object, 
  user: PropTypes.object
}

function ContactMessageDetail({onCloseDetail, open, contactMessage, user}) {
//   const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    onCloseDetail();
  };

  return (
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="testimonial-id" sx={{'&.MuiDialogTitle-root':{fontSize:{xs:'20px', md:'30px'}}}}>
          {'Testimonial Quick Detail Preview'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText > 
          <p>The information below contains all the details of the selected contact message.</p>
            <Typography component='div' sx={{'& > p':{fontSize:'14px', fontWeight:'bold'}, my:2}}>
              <h6>Sender's Name</h6>
              <p>{contactMessage?.name}</p>
            </Typography>
            <Typography component='div' sx={{'& > p':{fontSize:'14px', fontWeight:'bold'}, my:2}}>
              <h6>Sender's Email</h6>
              <p>{contactMessage?.email}</p>
            </Typography>
            <Typography component='div' sx={{'& > p':{fontSize:'14px', fontWeight:'bold'}, my:2}}>
              <h6>Phone Number</h6>
              <p>{contactMessage?.phone_number}</p>
            </Typography>
            <Typography component='div' sx={{'& > p':{fontSize:'14px', fontWeight:'bold'}, my:2}}>
              <h6>Subject</h6>
              <p>{contactMessage?.subject}</p>
            </Typography>
            <Typography component='div' sx={{'& > p':{fontSize:'14px', fontWeight:'bold'}, my:2}}>
              <h6>Message</h6>
              <p>{contactMessage?.message}</p>
            </Typography>
            <Typography component='div' sx={{'& > p':{fontSize:'14px', fontWeight:'bold'}, my:2}}>
              <h6>Replied</h6>
              <p>
              <Typography component='span' 
              sx={{padding: '4px 8px', backgroundColor:`${contactMessage?.replied ? 'success.main' : 'warning.main'}`, borderRadius:'4px'}}>
              {`${contactMessage?.replied ? 'Yes' : 'No'}`}
              </Typography>
              </p>
            </Typography>
            <Divider sx={{mb:2}}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        {user.isAdmin && 
        <Button onClick={handleClose} variant='outlined' >
            Mark as replied
          </Button>}
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
  )
}

const mapStateToProps = ({user}) => ({user})
export default connect(mapStateToProps, null)(ContactMessageDetail)