/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/iframe-has-title */
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import ContactForm from '../sections/feedback/contactForm';
import Page from '../components/Page'
import useResponsive from '../hooks/useResponsive';


const ThumbnailStyle = styled('div')(({ theme }) => ({
    height: '600px',
    width:'100%',
    padding: theme.spacing(3),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: 'linear-gradient(to left, rgba(96, 92, 92, 0), rgba(96, 92, 92,1)),url(/static/preview.jpg)',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      alignItems: 'flex-start',
      padding: theme.spacing(0)
      // padding: theme.spacing(7, 5, 0, 7),
    },
  }));

  const ContentStyle = styled('div')(({ theme }) => ({
      position:'relative',
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
export default function Contact () {
    // const smUp = useResponsive('up', 'sm');

    const mdUp = useResponsive('up', 'md');
    return (
        <Page title='Contact'>
            <ThumbnailStyle>
                <Typography component='div' sx={overlayTextStyle}>
                    <Typography component='h2' 
                    sx={{fontSize:`${mdUp ? '70px' : '36px'}`, lineHeight:'1.0', '& > span': {color:'primary.main'}}}>
                        <span>Where</span><br/> to find us?
                    </Typography>
                    <Typography component='div' sx={{my:3}}>
                        <h2>Douala</h2>
                        <p>508 Bridle Avenue Newnan</p>
                        <p>GA 30263(239) 555-0108</p>
                    </Typography>
                </Typography>
            </ThumbnailStyle>
            <ContentStyle>
                <Typography component='div'  width={mdUp ? '45%' : '100%'} sx={{py:`${mdUp ? '10px' : '50px'}`}}>
                <h1>Feel free to contact us. We'll be glad to hear from you, buddy.</h1>
                    <ContactForm/>
                </Typography>
                <Typography component='div'  width={mdUp ? '45%' : '100%'}  sx={{transform:`${mdUp ? 'translateY(100px)' : 'none'}`}}>
                <div style={{position:'relative',textAlign:'right',height:'100%',width:'100%'}}>
                <div style={{overflow:'hidden',background:'none !important',height:'100%',width:'100%'}}>
               
                <iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=Petrolex%20Bonaberi&t=k&z=13&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
                </div>
                </div>
                    
                </Typography>
            </ContentStyle>
        </Page>
    )
}