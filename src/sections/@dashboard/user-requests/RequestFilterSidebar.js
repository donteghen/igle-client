import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
// material
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import  Button from '@mui/material/Button';
import  Drawer from '@mui/material/Drawer';
import  Divider from '@mui/material/Divider';
import  IconButton from '@mui/material/IconButton';
import Typography  from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import  FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import { capitalizeFirstLetter } from '../../../utils/formatString';
// function
import { getUserProjects } from '../../../services/api/project';

// ----------------------------------------------------------------------

export const SORT_BY_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
];
export const FILTER_STATUS_OPTIONS = [ 'RECIEVED', 'IN_PROCESS', 'PROCESSED'];




// ----------------------------------------------------------------------

ProjectFilterSidebar.propTypes = {
  isOpenFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};

export default function ProjectFilterSidebar({ isOpenFilter, onOpenFilter, onCloseFilter }) {
  const navigate = useNavigate()
  const [options, setOptions] = useState({project:'', status:''})
  const [projectOptions, setProjectOptions] = useState([])

  useEffect(() => {
     getUserProjects().then(result => {
         setProjectOptions(result.data)
     })
  }, [])
  useEffect(() => {
    let filterString = ''
    Object.entries(options).forEach(([key, value]) => {
      filterString = filterString.concat(`${key}=${value}&`)
    })
    navigate(`/dashboard/user-requests?${filterString}`)
  }, [options])

  return (
    <>
      <Button disableRipple color="inherit" endIcon={<Iconify icon="ic:round-filter-list" />} onClick={onOpenFilter}>
        Filters&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={isOpenFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Filters
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" width={20} height={20} />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="project-label">Project</InputLabel>
                <Select
                labelId="project-label"
                id="project-label-id"
                value={options.project}
                label="Project"
                onChange={(e) => setOptions({...options, project:e.target.value})}
                >
                {projectOptions?.map(project => <MenuItem key={project.id} value={project.id}>{project.name}</MenuItem>)}
                </Select>
            </FormControl>
            </Box>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                STATUS
              </Typography>  
              <RadioGroup>
                {FILTER_STATUS_OPTIONS.map((item) => (
                  <FormControlLabel key={item} onChange={(e) => setOptions({...options, status:e.target.value})} 
                  value={item} control={<Radio />} label={capitalizeFirstLetter(item)} checked={options.status === item} />
                ))}
              </RadioGroup>
            </div>

          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Button fullWidth size="large" type="submit" color="inherit" variant="outlined"
            startIcon={<Iconify icon="ic:round-clear-all" />} onClick={() => setOptions({})}
          >
            Clear 
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
