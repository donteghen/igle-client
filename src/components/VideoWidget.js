
import React from 'react';
import PropTypes from 'prop-types'
import ReactPlayer from 'react-player/vimeo'
// mui components

// components

// functions



VideoWidget.propTypes = {
  videoSrc: PropTypes.string.isRequired, 
}

export default function VideoWidget ({videoSrc}) {
  
  return (
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

  )
}