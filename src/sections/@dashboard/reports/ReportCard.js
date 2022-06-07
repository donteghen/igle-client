import * as React from 'react';
import PropTypes from 'prop-types'
import { useEffect } from 'react';
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
import {getActiveColor, getPlanColor, getStatusColor} from '../../../utils/getColor'
import {capitalizeFirstLetter} from '../../../utils/formatString'
import { fDateTime } from '../../../utils/formatTime';

ReportCard.propTypes = {
    report: PropTypes.object.isRequired
}

export default function ReportCard ({report}) {
    useEffect(() => {
        console.log(report)
    }, [])
  return (
    <Card sx={{ maxWidth: 345, }}>
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
  );
}