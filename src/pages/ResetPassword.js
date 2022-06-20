import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// mui components
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { LoadingButton } from '@mui/lab';
import  Stack from '@mui/material/Stack';

// other components
import Iconify from '../components/Iconify'
import ErrorAlert from '../components/alerts/ErrorAlert';
import SuccessAlert from '../components/alerts/SuccessAlert';
import Page from '../components/Page'
// functions
import {userPasswordReset} from '../services/api/user'

const styles = {
    maingrid: {
        height:{xs:'500px', md: '100vh'},
        mt:8,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: 'linear-gradient(to left, rgba(96, 92, 92, 0), rgba(96, 92, 92,0.5)), url(/static/bg/bg-1.webp)',
    }
}
  
    
    function ResetPassword () {

        const [openErrorAlert, setOpenErrorAlert] = useState(false)
        const [openSuccessAlert, setOpenSuccessAlert] = useState(false)

        const navigate = useNavigate()
        
        const handleSuccessClosed = () => {
            setOpenSuccessAlert(false)
            navigate('/home', {replace:true})
        }
        const LoginSchema = Yup.object().shape({
            email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        });
            
        const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            setTimeout(() => {
            userPasswordReset(values.email).then(result => {
                if (!result.ok) {
                setOpenErrorAlert(true)
                setSubmitting(false)
                return
                }
                setOpenSuccessAlert(true)
                setSubmitting(false)
            }).catch(e => {
                setSubmitting(false)
            }) 
            }, 2500);
        },
        });
            
        const { errors, touched,  isSubmitting, handleSubmit, setSubmitting, getFieldProps } = formik;

        return (
            <Page title='Password Reset'>
                <Grid container spacing={2} sx={styles.maingrid}>
                <ErrorAlert open={openErrorAlert} onClosed={setOpenErrorAlert}
                title='Operation Failed' message="Something went wront. Please be sure the provided email is the same you used during registration."
                />
            <SuccessAlert open={openSuccessAlert} onClosed={handleSuccessClosed}
                    title='Password Reset Successfully Initiated' message="Please check you email and follow the instructions to complete the password reset operation"
                />
                    <Grid item xs={12}>
                        
                        <Paper elevation={4} sx={{m:{xs:2, md:20}, p:2}}>
                            <div style={{textAlign:'center', width:'100%'}}>
                                <p><Iconify icon='carbon:password' style={{color:'#0f3996', fontSize:'40px'}} /></p>
                                <p style={{margin:'20px 0'}}>Enter the email address associated with your account and we'll send you a link to reset your password</p>
                                
                                <FormikProvider value={formik}>
                                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                                        <Stack spacing={4} sx={{mb:5}}>
                                        <TextField
                                            fullWidth
                                            autoComplete="username"
                                            type="email"
                                            label="Email address"
                                            {...getFieldProps('email')}
                                            error={Boolean(touched.email && errors.email)}
                                            helperText={touched.email && errors.email}
                                        />
                                        </Stack>

                                        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                                            Continue
                                        </LoadingButton>
                                    </Form>
                                </FormikProvider>
                                    <p style={{margin:0}}> Don't own an account yet? 
                                        <Button 
                                        color="primary" 
                                            style={{margin:'6px', fontFamily:'Nunito, san serif'}} 
                                            onClick={() => navigate('/register')}>
                                            Get started
                                        </Button> 
                                    </p>
                                </div>
                        </Paper>
                    </Grid>
                </Grid>
            </Page>
            )
    }
    export default ResetPassword