import * as Yup from 'yup';
import PropTypes from 'prop-types'
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import {connect} from 'react-redux'
// material
import Link from '@mui/material/Link';
import  Stack from '@mui/material/Stack';
import  Checkbox from '@mui/material/Checkbox';
import  TextField from '@mui/material/TextField';
import  IconButton from '@mui/material/IconButton';
import  InputAdornment from '@mui/material/InputAdornment';
import  FormControlLabel from '@mui/material/FormControlLabel';
import { LoadingButton } from '@mui/lab';

// component
import Iconify from '../../../components/Iconify';
import ErrorAlert from '../../../components/alerts/ErrorAlert';
// functions
import * as actions from '../../../redux/actions'
// ----------------------------------------------------------------------

LoginForm.propTypes = {
  loginUser: PropTypes.func
}

function LoginForm({loginUser}) {
  const navigate = useNavigate();

  const [openErrorAlert, setOpenErrorAlert] = useState(false)
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      setTimeout(() => {
        loginUser(values).then(result => {
          if (!result.ok) {
            setOpenErrorAlert(true)
            setSubmitting(false)
            return
          }
          navigate('/profile')
          setSubmitting(false)
        }).catch(e => {
          setSubmitting(false)
        }) 
       }, 2500);
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, setSubmitting, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <>
      <ErrorAlert open={openErrorAlert} onClosed={setOpenErrorAlert}
          title='Login Failed' message="The provided credentials don\'t match any acccount. Please verify the provided email & password and try again."
        />
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="/reset-password" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
    </>
  );
}

export default connect(null, actions)(LoginForm)