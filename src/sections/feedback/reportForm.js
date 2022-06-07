/* eslint-disable no-useless-return */
import  React, {useState, useEffect} from 'react';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import PropTypes from 'prop-types'
import Button from '@mui/material/Button';
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
import {capitalizeFirstLetter} from '../../utils/formatString'
import {getUserProjects} from '../../services/api/project'
import {addNewProjectRequest} from '../../services/api/request'

const typeOptions = [
 '360VR', 'PLAN UPGRADE', 'UPDATED REPORT', 'OTHERS'
]

ReportForm.propTypes = {
    openForm:PropTypes.bool,
  onCloseForm: PropTypes.func,
}

export default function ReportForm({onCloseForm, openForm}) {
//   const [projectList, setProjectList] = useState([])
  const theme = useTheme();
 const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

//     useEffect(() => {
//         getUserProjects().then(result => {
//             console.log(result)
//             if (!result.ok || result.data?.length < 1) {
//                 window.alert('No project availiable yet! Please add a project first.') 
//             }
//             setProjectList(result.data)
//         })
    
//       return () => {
//         setProjectList([])
//       }
//     }, [])
    
//   const RequestSchema = Yup.object().shape({
//     request_type: Yup.string().required('Please select a request type'),
//     project: Yup.string().required('Please select a project'),
//     detail: Yup.string().required('Detail is required'),
//   });
//   const formik = useFormik({
//     initialValues: {
//       request_type: '',
//       project: '',
//       detail: '',
//     },
//     validationSchema: RequestSchema,
//     onSubmit: (values) => {
//       setTimeout(() => {
//         addNewProjectRequest(values.project, {request_type:values.request_type, detail:values.detail}).then(result => {
//             if (!result.ok) {
//                 window.alert(`${result.errorMessage}`)
//             }
//             else window.alert('submitted successfully!')
//         })
//         setSubmitting(false)
//         formik.resetForm()
//         handleClose()
        
//       }, 3000);
//     },
//   });

//   const { errors, touched, handleSubmit, isSubmitting, getFieldProps,setSubmitting  } = formik;

  const handleClose = () => {
    onCloseForm(false);
  };

  return (
      <Dialog
        fullScreen={fullScreen}
        open={openForm}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {'Request Form'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{py:4}}>
          coming up
          {/* <Box
            sx={{
                width: 1000,
                maxWidth: '100%',
            }}
            >
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
                        
                    </Stack>

                    <TextField
                        fullWidth
                        autoComplete="detail"
                        type="text"
                        label="Detail"
                        {...getFieldProps('detail')}
                        error={Boolean(touched.detail && errors.detail)}
                        helperText={touched.detail && errors.detail}
                    />
                    <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                        Register
                    </LoadingButton>
                    </Stack>
                </Form>
            </FormikProvider>
            </Box> */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
  )
}

 