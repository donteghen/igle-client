import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
// material
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Divider,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import { capitalizeFirstLetter } from '../../../utils/formatString';


// ----------------------------------------------------------------------

export const SORT_BY_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
];
export const FILTER_PLAN_OPTIONS = [ 'PRO', 'STANDARD', 'ENTERPRISE'];
export const FILTER_ACTIVE_OPTIONS = [ true, false];
export const FILTER_STATUS_OPTIONS = [ 'PENDING', 'APPROVED', 'COMPLETED'];


// ----------------------------------------------------------------------

ProjectFilterSidebar.propTypes = {
  isOpenFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};

export default function ProjectFilterSidebar({ isOpenFilter, onOpenFilter, onCloseFilter }) {
  const navigate = useNavigate()
  const [options, setOptions] = useState({plan:'', status:''})

  useEffect(() => {
    let filterString = ''
    Object.entries(options).forEach(([key, value]) => {
      filterString = filterString.concat(`${key}=${value}&`)
    })
    navigate(`/dashboard/projects?${filterString}`)
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
            <div>
              <Typography variant="subtitle1" gutterBottom>
                PLAN
              </Typography>
              <RadioGroup>
                {FILTER_PLAN_OPTIONS.map((item) => (
                  <FormControlLabel key={item} onChange={(e) => setOptions({...options, plan:e.target.value})} value={item} 
                  control={<Radio />} label={capitalizeFirstLetter(item)} checked={options.plan === item} />
                ))}
              </RadioGroup>
            </div>

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
