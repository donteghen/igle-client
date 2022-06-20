/* eslint-disable no-alert */
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
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
import {userPasswordResetComfrimation} from '../services/api/user'

const styles = {
    maingrid: {
        height:{xs:'600px', md: '100vh'},
        mt:8,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: 'linear-gradient(to left, rgba(96, 92, 92, 0), rgba(96, 92, 92,0.5)), url(/static/bg/bg-1.webp)',
    }
}
    function ConfirmResetPassword () {

        const [openErrorAlert, setOpenErrorAlert] = useState(false)
        const [openSuccessAlert, setOpenSuccessAlert] = useState(false)
        const [errorMess, setErrorMess] = useState('')

        const navigate = useNavigate()

        const [searchParam, setSearchParam] = useSearchParams()
        const email = searchParam.get('user')
        const token = searchParam.get('token')

        useEffect(() => {
            if (errorMess && errorMess.length > 0) {
                setOpenErrorAlert(true)
            }
        }, [errorMess])
        const handleSuccessClosed = () => {
            setOpenSuccessAlert(false)
            navigate('/login', {replace:true})
        }
        const handleErrorClosed = () => {
            setOpenErrorAlert(false)
            setErrorMess('')
        }
        
        const LoginSchema = Yup.object().shape({
            password: Yup.string().required('Password is required'),
            passwordMatch: Yup.string().required('Password is required')
        });
            
        const formik = useFormik({
        initialValues: {
            password: '',
            passwordMatch: ''
        },
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            if (values.password !== values.passwordMatch) {
                window.alert('Password mismatch. Make sure you enter matching passwords!')
                setSubmitting(false)
                return
            }
            console.log({...values, email, token})
            setTimeout(() => {
                userPasswordResetComfrimation(email, token, values.password).then(result => {
                if (!result.ok) {
                setErrorMess(result.errorMessage)
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
            <Page title='Confirm Reset Password'>
                <Grid container spacing={2} sx={styles.maingrid}>
                <ErrorAlert open={openErrorAlert} onClosed={handleErrorClosed}
                title='Operation Failed' message={errorMess}
                />
            <SuccessAlert open={openSuccessAlert} onClosed={handleSuccessClosed}
                    title='Password Reset Successfully' message="Your password has been successfully reset. Please login now to confirm your new password."
                />
                    <Grid item xs={12}>
                        
                        <Paper elevation={4} sx={{m:{xs:1, md:20}, p:2}}>
                            <div style={{textAlign:'center', width:'100%'}}>
                                <p><Iconify icon='carbon:password' style={{color:'#0f3996', fontSize:'40px'}} /></p>
                                <p style={{margin:'20px 0'}}>Enter the email address associated with your account and we'll send you a link to reset your password</p>
                                
                                <FormikProvider value={formik}>
                                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                                        <Stack spacing={4} sx={{mb:5}} >
                                        <TextField
                                            fullWidth
                                            autoComplete="password"
                                            type="text"
                                            label="Password"
                                            {...getFieldProps('password')}
                                            error={Boolean(touched.password && errors.password)}
                                            helperText={touched.password && errors.password}
                                        />
                                        <TextField
                                            fullWidth
                                            autoComplete="password"
                                            type="text"
                                            label="Password Match"
                                            {...getFieldProps('passwordMatch')}
                                            error={Boolean(touched.passwordMatch && errors.passwordMatch)}
                                            helperText={touched.passwordMatch && errors.passwordMatch}
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
    export default ConfirmResetPassword