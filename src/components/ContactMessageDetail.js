/* eslint-disable no-useless-return */
import {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
// mui components
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
// functions
import {markContactMessageAsReplied} from '../services/api/contactMessage'

ContactMessageDetail.propTypes = {
  open:PropTypes.bool,
  onCloseDetail: PropTypes.func,
  contactMessage: PropTypes.object.isRequired, 
  user: PropTypes.object,
  onContactMessagesFetch: PropTypes.func.isRequired
}

function ContactMessageDetail({onCloseDetail, open, contactMessage, user, onContactMessagesFetch}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

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
    onContactMessagesFetch()
    handleClose()
  }
  const handleCloseError = () => {
    setError(false)
  }

  const handleClose = () => {
    onCloseDetail();
  };
  const handleUpdateReplied = () => {
    setLoading(true)
    setTimeout(() => {
      markContactMessageAsReplied(contactMessage?.id).then(result => {
        setLoading(false)
        if (!result.ok) {
          setError(true)
          return
        }
        setSuccess(true)
      }).catch(() => setLoading(false))
    }, 2000);
  }
  return (
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
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
        <AlertTitle>Status Update Successful</AlertTitle>
        Update operation completed — <strong>Click to close!</strong>
      </Alert>}
        <DialogTitle id="testimonial-id" sx={{'&.MuiDialogTitle-root':{fontSize:{xs:'20px', md:'30px'}}}}>
          {'Contact Message Detail Preview'}
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
        {!contactMessage?.replied && 
        <Button onClick={handleUpdateReplied} variant='outlined' >
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