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

  const formatFileContent = (fileType) => {
    switch (fileType) {
      case 'IMAGES' :
        return values.file_content.split(',')
      case 'VIDEO' :
        return values.file_content
      case '360VR' :
        return values.file_content
      default :
        return values.file_content
    }
  }
  const hintMessage = (fileType) => {
    switch (fileType) {
      case 'IMAGES' :
        return 'Enter a comma separated list of image links. No Space after the comma!'
      case 'VIDEO' :
        return 'Enter a video link'
      case '360VR' :
        return 'Enter an iframe embed code'
      default :
        return ''
    }
  }
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
      console.log(values.project, { 
        file_type:values.file_type, 
        file_content:formatFileContent(values.file_type), 
        overview:values.overview
      })
      
      setTimeout(() => {
        addNewProjectReport(values.project, 
          {
            file_type:values.file_type, 
            file_content:formatFileContent(values.file_type), 
            overview:values.overview
          }
          ).then(result => {
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

  const { errors, touched, values, handleSubmit, isSubmitting, getFieldProps,setSubmitting  } = formik;


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
          {'Add a New Report'} <br/>
          <span style={{ fontSize:'9px', color:'grey'}}>{hintMessage(values.file_type)}</span>
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
            message='The report has been successfully created. Please dispatch an alert to notify the project owner of the new update.' />
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
      </Dialog>
  )
}

 