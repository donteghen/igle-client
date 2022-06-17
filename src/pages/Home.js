// main import 

// mui components 
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import {styled} from '@mui/material/styles'
// other components
import Page from '../components/Page'
import TestimonialSlidder from '../components/TestimonialSlider'
import Iconify from '../components/Iconify'
// import imageIcon from '/static/mock-images/report/360vr-icon.png'
// constants 
import { services } from '../utils/constants/services'
import { INDUSTRIES } from '../utils/constants/industries'


const ThumbnailStyle = styled('div')(({ theme }) => ({
    height: '700px',
    width:'100%',
    padding: theme.spacing(3),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: 'linear-gradient(to left, rgba(15, 57, 150, 0.5), rgba(15, 57, 150,0.8)), url(https://res.cloudinary.com/dpyl8tyll/image/upload/v1655377065/Igle/general/home_eoxfsl.webp)',
    justifyContent: 'center',
    marginTop:'100px',
    [theme.breakpoints.up('md')]: {
      alignItems: 'flex-start',
      padding: theme.spacing(0)
      // padding: theme.spacing(7, 5, 0, 7),
    },
  }));
  const FancyHeading = styled('h2')(({ theme }) => ({
    position:'relative',
    width:'100%',
    padding: theme.spacing(3),
    justifyContent: 'center',
    ':before':{
        content:'""',
        backgroundColor:theme.palette.primary.main,
        width: '50px',
        height:'4px',
        display:'inline-block',
        verticalAlign:'middle',        
        marginRight:'8px',
        [theme.breakpoints.up('md')]: {
            alignSelf:'center',
            width: '200px',
            height:'4px',
          },
    },
    ':after':{
        content:'""',
        backgroundColor:theme.palette.primary.main,
        width: '50px',
        height:'4px',
        display:'inline-block',
        marginLeft:'8px',
        verticalAlign:'middle',
        [theme.breakpoints.up('md')]: {
            alignSelf:'center',
            width: '200px',
            height:'4px',
          },
    },
    [theme.breakpoints.up('md')]: {
      display:'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: theme.spacing(7, 5, 0, 7),
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
      padding: theme.spacing(2, 7, 0, 7),
    },
    }));

    const overlayTextStyle = {
        textAlign:'center',
        display: 'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        color:'white',
        transform: 'translateY(125px)',
        padding: '20px'
    }
    const IndustryStyle = styled('div')(({ theme }) => ({
        height: '750px',
        width:'100%',
        padding: theme.spacing(3),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: 'linear-gradient(to left, rgba(15, 57, 150, 0.5), rgba(15, 57, 150,0.8)), url(https://res.cloudinary.com/dpyl8tyll/image/upload/v1655429394/Igle/general/topview_ijo3zf.jpg)',
        justifyContent: 'center',
        marginTop:'50px',
        [theme.breakpoints.up('md')]: {
          height: '500px',
          alignItems: 'flex-start',
          padding: theme.spacing(0)
          // padding: theme.spacing(7, 5, 0, 7),
        },
    }));

    const iconStyles = {
        width:{xs:'45%', md:'20%'},
        padding:'10px', 
        borderRadius:'4px', 
        textAlign:'center',
        backgroundColor:'white',
        my:{xs:1, md:2},
        mx:{xs:1, md:2}, 
        transition: 'transform 0.4s',
        '&:hover': {
            transform: 'scale(1.02)'
        }
    }

export default function Home () {
    
    return (
        <Page title='Home'>
        <ThumbnailStyle>
                <Typography component='div' sx={overlayTextStyle}>
                    <Typography component='h1' sx={{fontSize:{xs:'30px', md:'60px'}, lineHeight:1}}>
                    YOUR CONSTRUCTION PROJECT FULLY CAPTURED, TOTALLY COVERED
                    </Typography>
                    <Typography component='p' sx={{my:1, fontSize:{xs:'15px', md:'20px'}}}>
                        Construction Photos and Videos, 360 Photo, Webcams, UAV Services, and automated workflow solutions from the Global Leader in Construction Documentation.
                    </Typography>
                    <Button variant='contained' size='large' color='primary' 
                    sx={{maxWidth:'200px', mt:3}}>
                        WATCH VIDEO
                    </Button>
                </Typography>
            </ThumbnailStyle>
            <Box sx={{width: '100%', my:2, px:2, backgroundColor:'#fdfdfd', py:2}}>
                <FancyHeading >
                    Our Clients
                </FancyHeading>
                <TestimonialSlidder />
            </Box>
            <h2 style={{fontWeight:'bold',  paddingLeft:'30px', marginTop:'100px'}}>Services</h2>
            <ContentStyle>
                {services.map((service, index) => (
                    <Card sx={{ maxWidth: 345, height:400, my: 1 }} key={service.name + index} >
                        <CardMedia component="img" sx={{height:'50%'}} src={service.imgLink} alt={service.name} />
                        <CardContent sx={{height:'30%'}}>
                            <Typography variant="p" color="text.secondary">
                            {service.description}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing sx={{height:'20%'}}>
                            <Button aria-label="See more">
                                LEARN MORE  <Iconify icon='bi:arrow-right-circle-fill' style={{marginLeft:'6px'}} />
                            </Button>
                        </CardActions>
                        
                    </Card>
                ))}
            </ContentStyle>
            <IndustryStyle>
            <h2 style={{fontWeight:'bold',color:'white', paddingLeft:'30px', margin:'24px 0'}}>Industries</h2>
            <Box sx={{display: 'flex', flexWrap:'wrap', justifyContent:'space-between', alignContent:'center'}}>
                {INDUSTRIES.map((industry, index) => (
                    <Box key={industry.title + index} component='div' sx={iconStyles}>
                    <Box component='div'>
                        <Iconify icon={industry.iconName} style={{fontSize:'60px', color:'rgb(15, 57, 150)'}} />
                    </Box>
                    <p>{industry.title}</p>
                    </Box>
                ))}
            </Box>
            </IndustryStyle>
        </Page>
    )
}