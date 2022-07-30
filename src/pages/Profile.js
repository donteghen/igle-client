/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-useless-return */
// main imports
import { useState} from 'react'

// mui components

import AppBar from "@mui/material/AppBar"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import Container from "@mui/material/Container"
// import Alert from "@mui/material/Alert"

// other components
import TabPanel, {a11yProps} from '../components/TabPanel'
import Iconify from '../components/Iconify'
import Page from '../components/Page'
import Tab0 from '../components/profile-tabs/Tab0';
import Tab1 from '../components/profile-tabs/Tab1';
// functions



function  Profile () {
  const [value, setValue] = useState(0);



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Page title='Profile'>
        <Container>
                    <div style={{flexGrow: 1, width: '100%', }}>
                <AppBar position="static" color="default">
                    <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                    >
                    <Tab icon={<Iconify icon='bi:person-circle' />}  style={{fontFamily:'Nunito, san serif'}} label="Profile" {...a11yProps(0)} />
                    {/* <Tab icon={<Iconify icon='eva:settings-2-fill' />} style={{fontFamily:'Nunito, san serif'}} label="Settings" {...a11yProps(1)} /> */}
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>                
                    <Tab0 />
                </TabPanel>
                {/* <TabPanel value={value} index={1}>
                    <Tab1 />
                </TabPanel> */}
                </div>
        </Container>
    </Page>
  );
};

// const mapStateToProps = ({user}) => ({user})

export default Profile