import {useState} from 'react';
import PropTypes from 'prop-types'
// import mui base components
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import  Divider  from '@mui/material/Divider';
// other components
import ReportPreview from '../../../components/ReportPreview'
// import utils functions
import {capitalizeFirstLetter} from '../../../utils/formatString'
import { fDateTime } from '../../../utils/formatTime';

ReportCard.propTypes = {
    report: PropTypes.object.isRequired
}

export default function ReportCard ({report}) {
  const [openPreview, setOpenPreview] = useState(false)

  const handleOpenPreview = () => {
      setOpenPreview(true)
  }
  const handleClosePreview = () => {
    setOpenPreview(false)
  }

  const isNew = () => (Date.now() - report?.date) <= 86400000
  
  const getIcon = (type) => {
    switch (type) {
      case 'IMAGES':
        return '/static/mock-images/reports/image-icon.png'
      case 'VIDEO':
        return '/static/mock-images/reports/video-icon.png'
      case '360VR':
        return '/static/mock-images/reports/360vr-icon.png'
      case 'WEBCAM':
        return '/static/mock-images/reports/webcam-icon.png'
      default:
        return '';
    }
  }
  return (
   <>
    <Card sx={{ maxWidth: 345, maxHeight:200, cursor:'pointer', transition:'transform 0.3s', '&:hover':{transform: 'translateY(-2px)'}}} 
      onClick={handleOpenPreview}>
      <CardContent sx={{px:1, py:'4px'}}>
        {isNew() && <Box sx={{display:'flex', justifyContent:'flex-end'}}>
            <Chip label='New' color='info' size='small' /> 
        </Box>}
        <Box sx={{display:'flex', justifyContent:'center'}}>
        <img src={getIcon(report?.file?.file_type)} style={{width:'100px', height:'100px'}}  alt={report?.file?.file_type}/> 
        </Box>
        <Divider sx={{mb:1}}/>
        <Typography component='p' color="text.secondary" sx={{fontSize:'12px', mt:1,'& > span': {fontWeight:'bold'}}} >
            {fDateTime(report?.createdAt)}
        </Typography>
        <Typography component='p' color="text.secondary" sx={{fontSize:'12px', mt:1,'& > span': {fontWeight:'bold'}}} >
            {capitalizeFirstLetter(report?.file?.file_type)}
        </Typography>
      </CardContent>
    </Card>
    {<ReportPreview openPreview={openPreview} onClosePreview={handleClosePreview} report={report} />}
    </> 
  );
}