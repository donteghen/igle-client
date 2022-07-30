import {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
// mui components
import Button from '@mui/material/Button';
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
import Divider from '@mui/material/Divider'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
// functions
import { capitalizeFirstLetter } from '../utils/formatString';
import { getPaymentRefundedColor } from '../utils/getColor';
import Iconify from './Iconify';
import { markAsRefunded } from '../services/api/payment';
import { fDateTime } from '../utils/formatTime';





PaymentDetail.propTypes = {
  open:PropTypes.bool,
  onCloseDetail: PropTypes.func,
  payment: PropTypes.object.isRequired, 
  user: PropTypes.object,
  onPaymentFetch:PropTypes.func.isRequired
}

function PaymentDetail({onCloseDetail, open, payment, user, onPaymentFetch}) {
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
    onPaymentFetch()
    handleClose()
  }
  const handleCloseError = () => {
    setError(false)
  }
  const handleConfirmRefund = () => {
    setLoading(true)
    setTimeout(() => {
      markAsRefunded(payment?.id).then(result => {
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
        sx={{py:6}}
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
          {'Payment Summary Preview'}
          <IconButton sx={{float:'right'}} color='primary' onClick={handleClose}>
            <Iconify icon='gridicons:cross-circle' style={{fontSize:'30px'}} />
          </IconButton>
        </DialogTitle>
        <DialogContent >
          <DialogContentText > 
            <Stack spacing={3}>
            <Card>
              <CardContent>
                  <p>The information below contains a summary of the payment.</p>
                {user?.isAdmin && <>
                <Typography component='div' sx={{'& > p':{fontSize:'14px', fontWeight:'bold'},'& > h6':{color:'primary.main',}, my:2}}>
                  <h6>Account Owner</h6>
                  <p>{payment?.sender.name}</p>
                </Typography>
                <Typography component='div' sx={{'& > p':{fontSize:'14px', fontWeight:'bold'},'& > h6':{color:'primary.main',}, my:2}}>
                  <h6>Linked Email</h6>
                  <p>{payment?.sender.email}</p>
                </Typography></>}
                <Typography component='div' sx={{'& > p':{fontSize:'14px', fontWeight:'bold'},'& > h6':{color:'primary.main',}, my:2}}>
                  <h6>Project Name</h6>
                  <p>{payment?.project.name}</p>
                </Typography>
                <Typography component='div' sx={{'& > p':{fontSize:'14px', fontWeight:'bold'},'& > h6':{color:'primary.main',}, my:2}}>
                  <h6>Project Plan</h6>
                  <p style={{}}>{payment?.project.plan}</p>
                </Typography>
                <Typography component='div' sx={{'& > p':{fontSize:'14px', fontWeight:'bold'},'& > h6':{color:'primary.main',}, my:2}}>
                  <h6>Payment Method</h6>
                  <p>{payment?.method}</p>
                </Typography>
                <Typography component='div' sx={{'& > p':{fontSize:'14px', fontWeight:'bold'},'& > h6':{color:'primary.main',}, my:2}}>
                  <h6>Payment Date</h6>
                  <p>{fDateTime(payment?.createdAt)}</p>
                </Typography>
                <Divider  sx={{my:1}} />
                <Typography component='div' sx={{'& > p':{fontSize:'14px', fontWeight:'bold'},'& > h6':{color:'primary.main',}, my:2, display:'flex', justifyContent:'space-between'}}>
                <h6>Amount{' : '} 
                <Chip size='small' label={`XAF ${payment.amount}`} color='primary' />
                </h6>
                <h6>Status{' : '} 
                <Chip size='small' label={capitalizeFirstLetter(payment?.refunded ? 'Refunded' : 'Paid')} color={getPaymentRefundedColor(payment?.refunded)} />
                </h6>   
                           
              </Typography>
              </CardContent>

            </Card>           
              {(user?.isAdmin && !payment?.refunded) && 
              <Card>
                <CardContent sx={{ textAlign:'center', '& > p':{fontSize:'14px', fontWeight:'bold'},}} >              
                  <p>Click on the button below to confirm a refund</p> 
                  <Button color='error' size='small' onClick={handleConfirmRefund} variant='contained'>
                      <Iconify icon="mdi:cash-refund"  width={24} height={24}  /> Refund
                  </Button>                 
                </CardContent>
              </Card>
              }
            </Stack>
          </DialogContentText>
        </DialogContent>
        
      </Dialog>
  )
}
const mapStateToProps = ({user}) => ({user})
export default connect(mapStateToProps, null)(PaymentDetail)