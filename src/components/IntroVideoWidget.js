// material Imports
import {Button, Grid,Paper, Box, Typography} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Iconify from './Iconify'

const styles = {
    TextPaper : {
         height:'450px', 
         width:'100%', 
         transform:{ md:'translate(40px, -50px)'},
         p:{xs:2, md:4},
         color:'white',
         backgroundColor:'primary.main'
    },
    videoPaper : {
        background:'linear-gradient(to left, rgba(0,0,0, 0.3), rgba(0,0,0, 0.6)),url(https://res.cloudinary.com/dpyl8tyll/image/upload/v1655192516/Igle/general/about-3_jg2yvs.gif)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
         height:'500px', 
         width:'100%', 
         position:'relative',
    },
    playBtnContainer: {
        margin:0,
        padding:0,
        cursor:'pointer',
        position:'absolute',
        top:{xs:'35%', md:'40%'},
        right:{xs:'35%', md:'40%'}
    },
    playBtn: {
        color:'primary.main',
        width:{xs: '120px', md:'140px'},
        height:{xs: '120px', md:'140px'},
        transition:'transform 0.3s, color 0.3s linear',
        '&:hover': {
            color:'primary.light',
            transform: 'scale(1.1)'
        }
    },
    joinBtn: {
        borderRadius:'15px', 
        color:'primary.main', 
        backgroundColor:'white',
        border:'2px solid transparent',
        transition:'border 2s, color 2s linear',
        mt:2,
        '&:hover': {
            border:'2px solid white',
            color:'white'
        }
    }
}
export function IntroVideoWidget () {
    const navigate = useNavigate()
    return (
        <Box sx={{mt:16, px:{xs:1, md:4}}}>
            <Grid container spacing={1} justifyContent='center'>
            <Grid item xs={12} md={4}>
                <Paper elevation={12} sx={styles.TextPaper}>
                    <h2 style={{marginBottom:'20px'}}>Saving your time and money by providing you with enterprise grade inovative solutions is our priority.</h2>
                    <p>No registration fee! No hidden payments! It's all prepaid project plan-based subscription, with plan upgrade options. You may also contact the client support for custom plans tailored to your specific needs.</p>
                    <Button sx={styles.joinBtn} onClick={() => navigate('/register')}>Join Us Now</Button>
                </Paper>
            </Grid>
            <Grid item xs={12} md={8} >
                <Paper elevation={1} sx={styles.videoPaper}>
                    
                    <Typography component='div' sx={styles.playBtnContainer}>
                        <Iconify icon='ant-design:play-circle-filled' sx={styles.playBtn}  />
                    </Typography>
                </Paper>        
            </Grid>
        </Grid> 
        </Box>
    )
}