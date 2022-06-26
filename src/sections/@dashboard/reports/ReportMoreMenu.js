/* eslint-disable no-useless-return */
import {useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types'
// material
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
// component
import Iconify from '../../../components/Iconify';
import ReportPreview from '../../../components/ReportPreview';
// functions 
import {deleteReport, dispatchReportUpdateAlert} from '../../../services/api/report'
// ----------------------------------------------------------------------

ReportMoreMenu.propTypes = {
  report: PropTypes.object.isRequired,
  onFetchReports: PropTypes.func.isRequired
}
export default function ReportMoreMenu({report, onFetchReports}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openPreview, setOpenPreview] = useState(false)

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState(false)
  const [errorMess, setErrorMess] = useState('')
  const [success, setSuccess] = useState(false)
  useEffect(() => {
    if (errorMess && errorMess.length > 0) {
      setError(true)
    }
      return () => {
        setErrorMess('')
      }
    }, [errorMess])

  const handleOpenPreview = () => {
      setIsOpen(false)
      setOpenPreview(true)
  }

  const handleClosePreview = () => {
    setOpenPreview(false)
  }
  const handleCloseSuccess = () => {
    setSuccess(false)
    onFetchReports()
  }
  const handleCloseError = () => {
    setError(false)
  }

  const handleDeleteReport = () => {
    setIsOpen(false)
    setLoading(true)
    setTimeout(() => {
      deleteReport(report?.id).then(result => {
        setLoading(false)
        if (!result.ok) {
          setErrorMess(result.errorMessage)
          return
        }
        setSuccess(true)
      }).catch(() => setLoading(false))
    }, 2000);
  }

  const handleDispatchReport = () => {
    setIsOpen(false)
    setLoading(true)
    setTimeout(() => {
      dispatchReportUpdateAlert(report?.id).then(result => {
        setLoading(false)
        if (!result.ok) {
          setErrorMess(result.errorMessage)
          return
        }
        setSuccess(true)
      }).catch(() => setLoading(false))
    }, 2000);
  }
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} >
              <CircularProgress size={40} thickness={4} color="primary" />
        </Backdrop>
      {error && 
        <Alert severity="error" onClose={handleCloseError}>
        <AlertTitle>Error</AlertTitle>
        {errorMess}
      </Alert>}
      {success && 
        <Alert severity="success" onClose={handleCloseSuccess}>
        <AlertTitle>Operation Successful</AlertTitle>
         You request was successful!<strong>Close to continue</strong>
      </Alert>}
      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >       
      <MenuItem sx={{ color: 'text.secondary' }} onClick={handleDispatchReport}>
          <ListItemIcon>
            <Iconify icon="fluent:alert-badge-20-filled"  width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Dispatch" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem  sx={{ color: 'text.secondary' }} onClick={handleOpenPreview}>
          <ListItemIcon>
            <Iconify icon="eva:eye-fill"  width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Preview" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem sx={{ color: 'text.secondary' }} onClick={handleDeleteReport}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline"  width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
      
      {<ReportPreview openPreview={openPreview} onClosePreview={handleClosePreview} report={report} />}
    </>
  );
}

