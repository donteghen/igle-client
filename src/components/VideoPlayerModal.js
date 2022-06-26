
import React from 'react';
import PropTypes from 'prop-types'
import ReactPlayer from 'react-player/vimeo'
// mui components
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
// components
import Iconify from './Iconify';
// functions



VideoPlayerModal.propTypes = {
  open:PropTypes.bool,
  onClose: PropTypes.func,
  videoSrc: PropTypes.string.isRequired, 
}

export default function VideoPlayerModal({onClose, open, videoSrc}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.up('md'));
  const handleClose = () => {
    onClose();
  };
  
  return (
      <Dialog
        fullWidth
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby=" Generic Video Player Component"
      >
      <DialogTitle sx={{p:0}}>
          <IconButton sx={{color:'primary.main', float:'right'}} onClick={handleClose}>
            <Iconify icon='eva:close-circle-fill' />
          </IconButton>
      </DialogTitle>
        <DialogContent >
        <ReactPlayer 
              width='100%'
              height='100%'
              url={videoSrc}
              style={{height:'100% !important'}}
              config={{
                vimeo: {
                  title: 'Introduction video'
                },
              }}
            />
        </DialogContent>
      </Dialog>
  )
}