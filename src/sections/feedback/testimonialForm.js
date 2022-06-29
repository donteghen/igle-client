/* eslint-disable no-useless-return */
import PropTypes from 'prop-types'
import  React, {useState, useEffect} from 'react';
// formik
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
// mui 
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack'
import { LoadingButton } from '@mui/lab';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
// other components
import ErrorAlert from '../../components/alerts/ErrorAlert';
import SuccessAlert from '../../components/alerts/SuccessAlert';
import Iconify from '../../components/Iconify';
// functions

import {postNewTestimonial} from '../../services/api/testimonial'



TestimonialForm.propTypes = {
    openForm:PropTypes.bool.isRequired,
  onCloseForm: PropTypes.func.isRequired,
}

export default function TestimonialForm({onCloseForm, openForm}) {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false)
  const [openErrorAlert, setOpenErrorAlert] = useState(false)
  const [errorMess, setErrorMess] = useState('')

  const [rating, setRating] = useState(0)


  const handleSuccessAlertClosed = () => {
    setOpenSuccessAlert(false)
    handleClose()
  }
  const handleErrorAlertClosed = () => {
    setErrorMess('')
    setOpenErrorAlert(false)
    handleClose()
  }

    useEffect(() => {
      if (errorMess && errorMess.length > 0) {
        setOpenErrorAlert(true)
      }
    }, [errorMess])

    const handleClose = () => {
      setRating(0)
      formik.resetForm()
      onCloseForm(false);
    };
  const RequestSchema = Yup.object().shape({
    comment: Yup.string().required('Comment is required!'),
  });
  const formik = useFormik({
    initialValues: {
      comment: '',
    },
    validationSchema: RequestSchema,
    onSubmit: ({comment}) => {
      setTimeout(() => {
        postNewTestimonial({comment, rating}).then(result => {
            if (!result.ok) {
                setErrorMess(result.errorMessage)
                setSubmitting(false)
                return
            }
            setOpenSuccessAlert(true)
            formik.resetForm()
        }).catch(() => setSubmitting(false))
      }, 3000);
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps,setSubmitting  } = formik;

  

  return (
      <Dialog
        fullScreen={fullScreen}
        open={openForm}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" sx={{'&.MuiDialogTitle-root':{fontSize:'30px'}}}>
          {'Leave a Testimonial'}
          <IconButton aria-label="close" color="primary" sx={{float:'right'}} onClick={handleClose}>
            <Iconify icon='carbon:close-filled' />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{py:4}}>
          <Box
            sx={{
                width: 1000,
                maxWidth: '100%',
            }}
            >
            <SuccessAlert open={openSuccessAlert} onClosed={handleSuccessAlertClosed}
            title='Submission Successful' 
            message='Thanks for being awesome and for joining our platform. We appreciate the time set aside to leave us a review' />
            <ErrorAlert open={openErrorAlert} onClosed={handleErrorAlertClosed}
            title='Submittion Failed' message={errorMess}
            />
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                    <Box sx={{py:2}}>
                     <p>Star Rating</p>
                     <Rating value={rating} onChange={(event, newValue) => setRating(newValue)} />
                    </Box>
                    <TextField
                        fullWidth
                        multiline
                        rows={8}
                        autoComplete="comment"
                        type="text"
                        label="Comment"
                        {...getFieldProps('comment')}
                        error={Boolean(touched.comment && errors.comment)}
                        helperText={touched.comment && errors.comment}
                    />                    
                    <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                        Submit
                    </LoadingButton>
                    </Stack>
                </Form>
            </FormikProvider>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
  )
}

 