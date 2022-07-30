/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-useless-return */
// main imports
import { useState, useEffect} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
// mui components
// import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar"
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import CircularProgress from "@mui/material/CircularProgress"
import Backdrop from "@mui/material/Backdrop"
import Stack from "@mui/material/Stack"
import Divider from "@mui/material/Divider"


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Box from '@mui/material/Box';
import { LoadingButton } from '@mui/lab';
import Chip from '@mui/material/Chip';

// other components
import Iconify from '../Iconify'
import ErrorAlert from '../alerts/ErrorAlert'
import SuccessAlert from '../alerts/SuccessAlert'

// functions
import * as actions from '../../redux/actions';
import { getUserPayments } from '../../services/api/payment'
import { fDateTime } from '../../utils/formatTime';
import { getPaymentRefundedColor } from '../../utils/getColor';
import { fCurrency } from '../../utils/formatNumber';

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

Tab0.propTypes = {
    user: PropTypes.object.isRequired,
    uploadAvatar: PropTypes.func,
    updateUser: PropTypes.func
}

function Tab0 ({uploadAvatar, updateUser, user}) {


    const [apiError, setApiError] = useState(false);
    const [apiSuccess, setApiSuccess] = useState(false);
  
    const [loading, setLoading] = useState(false)

    const [payments, setPayments] = useState([])

    const RegisterSchema = Yup.object().shape({
        name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Fullname is required'),
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        bio: Yup.string(),
        phone_number: Yup.string(),
        address_line: Yup.string(),
        city: Yup.string(),
        country: Yup.string(),
      });

      const formik = useFormik({
        initialValues: {
            name: user?.name, 
            email:user?.email, 
            address_line: user?.address?.address_line??'',
            bio:user?.bio??'',
            city:user?.address?.city??'',
            country:user?.address?.country??'',
            phone_number:user?.phone_number??''
        },
        validationSchema: RegisterSchema,
        onSubmit: (formValues) => {
            const details = {
                ...formValues, 
                address: {
                    address_line: formValues.address_line,
                    city:formValues.city,
                    country: formValues.country
                }
            }
            setTimeout(() => {
            updateUser(details)
            .then(result => {
              if (!result.ok) {
                setApiError(true)
                return 
              }
              setSubmitting(false)
              setApiSuccess(true)
            }).catch(() => setSubmitting(false))
            }, 2500);
        },
      });
    
      const { touched, handleSubmit, isSubmitting, getFieldProps, setSubmitting, isValid, errors } = formik;
    
    const handleChangeAvatar = (e) => {
        
      setLoading(true)
      setTimeout(() => {
        const formdata = new FormData()
        formdata.append('avatar', e.target.files[0]);
        uploadAvatar(formdata).then(result => {
            console.log(result)
          setLoading(false)
          if (!result.ok){
            setApiError(true)
            return
          }
          setApiSuccess(true)
        }).catch(() => setLoading(false))
      }, 2000);
    }

    useEffect(() => {
        getUserPayments().then(result => {
            if (!result.ok) {
                getUserPayments().then(result => {
                    setPayments(result.data)
                })
                return
            }
            setPayments(result.data)
        })
      }, [])

    return (
        <Grid container spacing={2}>
                
                    <Grid item xs={12}>
                        <Paper style={{textAlign: 'center'}}>
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
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={loading}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                        <div>
                        <Typography sx={{float :'right', p:'4px 2px', mr:'4px', mt:'4px', fontSize:'10px', bgcolor:`${user?.isVerified ? 'success.main': 'warning.main'}`, borderRadius:'4px'}}>
                        {user?.isVerified ? 'Verified': 'Unverified'}
                        </Typography>
                            <h2 style={{fontFamily:'Nunito, san serif', margin:'20px 0'}}>Profile Details</h2>
                            <p style={{fontFamily:'Nunito, san serif', margin:'20px 0'}}>Review and Update profile Information</p>
                            
                            <FormikProvider value={formik}>
                                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                                    <SuccessAlert open={apiSuccess} onClosed={() => setApiSuccess(false)}
                                    title='Profile Update Successful' message='Congrates! Your profile has been successfully updated.' />
                                    <ErrorAlert open={apiError} onClosed={() => setApiError(false)}
                                    title='Profile Update Error' message='Profile update request failed! Please check your connection and try again later.' />
                                    <Stack spacing={3}>
                                        <TextField
                                        fullWidth
                                        label="Full Name"
                                        {...getFieldProps('name')}
                                        error={Boolean(touched.name && errors.name)}
                                        helperText={touched.name && errors.name}
                                        />
                                        <TextField
                                        fullWidth
                                        label="Email"
                                        {...getFieldProps('email')}
                                        error={Boolean(touched.email && errors.email)}
                                        helperText={touched.email && errors.email}
                                        />

                                    <TextField
                                        fullWidth
                                        label="Phone number"
                                        {...getFieldProps('phone_number')}
                                        error={Boolean(touched.phone_number && errors.phone_number)}
                                        helperText={touched.phone_number && errors.phone_number}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Address Line"
                                        {...getFieldProps('address_line')}
                                        error={Boolean(touched.address_line && errors.address_line)}
                                        helperText={touched.address_line && errors.address_line}
                                    />
                                    <TextField
                                        fullWidth
                                        label="City"
                                        {...getFieldProps('city')}
                                        error={Boolean(touched.city && errors.city)}
                                        helperText={touched.city && errors.city}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Country"
                                        {...getFieldProps('country')}
                                        error={Boolean(touched.country && errors.country)}
                                        helperText={touched.country && errors.country}
                                    />
                                    <TextField
                                        fullWidth
                                        multiline
                                        row={10}
                                        label="Bio"
                                        {...getFieldProps('bio')}
                                        error={Boolean(touched.bio && errors.bio)}
                                        helperText={touched.bio && errors.bio}
                                    />

                                    <LoadingButton fullWidth 
                                    size="large" type="submit" variant="contained" 
                                    loading={isSubmitting} disabled={!isValid}>
                                        Save Changes
                                    </LoadingButton>
                                    </Stack>
                                </Form>
                                </FormikProvider>
                                
                            </div>
                        </Paper>
                        <Paper sx={{my:4}}>
                        <h2 style={{textAlign:'center'}}>Payment History</h2>
                        <Divider  sx={{my:1}}/>
                        <Box sx={{ display:'flex', justifyContent:'flex-start', width:'100%', my:4}}>
                                
                                    {(payments?.length > 0) ? 
                                    <List sx={{ width: '100%',  bgcolor: 'background.paper' }}>
                                        {payments?.map((payment, index) => (
                                            <ListItem key={index + payment.id}>
                                                <ListItemAvatar>
                                                <Avatar sx={{ bgcolor:`${payment.refunded ? 'red' : 'blue'}` }}>
                                                    <Iconify icon={payment.refunded ? 'tabler:receipt-refund' : 'material-symbols:payments-outline'}  sx={{color:'white'}} />
                                                </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={<span style={{fontSize:'14px', fontWeight:'bold'}}>XAF {fCurrency(payment.amount)}</span>} 
                                                secondary={<Box>
                                                    {<span style={{fontSize:'12px', marginRight:'10px'}}>{fDateTime(payment.createdAt)}</span>} 
                                                    <Chip size='small' label={payment.refunded ? 'Refunded' : 'Paid'} color={getPaymentRefundedColor(payment.refunded)} /> 
                                                </Box>}  />
                                            </ListItem>                    
                                        ))}
                                    </List>                            

                                    : 
                                    <Box>
                                        error
                                    </Box>
                                    }
                            </Box>
                        </Paper>
                        </Grid>
                    </Grid> 
    )
}
const mapStateToProps = ({user}) => ({user})

export default connect(mapStateToProps, actions)(Tab0)