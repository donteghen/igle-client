/* eslint-disable no-useless-return */
import  React, {useState, useEffect} from 'react';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import PropTypes from 'prop-types'
// mui components
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { LoadingButton } from '@mui/lab';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
// other components
import Iconify from '../../components/Iconify';
import ErrorAlert from '../../components/alerts/ErrorAlert';
import SuccessAlert from '../../components/alerts/SuccessAlert';
// functions
import {capitalizeFirstLetter} from '../../utils/formatString'
import {getAllUsers} from '../../services/api/user'
import {getAllProjects} from '../../services/api/project'
import { postNewPayment } from '../../services/api/payment';

const methodOptions = [
    'MOBILE_MONEY', 'WIRED_TRANSFER','WESTERN_UNION', 'OTHERS'
]

PaymentForm.propTypes = {
    openForm:PropTypes.bool,
    onCloseForm: PropTypes.func,
}

export default function PaymentForm({onCloseForm, openForm}) {
 const [projectList, setProjectList] = useState([])

 const theme = useTheme();
 const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

 const [openSuccessAlert, setOpenSuccessAlert] = useState(false)
  const [openErrorAlert, setOpenErrorAlert] = useState(false)
  const [errorMess, setErrorMess] = useState('')


  const handleSuccessAlertClosed = () => {
    setOpenSuccessAlert(false)
    handleClose()
  }
  const handleErrorAlertClosed = () => {
    setErrorMess('')
    setOpenErrorAlert(false)
  }
    useEffect(() => {
        getAllProjects().then(result => {            
            if (!result.ok || result.data?.length < 1) {
              setErrorMess(result.errorMessage??'Your project list seems to be empty!')
            }
            setProjectList(result.data)
        })
        return () => {
            setProjectList([])
        }
    }, [])

    useEffect(() => {
      if (errorMess && errorMess.length > 0) {
        setOpenErrorAlert(true)
      }
    }, [errorMess])

    const handleClose = () => {
      formik.resetForm()
      onCloseForm(false);
    };


  const ReportSchema = Yup.object().shape({
    method: Yup.string().required('Method is required!'),
    project: Yup.string().required('Please select a project!'),
    note: Yup.string().required('A short payment note is required!'),
    amount: Yup.number().required('Amount is required!'),
  });
  const formik = useFormik({
    initialValues: {
            project:'',
            method: '',
            note: '',
            amount:0
    },
    validationSchema: ReportSchema,
    onSubmit: (values) => {
      console.log(values)
      setTimeout(() => {
        postNewPayment({...values, amount: Number.parseFloat(values.amount)}).then(result => {
            if (!result.ok) {
              setErrorMess(result.errorMessage)
              setSubmitting(false)
              return
            }
            setOpenSuccessAlert(true)
            formik.resetForm()
        }).catch(() => setSubmitting(false))
        
      }, 2000);
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setSubmitting  } = formik;


  return (
      <Dialog
        fullScreen={fullScreen}
        open={openForm}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
        <IconButton aria-label="close" color="primary" sx={{float:'right'}} onClick={handleClose}>
            <Iconify icon='carbon:close-filled' />
          </IconButton>
          {'Post a New Payment'} <br/>
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
            message='Payment successfully created' />
            <ErrorAlert open={openErrorAlert} onClosed={handleErrorAlertClosed}
            title='Operation Failed' message={errorMess}
            />
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                    <FormControl fullWidth>
                        <InputLabel id="project-id">Project</InputLabel>
                        <Select
                            labelId="project-id"
                            {...getFieldProps('project')}
                            label="Project"
                            error={Boolean(touched.project && errors.project)}
                            helperText={touched.project && errors.project}
                        >
                            {projectList?.map(project => <MenuItem key={project.id} value={project.id}>{project.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth 
                        select
                        label="Method"
                        {...getFieldProps('method')}
                        error={Boolean(touched.method && errors.method)}
                        helperText={touched.method && errors.method}
                        >
                            {methodOptions?.map((option, index) => (
                            <MenuItem key={option + index} value={option}>
                            {capitalizeFirstLetter(option)}
                            </MenuItem>
                            ))}
                    </TextField>
                    <TextField
                        fullWidth                                                
                        type="number"
                        label="Amount"
                        {...getFieldProps('amount')}
                        error={Boolean(touched.amount && errors.amount)}
                        helperText={touched.amount && errors.amount}
                    />
                    <TextField
                        fullWidth                        
                        multiline
                        rows={5}
                        type="text"
                        label="Note"
                        {...getFieldProps('note')}
                        error={Boolean(touched.note && errors.note)}
                        helperText={touched.note && errors.note}
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

 