import ReactPlayer from 'react-player/vimeo'
import PropTypes from 'prop-types'
import { useState } from 'react'
// mui components
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import Alert from '@mui/material/Alert'
import Paper from '@mui/material/Paper'

WebcamReport.propTypes = {
  feedUrl: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired
}

export default function WebcamReport ({feedUrl, overview})  {
  const [loading, setLoading] = useState(true)
  const [playerError, setPlayerError] = useState(false)
  setTimeout(() => {
    setLoading(false)
  }, 1500); 
  const renderVideoCard = () => (
   <>
   <Card sx={{ width:'100%', height:{xs: '200px', md: '100%'} }}>
          {!loading ? <>
          <ReactPlayer 
          onReady={() => setLoading(false)}
          onError={() => setPlayerError(true)}
          
          controls
              width='100%'
              height='100%'
              url={feedUrl}
              config={{
                vimeo: {
                  title: 'Webcam Feed Player'
                },
              }}
            />
            </> : <Box sx={{width: '100%', height:'100%'}}>
              
                <Skeleton variant="rectangular" sx={{width:'100%', height:'90%'}} />
                
            </Box>}
      </Card>
      <Box sx={{my:2}}>
              {!loading ? <Paper square sx={{bgcolor:'primary.main', p:1, color:'white'}}>
              <h1 style={{textAlign:'center', margin:'10px 0'}}>Quick Overview</h1>
              <p style={{fontSize:'14px'}}>{overview}</p>
              </Paper> : <Skeleton variant="text" sx={{width:'100%', height:'10%'}} />}
      </Box>
      </>
  )
  const renderError = () => (
    <Alert variant="filled" severity="error" onClose={() => setPlayerError(false)}>
  Oops something went wrong — Please check your connection and try reloading the page!
  </Alert>
  )
    return (
       <>
       {playerError ? renderError() : renderVideoCard()}
       </> 
    )
}