import  PropTypes  from 'prop-types';
import { connect } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui component
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify'
import PaymentTable from '../sections/@dashboard/payments/PaymentTable';
import PaymentForm from '../sections/feedback/paymentForm'


Payments.propTypes = {
  user: PropTypes.object
}
function Payments({user}) {
    const navigate = useNavigate()
    const [openForm, setOpenForm] = useState(false)

    const handleFormOpen = () => {
        setOpenForm(true)
        navigate('/dashboard/payments?sender=&project=')
    }

    const handleFormClose = () => { 
        setOpenForm(false)
    }
  return (
    <Page title="Payments">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant='h4'>
            Payments
          </Typography>
        {user?.isAdmin && <Button variant="contained"  startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleFormOpen}>
            New Payment
          </Button>}
        </Stack>
      </Container>
      <PaymentTable />
      {<PaymentForm openForm={openForm} onCloseForm={handleFormClose} />}
    </Page>
  );
}
const mapStateToProps = ({user}) => ({user})
export default connect(mapStateToProps, null)(Payments)