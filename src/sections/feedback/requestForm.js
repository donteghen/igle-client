/* eslint-disable no-useless-return */
import PropTypes from 'prop-types'
import  React, {useState, useEffect} from 'react';
// formik
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
// mui 
import IconButton from '@mui/material/IconButton';
import {Stack, Select, InputLabel, FormControl } from '@mui/material'
import { LoadingButton } from '@mui/lab';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
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
import {capitalizeFirstLetter} from '../../utils/formatString'
import {getUserProjects} from '../../services/api/project'
import {addNewProjectRequest} from '../../services/api/request'

const typeOptions = [
 '360VR', 'PLAN UPGRADE', 'UPDATED REPORT', 'OTHERS'
]

RequestForm.propTypes = {
    openForm:PropTypes.bool,
  onCloseForm: PropTypes.func,
}

export default function RequestForm({onCloseForm, openForm}) {
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
        getUserProjects().then(result => {
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
  const RequestSchema = Yup.object().shape({
    request_type: Yup.string().required('Please select a request type'),
    project: Yup.string().required('Please select a project'),
    detail: Yup.string().required('Detail is required'),
  });
  const formik = useFormik({
    initialValues: {
      request_type: '',
      project: '',
      detail: '',
    },
    validationSchema: RequestSchema,
    onSubmit: (values) => {
      setTimeout(() => {
        addNewProjectRequest(values.project, {request_type:values.request_type, detail:values.detail}).then(result => {
            if (!result.ok) {
                setErrorMess(result.errorMessage)
                setSubmitting(false)
                return
            }
            setOpenSuccessAlert(true)
            formik.resetForm()
        }).catch(e => setSubmitting(false))
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
        <DialogTitle id="responsive-dialog-title">
          {'Request Form'}
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
            message='Your request has been successfully submitted. Someone from client support will be in touch soonest, Thanks!' />
            <ErrorAlert open={openErrorAlert} onClosed={handleErrorAlertClosed}
            title='Operation Failed' message={errorMess}
            />
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                        fullWidth select
                        label="Request Type"
                        {...getFieldProps('request_type')}
                        error={Boolean(touched.request_type && errors.request_type)}
                        helperText={touched.request_type && errors.request_type}
                        >
                            {typeOptions?.map((option, index) => (
                            <MenuItem key={option + index} value={option}>
                            {capitalizeFirstLetter(option)}
                            </MenuItem>
                            ))}
                        </TextField>
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
                        {/* <TextField
                        fullWidth select
                        label="Project"
                        {...getFieldProps('project')}
                        error={Boolean(touched.project && errors.project)}
                        helperText={touched.project && errors.project}
                        >
                            {projectList?.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                            {option.name}
                            </MenuItem>
                            ))}
                        </TextField> */}
                    </Stack>

                    <TextField
                        fullWidth
                        multiline
                        rows={10}
                        autoComplete="detail"
                        type="text"
                        label="Detail"
                        {...getFieldProps('detail')}
                        error={Boolean(touched.detail && errors.detail)}
                        helperText={touched.detail && errors.detail}
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

 