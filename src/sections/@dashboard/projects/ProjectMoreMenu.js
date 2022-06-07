import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
// api service
import {activateProject, deactivateProject} from '../../../services/api/project'

// ----------------------------------------------------------------------

ProjectMoreMenu.propTypes = {
  projectId: PropTypes.string.isRequired,
  user: PropTypes.object,
  active:PropTypes.bool,
}
function ProjectMoreMenu({projectId, user, active}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleActiveState = () => {
    setIsOpen(false)
    if (active) {
      deactivateProject(projectId).then(result => {
        if (!result.ok) {
          window.alert(`${result.errorMessage}`)
        }
        else {
          window.alert('successfully deactivated!')
        }
      })
    }
    else {
      activateProject(projectId).then(result => {
        if (!result.ok) {
          window.alert(`${result.errorMessage}`)
        }
        else {
          window.alert('successfully activated!')
        }
      })
    }
  }
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

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
      {user?.isAdmin && <MenuItem sx={{ color: 'text.secondary' }} onClick={handleActiveState}>
          <ListItemIcon>
            <Iconify icon={`${active ? 'gridicons:cross-circle' : 'teenyicons:tick-circle-solid'}`}  width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary={`${active ? 'Deactivate' : 'Activate'}`} primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>}
        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline"  width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem component={RouterLink} to={`/dashboard/user-projects/${projectId}`} sx={{ color: 'text.secondary' }} >
          <ListItemIcon>
            <Iconify icon="eva:eye-fill"  width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="View" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}

const mapStateToProps = ({user}) => ({user})
export default connect(mapStateToProps, null)(ProjectMoreMenu)