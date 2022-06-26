import { useState } from 'react';
// mui components 
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
// components
import Page from '../components/Page';
import ReportTable from '../sections/@dashboard/reports/ReportTable';
import Iconify from '../components/Iconify';
import ReportForm from '../sections/feedback/reportForm';


export default function Reports() {
  const [openForm, setOpenForm] = useState(false)

  const handleFormOpen = () => {
    setOpenForm(true)
  }

  const handleFormClose = () => { 
    setOpenForm(false)
  }
  return (
    <Page title="Reports">
    <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <h4>
            Reports
          </h4>
            <Button variant="contained" onClick={handleFormOpen}  startIcon={<Iconify icon="eva:plus-fill" />}>
            Add a report
          </Button>
        </Stack>
    </Container>
     <ReportTable />
     {<ReportForm openForm={openForm} onCloseForm={handleFormClose} />}
    </Page>
  );
}


