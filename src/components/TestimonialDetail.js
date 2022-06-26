import {useState, useEffect} from 'react';
import PropTypes from 'prop-types'
// mui components 
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
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
import {updateTestimonialShow} from '../services/api/testimonial'

TestimonialDetail.propTypes = {
  open:PropTypes.bool,
  onCloseDetail: PropTypes.func,
  testimonial: PropTypes.object, 
  onTestimonialFetch:PropTypes.func.isRequired
}

export default function TestimonialDetail({onCloseDetail, open, testimonial, onTestimonialFetch}) {
//   const [open, setOpen] = React.useState(false);
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
    onTestimonialFetch()
    handleClose()
  }
  const handleCloseError = () => {
    setError(false)
  }
  const handleClose = () => {
    onCloseDetail();
  };

  const handleUpdateShowStatus = () => {
    setLoading(true)
    setTimeout(() => {
      updateTestimonialShow(testimonial?.id).then(result => {
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
        aria-labelledby="testimonial-id"
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
          {'Testimonial Quick Detail Preview'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText > 
          <p>The information below contains all the details of the selected testimonial.</p>
            <Typography component='div' sx={{'& > p':{fontSize:'14px', fontWeight:'bold'}, my:2}}>
              <h6>Author's Name</h6>
              <p>{testimonial?.author.name}</p>
            </Typography>
            <Typography component='div' sx={{'& > p':{fontSize:'14px', fontWeight:'bold'}, my:2}}>
              <h6> Author's Email</h6>
              <p>{testimonial?.author.email}</p>
            </Typography>
            <Typography component='div' sx={{'& > p':{fontSize:'14px', fontWeight:'bold'}, my:2}}>
              <h6>Rating</h6>
              <p><Rating name="rating" value={testimonial?.rating} readOnly /></p>
            </Typography>
            <Typography component='div' sx={{'& > p':{fontSize:'14px', fontWeight:'bold'}, my:2}}>
              <h6>Comment</h6>
              <p>{testimonial?.comment}</p>
            </Typography>
            <Typography component='div' sx={{'& > p':{fontSize:'14px', fontWeight:'bold'}, my:2}}>
              <h6>Vissible</h6>
              <p>
              <Typography component='span' 
              sx={{padding: '4px 8px', backgroundColor:`${testimonial?.show ? 'success.main' : 'warning.main'}`, borderRadius:'4px'}}>
              {`${testimonial?.show ? 'Show' : 'Hide'}`}
              </Typography>
              </p>
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateShowStatus} variant='outlined' color={testimonial?.show ? 'warning' : 'success'}>
             {testimonial?.show ? 'Disable Show' : 'Enable Sow'}
          </Button>
          <Button onClick={handleClose} autoFocus variant='outlined'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
  )
}
