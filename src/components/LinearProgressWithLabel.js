import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export  function LinearProgressWithLabel({value, title}) {
  return (
    <Box sx={{my:2}}>  
        <p>{title}</p>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress variant="determinate"  />
        </Box>
        <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">{`${Math.round(value)}%`}
            </Typography>
        </Box>
        </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
};