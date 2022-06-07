import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// material
import { Grid, Alert, Box, Pagination } from '@mui/material';
import ReportCard from './ReportCard';




// ----------------------------------------------------------------------



ReportList.propTypes = {
  reports: PropTypes.array.isRequired
};

const pageSize = 8

export default function ReportList({ reports, ...other }) {
    const [DisplayedReports, setDisplayedReports] = useState([])
    const [page, setPage] = useState(1)
   const [count, setCount] = useState(1)
   useEffect(() => {
    // force update triggerer using page set to 0
    if (page === 0) {
        setPage(1)
    }
    setCount(reports? Math.ceil(reports?.length / pageSize) : 1)
    setDisplayedReports(reports?.slice((page - 1) * pageSize, page * pageSize))
}, [reports, page])

const handlePageChange = (e, value) => {
    setPage(value)
}
  return (
    <>{(reports && reports?.length !== 0) ? 
    <Box>
        <Grid container spacing={3} {...other}>
        {reports?.map((report) => (
            <Grid key={report.id} item xs={12} sm={6} md={3}>
            <ReportCard report={report} />
            </Grid>
        ))}
        </Grid> 
        {reports?.length > 0 && <Grid container spacing={2} sx={{mt:1}} >
            <Grid item xs={12} sx={{display:'flex', justifyContent:'center'}}>
                <Pagination color='primary' count={count} page={page} onChange={handlePageChange} />
            </Grid>
        </Grid>}
    </Box>
    : 
    <Alert severity="info">No Reports Available!</Alert>}</>
  );
}