import  PropTypes  from 'prop-types';
import { connect } from 'react-redux';
// @mui component
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify'
import { ProjectTable } from '../sections/@dashboard/projects';

Projects.propTypes = {
  user: PropTypes.object
}
function Projects({user}) {

  return (
    <Page title="Projects">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant='h4'>
            Projects
          </Typography>
        {!user?.isAdmin && <Button variant="contained"  startIcon={<Iconify icon="eva:plus-fill" />}>
            New Project
          </Button>}
        </Stack>
      </Container>
      <ProjectTable />
    </Page>
  );
}
const mapStateToProps = ({user}) => ({user})
export default connect(mapStateToProps, null)(Projects)