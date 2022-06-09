import * as React from 'react';
import PropTypes from 'prop-types'
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

TestimonialDetail.propTypes = {
  open:PropTypes.bool,
  onCloseDetail: PropTypes.func,
  testimonial: PropTypes.object, 
}

export default function TestimonialDetail({onCloseDetail, open, testimonial}) {
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
        aria-labelledby="testimonial-id"
      >
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
              {`${testimonial?.show ? 'Vissible' : 'Hidden'}`}
              </Typography>
              </p>
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
         { !testimonial?.show && <Button>
            Update Vissibility
          </Button>}
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
  )
}
