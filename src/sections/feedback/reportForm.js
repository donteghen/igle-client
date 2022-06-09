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
import {getAllProjects} from '../../services/api/project'
import { addNewProjectReport } from '../../services/api/report';

const fileTypeOptions = [
 'IMAGES', 'VIDEO', '360VR'
]

ReportForm.propTypes = {
    openForm:PropTypes.bool,
  onCloseForm: PropTypes.func,
}

export default function ReportForm({onCloseForm, openForm}) {
 const [projectList, setProjectList] = useState([])
 const theme = useTheme();
 const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        getAllProjects().then(result => {
            console.log(result)
            if (!result.ok || result.data?.length < 1) {
                window.alert('Error fecthing projects') 
            }
            setProjectList(result.data)
        })
    
      return () => {
        setProjectList([])
      }
    }, [])
    
  const ReportSchema = Yup.object().shape({
    file_type: Yup.string().required('Please select a file type'),
    file_content: Yup.string().required('File content is required'),
    project: Yup.string().required('Please select a project'),
    overview: Yup.string().required('An overview is required'),
  });
  const formik = useFormik({
    initialValues: {
            file_type: '',
            file_content:'',
            project: '',
            overview: '',
    },
    validationSchema: ReportSchema,
    onSubmit: (values) => {
      setTimeout(() => {
        addNewProjectReport(values.project, 
          {file_type:values.file_type, file_content:values.file_content, overview:values.overview}
          ).then(result => {
            if (!result.ok) {
                window.alert(`${result.errorMessage}`)
            }
            else window.alert('submitted successfully!')
        })
        setSubmitting(false)
        formik.resetForm()
        handleClose()
        
      }, 3000);
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps,setSubmitting  } = formik;

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
          <Box
            sx={{
                width: 1000,
                maxWidth: '100%',
            }}
            >
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
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                        fullWidth select
                        label="File Type"
                        {...getFieldProps('file_type')}
                        error={Boolean(touched.file_type && errors.file_type)}
                        helperText={touched.file_type && errors.file_type}
                        >
                            {fileTypeOptions?.map((option, index) => (
                            <MenuItem key={option + index} value={option}>
                            {capitalizeFirstLetter(option)}
                            </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                        fullWidth
                        autoComplete="file_content"
                        rows={3}
                        type="text"
                        label="File Content"
                        {...getFieldProps('file_content')}
                        error={Boolean(touched.file_content && errors.file_content)}
                        helperText={touched.file_content && errors.file_content}
                    />           
                    </Stack>
                    <TextField
                        fullWidth
                        autoComplete="overview"
                        multiline
                        rows={15}
                        type="text"
                        label="Overview"
                        {...getFieldProps('overview')}
                        error={Boolean(touched.overview && errors.overview)}
                        helperText={touched.overview && errors.overview}
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
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
  )
}

 