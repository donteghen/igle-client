import PropTypes from 'prop-types';
// material
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Divider,
  Checkbox,
  FormGroup,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';

// ----------------------------------------------------------------------

export const SORT_BY_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
];
export const FILTER_PLAN_OPTIONS = ['All', 'Pro', 'Standard', 'Enterprise'];
export const FILTER_ACTIVE_OPTIONS = ['All' , 'Active', 'Inactive'];
export const FILTER_STATUS_OPTIONS = ['All', 'Pending', 'Approved', 'Completed'];


// ----------------------------------------------------------------------

ProjectFilterSidebar.propTypes = {
  isOpenFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};

export default function ProjectFilterSidebar({ isOpenFilter, onOpenFilter, onCloseFilter }) {
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
                Gender
              </Typography>
              <FormGroup>
                {FILTER_PLAN_OPTIONS.map((item, index) => (
                  <FormControlLabel key={item} control={<Checkbox />} label={item} />
                ))}
              </FormGroup>
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Category
              </Typography>
              <RadioGroup>
                {FILTER_ACTIVE_OPTIONS.map((item, index) => (
                  <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
                ))}
              </RadioGroup>
            </div>


            <div>
              <Typography variant="subtitle1" gutterBottom>
                Price
              </Typography>
              <RadioGroup>
                {FILTER_STATUS_OPTIONS.map((item, index) => (
                  <FormControlLabel key={item} value={item.value} control={<Radio />} label={item.label} />
                ))}
              </RadioGroup>
            </div>

          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="ic:round-clear-all" />}
          >
            Clear All
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
