/* eslint-disable no-useless-return */
import { useEffect, useState } from 'react';
import { useLocation} from 'react-router-dom'
// material
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop  from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import { RequestSort, RequestList, RequestFilterSidebar } from '../sections/@dashboard/user-requests';
// api functions
import {getUserRequests} from '../services/api/request'



function UserRequests () {
    const [openFilter, setOpenFilter] = useState(false);
    const [requests, setRequests] = useState([])
    const [updatedRequests, setUpdatedRequests] = useState([])
    const [loading, setLoading] = useState(false)

    const location = useLocation()
    useEffect(() => {
      if (location.search) {
        fetchRequests(location.search.substring(1))
      }
      else {
        fetchRequests()
      }
    }, [])

    useEffect(() => {
        setUpdatedRequests(requests)
    }, [requests])

    useEffect(() => {
      fetchRequests(location.search.substring(1))
    }, [location])

    const sortList = (order) => {
      setLoading(true)
      setUpdatedRequests([])
      setTimeout(() => {
        setLoading(false)
        if (order === 'Descending') {
          setUpdatedRequests(requests.sort((reqA, reqB ) => Date.parse(reqA.createdAt) - Date.parse(reqB.createdAt)))
          return
        } 
        setUpdatedRequests(requests.sort((reqA, projB ) => Date.parse(projB.createdAt) - Date.parse(reqA.createdAt)))
      }, 500);
    }

    const fetchRequests = (queryString) => {
      setLoading(true)
      setTimeout(() => {
        getUserRequests(queryString).then(result => {
        setLoading(false)
        if (!result.ok) {
          // eslint-disable-next-line no-alert
          window.alert('error')
          return
        }
        setRequests(result.data)
      }).catch(error => setLoading(false))
      }, 2000);
    }

    const handleOpenFilter = () => {
        setOpenFilter(true);
      };
    
      const handleCloseFilter = () => {
        setOpenFilter(false);
      };
    return (
        <Page title="User Profile">
          <Container>
          <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} >
              <CircularProgress color="inherit" />
            </Backdrop>
            <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="space-between">
              <Typography variant="h4" sx={{ mb: 5 }}>
                My Requests 
              </Typography>
              <Button variant="contained"  startIcon={<Iconify icon="eva:plus-fill" />}>
              Add a Request
              </Button>
            </Stack>
            <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
              <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                <RequestFilterSidebar
                  isOpenFilter={openFilter}
                  onOpenFilter={handleOpenFilter}
                  onCloseFilter={handleCloseFilter}
                  fetchProjectWithFilter={fetchRequests}
                />
                <RequestSort onSortList={sortList} />
              </Stack>
            </Stack>
            {(requests && requests?.length > 0) ? 
            <RequestList requests={updatedRequests} /> 
            : 
            <Alert severity="info">Ops! - No requests available.<br/> - Please check your connect and try again.<br/>- Please check your search filter<br/> - If you haven't added project requests yet, then,<br/>Add one now</Alert>}
          </Container>
        </Page>
    )
}

export default UserRequests