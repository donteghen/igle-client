import * as React from 'react';
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
import {getActiveColor, getPlanColor, getStatusColor} from '../../../utils/getColor'
import {capitalizeFirstLetter} from '../../../utils/formatString'
import { fDateTime } from '../../../utils/formatTime';

ProjectCard.propTypes = {
    project: PropTypes.object.isRequired
}

export default function ProjectCard ({project}) {

  return (
    <Card sx={{ maxWidth: 345, }}>
      <CardContent sx={{px:1}}>
        <Box sx={{display:'flex', justifyContent:'space-between'}}>
            <Chip label={capitalizeFirstLetter(project?.plan)} color={getPlanColor(project?.plan)} size='small' /> 
            <Chip label={capitalizeFirstLetter(project?.status)} color={getStatusColor(project?.status)} size='small' />
            <Chip label={`${project?.active ? 'Active' : 'Inactive'}`} color={getActiveColor(project?.active)} size='small' />
        </Box>
        <Divider sx={{my:1}} />
        <Typography variant="h4" color="text.secondary" sx={{}}>
          {project?.name.substr(0, 40)}...
        </Typography>
        <Typography component='p' color="text.secondary" sx={{fontSize:'12px', mt:1,'& > span': {fontWeight:'bold'}}} >
            {fDateTime(project?.updatedAt)}
        </Typography>
      </CardContent>
      <Divider sx={{mt:1}} />
      <CardActions disableSpacing >
        <IconButton aria-label="Edit" sx={{color:'warning.main'}} >
          <Iconify icon='bxs:edit' />
        </IconButton>
        <IconButton aria-label="view" sx={{color:'info.main'}}>
          <Iconify icon='carbon:view-filled' />
        </IconButton>
        <IconButton sx={{ml:'auto', color:'error.main'}} >
          <Iconify icon='fluent:delete-24-filled'  />
        </IconButton>
      </CardActions>
    </Card>
  );
}