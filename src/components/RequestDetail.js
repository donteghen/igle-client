import * as React from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import  Divider  from '@mui/material/Divider';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { capitalizeFirstLetter } from '../utils/formatString';


RequestDetail.propTypes = {
  open:PropTypes.bool,
  onCloseDetail: PropTypes.func,
  request: PropTypes.object, 
  user: PropTypes.object
}

function RequestDetail({onCloseDetail, open, request, user}) {
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
              <p>
              <Typography component='span' 
              sx={{padding: '4px 8px', backgroundColor:'primary.light', borderRadius:'4px'}}>
              {capitalizeFirstLetter(request?.status)}
              </Typography>
              </p>
              {user?.isAdmin && <div style={{margin:'20px 0'}}>
              <span>Update Status: </span>
              <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button color='inherit'>Recieved</Button>
                <Button color='warning'>In-progress</Button>
                <Button color='success'>Processed</Button>
              </ButtonGroup>
              </div>}
            </Typography>
            <Divider sx={{mb:2}}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
  )
}
const mapStateToProps = ({user}) => ({user})
export default connect(mapStateToProps, null)(RequestDetail)