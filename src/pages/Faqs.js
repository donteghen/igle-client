
import {  useNavigate, Link } from "react-router-dom"
// mui components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import AccordionSummary from '@mui/material/AccordionSummary'
// other components
import Page from "../components/Page"
import Iconify from "../components/Iconify"

const styles = {
    mainBox: {
        mx: { xs:'20px', md: '100px'}, 
        mt:10,
        py:10,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: 'linear-gradient(to left, rgba(15, 57, 150, 0.9), rgba(15, 57, 150, 0.9))',
    }
}
export default function Faqs () {
    const navigate = useNavigate()
    return (
       <Page title='FAQs'>
            <Box sx={styles.mainBox} >
            <h1 style={{margin:'20px 0', color:'white'}}>
            <Iconify icon='flat-color-icons:answers' sx={{verticalAlign:'middle', fontSize:'40px', marginRight:'5px'}} />
            Frequently Asked Questions </h1>
            <Box>
                <Paper sx={{p:2}}>
                    <span style={{marginRight:'6px', fontWeight:'bold', fontSize:'18px'}}>Have any questions / recommendations?</span>
                    <span style={{marginRight:'6px',color:'gray',fontSize:'18px'}}>Don't hesitate <Iconify icon='fa-solid:angle-right' sx={{verticalAlign:'middle'}}/></span> 
                    <Button variant='contained' size="small" onClick={() => navigate('/contact')} 
                    sx={{textTransform:'none', borderRadius:'18px'}} >
                    Get in touch
                    </Button>
                </Paper>
            </Box>
            <Box>
            <h2 style={{margin:'50px 0 0 24px', color:'white' }}> How to use the Igle website</h2>
            <Accordion >
                <AccordionSummary
                expandIcon={<Iconify icon='flat-color-icons:expand' />}
                aria-controls={`panel1a-content`}
                id={`panel1a-header`}
                >
                <Typography component='h3' sx={{color:'gray'}}>
                <Iconify icon='ic:outline-help' color='primary' style={{verticalAlign:'middle', fontSize:'40px'}}/>
                How does it work?
                </Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography sx={{display:'flex', justifyContent:'flex-start', paddingTop:'20px',borderTop:'1px solid gray'}}>
                <ol style={{listStyle:'1', marginLeft:'24px'}}>
                    <li>Sign up for an account</li>
                    <li>Create a new project & choose a plan for the project</li>
                    <li>Make the payment for the selected plan</li>
                    <li>That's it! We take care of the rest.</li>
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
                <Iconify icon='ic:outline-help' color='primary' style={{verticalAlign:'middle', fontSize:'40px'}}/>
                What languages do you speak?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography sx={{display:'flex', justifyContent:'space-between', paddingTop:'20px',borderTop:'1px solid gray'}}>
                    <span>
                    Our team is proficient in both English and French.
                    Please send us a WhatsApp message at 
                    <span style={{color:'#0f3996'}}> +237 679038819</span>{' '} 
                    or email us at <span style={{color:'#0f3996'}}> info@igle.com</span>
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
                <Iconify icon='ic:outline-help' color='primary' style={{verticalAlign:'middle', fontSize:'40px'}}/>
                What currency are do you accept?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography sx={{display:'flex', justifyContent:'flex-start', paddingTop:'20px',borderTop:'1px solid gray'}}>
                <span>All plans are displayed in <span style={{color:'#0f3996'}}>XAF (BEAC CFA)</span>. However, we receive payments in Dollars & Euro too.</span>
                </Typography>
                </AccordionDetails>
            </Accordion>

            <h2 style={{margin:'50px 0 0 24px', color:'white'}}>Payment</h2>

            <Accordion>
                <AccordionSummary
                expandIcon={<Iconify icon='flat-color-icons:expand' />}
                aria-controls={`panel4a-content`}
                id={`panel4a-header`}
                >
                <Typography component='h3' sx={{color:'gray'}}>
                <Iconify icon='ic:outline-help' color='primary' style={{verticalAlign:'middle', fontSize:'40px'}}/>
                What kind of payment methods do you accept?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography sx={{display:'flex', justifyContent:'flex-start', paddingTop:'20px',borderTop:'1px solid gray'}}>
                <span>Currently, We only accept payment through Bank Transfer , MoMo, Western Union and Bitcoins</span>
                </Typography>
                </AccordionDetails>
            </Accordion>

            <h2 style={{margin:'50px 0 0 24px', color:'white'}}>Plans</h2>
            <Accordion>
                <AccordionSummary
                expandIcon={<Iconify icon='flat-color-icons:expand' />}
                aria-controls={`panel5a-content`}
                id={`panel5a-header`}
                >
                <Typography component='h3' sx={{color:'gray'}}>
                <Iconify icon='ic:outline-help' color='primary' style={{verticalAlign:'middle', fontSize:'40px'}}/>
                How do I upgrade my project's plan?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography sx={{display:'flex', justifyContent:'flex-start', paddingTop:'20px',borderTop:'1px solid gray'}}>
                <span>
                In the dashboard, select the project and make I a project upgrade request. We will migrate all the current project's resources to the desire plan.
                <br/>Once the payment for the new plan is made, then the project's new plan will be activated.
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
                <Iconify icon='ic:outline-help' color='primary' style={{verticalAlign:'middle', fontSize:'40px'}}/>
                How can I downgrade my project's plan?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography sx={{display:'flex', justifyContent:'flex-start', paddingTop:'20px',borderTop:'1px solid gray'}}>
                <span>At the moment, our system ony permits project plan upgrade. So it's recommended to start with lower plan and then upgrade as need arises.</span>
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
                <Iconify icon='ic:outline-help' color='primary' style={{verticalAlign:'middle', fontSize:'40px'}}/>
                What happens if I don't make a payment?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography sx={{display:'flex', justifyContent:'flex-start', paddingTop:'20px',borderTop:'1px solid gray'}}>
                <span>Your project will be deactivated. This means, we will stop monitoring the site and you stop receiving reports. This can be undone simply by making next payment and everything goes back to normal. </span>
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
                <Iconify icon='ic:outline-help' color='primary' style={{verticalAlign:'middle', fontSize:'40px'}}/>
                How soon do I start receiving reports?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography  sx={{display:'flex', justifyContent:'flex-start', paddingTop:'20px',borderTop:'1px solid gray'}}>
                <span>Immediately after the payment is made, we will add your project to our active project dispatch queue. Then, as per the selected plan, you report will made available in due time. 
                <Button sx={{ cursor:'pointer', verticalAlign:'initial'}} component={Link} to='/contact'>Find out more</Button>
                </span>
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
                <Iconify icon='ic:outline-help' color='primary' style={{verticalAlign:'middle', fontSize:'40px'}}/>
                How can I cancel or delete my project?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography  sx={{display:'flex', justifyContent:'flex-start', paddingTop:'20px',borderTop:'1px solid gray'}}>
                <span> We recommend that you simple stop making payment and your project will be deactivated.
                    <br/><strong>When you are absolutely certain about your decision, then you may proceed to delete the project.</strong>  
                    <br/><strong style={{color:'#f39731'}}>Warning! A deleted project can never be retrieved.</strong>
                </span>
                </Typography>
                </AccordionDetails>
            </Accordion>
            </Box>
        </Box>
       </Page>
    )
}