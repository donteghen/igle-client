/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-useless-return */
// main imports
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// mui components
// import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import LinearProgress from "@mui/material/LinearProgress"
import Paper from "@mui/material/Paper"
import AppBar from "@mui/material/AppBar"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import CircularProgress from "@mui/material/CircularProgress"
import Backdrop from "@mui/material/Backdrop"
import Container from "@mui/material/Container"
// other components
import TabPanel, {a11yProps} from '../components/TabPanel'
import Iconify from '../components/Iconify'
import ErrorAlert from '../components/alerts/ErrorAlert'
import Page from '../components/Page'
// functions
import * as actions from '../redux/actions';


const styles = {
    avatar : {
        width: '200px',
        height: '200px',
        '@media (max-width:768px)': {
        width: '100%',
        height: '150px',
        }
    },
    avatarUpdate : {
        cursor:'pointer',
        padding:'10px 15px', background:'#1a76d2', color: 'white', margin:'30px 0', 
        borderRadius:'5px',
        '& label': {
        cursor: 'pointer'
        },
        '&:hover' : {
        background:'#65a3e1'
        }
    }, 
    btnSave : {
        width:'100%', 
        border:'none', 
        background:'#1a76d2', 
        fontFamily:'Nunito, san serif',
        color:'white', 
        padding:'10px 2px',
        cursor:'pointer',
        margin:'30px 0', 
        borderRadius:'5px',
        '&:hover' : {
        background:'#65a3e1'
        }
    }
}
Profile.propTypes = {
    user: PropTypes.object,
    uploadAvatar: PropTypes.func,
    updateUser: PropTypes.func
}

function  Profile ({user, uploadAvatar, updateUser}) {
  const [value, setValue] = useState(0);

  const [apiError, setApiError] = useState({isError:false, title:'', message:''});
  const [loading, setLoading] = useState(false)
   
    const [values, setValues] = useState({
      email:'',
      name:'',
      address_line:'',
      phone_number:'',
      city:'',
      country:''
    })
    const [errors, setErrors] = useState({
      email:'',
      name:''
    })
    useEffect(() => {
      if (user) {
        setValues({name: user?.name, email:user?.email, address_line: user?.address?.address_line,
        city:user?.address?.city, country:user?.address?.country, phone_number:user.phone_number})
      }
      
    },[user])
    
    const handleChangeAvatar = (e) => {
      setLoading(true)
      setTimeout(() => {
        const formdata = new FormData()
        formdata.append('avatar', e.target.files[0]);
        uploadAvatar(formdata).then(result => {
          setLoading(false)
          if (!result.ok){
            setApiError({
                isError:true,
                title: 'Profile Update',
                message: result.errorMessage ? result.errorMessage : 'Avatar Upload!'
            })
            return
          }
        })
      }, 2000);
    }

    const handleSubmit = () => {
      const userInfo = {...values, address: {country:values.country, city:values.city, address_line:values.address_line}}
      setLoading(true)
      setTimeout(() => {
      updateUser(user._id, userInfo)
      .then(result => {
        setLoading(false)
        if (!result.ok) {
          setApiError({
              isError:true,
              title: 'Profile Update',
              message: result.errorMessage ? result.errorMessage : 'Update failed!'
          })
          return 
        }
      })
      }, 2500);
    }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Page title='Profile'>
        <Container>
                    <div style={{flexGrow: 1, width: '100%', }}>
                {<ErrorAlert open={apiError.isError} onOpenChanged={setApiError} message={apiError.message} title={apiError.title} />}
                <AppBar position="static" color="default">
                    <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                    >
                    <Tab icon={<Iconify icon='bi:person-circle' />}  style={{fontFamily:'Nunito, san serif'}} label="Profile" {...a11yProps(0)} />
                    <Tab icon={<Iconify icon='eva:settings-2-fill' />} style={{fontFamily:'Nunito, san serif'}} label="Settings" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                
                <Grid container spacing={2}>
                
                    <Grid item xs={12}>
                        <Paper style={{textAlign: 'center'}}>
                        {loading && <div><LinearProgress color="secondary"  style={{zIndex:999, marginTop:'50px'}} /></div>}
                        <div style={{display:'flex', flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                            <h2>Profile Avatar</h2>
                            <div style={{textAlign:'center'}}>
                                <Avatar src={user ? user?.avatar : '/static/mock-images/avatars/avatar_default.jpg'} 
                                sx={styles.avatar} alt='avatar' />
                            </div>
                            <Typography component='div' sx={styles.avatarUpdate}>
                            <label htmlFor="avatar" >
                                Upload New Avatar  <Iconify icon='material-symbols:publish-sharp' style={{verticalAlign:'middle'}} /></label>
                            <input hidden width='100%' type="file" name="avatar" id="avatar" accept=".jpg, .jpeg, .png" onChange={handleChangeAvatar} />
                            </Typography>
                        </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper style={{textAlign: 'center'}}>
                        {loading && <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={loading}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>}
                        <div>
                            <h2 style={{fontFamily:'Nunito, san serif'}}>Profile Details</h2>
                            <p style={{fontFamily:'Nunito, san serif'}}>Review and Update profile Information</p>
                            <div>
                            <TextField style={{width:'100%', margin:'20px 0'}}                      
                                id="name"
                                label="Name"
                                value={values.name}
                                variant="outlined"
                                onChange={e => setValues({...values, name:e.target.value})} 
                                />
                                <TextField style={{width:'100%', margin:'20px 0'}}
                                    id="email"
                                    label="Email"
                                    value={values.email}
                                    variant="outlined"
                                    onChange={e => setValues({...values, email:e.target.value})} 
                                />
                                <TextField style={{width:'100%', margin:'20px 0'}}
                                    id="phone_number"
                                    label="Phone Number"
                                    value={values.phone_number}
                                    variant="outlined"
                                    onChange={e => setValues({...values, phone_number:e.target.value})} 
                                />
                                <TextField style={{width:'100%', margin:'20px 0'}}                 
                                    id="country"
                                    label="Country"
                                    value={values.country}
                                    variant="outlined"
                                    onChange={e => setValues({...values, country:e.target.value})} 
                                />
                                <TextField style={{width:'100%', margin:'20px 0'}}
                                    id="city"
                                    label="City"
                                    value={values.city}
                                    variant="outlined"
                                    onChange={e => setValues({...values, city:e.target.value})} 
                                />
                                <TextField style={{width:'100%', margin:'20px 0'}}
                                    id="address_line"
                                    label="Address Line"
                                    value={values.address_line}
                                    variant="outlined"
                                    onChange={e => setValues({...values, address_line:e.target.value})} 
                                />
                                </div>
                                <div >
                                <Button sx={styles.btnSave} onClick={handleSubmit}> 
                                    Save Changes  <Iconify icon='entypo:save' style={{verticalAlign:'middle'}} />
                                </Button>
                            </div>
                            </div>
                        </Paper>
                        </Grid>
                    </Grid>  
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div>
                        coming up with settings
                    </div>
                </TabPanel>
                </div>
        </Container>
    </Page>
  );
};

const mapStateToProps = ({user}) => ({user})

export default connect(mapStateToProps, actions)(Profile)