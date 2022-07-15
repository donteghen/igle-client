import {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
// mui components
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip'
// functions
import { capitalizeFirstLetter } from '../utils/formatString';
import {updateRequestStatus} from '../services/api/request'
import { getRequestStatusColor } from '../utils/getColor';
import Iconify from './Iconify';



RequestDetail.propTypes = {
  open:PropTypes.bool,
  onCloseDetail: PropTypes.func,
  request: PropTypes.object.isRequired, 
  user: PropTypes.object,
  onRequestFetch:PropTypes.func.isRequired
}

function RequestDetail({onCloseDetail, open, request, user, onRequestFetch}) {
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

  const handleClose = () => {
    onCloseDetail();
  };

  const handleCloseSuccess = () => {
    setSuccess(false)
    onRequestFetch()
    handleClose()
  }
  const handleCloseError = () => {
    setError(false)
  }
  const handleStatusChange = (newStatus) => {
    setLoading(true)
    setTimeout(() => {
      updateRequestStatus(request?.id, newStatus).then(result => {
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
          {'Request Quick Detail Preview'}
          <IconButton sx={{float:'right'}} color='primary' onClick={handleClose}>
            <Iconify icon='gridicons:cross-circle' style={{fontSize:'30px'}} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText > 
          <p>The information below contains all the details of the selected request.</p>
            {user?.isAdmin && <>
            <Typography component='div' sx={{'& > p':{fontSize:'14px', fontWeight:'bold'},'& > h6':{color:'primary.main',}, my:2}}>
              <h6>Sender's Name</h6>
              <p>{request?.sender.name}</p>
            </Typography>
            <Typography component='div' sx={{'& > p':{fontSize:'14px', fontWeight:'bold'},'& > h6':{color:'primary.main',}, my:2}}>
              <h6>Sender's Email</h6>
              <p>{request?.sender.email}</p>
            </Typography></>}
            <Typography component='div' sx={{'& > p':{fontSize:'14px', fontWeight:'bold'},'& > h6':{color:'primary.main',}, my:2}}>
              <h6>Related Project</h6>
              <p>{request?.project.name}</p>
            </Typography>
            <Typography component='div' sx={{'& > p':{fontSize:'14px', fontWeight:'bold'},'& > h6':{color:'primary.main',}, my:2}}>
              <h6>Request Type</h6>
              <p>{request?.request_type}</p>
            </Typography>
            <Typography component='div' sx={{'& > p':{fontSize:'14px', fontWeight:'bold'},'& > h6':{color:'primary.main',}, my:2}}>
              <h6>Detail</h6>
              <p>{request?.detail}</p>
            </Typography>
            <Typography component='div' sx={{'& > p':{fontSize:'14px', fontWeight:'bold'},'& > h6':{color:'primary.main',}, my:2}}>
              <h6>Status</h6>
              <p><Chip label={capitalizeFirstLetter(request?.status)} color={getRequestStatusColor(request?.status)} /></p>
              {user?.isAdmin && <div style={{margin:'20px 0'}}>
              <span>Update Status: </span>
              <ButtonGroup variant="contained" aria-label="outlined primary button group" >
                <Button color='inherit' onClick={() => handleStatusChange('RECIEVED')}>Recieved</Button>
                <Button color='warning' onClick={() => handleStatusChange('IN_PROGRESS')}>In-progress</Button>
                <Button color='success' onClick={() => handleStatusChange('PROCESSED')}>Processed</Button>
              </ButtonGroup>
              </div>}
            </Typography>
          </DialogContentText>
        </DialogContent>
        
      </Dialog>
  )
}
const mapStateToProps = ({user}) => ({user})
export default connect(mapStateToProps, null)(RequestDetail)