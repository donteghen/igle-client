import { useEffect, useState } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { ProjectSort, ProjectList, ProjectFilterSidebar } from '../sections/@dashboard/user-projects';
import * as actions from '../redux/actions'


const mockProjects = [
    {
        id:1, name: 'Amazon tree garden and plaza hotel and resorts.', updatedAt:'12.05.2022', status:'APPROVED', plan:'PRO', active:true
    },
    {
        id:2, name: 'Amazon urban town development and design for emergance 20~ weehhhh.', updatedAt:'12.05.2021', status:'PENDING', plan:'STANDARD', active:false
    },
    {
        id:3, name: 'Greyland village industrial complex development and design of solar farm.', updatedAt:'12.05.2018', status:'COMPLETED', plan:'ENTERPRISE', active:false
    }
]

Projects.propTypes = {
    user: PropTypes.object
}
function Projects ({user}) {
    const [openFilter, setOpenFilter] = useState(false);
    const handleOpenFilter = () => {
        setOpenFilter(true);
      };
    
      const handleCloseFilter = () => {
        setOpenFilter(false);
      };
    return (
        <Page title="Dashboard: Products">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products {user ? user.name : 'no auth'}
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProjectFilterSidebar
              isOpenFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProjectSort />
          </Stack>
        </Stack>

        <ProjectList projects={mockProjects} />
      </Container>
    </Page>
    )
}
const mapStateToProps = ({user}) => ({user})
export default connect(mapStateToProps, null)(Projects)