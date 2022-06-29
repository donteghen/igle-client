
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
import {siteNameCamel} from '../utils/constants/global'
import { PROCEDURE } from "../utils/constants/photo360Text"
import Iconify from "../components/Iconify"

const ThumbnailStyle = styled('div')(({ theme }) => ({
    height: '600px',
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
//   const BgBlueStyle = styled('div')(({ theme }) => ({
//     width:'100%',
//     marginBottom:'30px',
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     backgroundImage: 'linear-gradient(to left, rgba(15, 57, 150, 0.8), rgba(15, 57, 150,0.8))', 
//     justifyContent: 'center',
//     padding: '100px 0',
//     [theme.breakpoints.up('md')]: {
//       alignItems: 'flex-start',
//       padding:'100px 0'
//     },
//   }));
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
export default function Photo360 () {

    const handleGetStarted = () => {

    }
    return (
        <Page title='360 Photos'>
            <ThumbnailStyle>
                <Typography component='div' sx={overlayTextStyle}>
                    <Typography component='h1' sx={{fontSize:{xs:'18px', md:'20px'}, my:1}}>
                    360 PHOTO
                    </Typography>
                    <Typography component='h1' sx={{fontSize:{xs:'30px', md:'60px'}, lineHeight:1, my:3}}>
                    FULL-SERVICE CONSTRUCTION PROGRESS DOCUMENTATION
                    </Typography>
                    <Typography component='p' sx={{my:1, fontSize:{xs:'15px', md:'20px'}}}>
                    We capture 360 photos of your entire job site. You use them to manage your project more efficiently.
                    </Typography>
                    <Button variant='contained' size='large' color='primary' onClick={handleGetStarted}
                    sx={{maxWidth:'200px', mt:3, borderRadius:0}}>
                        Get Started
                    </Button>
                </Typography>
            </ThumbnailStyle>
            <BgGreyStyle>
                <Typography sx={{textAlign:'center', py:3, fontWeight:'bolder', fontSize:{xs:'1.75rem', md: '2.75rem'}}}>ACTIONABLE INSIGHTS FROM THE FIELD</Typography>
                <ContentStyle>
                    <Box sx={{width:{xs:'98%', md:'45%'}, height: '345px', p:{xs: 0, md:'20px 10px'}, background:'#0f3996'}}>
                        <VideoWidget videoSrc='https://vimeo.com/710299090' />
                    </Box>
                    <Box sx={{width:{xs:'98%', md:'45%'}, pt:{xs:4, md:0}, '& p':{my:3, lineHeight:'26px', fontSize:'18px'}}}>
                        <p>What if you could walk your job site virtually with up-to-date, accurate 360 photos?</p>
                        <p>With 360 Photo from {siteNameCamel}, project teams can update schedules, demonstrate progress to stakeholders, resolve RFIs and change orders, manage disputes, and get paid faster.</p>
                        <p>And unlike DIY solutions, {siteNameCamel} handles all the photography and data management for you, because the last thing you need is something else on your to-do list.</p>
                    </Box>
                </ContentStyle>
            </BgGreyStyle>
            <Box sx={{mt:12}}>
                <Typography sx={{textAlign:'center', py:3, fontWeight:'bolder', fontSize:{xs:'1.75rem', md: '2.75rem'}}}>HOW IT WORKS</Typography>
                <ContentStyle>
                {PROCEDURE.map((step, index) => (
                    <Card sx={{ width:{xs:'100%', md:'45%'}, height:400, m:1, borderRadius:0 }} key={step.title + index} >
                        <CardMedia  sx={{height:'30%', textAlign:'center'}}>
                        <Iconify icon={step.icon} style={{fontSize:'100px', transform: 'translateY(15px)'}} />
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
            <BgGreyStyle>
                <Typography sx={{textAlign:'center', py:3, fontWeight:'bolder', fontSize:{xs:'1.75rem', md: '2.75rem'}}}>RESOLVE RFIS, CHANGE ORDERS, AND DISPUTES.</Typography>
                <ContentStyle>
                <Box sx={{width:{xs:'98%', md:'45%'}, pt:{xs:4, md:0}, '& p':{my:3, lineHeight:'26px', fontSize:'18px'}}}>
                    <p>Accurate, up-to-date construction intelligence leads to more efficient decision making. When stakeholders can collectively review the same visual data, RFIs, change orders, and disputes can be addressed before they affect the schedule and costs.</p> 
                    <ul style={{listStyle:'inside', marginLeft:'24px'}}>
                        <li style={{padding:'4px 0'}}>Respond to every RFI quickly using photographic evidence that has already been captured in the field.</li>
                        <li style={{padding:'4px 0'}}>Verify completion of work remotely and complete change orders in just minutes</li>
                        <li style={{padding:'4px 0'}}>Use professionally captured 360 photos to verify claims and rapidly resolve disputes</li>
                    </ul>                       
                    </Box>
                    <Box sx={{width:{xs:'98%', md:'45%'}, height: '345px', }}>
                        <img src='https://res.cloudinary.com/dpyl8tyll/image/upload/v1655398758/Igle/general/360vr_xiizuo.jpg' style={{width:'100%', height:'100%'}} alt='git images' />
                    </Box>
                </ContentStyle>
            </BgGreyStyle>
            <CallToActionStyle>
                <Typography component='div' sx={overlayTextStyle}>
                    <Typography component='h1' sx={{fontSize:{xs:'30px', md:'60px'}, lineHeight:1, my:3}}>
                    SEE WHAT 360 PHOTOS CAN DO FOR YOUR PROJECTS
                    </Typography>
                    <Button variant='contained' size='large' color='primary' onClick={handleGetStarted}
                    sx={{maxWidth:'200px', mt:3, borderRadius:0}}>
                        Get Started
                    </Button>
                </Typography>
            </CallToActionStyle>
        </Page>
    )
}