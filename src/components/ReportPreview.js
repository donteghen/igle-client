/* eslint-disable no-alert */
/* eslint-disable consistent-return */
/* eslint-disable no-useless-return */
import React  from 'react';
import PropTypes from 'prop-types'

// mui components
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import { capitalizeFirstLetter } from '../utils/formatString';

// components
import ImageReport from './report-content/ImageReport'
import VideoReport from './report-content/VideoReport'
import VirtualtourReport from './report-content/VirtualtourReport'
import Iconify from './Iconify';


const Transition = React.forwardRef((props, ref) =>  <Slide direction="up" ref={ref} {...props} />);

ReportPreview.propTypes = {
  openPreview:PropTypes.bool,
  onClosePreview: PropTypes.func,
  report: PropTypes.object, 
}

export default function ReportPreview({onClosePreview, openPreview, report}) {


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
              return <ImageReport images={report?.file.file_content} />
          case 'VIDEO' :
              return <VideoReport />
          case '360VR' :
              return <VirtualtourReport />
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
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {capitalizeFirstLetter(report?.file.file_type)} Report
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
        <DialogContent>
         {renderContent()}
        </DialogContent>
      </Dialog>
  )
}
