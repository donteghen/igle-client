import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

export default function ContactForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Fullname is required'),
    subject: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Subject is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    phone_number: Yup.string().required('Phone Number is required'),
    message: Yup.string().required('message is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      phone_number: '',
      subject:'',
      email: '',
      message: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      navigate('/', { replace: true });
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
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
            type="phone_number"
            label="Phone number"
            {...getFieldProps('phone_number')}
            error={Boolean(touched.phone_number && errors.phone_number)}
            helperText={touched.phone_number && errors.phone_number}
          />

          <TextField
            multiline
            fullWidth
            rows={10}
            autoComplete=""
            label="message"
            {...getFieldProps('message')}
            error={Boolean(touched.message && errors.message)}
            helperText={touched.message && errors.message}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Submit
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}