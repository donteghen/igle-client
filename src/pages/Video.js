import { useNavigate } from "react-router-dom"

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

// functions

// constants
import {DOCUMENTATIONOPTIONS, DOCUMENTATIONSPOT} from "../utils/constants/videoText"

const ListStyle = styled('ul')(({theme}) => ({
    listStyle:'none',
    paddingLeft:'24px',
    color: theme.palette.text.secondary,
    '& li' : {
        lineHeight:'24px',
        padding:'10px 0',
        ':before' : {
            content: '"\\2022"',
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            display: 'inline-block',
            width: '2em',
        }
    }
}))
const ThumbnailStyle = styled('div')(({ theme }) => ({
    height: '400px',
    width:'100%',
    padding: theme.spacing(3),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: 'linear-gradient(to left, rgba(15, 57, 150, 0.5), rgba(15, 57, 150,0.8)), url(https://res.cloudinary.com/dpyl8tyll/image/upload/v1656565872/Igle/general/bg-3_kxwuui.webp)',
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
    backgroundImage: 'linear-gradient(to left, rgba(15, 57, 150, 0.5), rgba(15, 57, 150,0.8)), url(https://res.cloudinary.com/dpyl8tyll/image/upload/v1655906647/Igle/general/20945877_kgtjny.jpg)',
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
    transform: 'translateY(75px)',
    padding: '20px'
}
export default function Video () {
    const navigate = useNavigate()

    const handleGetStarted = () => {
        navigate('/login')
    }
    return (
        <Page title='Video'>
            <ThumbnailStyle>
                <Typography component='div' sx={overlayTextStyle}>                   
                    <Typography component='h1' sx={{fontSize:{xs:'30px', md:'60px'}, lineHeight:1, my:3}}>
                    PROFESSIONAL CONSTRUCTION VIDEO DOCUMENTATION SERVICES
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
                {DOCUMENTATIONSPOT.map((step, index) => (
                    <Card sx={{ width:{xs:'100%', md:'45%'}, height:500, m:1, borderRadius:0 }} key={step.title + index} >
                        <CardMedia component='img' src={step.image}  sx={{height:'40%', width:'100%'}} /> 
                        <CardContent sx={{height:'60%', textAlign:'center'}} >
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
            </BgGreyStyle>
            <Box sx={{mt:12}}>
                <Typography sx={{textAlign:'center', py:3, fontWeight:'bolder', fontSize:{xs:'1.75rem', md: '2.75rem'}}}>HOW IT WORKS</Typography>
                <ContentStyle>
                {DOCUMENTATIONOPTIONS.map((step, index) => (
                    <Card sx={{ width:{xs:'100%', md:'45%'}, height:700, m:1, borderRadius:0 }} key={step.title + index} >
                        <CardMedia component='img' src={step.image}  sx={{height:'30%', width:'100%'}} />
                        <CardContent sx={{height:'70%', }} >
                            <Typography variant="h5" color="text.primary" sx={{mb:2}}>
                            {step.title}
                            </Typography>
                            <Typography variant="p" color="text.secondary" sx={{lineHeight:'25px'}}>
                            {step.descTitle}
                            </Typography>
                            <ListStyle>
                                {step.descDetailList.map((item, index) => <li key={item + index}>{item}</li>)}
                            </ListStyle>
                        </CardContent>
                    </Card>
                ))}
                </ContentStyle>
            </Box>
            
            <CallToActionStyle>
                <Typography component='div' sx={overlayTextStyle}>
                    <Typography component='h1' sx={{fontSize:{xs:'30px', md:'60px'}, lineHeight:1, my:3}}>
                    SEE WHAT PHOTO DOCUMENTATION CAN DO FOR YOUR PROJECTS
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