/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/iframe-has-title */
import styled from '@emotion/styled';
import { Typography, Box, Stack} from '@mui/material';
import { ValueWidgets } from '../components/ValueWidgets';
import { LinearProgressWithLabel } from '../components/LinearProgressWithLabel';
import Page from '../components/Page'
import useResponsive from '../hooks/useResponsive';
import { IntroVideoWidget } from '../components/IntroVideoWidget';


const ThumbnailStyle = styled('div')(({ theme }) => ({
    height: '600px',
    width:'100%',
    padding: theme.spacing(3),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: 'linear-gradient(to left, rgba(15, 57, 150, 0.5), rgba(15, 57, 150,0.8)), url(https://res.cloudinary.com/dpyl8tyll/image/upload/v1655192508/Igle/general/about-2_ktrii8.gif)',
    justifyContent: 'center',
    marginTop:'100px',
    [theme.breakpoints.up('md')]: {
      alignItems: 'flex-start',
      padding: theme.spacing(0)
      // padding: theme.spacing(7, 5, 0, 7),
    },
  }));

  const ContentStyle = styled('div')(({ theme }) => ({
      position:'relative',
    marginTop:'30px',
    padding: theme.spacing(3),
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
        display:'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: theme.spacing(7, 5, 0, 7),
    },
  }));

  const overlayTextStyle = {
    transform: 'translateY(125px)',
    paddingLeft: '20px'
  }

export default function About () {
    // const smUp = useResponsive('up', 'sm');

    const mdUp = useResponsive('up', 'md');
    return (
        <Page title='About'>
            <ThumbnailStyle>
                <Typography component='div' sx={overlayTextStyle}>
                    <Typography component='h2' 
                    sx={{ color:'white', fontSize:`${mdUp ? '70px' : '36px'}`, lineHeight:'1.0',  '& > span': {color:'primary.main'}}}>
                        <span>Who</span><br/> we are?
                    </Typography>
                    <Typography component='div' sx={{my:1, color:'white'}}>
                        <p style={{margin: '10px 0'}}>YOUR CONSTRUCTION PROJECT FULLY CAPTURED, TOTALLY COVERED</p>
                        <p style={{margin: '10px 0'}}>Construction Photos and Videos, 360 VR Walkthrough, UAV Services, and automated workflow solutions
from the Global Leader in Construction Documentation.</p>
                    </Typography>
                </Typography>
            </ThumbnailStyle>
            <ContentStyle>
                <Typography component='div'  width={mdUp ? '45%' : '100%'} sx={{py:`${mdUp ? '10px' : '50px'}`}}>
                    <img src='https://res.cloudinary.com/dpyl8tyll/image/upload/v1655906647/Igle/general/20945877_kgtjny.jpg' style={{height:'600px'}}  alt='igle' />
                </Typography>
                <Typography component='div'  width={mdUp ? '45%' : '100%'}  >
                    <h1>What is igle?</h1>
                    <p style={{margin: '10px 0'}}>Igle provides visual photo and video documentation solutions for construction projects of any size, across all verticals. Our visual documentation specialists are expertly trained to capture construction progress through inspection-grade photos, facility videos, drone and UAV (unmanned aerial vehicle) flights.</p>
                    <p style={{margin: '10px 0'}}>Igle then preserves a perfect record of your project, at every stage of its lifecycle, by linking the visual records(reports) to an interactive set of the plans. Project stakeholders (owners) can review the inspection-grade imagery, streaming video feeds, and facility videos online for remote monitoring and inspection</p>
                        <Stack>
                            <Box width='100%'>
                                <p>Monitoring</p>
                                <LinearProgressWithLabel title='Centralized Data' value={40} />
                            </Box>
                            <Box width='100%'>
                                <LinearProgressWithLabel title='Time Efficiency' value={70} />
                            </Box>
                            <Box width='100%'>
                                <LinearProgressWithLabel title='Fraud Reduction' value={35} />
                            </Box>
                            <Box width='100%'>
                                <LinearProgressWithLabel title='Satisfaction' value={90} />
                            </Box>
                        </Stack>
                </Typography>
            </ContentStyle>
            <ContentStyle>
                <Typography component='div'  width={mdUp ? '45%' : '100%'} sx={{py:`${mdUp ? '10px' : '30px'}`}}>
                    <Typography component='h1' sx={{fontSize:'50px', '& > span':{color:'primary.main'}}}>
                    Why project stackholders choose <span >igle</span>?
                    </Typography>
                </Typography>
                <Typography component='div'  width={mdUp ? '45%' : '100%'}  >
                    <h1>Why use Igle</h1>
                    <p style={{margin: '10px 0'}}>Igle comprehensively captures your project site using state-of-the art construction technologies, including high-definition photography, measurable 3D Images, drones/UAV, professional video, or 360° virtual walkthroughs.</p>
                    <p style={{margin: '10px 0'}}>Once the visual information is captured, Igle uploads and links the data into an interactive plan of the project in our robust, but intuitive, web-based platform.</p>
                    <p style={{margin: '10px 0'}}>All that imply, total control over your project from anywhere and more informed decision made.</p>
                </Typography>
            </ContentStyle>
            <ValueWidgets />
            <IntroVideoWidget />
        </Page>
    )
}