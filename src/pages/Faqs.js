import { Box, Button, Paper, Accordion, AccordionDetails, Typography, AccordionSummary } from "@mui/material"
import {  useNavigate, Link } from "react-router-dom"
import Page from "../components/Page"
import Iconify from "../components/Iconify"

const styles = {
    mainBox: {
        mx: { xs:'20px', md: '100px'}, 
        mt:10,
        py:10,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: 'linear-gradient(to left, rgba(96, 92, 92, 0), rgba(96, 92, 92,0)), url(/static/bg/bg-1.webp)',
    }
}
export default function Faqs () {
    const navigate = useNavigate()
    return (
       <Page title='FAQs'>
            <Box sx={styles.mainBox} >
            <h1 style={{margin:'20px 0'}}>
            <Iconify icon='flat-color-icons:answers' sx={{verticalAlign:'middle', fontSize:'40px', marginRight:'5px'}} />
            Frequently Asked Questions </h1>
            <Box>
                <Paper sx={{p:2}}>
                    <span style={{marginRight:'6px', fontWeight:'bold', fontSize:'18px'}}>Have more questions?</span>
                    <span style={{marginRight:'6px',color:'gray',fontSize:'18px'}}>Don't hesitate to ask <Iconify icon='fa-solid:angle-right' sx={{verticalAlign:'middle'}}/></span> 
                    <Button variant='contained' size="small" onClick={() => navigate('/contact')} 
                    sx={{textTransform:'none', borderRadius:'18px'}} >
                    Submit a request
                    </Button>
                </Paper>
            </Box>
            <Box>
            <h2 style={{marginTop:'50px'}}> How to use autobazar website</h2>
            <Accordion>
                <AccordionSummary
                expandIcon={<Iconify icon='flat-color-icons:expand' />}
                aria-controls={`panel1a-content`}
                id={`panel1a-header`}
                >
                <Typography component='h3' sx={{color:'gray'}}>
                <Iconify icon='ic:outline-help' color='primary' style={{verticalAlign:'middle', fontSize:'40px', marginRight:'20px'}}/>
                How do I buy a used car from autobazar?
                </Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography sx={{display:'flex', justifyContent:'flex-start', paddingTop:'20px',borderTop:'1px solid gray'}}>
                <ol>
                    <li>Search for your vehicle and send us an inquiry</li>
                    <li>After we agree, we start-off all legal procedures</li>
                    <li>Make your payments and collect your product</li>
                </ol>
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                expandIcon={<Iconify icon='flat-color-icons:expand' />}
                aria-controls={`panel2a-content`}
                id={`panel2a-header`}
                >
                <Typography component='h3' sx={{color:'gray'}}>
                <Iconify icon='ic:outline-help' color='primary' style={{verticalAlign:'middle', fontSize:'40px', marginRight:'20px'}}/>
                What languages do you speak?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography sx={{display:'flex', justifyContent:'space-between', paddingTop:'20px',borderTop:'1px solid gray'}}>
                    <span>
                    Our team Is ready to support you in 5 languages (English and French)
                    Please send us a WhatsApp message at 
                    <span style={{color:'var(--theme-blue)'}}> +905364802141</span> 
                    or email us at <span style={{color:'var(--theme-blue)'}}> info@autobazar.com</span>
                    </span>
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                expandIcon={<Iconify icon='flat-color-icons:expand' />}
                aria-controls={`panel3a-content`}
                id={`panel3a-header`}
                >
                <Typography component='h3' sx={{color:'gray'}}>
                <Iconify icon='ic:outline-help' color='primary' style={{verticalAlign:'middle', fontSize:'40px', marginRight:'20px'}}/>
                What currency are the prices displayed in?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography sx={{display:'flex', justifyContent:'flex-start', paddingTop:'20px',borderTop:'1px solid gray'}}>
                <span>All prices displayed are in XAF (BEAC CFA)</span>
                </Typography>
                </AccordionDetails>
            </Accordion>

            <h2 style={{marginTop:'50px'}}>Payment</h2>

            <Accordion>
                <AccordionSummary
                expandIcon={<Iconify icon='flat-color-icons:expand' />}
                aria-controls={`panel4a-content`}
                id={`panel4a-header`}
                >
                <Typography component='h3' sx={{color:'gray'}}>
                <Iconify icon='ic:outline-help' color='primary' style={{verticalAlign:'middle', fontSize:'40px', marginRight:'20px'}}/>
                What kind of payment methods do you accept?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography sx={{display:'flex', justifyContent:'flex-start', paddingTop:'20px',borderTop:'1px solid gray'}}>
                <span>Currently, We are only accepting payment through Bank Transfer or cash at our office.</span>
                </Typography>
                </AccordionDetails>
            </Accordion>

            <h2 style={{marginTop:'50px'}}>Search and orders</h2>
            <Accordion>
                <AccordionSummary
                expandIcon={<Iconify icon='flat-color-icons:expand' />}
                aria-controls={`panel5a-content`}
                id={`panel5a-header`}
                >
                <Typography component='h3' sx={{color:'gray'}}>
                <Iconify icon='ic:outline-help' color='primary' style={{verticalAlign:'middle', fontSize:'40px', marginRight:'20px'}}/>
                I found a vehicle i like on your website, what should i do next?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography sx={{display:'flex', justifyContent:'flex-start', paddingTop:'20px',borderTop:'1px solid gray'}}>
                <span>
                After choosing your vehicle, you have two options to proceed. First one is to make a direct Free Inquiry from our website and wait for a call/message from us.
                <br/>Secondly, email us at info@autobazar.com or send us a message on WhatsApp at +905364802141 with your best offer, so we could start negotiation on the price
                </span>
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                expandIcon={<Iconify icon='flat-color-icons:expand' />}
                aria-controls={`panel6a-content`}
                id={`panel6a-header`}
                >
                <Typography component='h3' sx={{color:'gray'}}>
                <Iconify icon='ic:outline-help' color='primary' style={{verticalAlign:'middle', fontSize:'40px', marginRight:'20px'}}/>
                How long does it take to get the car?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography sx={{display:'flex', justifyContent:'flex-start', paddingTop:'20px',borderTop:'1px solid gray'}}>
                <span>It all depends on your responsiveness during the purchase peroid. Please ask our sales staff for more details.</span>
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                expandIcon={<Iconify icon='flat-color-icons:expand' />}
                aria-controls={`panel7a-content`}
                id={`panel7a-header`}
                >
                <Typography component='h3' sx={{color:'gray'}}>
                <Iconify icon='ic:outline-help' color='primary' style={{verticalAlign:'middle', fontSize:'40px', marginRight:'20px'}}/>
                How is the condition of the units? Are they working?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography sx={{display:'flex', justifyContent:'flex-start', paddingTop:'20px',borderTop:'1px solid gray'}}>
                <span>The units displayed on this web-site are inspected twice by the third party. All units are working well.</span>
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                expandIcon={<Iconify icon='flat-color-icons:expand' />}
                aria-controls={`panel1a-content`}
                id={`panel1a-header`}
                >
                <Typography component='h3' sx={{color:'gray'}}>
                <Iconify icon='ic:outline-help' color='primary' style={{verticalAlign:'middle', fontSize:'40px', marginRight:'20px'}}/>
                There is no stock for the car I want.</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography  sx={{display:'flex', justifyContent:'flex-start', paddingTop:'20px',borderTop:'1px solid gray'}}>
                <span>If you have a car that you cannot find on our website, please fill in the request form by clicking the link below!
                <Button sx={{ cursor:'pointer', verticalAlign:'initial'}} component={Link} to='/contact'> Get in touch</Button>
                </span>
                </Typography>
                </AccordionDetails>
            </Accordion>
            </Box>
        </Box>
       </Page>
    )
}