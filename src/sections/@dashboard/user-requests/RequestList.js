import PropTypes from 'prop-types';

// material
import { Grid } from '@mui/material';
import RequestCard from './RequestCard';


// ----------------------------------------------------------------------



RequestList.propTypes = {
  requests: PropTypes.array.isRequired
};

export default function RequestList({ requests, ...other }) {

  return (
    <Grid container spacing={3} {...other}>
      {requests.map((request) => (
        <Grid key={request.id} item xs={12} sm={6} md={3}>
          <RequestCard request={request} />
        </Grid>
      ))}
    </Grid>
  );
}