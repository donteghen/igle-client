/* eslint-disable camelcase */
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import Stack from '@mui/material/Stack';
import  TextField from '@mui/material/TextField';
import  IconButton from '@mui/material/IconButton';
import  InputAdornment from '@mui/material/InputAdornment';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import ErrorAlert from '../../../components/alerts/ErrorAlert';
import SuccessAlert from '../../../components/alerts/SuccessAlert';
// functions
import * as actions from '../../../redux/actions'
// ----------------------------------------------------------------------

RegisterForm.propTypes = {
  signupUser: PropTypes.func
}

function RegisterForm({signupUser}) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [openErrorAlert, setOpenErrorAlert] = useState(false)
  const [errorMess, setErrorMess] = useState('')
  

  useEffect(() => {
    if (errorMess && errorMess.length > 0) {
      setOpenErrorAlert(true)
    }
  }, [errorMess])

  const handleErrorClosed = () => {
    setErrorMess('')
    setOpenErrorAlert(false)
  }

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    phone_number: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone_number:''
    },
    validationSchema: RegisterSchema,
    onSubmit: ({firstName, lastName, email, password, phone_number}) => {
      const details = {
          name:`${firstName} ${lastName}`,
          email,
          password,
          phone_number
      }
      setTimeout(() => {
        signupUser(details).then(result => {
          if (!result.ok) {
            setErrorMess(result.errorMessage)
            setSubmitting(false)
            return
          }
          setSubmitting(false)
          navigate('/profile')
        }).catch(e => {
          setSubmitting(false)
        }) 
       }, 2500);
    },
  });

  const { errors, touched, handleSubmit, setSubmitting, isSubmitting, getFieldProps } = formik;

  return (
    <>
      <ErrorAlert open={openErrorAlert} onClosed={handleErrorClosed}
          title='Registration Failed' message={errorMess}
        />
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>
          <TextField
            fullWidth
            type="tel"
            label="Phone Number"
            {...getFieldProps('phone_number')}
            error={Boolean(touched.phone_number && errors.phone_number)}
            helperText={touched.phone_number && errors.phone_number}
          />
          <TextField
            fullWidth
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
    </>
  );
}

export default connect(null, actions)(RegisterForm)