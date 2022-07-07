/* eslint-disable no-alert */
/* eslint-disable no-useless-return */
import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';
// functions
import {postNewContactMessage} from '../../services/api/contactMessage'
import SuccessAlert from '../../components/alerts/SuccessAlert';
import ErrorAlert from '../../components/alerts/ErrorAlert';
// ----------------------------------------------------------------------

export default function ContactForm() {
  const navigate = useNavigate();
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false)
  const [openErrorAlert, setOpenErrorAlert] = useState(false)

  const handleClosed = () => {
    setOpenSuccessAlert(false)
    navigate('/', { replace: true });
  }

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
    onSubmit: (values) => {
     setTimeout(() => {
      postNewContactMessage(values).then(result => {
        if (!result.ok) {
          setOpenErrorAlert(true)
          return
        }
        setOpenSuccessAlert(true)
        setSubmitting(false)
      }).catch(() => {
        setSubmitting(false)
      }) 
     }, 2500);
    },
  });

  const { touched, handleSubmit, isSubmitting, getFieldProps, setSubmitting, isValid, errors } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <SuccessAlert open={openSuccessAlert} onClosed={handleClosed}
        title='Contact Message Submitted' message='Your message has been successfully submitted!' />
        <ErrorAlert open={openErrorAlert} onClosed={setOpenErrorAlert}
          title='Submission Error' message='An Error occured please check you connection and make sure you provide valid details then, try again!'
        />
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
            label="Subject"
            {...getFieldProps('subject')}
            error={Boolean(touched.subject && errors.subject)}
            helperText={touched.subject && errors.subject}
          />
          <TextField
            fullWidth
            multiline
            row={10}
            label="message"
            {...getFieldProps('message')}
            error={Boolean(touched.message && errors.message)}
            helperText={touched.message && errors.message}
          />

          <LoadingButton fullWidth 
          size="large" type="submit" variant="contained" 
          loading={isSubmitting} disabled={!isValid}>
            Submit
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}