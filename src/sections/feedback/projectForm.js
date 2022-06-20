/* eslint-disable no-useless-return */
import  React, {useState} from 'react';
import PropTypes from 'prop-types'
// formik 
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
// mui 

import {Stack, Select, InputLabel, FormControl, IconButton } from '@mui/material'
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
// function
import {capitalizeFirstLetter} from '../../utils/formatString'
import {createNewProject, updateProject} from '../../services/api/project'


const planOptions = [
 'STANDARD', 'PRO', 'ENTERPRISE'
]

ProjectForm.propTypes = {
    openForm:PropTypes.object,
  onCloseForm: PropTypes.func,
  project:PropTypes.object
}

export default function ProjectForm({onCloseForm, openForm, project}) {
 const theme = useTheme();
 const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

 const [openSuccessAlert, setOpenSuccessAlert] = useState(false)
  const [openErrorAlert, setOpenErrorAlert] = useState(false)

  const handleClosed = () => {
      onCloseForm()
  }
    
  const ReportSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    plan: Yup.string().required('Select a project plan'),
    description: Yup.string().required('Description is required'),
    detail: Yup.string().required('Detail is required'),
  });
  const formik = useFormik({
    initialValues: {
        name: project?.name??'',
        plan: project?.plan??'',
        description: project?.description??'',
        detail: project?.detail??'',
    },
    validationSchema: ReportSchema,
    onSubmit: (values) => {
      setTimeout(() => {
        if (project && project?.id) {
            updateProject(values, project.id).then(result => {
                if (!result.ok) {
                    setOpenErrorAlert(true)
                    return
                }
                setOpenSuccessAlert(true)
                
            }).catch(e => setSubmitting(false))
            setSubmitting(false)
        }
        else {
            createNewProject(values).then(result => {
                if (!result.ok) {
                    setOpenErrorAlert(true)
                    return
                }
                setOpenSuccessAlert(true)
                formik.resetForm()
            }).catch(e => setSubmitting(false))
            setSubmitting(false)
        }
        
      }, 3000);
    },
  });

  const { errors, touched, handleSubmit, isSubmitting,  getFieldProps, setSubmitting  } = formik;

  return (
      <Dialog
        fullScreen={fullScreen}
        open={openForm}
        onClose={handleClosed}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {'Create a new Project'}
          <IconButton aria-label="close" color="primary" sx={{float:'right'}} onClick={handleClosed}>
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
            <SuccessAlert open={openSuccessAlert} onClosed={handleClosed}
            title={`${project?.id ? 'Project Update Successful' : 'Project Creation Successfull'}`} 
            message={`${project?.id ? 'Your project was successfully updated' : 'Your has been created and is now pending approval'}`}  />
            <ErrorAlert open={openErrorAlert} onClosed={setOpenErrorAlert}
            title='Operation Failed' message='An Error occured please check you connection and make sure you provide valid details and also make sure your account is verified then, try again!'
            />
            
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                    <TextField
                        fullWidth
                        autoComplete="name"
                        type="text"
                        label="Name"
                        {...getFieldProps('name')}
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                    />
                    {!project && <FormControl fullWidth>
                        <InputLabel id="plan-id">Plan</InputLabel>
                        <Select
                            labelId="plan-id"
                            {...getFieldProps('plan')}
                            label="Plan"
                            error={Boolean(touched.plan && errors.plan)}
                        helperText={touched.plan && errors.plan}
                        >
                            {planOptions?.map((option, index) => <MenuItem key={option + index} value={option}>{capitalizeFirstLetter(option)}</MenuItem>)}
                        </Select>
                        </FormControl>}
                    <TextField
                        fullWidth
                        autoComplete="description"
                        multiline
                        rows={4}
                        type="text"
                        label="Description"
                        {...getFieldProps('description')}
                        error={Boolean(touched.description && errors.description)}
                        helperText={touched.description && errors.description}
                    />
                    <TextField
                        fullWidth
                        autoComplete="detail"
                        multiline
                        rows={8}
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

 