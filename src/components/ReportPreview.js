/* eslint-disable consistent-return */
/* eslint-disable no-useless-return */
import React  from 'react';
import PropTypes from 'prop-types'

// mui components
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import { capitalizeFirstLetter } from '../utils/formatString';

// components
import ImageReport from './report-content/ImageReport'
import VideoReport from './report-content/VideoReport'
import virtualtourReport from './report-content/VirtualtourReport'
import Iconify from './Iconify';


const Transition = React.forwardRef((props, ref) =>  <Slide direction="up" ref={ref} {...props} />);

ReportPreview.propTypes = {
  openPreview:PropTypes.bool,
  onClosePreview: PropTypes.func,
  report: PropTypes.object, 
}

export default function ReportPreview({onClosePreview, openPreview, report}) {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    onClosePreview();
  };
  
  const renderContent = () => {
      if (!report) {
          window.alert('no report to render!')
          return
      }
      switch (report?.file?.file_type) {
          case 'IMAGES' :
              return <ImageReport />
          case 'VIDEO' :
              return <VideoReport />
          case '360VR' :
              return <virtualtourReport />
          default :
              return     
      }
  }
  return (
      <Dialog
        fullScreen
        open={openPreview}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-labelledby="report-preview"
      >
      <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <Iconify icon='gridicons:cross-circle' />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {capitalizeFirstLetter(report?.file.file_type)} Report
            </Typography>
            
          </Toolbar>
        </AppBar>
        <DialogContent>
         {renderContent()}
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions> */}
      </Dialog>
  )
}
const mapStateToProps = ({user}) => ({user})
