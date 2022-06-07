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
        <DialogTitle id="responsive-dialog-title">
          {'Request Detail'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText >
            {!user?.isAdmin && <Typography component='div' sx={{'& > p':{fontSize:'14px', my:2}}}>
              <p>
                Sender's Name: <span style={{fontWeight:'bold'}}>{request?.sender?.name}</span>
              </p>
              <p>
                Sender's Email: <span style={{fontWeight:'bold'}}>{request?.sender?.email}</span>
              </p>
              <Divider sx={{my:1}}/>
            </Typography>}
            <Typography component='div' sx={{'& > p':{fontSize:'14px', my:2, '& > span':{ ml:1}}}}>
              <p>
                Request Type: <span style={{fontWeight:'bold'}}>{request?.request_type}</span>
              </p>
              <p>
                status: <span style={{fontWeight:'bold'}}>{capitalizeFirstLetter(request?.status)}</span>
              </p>
              <p>
                Detail: <span style={{fontWeight:'bold'}}>{request?.detail}</span>
              </p>
              <Divider sx={{my:1}}/>
            </Typography>
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