/* eslint-disable camelcase */
/* eslint-disable no-useless-return */
import  React, {useEffect, useState} from 'react';
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
 'PHOTO', 'VIDEO', '360VRWT', 'WEBCAM'
]

const regionOptions = [
  'ADAMAWA', 'CENTRE', 'EAST', 'FAR NORTH', 'LITTORAL', 'NORTH', 'NORTH WEST', 'WEST','SOUTH', 'SOUTH WEST'
 ]

ProjectForm.propTypes = {
  openForm:PropTypes.bool,
  onCloseForm: PropTypes.func,
  project:PropTypes.object
}

export default function ProjectForm({onCloseForm, openForm, project}) {
 const theme = useTheme();
 const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

 const [openSuccessAlert, setOpenSuccessAlert] = useState(false)
  const [openErrorAlert, setOpenErrorAlert] = useState(false)
  const [errorMess, setErrorMess] = useState('')

  useEffect(() => {
    
    if (errorMess && errorMess.length > 1) {
      setOpenErrorAlert(true)
    }
  }, [errorMess])

  const handleClosed = () => {
      onCloseForm()
  }
  const handleCloseError = () => {
    setErrorMess('')
    setOpenErrorAlert(false)
  }
  const handleCloseSuccess = () => {
    setOpenSuccessAlert(false)
    handleClosed()
  }
    
  const ProjectSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    plan: Yup.string().required('Select a project plan'),
    description: Yup.string().required('Description is required'),
    detail: Yup.string().required('Detail is required'),
    address_line: Yup.string().required('Address line is required'),
    city: Yup.string().required('City is required'),
    region: Yup.string().required('Region is required'),
  });
  const formik = useFormik({
    initialValues: {
        name: project?.name??'',
        plan: project?.plan??'',
        description: project?.description??'',
        detail: project?.detail??'',
        city: project?.location?.city??'',
        region: project?.location?.region??'',
        address_line: project?.location?.address_line??'',
    },
    validationSchema: ProjectSchema,
    onSubmit: (values) => {
      setTimeout(() => {
        if (project && project?.id) {
          const {name, description, detail} = values
            updateProject({name, description, detail}, project.id).then(result => {
                if (!result.ok) {
                  setErrorMess(result.errorMessage)
                    return
                }
                setOpenSuccessAlert(true)
                
            }).catch(() => setSubmitting(false))
            setSubmitting(false)
        }
        else {
            const {name, description, detail, city, address_line, region, plan} = values
            const details = {
              location: {
                city, address_line, region
              }, 
              name, 
              description, 
              detail,
              plan
            }
            createNewProject(details).then(result => {
                if (!result.ok) {
                    setErrorMess(result.errorMessage)
                    return
                }
                setOpenSuccessAlert(true)
                formik.resetForm()
            }).catch(() => setSubmitting(false))
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
            <SuccessAlert open={openSuccessAlert} onClosed={handleCloseSuccess}
            title={`${project?.id ? 'Project Update Successful' : 'Project Creation Successfull'}`} 
            message={`${project?.id ? 'Your project was successfully updated' : 'Your project has been successfully created and is now pending approval'}`}  />
            <ErrorAlert open={openErrorAlert} onClosed={handleCloseError}
            title='Operation Failed' message={errorMess}
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
                    {!project && <>
                    <FormControl fullWidth>
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
                        </FormControl>

                        <FormControl fullWidth>
                        <InputLabel id="region-id">Region</InputLabel>
                        <Select
                            labelId="region-id"
                            {...getFieldProps('region')}
                            label="Region"
                            error={Boolean(touched.region && errors.region)}
                        helperText={touched.region && errors.region}
                        >
                            {regionOptions?.map((option, index) => <MenuItem key={option + index} value={option}>{capitalizeFirstLetter(option)}</MenuItem>)}
                        </Select>
                        </FormControl>

                        <TextField
                        fullWidth
                        autoComplete="city"
                        type="text"
                        label="City"
                        {...getFieldProps('city')}
                        error={Boolean(touched.city && errors.city)}
                        helperText={touched.city && errors.city}
                        />

                        <TextField
                        fullWidth
                        autoComplete="address_line"
                        type="text"
                        label="Address Line"
                        {...getFieldProps('address_line')}
                        error={Boolean(touched.address_line && errors.address_line)}
                        helperText={touched.address_line && errors.address_line}
                        />
                        </>}
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

 