import { Box, Grid } from "@mui/material";
import Page from '../components/Page'

const styles = {
    wrapper: {
        mx: { xs:'20px', md: '100px'},
        '& p':{margin:'8px 0', lineHeight:'28px'},
        '& h2':{borderBottom:'4px solid #1a76d2', padding:'10px 0', lineHeight:'28px'},
        '& h4':{margin:'15px 0', fontWeight:'bold', lineHeight:'28px'},
        '& ol':{ },
        '& li':{lineHeight:'28px', '&>ol':{listStyleType: 'lower-roman'}},
        py:10,

    }
}

const DynamicConstants = {
    nameFirstLetterCapitalized : 'Igle',
    nameSmallLetters: 'igle',
    email:'info@igle.com',
    tel:'002376 79038819',
    goal: 'cloud-based project develop monitoring and reporting service'
}
export default function TermsOfUse () {
    return (
       <Page title='Terms of Use'>
            <Box sx={styles.wrapper}>
            <h1>{DynamicConstants.nameFirstLetterCapitalized} Terms of Use</h1>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <h2>Chapter 1: General Terms</h2>
                    <h4>Article 1: General</h4>
                    <p>{DynamicConstants.nameFirstLetterCapitalized} (hereinafter referred to as the "Company") operates a service named "{DynamicConstants.nameSmallLetters}" (hereinafter referred to as the "Service" and the website of the Service shall be hereinafter referred as the "Service Website"), an internet service to (i) provide {DynamicConstants.goal}（hereinafter referred to as the “ Product”）, (ii) provide an online shopping mall to permitted users of the Service (hereinafter referred to as the "User(s)") and (iii) receive orders from and sell to such Users. The Company hereby establishes the following rules and regulations (hereinafter referred to as the "Terms") for the User(s).</p>
                    <h4>Article 2: Scope of and Changes to the Terms</h4>
                    <ol>
                        <li>The Terms apply to User(s) of the Service. The User(s) shall strictly adhere, in good faith, to the Terms.</li>
                        <li>If changes are made to the Terms, the Company will notify the User(s) of such changes. If a User does not indicate that he or she does not accept changes when he or she next uses the service, or within one week of notification of said changes, such User will be deemed to have accepted the changes.</li>
                        <li>Where one or more Articles or parts of Articles contained within the Terms is deemed ineffective or unenforceable, the remainder of the Articles or parts of Articles will remain fully in force. The Company and/or the User(s) will legitimize the Article or part of Article deemed ineffective or not executable and revise it as necessary in order to make such Article enforceable. The Company and User(s) agree that if any Article, or any part of any Article, is amended pursuant to the forgoing clause, that the such changes shall preserve the legal and economic intention of the original language.</li>
                    </ol>
                    <h4>Article 3: User Notification</h4>
                    <p>Notification: (1) Mail, (2) the Service Website (Location undecided)</p>
                    <ol>
                        <li>Except where otherwise stipulated in the Terms, the User(s) will be notified by the Company via e-mail, via general postings on the Service Website, or by other means deemed appropriate by the Company.</li>
                        <li>Where notification as described in 1 above is carried out by e-mail, said notification is deemed complete when the e-mail is sent to the User's e-mail address.</li>
                        <li>Where the notification in 1 above is carried out via general postings to the Service Website, said notification is deemed complete once it has been posted to the Website and the User(s) accessing the Service can view the posting.</li>
                        <li>Once notification has been completed, any information contained in said notification is effective immediately.</li>
                        <li>The User(s) shall read any notification from the Company made by e-mail without delay. As used herein, “read” shall mean displaying the mail delivered on such User’s screen, carefully reading the content and verifying comprehension of the contents of the notification.</li>
                    </ol>
                    <h4>Article 4: Applicable Laws, etc.</h4>
                    <ol>
                        <li>The enactment, validity, execution, interpretation, etc. of the Terms are subject to the laws of Japan.</li>
                        <li>Only the original English version of these Terms shall have any legal effect and translation hereof is for reference purposes only.</li>
                    </ol>
                    <h4>Article 5: Court Holding Jurisdiction</h4>
                    <ol>
                        <li>Should any dispute arise between a User and the Company with regard to the Service and/or any contracts concluded through the Service, the Company and User(s) agree to attempt to attempt, in good faith, to settle any such disputes through discussion.</li>
                        <li>If the dispute(s) cannot be resolved through discussion between the parties concerned, it shall be decided by arbitration by The Japan Commercial Arbitration Association.</li>
                    </ol>
                    <h4>Article 6: Prerequisites for Utilizing the Service</h4>
                    <ol>
                        <li>The User(s) is responsible for obtaining the equipment necessary to utilize this Service, including communications equipment, software, relevant Internet services, etc.</li>
                        <li>Access to the Service Website is permitted only to the User(s) who has the qualification to utilize the Service (hereinafter referred to the "Member Qualification"). The Member Qualification shall be obtained as provided in Article 8.</li>
                    </ol>
                    <h4>Article 7: Making Changes to Registration Information</h4>
                    <ol>
                        <li>Should changes occur in registered user information such as a User(s) name, address, telephone number, facsimile number, email account or other information provided to the Company at the time of registration, the User(s) shall report any such changes to the Company immediately.</li>
                        <li>The Company is not liable for any damages incurred by the User(s) or a third party due to any User(s) failure to inform the Company of the changes in user information, as required above.</li>
                        <li>If a User neglects to inform the Company of changes in registered information, such User understands that the Company will deem any notification delivery complete, if and when notification is sent to such User using the registered information most recently provided by the User to the Company, even if said notification returns to the Company as undeliverable.</li>
                    </ol>
                    <h4>Article 8: Member Qualification</h4>
                    <p>The Member Qualification will be provided to an individual or a corporate body when they:</p>
                    <ol>
                        <li>agree to the Terms of Service,</li>
                        <li>provide their required personal information specified on the applicable registration screen, and</li>
                        <li>obtain user ID and password.</li>
                    </ol>
                    <h4>Article 9: Prohibition</h4>
                    <ol>
                        <li>Users shall use the Products purchased from the Company for peaceful purposes only and shall not use the Products to develope or manufacture weapons of mass destruction, such as nuclear, biological or chemical weapons and missiles．</li>
                        <li>Users shall not re-export the Products without prior written consent from the Company.</li>
                    </ol>
                    <h4>Article 10: Forfeit of Membership</h4>
                    <p>The Company has the right to revoke the Member Qualification of any User(s) in the following situations:</p>
                    <ol>
                        <li>In the case of bankruptcy of a User(s), or if the Company decides a User(s) is at risk of bankruptcy.</li>
                        <li>Where the registration information provided by a User(s) is found to be untrue, inaccurate, or incomplete.</li>
                        <li>Where a User(s) is in breach or violation of the Terms or any other agreements with the Company.</li>
                        <li>In the case that the Company decides providing Service to a User(s) would be inappropriate due to any of the following circumstances.
                            <ol>
                                <li>User(s) has taken any action that infringes copyrights or other rights of the Company or any third party or actions that pose a threat to such rights.</li>
                                <li>User(s) has taken any action that infringes upon the Company's rights to privacy or any assets, or actions that pose a potential threat to such rights.</li>
                                <li>User(s) has taken any action that causes loss or damage to a third party or to the Company, or any action that poses a potential threat of such loss or damage.</li>
                                <li>User(s) has transferred or attempted to transfer the rights stipulated in the Terms to a third party.</li>
                                <li>User(s) has taken any action resulting in the defamation of a third party or the Company.</li>
                                <li>User(s) has taken any action that runs counter to public order and morals (including obscenity, prostitution, violence, atrocities, abuse, etc.) or any action deemed by the Company to potentially lead to such violations, or any action of providing information to a third party that runs counter to public order and morals.</li>
                                <li>User(s) has taken any illegal action or any action related to an illegal action, or an action that could potentially lead to an illegal action</li>
                                <li>User(s) has taken any action related to the sex industry.</li>
                                <li>User(s) has used the Service using another person’s identity.</li>
                                <li>User(s) has utilized harmful computer programs such as viruses through the Service or in conjunction with the use of the Service, or introduced such programs to any device or website of the Company.</li>
                                <li>User(s) has taken any action leading to inconvenience or loss for the Company or a third party, any action that may interfere with the Service, or any action that impedes the operation of the Service.</li>
                                <li>User(s) has utilized the Service in order to cause significant interference to the use of the Service by other User(s), either directly or indirectly</li>
                                <li>User(s) has taken any action that may promote any of the above actions including linking to sites that carry out the above actions (including where said actions are carried out by a third party).</li>
                                <li>User(s) has taken any other illegal action or any action that may potentially lead to illegal actions.</li>
                                <li>User(s) has taken any other action deemed inappropriate by the Company.</li>
                            </ol>
                        </li>
                    </ol>
                    <h4>Article 11: Copyrights</h4>
                    <ol>
                        <li>The User(s) may not utilize any information or files accessed via the Service for any means whatsoever, other than the User(s) individual personal use, without the permission of the copyright holder.</li>
                        <li>The User(s) may not, by any means whatsoever, have third parties utilize or disclose information or files obtained through the use of the Service without the permission of the copyright holder.</li>
                        <li>Should any disputes arise due to violation of the rules stipulated in this Article, the User(s) is responsible, financially and otherwise, for the resolution of such disputes. The Company will not be held liable in any way, and the User(s) will not cause loss to the Company.</li>
                    </ol>
                </Grid>
                <Grid>
                    <h2>Chapter 2: Information Pertaining to Sales Contracts</h2>
                    <h4>Article 12: Order</h4>
                    <ol>
                        <li>The Users can request a proforma invoice by clicking the "FREE INQUIRY" button on Web-stock list in the Service Website. The User(s) can request more particular information by sending inquiry to the Company separately.</li>
                        <li>Where a proforma invoice (and more particular information) is requested according to the procedure described above, the Company will contact to the User(s) within two business days by e-mail or other means deemed appropriate by the Company. Once purchase conditions (price, payment schedule and the others) are determined, the proforma invoice will be sent to the User(s) by e-mail or other means deemed appropriate by the Company. The proforma invoice will be displayed in accordance with the required delivery terms.</li>
                        <li>Proforma Invoice will be forwarded to the User(s) as described in Article 3 of these Terms. Note, however, that this information will not be conveyed in the form of general postings on the Service Website.</li>
                        <li>Proforma Invoice will be sent only for the User(s) that completed the required information as stipulated under the rules of the service as required in the Terms. Should the User(s) be unable to obtain a Proforma Invoice due to incorrect or incomplete information, etc., and as a result incurs loss such as damage or conflict, the User(s) is responsible, both financially and otherwise, for resolving any disputes arising. The Company will not be held liable in any way, and the User(s) will not cause loss to the Company.</li>
                    </ol>
                    <h4>Article 13: Risk and Title</h4>
                    <ol>
                        <li>Risk of the Products shall pass from the Company to the User(s) when the Products is handed over immediately payment.</li>
                        <li>The Company shall reserve the title to the Products until the full payment for the Products have been made.</li>
                    </ol>
                    <h4>Article 14: Product Liability</h4>
                    <p>The Company's sales are based on as-is condition at the time of the sale. The Company bears no liability whatsoever for problems, including failure and/or accidents, with the User(s) purchases of Products where such problems arise from breakdown, defects etc. that are the responsibility of the commodity manufacturer. Further, the Company holds no liability for damages so incurred by any third parties.</p>
                </Grid>
                <Grid item xs={12}>
                    <p style={{fontWeight:'bold'}}>These terms are conditions are subjected to changes without prior notification</p>
                </Grid>
            </Grid>
        </Box>
       </Page>
    )
}