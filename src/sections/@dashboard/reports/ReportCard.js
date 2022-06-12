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
  return (
   <>
    <Card sx={{ maxWidth: 345, cursor:'pointer', transition:'transform 0.3s', '&:hover':{transform: 'translateY(-2px)'}}} 
      onClick={handleOpenPreview}>
      <CardContent sx={{px:1}}>
        <Box sx={{display:'flex', justifyContent:'flex-right'}}>
            <Chip label='New' color='info' size='small' /> 
        </Box>
        <img src='/static/logo.svg' width='100%' height='100px'  alt={report?.file?.file_type}/>
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