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
    backgroundImage: 'linear-gradient(to left, rgba(96, 92, 92, 0), rgba(96, 92, 92,1)), url(/static/preview.jpg)',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      alignItems: 'flex-start',
      padding: theme.spacing(0)
      // padding: theme.spacing(7, 5, 0, 7),
    },
  }));

  const ContentStyle = styled('div')(({ theme }) => ({
      position:'relative',
    marginTop:'70px',
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
    transform: 'translateY(300px)',
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
                    sx={{fontSize:`${mdUp ? '70px' : '36px'}`, lineHeight:'1.0', '& > span': {color:'primary.main'}}}>
                        <span>Who</span><br/> we are?
                    </Typography>
                    <Typography component='div' sx={{my:3}}>
                        <p>We take care of the heavy lifting</p>
                        <p>While You relax and monitor your work at your convinience</p>
                    </Typography>
                </Typography>
            </ThumbnailStyle>
            <ContentStyle>
                <Typography component='div'  width={mdUp ? '45%' : '100%'} sx={{py:`${mdUp ? '10px' : '50px'}`}}>
                    <img src='/static/preview.jpg' height='400px'  alt='igle' />
                </Typography>
                <Typography component='div'  width={mdUp ? '45%' : '100%'}  >
                    <h1>What is minimal?</h1>
                    <p>Our theme is the most advanced and user-friendly theme you will find on the market, we have documentation and video to help set your site really easily, pre-installed demos you can import in one click and everything from the theme options to page content can be edited from the front-end. This is the theme you are looking for.</p>
                        <Stack>
                            <Box width='100%'>
                                <p>Monitoring</p>
                                <LinearProgressWithLabel title='Develop Cost Reduction' value={20} />
                            </Box>
                            <Box width='100%'>
                                <LinearProgressWithLabel title='Time Saved' value={70} />
                            </Box>
                            <Box width='100%'>
                                <LinearProgressWithLabel title='Operation Speed Up' value={35} />
                            </Box>
                            <Box width='100%'>
                                <LinearProgressWithLabel title='Satisfaction Rate' value={90} />
                            </Box>
                        </Stack>
                </Typography>
            </ContentStyle>
            <ContentStyle>
                <Typography component='div'  width={mdUp ? '45%' : '100%'} sx={{py:`${mdUp ? '10px' : '50px'}`}}>
                <Typography component='h1' sx={{fontSize:'50px', '& > span':{color:'primary.main'}}}>
                Why project developers choose <span >igle</span>?
                </Typography>
                </Typography>
                <Typography component='div'  width={mdUp ? '45%' : '100%'}  >
                    <h1>What is minimal</h1>
                    <p>Our theme is the most advanced and user-friendly theme you will find on the market, we have documentation and video to help set your site really easily, pre-installed demos you can import in one click and everything from the theme options to page content can be edited from the front-end. This is the theme you are looking for.</p>
                </Typography>
            </ContentStyle>
            <ValueWidgets />
            <IntroVideoWidget />
        </Page>
    )
}