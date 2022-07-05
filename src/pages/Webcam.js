import {useNavigate} from 'react-router-dom'
// mui components
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import {styled} from '@mui/material/styles'

// other components
import Page from "../components/Page"
import VideoWidget from '../components/VideoWidget'

// functions

// constants
import {siteNameCapital} from '../utils/constants/global'
import { PROCEDURE } from "../utils/constants/webcamText"
import Iconify from "../components/Iconify"

const ThumbnailStyle = styled('div')(({ theme }) => ({
    height: '400px',
    width:'100%',
    padding: theme.spacing(3),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: 'linear-gradient(to left, rgba(15, 57, 150, 0.5), rgba(15, 57, 150,0.8)), url(https://res.cloudinary.com/dpyl8tyll/image/upload/v1656500894/Igle/general/360-photos_ho5nah.webp)',
    justifyContent: 'center',
    marginTop:'100px',
    [theme.breakpoints.up('md')]: {
      alignItems: 'flex-start',
      padding: theme.spacing(0)
      // padding: theme.spacing(7, 5, 0, 7),
    },
  }));
  const CallToActionStyle = styled('div')(({ theme }) => ({
    height: '400px',
    width:'100%',
    padding: theme.spacing(3),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: 'linear-gradient(to left, rgba(15, 57, 150, 0.5), rgba(15, 57, 150,0.8)), url(https://res.cloudinary.com/dpyl8tyll/image/upload/v1656513349/Igle/general/bg-2_w0ncop.jpg)',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      alignItems: 'flex-start',
      padding: theme.spacing(0)
      // padding: theme.spacing(7, 5, 0, 7),
    },
  }));
  const BgGreyStyle = styled('div')(({ theme }) => ({
    width:'100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: 'linear-gradient(to left, rgba(238, 234, 242, 0.8), rgba(238, 234, 242,0.8))', 
    justifyContent: 'center',
    padding: '100px 0',
    [theme.breakpoints.up('md')]: {
      alignItems: 'flex-start',
      padding:'100px 0'
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
    transform: 'translateY(105px)',
    padding: '20px'
}
export default function Webcam () {
    const navigate = useNavigate()

    return (
        <Page title='Webcam'>
            <ThumbnailStyle>
                <Typography component='div' sx={overlayTextStyle}>
                    <Typography component='h1' sx={{fontSize:{xs:'30px', md:'60px'}, lineHeight:1, my:3}}>  
                    LIVE CONSTRUCTION WEBCAMS WITH TIMELAPSE CAPABILITIES
                    </Typography>                   
                    </Typography>
            </ThumbnailStyle>
            <BgGreyStyle>
                <Typography sx={{textAlign:'center', py:3, fontWeight:'bolder', fontSize:{xs:'1.75rem', md: '2.75rem'}}}>HIGH DEFINITION WEBCAM STREAMING</Typography>
                <ContentStyle>
                    <Box sx={{width:{xs:'98%', md:'45%'}, height: '345px', p:{xs: 0, md:'20px 10px'}, background:'#0f3996'}}>
                        <VideoWidget videoSrc='https://vimeo.com/710299090' />
                    </Box>
                    <Box sx={{width:{xs:'98%', md:'45%'}, pt:{xs:4, md:0}, '& p':{my:3, lineHeight:'26px', fontSize:'18px'}}}>
                        <p>Utilizing high-quality, maintenance-free cameras has never been easier. Our construction webcam applications can be customized for use in any project, from single point-of-interest solutions to complete 360-degree perspectives of the entire jobsite.</p>
                        <p>We help coordinate every detail, including webcam setup, 24/7 hosting of the streaming video footage, and ongoing webcam maintenance.</p>
                    </Box>
                </ContentStyle>
            </BgGreyStyle>
            <Box sx={{mt:12}}>
                <Typography sx={{textAlign:'center', py:3, fontWeight:'bolder', fontSize:{xs:'1.75rem', md: '2.75rem'}}}>{`WHY CHOOSE ${siteNameCapital}’S  CONSTRUCTION WEBCAM CAMERAS`}</Typography>
                <ContentStyle>
                {PROCEDURE.map((step, index) => (
                    <Card sx={{ width:{xs:'100%', md:'45%'}, height:400, m:1, borderRadius:0 }} key={step.title + index} >
                        <CardMedia  sx={{height:'30%', textAlign:'center'}}>
                        <Iconify icon={step.icon} style={{fontSize:'100px', transform: 'translateY(15px)', color:'#0f3996'}} />
                        </CardMedia>
                        <CardContent sx={{height:'70%', textAlign:'center'}} >
                            <Typography variant="h5" color="text.primary" sx={{mb:2}}>
                            {step.title}
                            </Typography>
                            <Typography variant="p" color="text.secondary" sx={{lineHeight:'25px'}}>
                            {step.description}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
                </ContentStyle>
            </Box>
            <CallToActionStyle>
                <Typography component='div' sx={overlayTextStyle}>
                    <Typography component='h1' sx={{fontSize:{xs:'30px', md:'50px'}, lineHeight:1, my:3}}>
                    NEED MORE INFO ON WHAT WEBCAM CAN DO FOR YOUR PROJECTS ?
                    </Typography>
                    <Button variant='contained' size='large' color='primary' onClick={() => navigate('/contact')}
                    sx={{maxWidth:'200px', mt:3, borderRadius:0}}>
                        Get In Touch
                    </Button>
                </Typography>
            </CallToActionStyle>
        </Page>
    )
}