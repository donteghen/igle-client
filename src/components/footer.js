import {Link} from 'react-router-dom'
import useResponsive from "../hooks/useResponsive"
import Iconify from "./Iconify"

const { Grid, Box, Typography, IconButton, Button, Divider } = require("@mui/material")

const styles = {
    btnLink: {
        transform: 'translateX(-16px)',
        fontWeight:500
    }
}
function MobileFooter () {
    return (
        <Box >
            <Grid container spacing={2} justifyContent='center' >
                <img src='/static/logo.svg' alt='logo' width={32} height={32} />
            </Grid>
            <Grid container spacing={2} justifyContent='center'>
                <Grid item xs={12} >
                    <Typography component='p' sx={{textAlign:'center'}}>
                    The starting point for your next project with Minimal UI Kit, built on the newest version of Material-UI ©, ready to be customized to your style.
                    </Typography>
                    <Typography component='div' sx={{display: 'flex', justifyContent:'center', my:2, py:2}}>
                        <IconButton color="primary" sx={{padding:'6px'}}>
                         <Iconify icon='fa-brands:facebook-f' sx={{width:24, height:24, m:1}} />
                        </IconButton>
                        <IconButton color="primary" sx={{padding:'6px'}}>
                         <Iconify icon='ant-design:instagram-filled' sx={{width:24, height:24, m:1}} />
                        </IconButton>
                        <IconButton color="primary" sx={{padding:'6px'}}>
                         <Iconify icon='fa:twitter' sx={{width:24, height:24, m:1}} />
                        </IconButton>
                        <IconButton color="primary" sx={{padding:'6px'}}>
                         <Iconify icon='akar-icons:linkedin-fill' sx={{width:24, height:24, m:1}} />
                        </IconButton>
                    </Typography>
                </Grid>
                <Grid item xs={12} textAlign='center' sx={{mb:2}}>
                    <h4>IGLE</h4>
                    <p><Button to="/about" size="small" variant="standard" component={Link} sx={{fontWeight:500}}>
                        About Us
                    </Button></p>
                    <p><Button to="/contact" size="small" variant="standard" component={Link} sx={{fontWeight:500}}>
                        Contact
                    </Button></p>
                    <p><Button to="/faqs" size="small" variant="standard" component={Link} sx={{fontWeight:500}}>
                        FAQs
                    </Button></p>
                </Grid>
                <Grid item xs={12} textAlign='center' sx={{mb:2}}>
                    <h4>LEGAL</h4>
                    <p><Button to="/about" size="small" variant="standard" component={Link} sx={{fontWeight:500}}>
                    Terms and Condition
                    </Button></p>
                    <p><Button to="/contact" size="small" variant="standard" component={Link} sx={{fontWeight:500}}>
                    Privacy Policy
                    </Button></p>
                </Grid>
                <Grid item xs={12} textAlign='center' sx={{mb:2}}>
                    <h4>CONTACT</h4>
                    <p><Button to="/about" size="small" variant="standard" component={Link} sx={{fontWeight:500}}>
                    support@minimals.cc
                    </Button></p>
                    <p><Button to="/contact" size="small" variant="standard" component={Link} sx={{fontWeight:500}}>
                    Los Angeles, 359 Hidden Valley Road
                    </Button></p>
                </Grid>
                <Grid item xs={12} textAlign='center' sx={{mb:2}}>
                    <p>© 2022. All rights reserved</p>
                </Grid>
            </Grid>
        </Box>
    )
}
function DesktopFooter () {
    return (
        <Box sx={{px:2}}>
            <Grid container spacing={2} justifyContent='start-left' >
                <img src='/static/logo.svg' alt='logo' width={64} height={64} style={{paddingLeft:'16px'}} />
            </Grid>
            <Grid container spacing={2} justifyContent='space-between'>
                <Grid item xs={3} >
                    <Typography component='p' sx={{fontSize:'14px'}}>
                    The starting point for your next project with Minimal UI Kit, built on the newest version of Material-UI ©, ready to be customized to your style.
                    </Typography>
                    <Typography component='div' sx={{justifyContent:'center', my:2, py:2}}>
                        <IconButton color="primary" sx={{padding:'6px'}}>
                         <Iconify icon='fa-brands:facebook-f' sx={{width:24, height:24, m:1}} />
                        </IconButton>
                        <IconButton color="primary" sx={{padding:'6px'}}>
                         <Iconify icon='ant-design:instagram-filled' sx={{width:24, height:24, m:1}} />
                        </IconButton>
                        <IconButton color="primary" sx={{padding:'6px'}}>
                         <Iconify icon='fa:twitter' sx={{width:24, height:24, m:1}} />
                        </IconButton>
                        <IconButton color="primary" sx={{padding:'6px'}}>
                         <Iconify icon='akar-icons:linkedin-fill' sx={{width:24, height:24, m:1}} />
                        </IconButton>
                    </Typography>
                </Grid>
                <Grid item xs={7}  sx={{mb:2}} display='flex' justifyContent='space-between'>
                   <div> 
                    <h4>IGLE</h4>
                        <p>
                            <Button to="/about" size="small" variant="standard" component={Link} sx={styles.btnLink}>
                                About
                            </Button>
                        </p>
                        <p>
                            <Button to="/contact" size="small" variant="standard" component={Link} sx={styles.btnLink}>
                                Contact
                            </Button>
                        </p>
                        <p>
                        <Button to="/faqs" size="small" variant="standard" component={Link} sx={styles.btnLink}>
                            FAQs
                        </Button>
                        </p>
                    </div>
                    <div>
                        <h4>LEGAL</h4>
                        <p><Button to="/terms-of-use" size="small" variant="standard" component={Link} sx={styles.btnLink}>
                        Terms and Condition
                        </Button></p>
                        <p><Button to="/privacy-policy" size="small" variant="standard" component={Link} sx={styles.btnLink}>
                        Privacy Policy
                        </Button></p>
                    </div>
                    <div>
                        <h4>CONTACT</h4>
                        <p><Button href="mailto:support@igle.com"  size="small" variant="standard" component='a'  sx={{...styles.btnLink, textTransform:'none'}} >
                        support@igle.cm
                        </Button></p>
                        <p><Button size="small" variant="standard"  sx={styles.btnLink}>
                        Mile 22, Limbe / Cameroon
                        </Button></p>
                    </div>
                </Grid>
                <Grid item xs={12} textAlign='center' sx={{mb:2}}>
                    <Divider />
                    <p>© 2022. All rights reserved</p>
                </Grid>
            </Grid>
        </Box>
    )
}

export default function Footer () {
    const isMobile = useResponsive('down', 'md')
    return (
        <Box sx={{pt:'100px'}}>
            {isMobile ? <MobileFooter /> : <DesktopFooter />}
        </Box>
    )
}