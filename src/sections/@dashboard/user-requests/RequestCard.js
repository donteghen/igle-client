import React, {useState} from 'react';
import PropTypes from 'prop-types'
// import mui base components
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import  Divider  from '@mui/material/Divider';


// import project components
import Iconify from '../../../components/Iconify';

// import utils functions
import { getRequestStatusColor} from '../../../utils/getColor'
import {capitalizeFirstLetter} from '../../../utils/formatString'
import { fDateTime } from '../../../utils/formatTime';
import RequestDetail from '../../../components/RequestDetail';

RequestCard.propTypes = {
    request: PropTypes.object.isRequired
}

export default function RequestCard ({request}) {
  const [openDetail, setOpenDetail] = useState(false)

  
  const handleOpenDetail = () => {
      setOpenDetail(true)
  }
  const handleCloseDetail = () => {
    setOpenDetail(false)
  }
  return (
    <><Card sx={{ maxWidth: 345, }}>
      <CardContent sx={{px:1}}>
        <Box sx={{display:'flex', justifyContent:'space-between'}}>
            <Chip label={capitalizeFirstLetter(request?.request_type)} color='info' size='small' /> 
            <Chip label={capitalizeFirstLetter(request?.status)} color={getRequestStatusColor(request?.status)} size='small' />
        </Box>
        <Divider sx={{my:1}} />
        <Typography variant="h4" color="text.secondary" sx={{}}>
          {request?.project?.name.substr(0, 40)}...
        </Typography>
        <Typography component='p' color="text.secondary" sx={{fontSize:'12px', mt:1,'& > span': {fontWeight:'bold'}}} >
            {fDateTime(request?.createdAt)}
        </Typography>
      </CardContent>
      <Divider sx={{mt:1}} />
      <CardActions disableSpacing >
        <IconButton aria-label="view" sx={{color:'info.main'}} onClick={handleOpenDetail}>
          <Iconify icon='carbon:view-filled' />
        </IconButton>
        <IconButton sx={{ml:'auto', color:'error.main'}} >
          <Iconify icon='fluent:delete-24-filled'  />
        </IconButton>
      </CardActions>
    </Card>
    {<RequestDetail open={openDetail} onCloseDetail={handleCloseDetail} request={request} />}
    </>
  );
}