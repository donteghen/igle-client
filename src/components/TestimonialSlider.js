
import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

// mui components
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';

// other components
import Iconify from './Iconify'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const testimonials = [
    {
      author: 'Select campaign settings',
      rating:4,
      comment: `For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.`,
    },
    {
      author: 'Create an ad group',
      rating:5,
      comment:
        'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
      author: 'Create an ad',
      rating:3,
      comment: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
    },
    {
        author: 'Create an ad group',
        rating:5,
        comment:
          'An ad group contains one or more ads which target a shared set of keywords.',
      },
      {
        author: 'Create an ad',
        rating:3,
        comment: `Try out different ad text to see what brings in the most customers,
                  and learn how to enhance your ads using features like ad extensions.
                  If you run into any problems with your ads, find out how to tell if
                  they're running and how to resolve approval issues.`,
      },
  ];

function TestimonialSlidder() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = testimonials.length;

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
    <Box sx={{ width: '100%', background:'white', py:4}}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems: 'center',
          height: 50,          
        }}
      >
        <Typography component='h3' sx={{fontWeight:'bold',fontSize:''}}>
        {testimonials[activeStep].author}
        </Typography>
        <Typography component='div' sx={{my:1}}>
            <Rating value={testimonials[activeStep].rating} readOnly />
        </Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        interval={6000}
      >
        {testimonials.map((testimonial, index) => (
          <div key={testimonial.author + index}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="p"
                sx={{ maxHeight: 150, fontSize:'16px', textAlign:'center', px:2}} >{testimonial.comment}</Box>) :
                 null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <Paper elevation={0} sx={{bgcolor:'background.default'}}>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="large"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            
            {theme.direction === 'rtl' ? (
                <Iconify icon='bi:arrow-left-circle-fill' />
            ) : (
                <Iconify icon='bi:arrow-right-circle-fill' />
            )}
          </Button>
        }
        backButton={
          <Button size="large" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
                <Iconify icon='bi:arrow-right-circle-fill' />
            ) : (
                <Iconify icon='bi:arrow-left-circle-fill' />
            )}
            
          </Button>
        }
      />
      </Paper>
    </Box>
  );
}

export default TestimonialSlidder;