// main import 
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
import Plans from '../components/Plans'
import VideoPlayerModal from '../components/VideoPlayerModal'
// constants 
import { services } from '../utils/constants/services'
import { INDUSTRIES } from '../utils/constants/industries'
import { getTestimonials } from '../services/api/testimonial'


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
    const navigate = useNavigate()

    const [openVideo, setOpenVideo] = useState(false)
    const [testimonials, setTestimonials] = useState([])

    useEffect(() => {
        getTestimonials().then(result => {
          if (!result.ok) {
            return 
          }
          setTestimonials(result.data)
          console.log(result.data)
        }).catch(() => console.log('testimonial api fetch error'))
      }, [])

    const handleOpenVideo = () => {
        setOpenVideo(true)
    }
    const handleCloseVideo = () => {
        setOpenVideo(false)
    }
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
                    onClick={handleOpenVideo}
                    sx={{maxWidth:'200px', mt:3}}>
                        WATCH VIDEO
                    </Button>
                </Typography>
            </ThumbnailStyle>
            {(testimonials.length > 0) && <Box sx={{width: '100%', my:2, px:2, backgroundColor:'#fdfdfd', py:2}}>
                <FancyHeading >
                    Our Clients
                </FancyHeading>
                <TestimonialSlidder testimonials={testimonials}/>
            </Box>}
            <h2 style={{fontWeight:'bold', textAlign:'center', margin:'25px 0', fontSize:'2.75rem'}}>Services</h2>
            <ContentStyle>
                {services.map((service, index) => (
                    <Card sx={{ width:{xs:'100%', md:'45%'}, height:400, m:1 }} key={service.name + index} >
                        <CardMedia component="img" sx={{height:'50%'}} src={service.imgLink} alt={service.name} />
                        <CardContent sx={{height:'30%'}}>
                            <Typography variant="p" color="text.secondary">
                            {service.description}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing sx={{height:'20%'}}>
                            <Button aria-label="See more" onClick={() => navigate(`${service.pageLink}`)}>
                                LEARN MORE  <Iconify icon='bi:arrow-right-circle-fill' style={{marginLeft:'6px'}} />
                            </Button>
                        </CardActions>
                        
                    </Card>
                ))}
            </ContentStyle>
            <Plans />
            <IndustryStyle>
            <h2 style={{fontWeight:'bold',color:'white', textAlign:'center', margin:'25px 0', fontSize:'2.75rem'}}>Industries</h2>
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
            <VideoPlayerModal onClose={handleCloseVideo} open={openVideo} videoSrc='https://vimeo.com/710299090' />
        </Page>
    )
}