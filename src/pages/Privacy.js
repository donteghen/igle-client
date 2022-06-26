
import { Box, Grid, Divider} from "@mui/material";
import {styled, alpha} from '@mui/material/styles'
import Page from "../components/Page";

const Bluespan = styled('span')(({theme}) => ({
    color:alpha(theme.palette.primary.main, 1)
}))
const styles = {
    wrapper: {
        mx: { xs:'20px', md: '100px'},
        mt: {xs:'50px', md: '70px'},
        '& p':{margin:'8px 0', lineHeight:'28px'},
        '& h2':{borderBottom:'4px solid #1a76d2', padding:'10px 0', lineHeight:'28px'},
        '& ul':{listStyle:'none', padding:0, lineHeight:'28px'},
        '& li':{lineHeight:'28px'},
        py:10,

    }
}
const DynamicConstants = {
    nameFirstLetterCapitalized : 'Igle',
    nameSmallLetters: 'igle',
    email:'info@igle.com',
    tel:'002376 79038819',
}
export default function PrivacyPolicy () {
    return (
      <Page title='Privacy Policy'>
            <Box sx={styles.wrapper} >
        <h1>{DynamicConstants.nameFirstLetterCapitalized} Privacy Policy</h1>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <h2>1. Introduction</h2>
                    <p>This Privacy Policy(the”Policy”) describes how Igle collect and process your information through the igle platform(”Our site”)</p>
                    <p>when you use {DynamicConstants.nameSmallLetters} services (the “Services”) on Our site.</p>
                    <p>When the Policy mentions {DynamicConstants.nameFirstLetterCapitalized},” “we,” “us,” or “our,” it refers to the Igle.”</p>
                </Grid>
                <Grid item xs={12}>
                    <h2>2. Information We Collect</h2>
                    <p>There are three categories of information we collect.</p>
                    <h3>2.1. Information You Give Us</h3>
                    <Divider sx={{my:1}} />
                    <ul>
                        <li>Information of your Account</li>
                        <li>Your email address and password</li>
                        <li>Profile Information</li>
                        <li>Your name, gender, country, date of birth and phone number in some cases</li>
                        <li>Picture of you</li>
                        <li>Payment Information</li>
                        <li>Your bank account information</li>
                        <li>information relating to your use of reward points coupons, cashbacks</li>
                    </ul>
                    <h3>2.2. Information We Automatically Collect from Your Use of the Service</h3>
                    <Divider sx={{my:1}} />
                    <p>When you use our website, interact with any content or advertising related to such services, or validate any cookies, web beacons, unique identifiers and other related technologies (collectively, the “Cookie Technologies”) that we employ, we automatically collect certain information about you and the device you are using</p>
                    <p>Such information may include:</p>
                    <ul>
                        <li>OS information of a user device</li>
                        <li>Referrer</li>
                        <li>URLs viewed and time stamp of time viewed</li>
                        <li>IP address</li>
                        <li>Geo-location information</li>
                        <li>Information regarding the products you have searched</li>
                        <li>Text posted on our site</li>
                        <li>Any other information on server log</li>
                    </ul>
                    <h3>2.3. Information We Collect from Third Parties</h3>
                    <Divider sx={{my:1}} />
                    <ul>
                        <li>We may collect your information that Third Parties (the “Others”) or publicly available sources disclose in order to provide, improve and develop our site, provide our Advertising and Marketing or keep you and us safe.</li>
                        <li>Besides necessary for the these purpose of providing you with the Service in question or for another legally permissible reason, during your use of the Services, we do not intentionally collect or use information of yours except for fraud detection, credit, illegal activity information.</li>
                    </ul>
                </Grid>
                <Grid item xs={12}>
                    <h2>3. How We Use The Information We Collect</h2>
                    <h3>3.1. Provide, Improve, and Develop the Services</h3>
                    <Divider sx={{my:1}}/>
                    <ul>
                        <li>Enable you to access and use the Services and various functionality</li>
                        <li>Enable you to access and use the payment functionality</li>        
                        <li>Provide customer service</li>        
                        <li>Respond to customer inquiries including complaints</li>        
                        <li>Send you service or support messages, such as updates and account notifications</li>        
                        <li>Improve the Service by our development team</li>        
                    </ul>
                    <h3>3.2. Provide our Advertising and Marketing</h3>
                    <Divider sx={{my:1}} />
                    <ul>
                        <li>Send you promotional messages, marketing, advertising, and other information that you may be interested in based on information about you only if you give us a consent</li>
                        <li>Improve and conduct marketing and promotional activities including referral program.</li>
                    </ul>
                    <h3>3.3. Keep You and Us Safe</h3>
                    <Divider sx={{my:1}} />
                    <ul>
                        <li>Detect and prevent fraud, spam, abuse, security incidents, and other harmful activity.</li>
                        <li>Verify information provided by you</li>
                        <li>Resolve any disputes with any of our users and enforce our agreements with the Others.</li>
                        <li>Enforce our Terms of Service, Auction Terms of Use, and other policies.</li>
                    </ul>
                    <h3>3.4. Disclose information about you to the trusted Others</h3>
                    <Divider sx={{my:1}} />
                    <p>Additionally, we may disclose information about you to the trusted Others that provide us with Marketing automation services and Business efficiency services, including those located outside of japan, where necessary to carry out our business operations.</p>
                    <p>Further, We may retain information about you for as long as it is necessary to fulfill the purposes described above. In order to comply with our obligations under applicable law, collect fees owed, resolve disputes, enforce our legal rights, and to undertake any investigations necessitated by the foregoing, some of your information may be retained in our systems even after your account becomes closed.</p>

                </Grid>
                <Grid item xs={12}>
                    <h2>4. Your Choices</h2>
                    <p>You may review, update, or delete information about you in your {DynamicConstants.nameSmallLetters} website account (“your account’) by accessing your 
                        <Bluespan> profile page.</Bluespan>
                    </p>
                    <p>If you wish to obtain the disclosure or correction of your information we collect or termination of the processing of your information, contact us as ‘8. Contact’ indicates down below. However, depending on the circumstances around your information, we may not be able to accept your request</p>
                </Grid>
                <Grid item xs={12}>
                    <h2>5. Security</h2>
                    <p>We take necessary and appropriate measures for the security control of information about you including preventing the leakage, loss or damage</p>
                </Grid>
                <Grid item xs={12}>
                    <h2>6. Changes To This Privacy Policy</h2>
                    <p>We may revise the Policy from time to time. If we do so, the announcement will be published on Our website, and at the time of the announcement published, the revised Privacy Policy will come into effect.</p>
                </Grid>
                <Grid item xs={12}>
                    <h2>7. Contact</h2>
                    <p>If you have any questions or complaints about this Policy, you may contact at {DynamicConstants.email}</p>
                </Grid>
            </Grid>
        </Box>
      </Page>
    )
}