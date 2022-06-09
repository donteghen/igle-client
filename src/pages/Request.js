import { useState } from 'react';
import  PropTypes  from 'prop-types';
import { connect } from 'react-redux';
// @mui components
import Container  from '@mui/material/Container';
import Button  from '@mui/material/Button';
import Stack  from '@mui/material/Stack';
import Page from '../components/Page';
// other components
import RequestTable from '../sections/@dashboard/requests/RequestTable';
import Iconify from '../components/Iconify';
import RequestForm from '../sections/feedback/requestForm';

Requests.propTypes = {
  user: PropTypes.object
}
function Requests({user}) {
  const [openForm, setOpenForm] = useState(false)
  const handleFormOpen = () => {
    setOpenForm(true)
  }
  const handleFormClose = () => {
    setOpenForm(false)
  }
  return (
    <Page title="Requests">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <h4>
            Requests
          </h4>
         {!user?.isAdmin && <Button variant="contained" onClick={handleFormOpen}  startIcon={<Iconify icon="eva:plus-fill" />}>
            Make a request
          </Button>}
        </Stack>
      </Container>
      <RequestTable />
      { !user?.isAdmin && <RequestForm openForm={openForm} onCloseForm={handleFormClose} />}
    </Page>
    
  );
}

const mapStateToProps = ({user}) => ({user})
export default connect(mapStateToProps, null)(Requests)