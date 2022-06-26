import * as React from 'react';
import PropTypes from 'prop-types'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SwipeableViews from 'react-swipeable-views';
// import { autoPlay } from 'react-swipeable-views-utils';
import Iconify from '../Iconify';

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

ImageReport.propTypes = {
  images:PropTypes.arrayOf(PropTypes.string).isRequired,
  overview: PropTypes.string.isRequired
}

export default function ImageReport({images, overview}) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <Typography sx={{overflow:'auto'}}>{images[activeStep]}</Typography>
      </Paper>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images?.map((image, index) => (
          <div key={image + index}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: {xs:'400px', md:'600px'},
                  display: 'block',
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={image}
                alt={image}
              />
            ) : null}
          </div>
        ))}
      </SwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <Iconify icon='bi:arrow-left-circle-fill' />
            ) : (
              <Iconify icon='bi:arrow-right-circle-fill' />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <Iconify icon='bi:arrow-right-circle-fill' />
            ) : (
              <Iconify icon='bi:arrow-left-circle-fill' />
            )}
            Back
          </Button>
        }
      />
      <Box sx={{my:2}}>
        <Paper square sx={{bgcolor:'primary.main', p:1, color:'white'}}>
        <h1 style={{textAlign:'center', margin:'10px 0'}}>Quick Overview</h1>
         <p style={{fontSize:'14px'}}>{overview}</p>
        </Paper>
      </Box>
    </Box>
  );
}